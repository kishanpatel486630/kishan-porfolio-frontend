import { Router } from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";
import { sendAdminSecurityAlert } from "../utils/email.js";


const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORTFOLIO_JSON_PATH = path.join(__dirname, "../data/portfolio.json");

// In-memory active session store
export const activeSessions = new Set();

// Authentication middleware for write endpoints
export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, error: "Unauthorized: Missing token" });
  }
  const token = authHeader.split(" ")[1];
  if (!activeSessions.has(token)) {
    return res.status(401).json({ success: false, error: "Unauthorized: Invalid or expired session" });
  }
  next();
}

// Get client metadata for alerts
const getClientMeta = (req) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"];
  return { ip, userAgent };
};

// 1. GET /api/portfolio - Fetch live portfolio data
router.get("/portfolio", async (req, res) => {
  try {
    const data = await fs.readFile(PORTFOLIO_JSON_PATH, "utf8");
    res.json(JSON.parse(data));
  } catch (error) {
    console.error("❌ Error reading portfolio data:", error.message);
    res.status(500).json({ success: false, error: "Failed to read portfolio data." });
  }
});

// 2. POST /api/portfolio - Save updated portfolio data (Protected)
router.post("/portfolio", requireAuth, async (req, res) => {
  try {
    const updatedData = req.body;
    
    // Quick validation
    if (!updatedData || !updatedData.personalInfo || !updatedData.projects) {
      return res.status(400).json({ success: false, error: "Invalid portfolio data schema" });
    }

    await fs.writeFile(
      PORTFOLIO_JSON_PATH,
      JSON.stringify(updatedData, null, 2),
      "utf8"
    );

    res.json({ success: true, message: "Portfolio database updated successfully." });
  } catch (error) {
    console.error("❌ Error saving portfolio data:", error.message);
    res.status(500).json({ success: false, error: "Failed to save portfolio data." });
  }
});

// 3. POST /api/admin/notify-access - Log/Alert when login page is visited
router.post("/admin/notify-access", async (req, res) => {
  const { ip, userAgent } = getClientMeta(req);
  
  console.log(`⚠️ Admin panel accessed by IP: ${ip}`);
  
  // Send email alert asynchronously (don't block frontend load)
  sendAdminSecurityAlert({ type: "access", ip, userAgent }).catch((err) =>
    console.error("❌ Failed to send access alert email:", err.message)
  );

  res.json({ success: true });
});

// 4. POST /api/admin/login - Authenticate credentials and establish session
router.post("/admin/login", async (req, res) => {
  const { username, password } = req.body;
  const { ip, userAgent } = getClientMeta(req);

  const envUsername = process.env.ADMIN_USERNAME || "kishan";
  const envPassword = process.env.ADMIN_PASSWORD || "kishan123";

  if (username === envUsername && password === envPassword) {
    // Generate secure session token
    const token = crypto.randomBytes(32).toString("hex");
    activeSessions.add(token);

    console.log(`✅ Admin logged in successfully from IP: ${ip}`);

    // Send success email notification
    sendAdminSecurityAlert({
      type: "login_success",
      username,
      ip,
      userAgent,
    }).catch((err) => console.error("❌ Failed to send login success email:", err.message));

    res.json({ success: true, token });
  } else {
    console.log(`❌ Failed admin login attempt for username: "${username}" from IP: ${ip}`);

    // Send failure email notification
    sendAdminSecurityAlert({
      type: "login_failure",
      username,
      ip,
      userAgent,
    }).catch((err) => console.error("❌ Failed to send login failure email:", err.message));

    res.status(401).json({ success: false, error: "Invalid username or password" });
  }
});


// 5. POST /api/admin/logout - Invalidate session token
router.post("/admin/logout", (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    activeSessions.delete(token);
  }
  res.json({ success: true, message: "Logged out successfully" });
});

// 6. GET /api/admin/check-session - Verify token validity
router.get("/admin/check-session", (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    if (activeSessions.has(token)) {
      return res.json({ success: true });
    }
  }
  res.status(401).json({ success: false, error: "Invalid session" });
});

// Image Upload Helper
async function saveUploadedFile(filename, base64Data) {
  // Strip metadata prefix (e.g., "data:image/png;base64,") if present
  const base64Content = base64Data.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Content, "base64");

  const serverUploadsDir = path.join(__dirname, "../uploads");
  const clientUploadsDir = path.join(__dirname, "../../client/public/uploads");

  // Ensure directories exist
  await fs.mkdir(serverUploadsDir, { recursive: true }).catch(() => {});
  await fs.mkdir(clientUploadsDir, { recursive: true }).catch(() => {});

  // Generate unique filename to avoid collision
  const cleanFilename = `${Date.now()}_${filename.replace(/\s+/g, "_")}`;

  // Save to server
  const serverFilePath = path.join(serverUploadsDir, cleanFilename);
  await fs.writeFile(serverFilePath, buffer);

  // Save to client public folder (for local dev devServer preview without page reload)
  const clientFilePath = path.join(clientUploadsDir, cleanFilename);
  await fs.writeFile(clientFilePath, buffer).catch((err) => {
    console.log("Note: Could not save upload to client public directory (may be production):", err.message);
  });

  return `/uploads/${cleanFilename}`;
}

// 7. POST /api/admin/upload - Upload a file from client (base64)
router.post("/admin/upload", requireAuth, async (req, res) => {
  try {
    const { filename, base64 } = req.body;
    if (!filename || !base64) {
      return res.status(400).json({ success: false, error: "Filename and base64 data are required" });
    }

    const url = await saveUploadedFile(filename, base64);
    res.json({ success: true, url });
  } catch (error) {
    console.error("❌ Upload error:", error.message);
    res.status(500).json({ success: false, error: "Failed to save uploaded image." });
  }
});

// 8. GET /api/admin/gallery - Get all files in the uploads folder
router.get("/admin/gallery", requireAuth, async (req, res) => {
  try {
    const serverUploadsDir = path.join(__dirname, "../uploads");
    
    // Ensure directory exists
    await fs.mkdir(serverUploadsDir, { recursive: true }).catch(() => {});
    
    const files = await fs.readdir(serverUploadsDir);
    
    // Filter to return only images (or common assets) and map to URL paths
    const photos = files
      .filter((file) => /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(file))
      .map((file) => `/uploads/${file}`);
      
    // Sort by timestamp (newest first)
    photos.sort((a, b) => {
      const timeA = parseFloat(a.split("/").pop().split("_")[0]) || 0;
      const timeB = parseFloat(b.split("/").pop().split("_")[0]) || 0;
      return timeB - timeA;
    });

    res.json({ success: true, photos });
  } catch (error) {
    console.error("❌ Gallery fetch error:", error.message);
    res.status(500).json({ success: false, error: "Failed to read gallery assets." });
  }
});

// 9. DELETE /api/admin/gallery/:filename - Delete file from uploads folders
router.delete("/api/admin/gallery/:filename", requireAuth, async (req, res) => {
  try {
    const { filename } = req.params;
    if (!filename) {
      return res.status(400).json({ success: false, error: "Filename is required" });
    }

    // Security check to avoid path traversal
    const safeFilename = path.basename(filename);

    const serverFilePath = path.join(__dirname, "../uploads", safeFilename);
    const clientFilePath = path.join(__dirname, "../../client/public/uploads", safeFilename);

    let deletedAtLeastOne = false;

    // Delete from server directory
    try {
      await fs.unlink(serverFilePath);
      deletedAtLeastOne = true;
    } catch (err) {
      if (err.code !== "ENOENT") throw err;
    }

    // Delete from client directory
    try {
      await fs.unlink(clientFilePath);
      deletedAtLeastOne = true;
    } catch (err) {
      if (err.code !== "ENOENT") throw err;
    }

    if (deletedAtLeastOne) {
      res.json({ success: true, message: "Asset deleted successfully." });
    } else {
      res.status(404).json({ success: false, error: "Asset not found on disk." });
    }
  } catch (error) {
    console.error("❌ Asset deletion error:", error.message);
    res.status(500).json({ success: false, error: "Failed to delete target asset." });
  }
});

export default router;
