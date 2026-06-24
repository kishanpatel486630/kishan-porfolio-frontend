import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiLockClosed,
  HiUser,
  HiBriefcase,
  HiAcademicCap,
  HiFolder,
  HiSparkles,
  HiChartBar,
  HiCog,
  HiChevronRight,
  HiLogout,
  HiPlus,
  HiTrash,
  HiSave,
  HiEye,
  HiArrowLeft,
  HiX,
  HiCheckCircle,
  HiExclamationCircle,
  HiMail,
  HiKey,
  HiCamera,
  HiUpload,
} from "react-icons/hi";
import { usePortfolio } from "../context/PortfolioContext";

// Reusable image upload component with Base64 encoding
function ImageUploadField({ label, value, onChange, apiBaseUrl, showToast }) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Only image files are allowed", "error");
      return;
    }

    try {
      setIsUploading(true);
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Content = reader.result;
        
        const token = localStorage.getItem("adminToken");
        const res = await fetch(`${apiBaseUrl}/api/admin/upload`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            filename: file.name,
            base64: base64Content
          }),
        });
        
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to upload image");
        }
        
        onChange(data.url);
        showToast("Image uploaded successfully!");
        setIsUploading(false);
      };
      reader.onerror = (err) => {
        console.error("FileReader error:", err);
        showToast("Failed to read file", "error");
        setIsUploading(false);
      };
    } catch (err) {
      showToast(err.message, "error");
      setIsUploading(false);
    }
  };

  const getPreviewUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) return url;
    return url;
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-bold text-text-secondary">{label}</label>}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-4 rounded-xl border border-border bg-bg-card/35">
        <div className="w-20 h-20 rounded-lg border border-border bg-bg-primary overflow-hidden flex items-center justify-center shrink-0">
          {value ? (
            <img src={getPreviewUrl(value)} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <span className="text-[10px] text-text-muted">No Image</span>
          )}
        </div>
        
        <div className="flex-1 w-full space-y-2">
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="e.g. /images/profile.jpg or /uploads/filename.png"
            className="w-full px-3 py-2 rounded-lg bg-bg-primary border border-border text-xs focus:outline-none focus:border-gradient-start transition font-mono"
          />
          
          <div className="flex items-center gap-3">
            <label className="px-3 py-1.5 rounded-lg border border-border hover:bg-bg-primary text-xs font-bold flex items-center gap-1.5 cursor-pointer transition select-none">
              {isUploading ? (
                <div className="w-3.5 h-3.5 border-2 border-text-primary border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <HiUpload />
              )}
              <span>{isUploading ? "Uploading..." : "Upload from Device"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
                className="hidden"
              />
            </label>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="px-3 py-1.5 rounded-lg border border-error/20 hover:bg-error/10 text-error text-xs font-bold transition cursor-pointer"
              >
                Clear Image
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const navigate = useNavigate();
  const {
    personalInfo,
    navLinks,
    clientLogos,
    projects,
    caseStudies,
    skills,
    experience,
    education,
    stats,
    projectFilters,
    updatePortfolio,
    apiBaseUrl,
  } = usePortfolio();

  // Auth states
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // App states for editing (local copy of data)
  const [editData, setEditData] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard | info | projects | skills | experience | education | stats | gallery
  const [toasts, setToasts] = useState([]); // Array of { id, text, type }
  const [isSaving, setIsSaving] = useState(false);
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(false);

  // Active sub-item indices for selection in UI
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // Trigger login access alert once on mount
  useEffect(() => {
    if (!token) {
      fetch(`${apiBaseUrl}/api/admin/notify-access`, { method: "POST" })
        .then((res) => res.json())
        .catch((err) => console.error("Access alert failed:", err));
    }
  }, [token, apiBaseUrl]);

  // Check token validity on mount or when token changes
  useEffect(() => {
    if (token) {
      fetch(`${apiBaseUrl}/api/admin/check-session`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (res.ok) {
            setIsAuthenticated(true);
          } else {
            // Invalid/expired token
            localStorage.removeItem("adminToken");
            setToken("");
            setIsAuthenticated(false);
          }
        })
        .catch(() => {
          setIsAuthenticated(false);
        });
    }
  }, [token, apiBaseUrl]);

  // Initialize editData when database is fetched
  useEffect(() => {
    if (personalInfo) {
      setEditData({
        personalInfo: { ...personalInfo },
        navLinks: [...navLinks],
        clientLogos: [...clientLogos],
        projects: JSON.parse(JSON.stringify(projects)),
        caseStudies: JSON.parse(JSON.stringify(caseStudies || {})),
        skills: JSON.parse(JSON.stringify(skills)),
        experience: JSON.parse(JSON.stringify(experience)),
        education: JSON.parse(JSON.stringify(education)),
        stats: JSON.parse(JSON.stringify(stats)),
        projectFilters: [...(projectFilters || ["All", "Designer", "Manager"])],
      });
    }
  }, [personalInfo, navLinks, clientLogos, projects, caseStudies, skills, experience, education, stats, projectFilters]);

  // Fetch photo gallery assets
  const fetchGalleryPhotos = async () => {
    try {
      setIsLoadingPhotos(true);
      const res = await fetch(`${apiBaseUrl}/api/admin/gallery`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load gallery");
      setGalleryPhotos(data.photos || []);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setIsLoadingPhotos(false);
    }
  };

  useEffect(() => {
    if (activeTab === "gallery" && token) {
      fetchGalleryPhotos();
    }
  }, [activeTab, token]);


  // Toast helper
  const showToast = (text, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setAuthError("Username and password are required");
      return;
    }

    try {
      setIsLoggingIn(true);
      setAuthError("");

      const res = await fetch(`${apiBaseUrl}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      localStorage.setItem("adminToken", data.token);
      setToken(data.token);
      setIsAuthenticated(true);
      showToast("Access Granted. Welcome back, Kishan!");
    } catch (err) {
      setAuthError(err.message);
      showToast(err.message, "error");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch(`${apiBaseUrl}/api/admin/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("Logout failed:", err);
    }
    localStorage.removeItem("adminToken");
    setToken("");
    setIsAuthenticated(false);
    showToast("Logged out successfully");
  };

  // Handle Global Save changes to Database
  const handleSaveChanges = async () => {
    if (!editData) return;

    try {
      setIsSaving(true);
      const res = await updatePortfolio(editData, token);
      if (!res.success) {
        throw new Error(res.error || "Failed to update changes");
      }
      showToast("Database saved and synced successfully!");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setIsSaving(false);
    }
  };

  if (!editData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary text-text-primary">
        <div className="w-12 h-12 border-4 border-gradient-start border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-4 font-semibold text-lg">Initializing security tunnels...</p>
      </div>
    );
  }

  // ────────────── AUTH VIEW ──────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary p-6 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-start opacity-10 blur-[120px] top-[-10%] left-[-10%]" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-accent-glow opacity-10 blur-[100px] bottom-[-10%] right-[-10%]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md relative group"
        >
          {/* Animated Gradient Border */}
          <div className="absolute inset-[-2px] rounded-3xl bg-gradient-to-r from-gradient-start via-gradient-end to-accent-glow opacity-30 blur-md group-hover:opacity-60 transition duration-500" />

          <div className="relative rounded-3xl glass p-8 md:p-10 shadow-2xl bg-bg-card/40 backdrop-blur-xl border border-border/50">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-gradient-start to-gradient-end flex items-center justify-center shadow-lg shadow-gradient-start/20 mb-4 animate-float">
                <HiLockClosed className="text-white text-3xl" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight">Kishan Admin</h2>
              <p className="text-text-muted mt-2 text-sm">Verify credentials to manage your digital footprint</p>
            </div>

            {authError && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 bg-error/10 border border-error/20 text-error rounded-xl p-4 text-sm flex items-center gap-3"
              >
                <HiExclamationCircle className="text-xl shrink-0" />
                <span>{authError}</span>
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted">
                    <HiUser size={20} />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter admin username"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-bg-primary border border-border/80 text-text-primary focus:outline-none focus:border-gradient-start focus:ring-1 focus:ring-gradient-start/50 bg-opacity-40 transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted">
                    <HiLockClosed size={20} />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-bg-primary border border-border/80 text-text-primary focus:outline-none focus:border-gradient-start focus:ring-1 focus:ring-gradient-start/50 bg-opacity-40 transition-all duration-300"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-gradient-start to-gradient-end hover:from-gradient-end hover:to-gradient-start text-white font-bold tracking-wide shadow-xl shadow-gradient-start/20 hover:shadow-gradient-start/40 focus:outline-none focus:ring-2 focus:ring-gradient-start/50 transition-all duration-300 flex items-center justify-center disabled:opacity-50 cursor-pointer"
              >
                {isLoggingIn ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Secure Authenticate"
                )}
              </button>
            </form>

            <div className="mt-8 text-center border-t border-border/30 pt-6">
              <a
                href="/"
                className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-gradient-start transition duration-200"
              >
                <HiArrowLeft /> Back to Portfolio Site
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // ────────────── ADMIN DASHBOARD VIEW ──────────────
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary relative">
      {/* Toast notifications */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              className={`p-4 rounded-xl shadow-lg border backdrop-blur-md flex items-center gap-3 text-sm pointer-events-auto ${
                toast.type === "error"
                  ? "bg-error/10 border-error/20 text-error"
                  : "bg-success/10 border-success/20 text-success"
              }`}
            >
              {toast.type === "error" ? (
                <HiExclamationCircle className="text-xl shrink-0" />
              ) : (
                <HiCheckCircle className="text-xl shrink-0" />
              )}
              <span>{toast.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>


      {/* Sidebar Navigation — fixed to left, full height */}
      <aside className="hidden md:flex w-72 bg-bg-card border-r border-border flex-col fixed top-0 left-0 h-screen overflow-y-auto z-30">
        <div className="p-6 border-b border-border flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gradient-start to-gradient-end flex items-center justify-center font-extrabold text-white text-sm shadow-md">
            K
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Kishan Patel</h1>
            <span className="text-xs text-text-muted tracking-wider uppercase font-semibold">Admin Panel</span>
          </div>
        </div>

        <nav className="p-4 space-y-1 flex-1">
          {[
            { id: "dashboard", label: "Dashboard", icon: HiChartBar },
            { id: "info", label: "Personal & Resume", icon: HiUser },
            { id: "projects", label: "Projects & Studies", icon: HiFolder },
            { id: "skills", label: "Skills & Expertise", icon: HiSparkles },
            { id: "experience", label: "Work Experience", icon: HiBriefcase },
            { id: "education", label: "Education & Certs", icon: HiAcademicCap },
            { id: "stats", label: "Homepage Stats", icon: HiCog },
            { id: "gallery", label: "Photo Gallery", icon: HiCamera },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedProjectId(null);
                }}
                className={`w-full px-4 py-3 rounded-xl text-left font-medium text-sm flex items-center justify-between transition-all duration-200 group cursor-pointer ${
                  isActive
                    ? "bg-gradient-start/10 text-gradient-start"
                    : "text-text-secondary hover:bg-bg-primary hover:text-text-primary"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={isActive ? "text-gradient-start" : "text-text-muted group-hover:text-text-primary"} />
                  <span>{tab.label}</span>
                </div>
                <HiChevronRight size={14} className={`opacity-0 group-hover:opacity-100 transition ${isActive ? "opacity-100 text-gradient-start" : "text-text-muted"}`} />
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border flex flex-col gap-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="w-full px-4 py-3 rounded-xl border border-border text-center text-sm font-semibold hover:bg-bg-primary flex items-center justify-center gap-2 transition"
          >
            <HiEye /> View Website
          </a>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 rounded-xl bg-error/10 text-error hover:bg-error hover:text-white text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition"
          >
            <HiLogout /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area — offset by sidebar width on desktop */}
      <main className="md:ml-72">
        
        {/* Mobile Top Nav Bar */}
        <div className="md:hidden sticky top-0 z-30 bg-bg-card border-b border-border px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gradient-start to-gradient-end flex items-center justify-center font-extrabold text-white text-xs shadow-md">K</div>
          <span className="font-bold text-sm flex-1">Admin Panel</span>
          <div className="flex gap-1 overflow-x-auto hide-scrollbar">
            {[
              { id: "dashboard", label: "Overview" },
              { id: "info", label: "Info" },
              { id: "projects", label: "Projects" },
              { id: "skills", label: "Skills" },
              { id: "experience", label: "Experience" },
              { id: "education", label: "Education" },
              { id: "stats", label: "Stats" },
              { id: "gallery", label: "Gallery" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSelectedProjectId(null); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-gradient-start text-white"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {/* Sticky Dashboard Content Header (Desktop & Flowing on Mobile) */}
        <header className="md:sticky md:top-0 z-20 bg-bg-card/90 border-b border-border/70 py-4 px-6 md:px-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-md">
          <div>
            <span className="text-xs text-gradient-start font-bold uppercase tracking-wider">System Settings</span>
            <h2 className="text-2xl md:text-3xl font-extrabold capitalize mt-0.5">{activeTab.replace("-", " ")}</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-text-secondary flex items-center gap-1.5 bg-bg-primary/50 border border-border/50 px-3 py-1.5 rounded-lg shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
              Edits pending
            </span>
            <button
              onClick={() => {
                setEditData(JSON.parse(JSON.stringify({
                  personalInfo,
                  navLinks,
                  clientLogos,
                  projects,
                  caseStudies,
                  skills,
                  experience,
                  education,
                  stats,
                  projectFilters: projectFilters || ["All", "Designer", "Manager"],
                })));
                showToast("Changes discarded");
              }}
              className="px-4 py-2 rounded-xl text-sm border border-border hover:bg-bg-primary cursor-pointer transition font-semibold text-text-secondary"
            >
              Discard
            </button>
            <button
              onClick={handleSaveChanges}
              disabled={isSaving}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-gradient-start to-gradient-end hover:from-gradient-end hover:to-gradient-start text-white text-sm font-bold shadow-lg shadow-gradient-start/15 flex items-center gap-2 cursor-pointer transition disabled:opacity-50"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <HiSave size={16} />
              )}
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </header>

        {/* Content Wrapper */}
        <div className="flex-1 p-6 md:p-10 pb-20">
          <div className="max-w-6xl mx-auto w-full">

          {/* Tab Content Components */}

          {/* ──────────────── 1. DASHBOARD OVERVIEW ──────────────── */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: "Total Projects", value: editData.projects.length, icon: HiFolder, color: "blue" },
                  { label: "Skill Categories", value: editData.skills.length, icon: HiSparkles, color: "purple" },
                  { label: "Job Positions", value: editData.experience.length, icon: HiBriefcase, color: "cyan" },
                ].map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <div key={idx} className="glass border border-border/80 rounded-2xl p-6 relative overflow-hidden group">
                      <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-10 bg-gradient-start group-hover:scale-110 transition duration-300`} />
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-text-muted text-sm font-medium">{s.label}</span>
                        <div className="w-10 h-10 rounded-xl bg-gradient-start/10 flex items-center justify-center">
                          <Icon size={20} className="text-gradient-start" />
                        </div>
                      </div>
                      <p className="text-3xl font-bold">{s.value}</p>
                    </div>
                  );
                })}
              </div>

              {/* Quick Info Alerts */}
              <div className="rounded-2xl border border-success/20 bg-success/5 p-6 flex flex-col sm:flex-row gap-4 items-start">
                <HiCheckCircle size={32} className="text-success shrink-0" />
                <div>
                  <h4 className="font-bold text-success">Security Alert Tunnel: Operational</h4>
                  <p className="text-text-secondary text-sm mt-1">
                    Your portfolio is currently listening for login attempts and dashboard entries. In case of access, security notification emails are successfully fired to: <strong>{editData.personalInfo.email}</strong>.
                  </p>
                </div>
              </div>

              {/* Developer Environment Warnings */}
              <div className="rounded-2xl border border-border bg-bg-card p-6">
                <h4 className="font-bold text-lg mb-2">Configure SMTP to Receive Emails</h4>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  To ensure email notifications arrive when someone targets your admin panel, fill in your actual SMTP keys (like a Gmail App Password) in your server's local configuration file (<code>server/.env</code>).
                </p>
                <div className="bg-bg-primary rounded-xl p-4 font-mono text-xs border border-border/50 text-text-secondary space-y-1">
                  <div>SMTP_HOST=smtp.gmail.com</div>
                  <div>SMTP_PORT=587</div>
                  <div>SMTP_USER=kishanpatel486630@gmail.com</div>
                  <div>SMTP_PASS=your-gmail-app-password</div>
                  <div>CONTACT_EMAIL=kishanpatel486630@gmail.com</div>
                </div>
              </div>
            </div>
          )}

          {/* ──────────────── 2. PERSONAL INFO ──────────────── */}
          {activeTab === "info" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Display Name</label>
                  <input
                    type="text"
                    value={editData.personalInfo.name}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        personalInfo: { ...editData.personalInfo, name: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border text-text-primary focus:outline-none focus:border-gradient-start transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Role Title</label>
                  <input
                    type="text"
                    value={editData.personalInfo.role}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        personalInfo: { ...editData.personalInfo, role: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border text-text-primary focus:outline-none focus:border-gradient-start transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Tagline</label>
                <input
                  type="text"
                  value={editData.personalInfo.tagline}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      personalInfo: { ...editData.personalInfo, tagline: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border text-text-primary focus:outline-none focus:border-gradient-start transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Short Bio</label>
                <textarea
                  rows={5}
                  value={editData.personalInfo.bio}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      personalInfo: { ...editData.personalInfo, bio: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border text-text-primary focus:outline-none focus:border-gradient-start transition leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Email Address</label>
                  <input
                    type="email"
                    value={editData.personalInfo.email}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        personalInfo: { ...editData.personalInfo, email: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border text-text-primary focus:outline-none focus:border-gradient-start transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Location</label>
                  <input
                    type="text"
                    value={editData.personalInfo.location}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        personalInfo: { ...editData.personalInfo, location: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border text-text-primary focus:outline-none focus:border-gradient-start transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Phone</label>
                  <input
                    type="text"
                    value={editData.personalInfo.phone}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        personalInfo: { ...editData.personalInfo, phone: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border text-text-primary focus:outline-none focus:border-gradient-start transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Resume Google Drive URL</label>
                  <input
                    type="text"
                    value={editData.personalInfo.resumeUrl}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        personalInfo: { ...editData.personalInfo, resumeUrl: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border text-text-primary focus:outline-none focus:border-gradient-start transition"
                  />
                </div>
                <ImageUploadField
                  label="Profile Photo / Avatar"
                  value={editData.personalInfo.profileImage}
                  onChange={(val) =>
                    setEditData({
                      ...editData,
                      personalInfo: { ...editData.personalInfo, profileImage: val },
                    })
                  }
                  apiBaseUrl={apiBaseUrl}
                  showToast={showToast}
                />
              </div>

              <div className="border-t border-border pt-6 mt-6">
                <h3 className="font-bold text-lg mb-4">Social Media Links</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {Object.keys(editData.personalInfo.social || {}).map((network) => (
                    <div key={network}>
                      <label className="block text-xs font-bold uppercase text-text-muted mb-2">{network}</label>
                      <input
                        type="text"
                        value={editData.personalInfo.social[network]}
                        onChange={(e) => {
                          const updatedSocial = { ...editData.personalInfo.social, [network]: e.target.value };
                          setEditData({
                            ...editData,
                            personalInfo: { ...editData.personalInfo, social: updatedSocial },
                          });
                        }}
                        className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border text-text-primary focus:outline-none focus:border-gradient-start transition"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ──────────────── 3. PROJECTS & CASE STUDIES ──────────────── */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              {selectedProjectId === null ? (
                // PROJECTS LIST VIEW
                <div>
                  {/* Category Filter Manager */}
                  <div className="p-5 rounded-2xl border border-border bg-bg-card/45 mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-text-secondary mb-3">Project Role / Filter Category Tabs</h3>
                    <div className="flex flex-wrap gap-2 items-center">
                      {(editData.projectFilters || []).map((filter, fIdx) => (
                        <div key={filter} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-bg-primary border border-border text-sm font-semibold">
                          <span>{filter}</span>
                          {filter !== "All" && (
                            <button
                              type="button"
                              onClick={() => {
                                const updatedFilters = editData.projectFilters.filter((f) => f !== filter);
                                setEditData({ ...editData, projectFilters: updatedFilters });
                                showToast(`Removed filter: ${filter}`);
                              }}
                              className="text-text-muted hover:text-error transition cursor-pointer"
                            >
                              <HiX size={14} />
                            </button>
                          )}
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Add new category"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && e.target.value.trim()) {
                              const val = e.target.value.trim();
                              if (editData.projectFilters.includes(val)) {
                                showToast("Category already exists", "error");
                                return;
                              }
                              const updatedFilters = [...editData.projectFilters, val];
                              setEditData({ ...editData, projectFilters: updatedFilters });
                              e.target.value = "";
                              showToast(`Added filter: ${val}`);
                            }
                          }}
                          className="px-3 py-1 text-xs rounded-xl bg-bg-primary border border-border text-text-primary focus:outline-none focus:border-gradient-start transition"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-text-muted mt-2 font-medium">Type a category name (e.g. "Data Analytics") and press <strong>Enter</strong> to create dynamic filters.</p>
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <span className="text-text-muted text-sm font-medium">Select a project to edit its fields and case study.</span>
                    <button
                      onClick={() => {
                        const newId = `project_${Date.now()}`;
                        const newProj = {
                          id: newId,
                          title: "New Project",
                          category: "Description of Category",
                          description: "Project summary description goes here.",
                          image: "/images/nubia-parking-screens.png",
                          images: ["/images/nubia-parking-screens.png"],
                          tags: ["Figma", "Mobile App"],
                          year: new Date().getFullYear().toString(),
                          client: "Self",
                          hasCaseStudy: false,
                          role: "Designer",
                          projectUrl: "",
                        };
                        setEditData({
                          ...editData,
                          projects: [...editData.projects, newProj],
                        });
                        setSelectedProjectId(newId);
                        showToast("Created empty project card");
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-start hover:bg-gradient-end text-white text-sm font-bold flex items-center gap-2 cursor-pointer transition shadow-md"
                    >
                      <HiPlus /> Add Project
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {editData.projects.map((proj, idx) => (
                      <div
                        key={proj.id}
                        className="glass border border-border hover:border-gradient-start p-5 rounded-2xl flex items-center justify-between gap-4 transition duration-300 group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-bg-primary shrink-0 border border-border">
                            <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg group-hover:text-gradient-start transition">{proj.title}</h4>
                            <p className="text-text-muted text-xs font-medium mt-0.5">{proj.category} ({proj.year})</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedProjectId(proj.id)}
                            className="px-4 py-2 rounded-xl border border-border text-sm font-bold hover:bg-bg-primary transition cursor-pointer"
                          >
                            Edit Entry
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete ${proj.title}?`)) {
                                setEditData({
                                  ...editData,
                                  projects: editData.projects.filter((p) => p.id !== proj.id),
                                  caseStudies: Object.keys(editData.caseStudies).reduce((acc, key) => {
                                    if (key !== proj.id) acc[key] = editData.caseStudies[key];
                                    return acc;
                                  }, {}),
                                });
                                showToast(`${proj.title} deleted successfully`);
                              }
                            }}
                            className="p-2 rounded-xl bg-error/10 text-error hover:bg-error hover:text-white transition cursor-pointer"
                          >
                            <HiTrash size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // SPECIFIC PROJECT EDIT VIEW
                (() => {
                  const projIdx = editData.projects.findIndex((p) => p.id === selectedProjectId);
                  if (projIdx === -1) {
                    setSelectedProjectId(null);
                    return null;
                  }
                  const proj = editData.projects[projIdx];
                  const hasCaseStudy = proj.hasCaseStudy;

                  // Update handler inside loop
                  const updateField = (key, val) => {
                    const updatedProjects = [...editData.projects];
                    updatedProjects[projIdx] = { ...proj, [key]: val };
                    setEditData({ ...editData, projects: updatedProjects });
                  };

                  return (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center pb-4 border-b border-border">
                        <button
                          onClick={() => setSelectedProjectId(null)}
                          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition"
                        >
                          <HiArrowLeft /> Back to Project List
                        </button>
                        <span className="text-xs text-text-muted font-mono">ID: {proj.id}</span>
                      </div>

                      {/* Main project card details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold mb-2">Project Title</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => updateField("title", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border text-text-primary focus:outline-none focus:border-gradient-start transition"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2">Category</label>
                          <input
                            type="text"
                            value={proj.category}
                            onChange={(e) => updateField("category", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border text-text-primary focus:outline-none focus:border-gradient-start transition"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold mb-2">Summary Description</label>
                        <textarea
                          rows={3}
                          value={proj.description}
                          onChange={(e) => updateField("description", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border text-text-primary focus:outline-none focus:border-gradient-start transition leading-relaxed"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-bold mb-2">Year</label>
                          <input
                            type="text"
                            value={proj.year}
                            onChange={(e) => updateField("year", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border text-text-primary focus:outline-none focus:border-gradient-start transition"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2">Client name</label>
                          <input
                            type="text"
                            value={proj.client}
                            onChange={(e) => updateField("client", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border text-text-primary focus:outline-none focus:border-gradient-start transition"
                          />
                        </div>
                        <ImageUploadField
                          label="Project Cover Photo"
                          value={proj.image}
                          onChange={(val) => updateField("image", val)}
                          apiBaseUrl={apiBaseUrl}
                          showToast={showToast}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold mb-2">Tags / Technologies (Comma Separated)</label>
                        <input
                          type="text"
                          value={proj.tags?.join(", ") || ""}
                          onChange={(e) =>
                            updateField(
                              "tags",
                              e.target.value.split(",").map((s) => s.trim())
                            )
                          }
                          className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border text-text-primary focus:outline-none focus:border-gradient-start transition"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold mb-2">Project Role / Filter Tab Category</label>
                          <select
                            value={proj.role || "Designer"}
                            onChange={(e) => updateField("role", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border text-text-primary focus:outline-none focus:border-gradient-start transition cursor-pointer"
                          >
                            {(editData.projectFilters || [])
                              .filter((f) => f !== "All")
                              .map((f) => (
                                <option key={f} value={f}>
                                  {f}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2">Live / External Project Link</label>
                          <input
                            type="text"
                            value={proj.projectUrl || ""}
                            placeholder="https://behance.net/..."
                            onChange={(e) => updateField("projectUrl", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border text-text-primary focus:outline-none focus:border-gradient-start transition"
                          />
                        </div>
                      </div>

                      <div className="p-5 rounded-2xl border border-border bg-bg-card/45 space-y-4">
                        <div className="flex justify-between items-center">
                          <label className="block text-sm font-bold">Project Screenshot Photos (Carousel)</label>
                          <button
                            type="button"
                            onClick={() => {
                              const updatedImages = [...(proj.images || [proj.image || ""])];
                              updatedImages.push("");
                              updateField("images", updatedImages);
                              showToast("Added new screenshot item");
                            }}
                            className="px-3 py-1.5 rounded-lg border border-border hover:bg-bg-primary text-xs font-bold flex items-center gap-1 cursor-pointer transition"
                          >
                            <HiPlus /> Add Screenshot
                          </button>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          {(proj.images || [proj.image || ""]).map((img, imgIdx) => (
                            <div key={imgIdx} className="relative p-4 rounded-xl border border-border/80 bg-bg-primary/20 space-y-2">
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedImages = (proj.images || [proj.image]).filter((_, idx) => idx !== imgIdx);
                                  updateField("images", updatedImages);
                                  showToast("Removed screenshot");
                                }}
                                className="absolute top-2 right-2 p-1.5 text-text-muted hover:text-error hover:bg-error/10 rounded-lg cursor-pointer transition z-10"
                                title="Remove screenshot"
                              >
                                <HiTrash size={16} />
                              </button>
                              <ImageUploadField
                                label={`Screenshot Photo #${imgIdx + 1}`}
                                value={img}
                                onChange={(val) => {
                                  const updatedImages = [...(proj.images || [proj.image])];
                                  updatedImages[imgIdx] = val;
                                  updateField("images", updatedImages);
                                }}
                                apiBaseUrl={apiBaseUrl}
                                showToast={showToast}
                              />
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-text-muted font-medium">Configure multiple image paths (like <code>/uploads/filename.png</code>) to scroll automatically in a carousel inside the Case Study viewer.</p>
                      </div>

                      {/* Toggle Case Study */}
                      <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-bg-card">
                        <input
                          type="checkbox"
                          id="hasCaseStudy"
                          checked={hasCaseStudy}
                          onChange={(e) => {
                            const val = e.target.checked;
                            updateField("hasCaseStudy", val);
                            if (val && !editData.caseStudies[proj.id]) {
                              // Initialize empty case study
                              const emptyCase = {
                                id: proj.id,
                                title: `${proj.title} - Case Study`,
                                subtitle: "Overview details here",
                                overview: "Enter overview text here",
                                role: "Product designer",
                                timeline: "6 weeks",
                                team: "1 designer, 1 developer",
                                tools: ["Figma"],
                                sections: [
                                  { title: "The Problem", content: "Write details here" },
                                  { title: "Design Solutions", content: "Write solutions here" },
                                ],
                              };
                              setEditData({
                                ...editData,
                                caseStudies: { ...editData.caseStudies, [proj.id]: emptyCase },
                              });
                            }
                          }}
                          className="w-5 h-5 rounded accent-gradient-start cursor-pointer"
                        />
                        <label htmlFor="hasCaseStudy" className="font-semibold text-sm cursor-pointer select-none">
                          Enable Detailed Case Study View (Includes timeline, overview, role, sections)
                        </label>
                      </div>

                      {/* Edit Case Study Details */}
                      {hasCaseStudy && editData.caseStudies[proj.id] && (
                        <div className="border-t border-border pt-6 space-y-6">
                          <h3 className="text-xl font-bold gradient-text-accent">Case Study Design Editor</h3>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-bold mb-2">Case Study Title</label>
                              <input
                                type="text"
                                value={editData.caseStudies[proj.id].title || ""}
                                onChange={(e) => {
                                  const updatedCase = { ...editData.caseStudies[proj.id], title: e.target.value };
                                  setEditData({
                                    ...editData,
                                    caseStudies: { ...editData.caseStudies, [proj.id]: updatedCase },
                                  });
                                }}
                                className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border text-text-primary focus:outline-none focus:border-gradient-start transition"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-bold mb-2">Subtitle</label>
                              <input
                                type="text"
                                value={editData.caseStudies[proj.id].subtitle || ""}
                                onChange={(e) => {
                                  const updatedCase = { ...editData.caseStudies[proj.id], subtitle: e.target.value };
                                  setEditData({
                                    ...editData,
                                    caseStudies: { ...editData.caseStudies, [proj.id]: updatedCase },
                                  });
                                }}
                                className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border text-text-primary focus:outline-none focus:border-gradient-start transition"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div>
                              <label className="block text-sm font-bold mb-2">My Role</label>
                              <input
                                type="text"
                                value={editData.caseStudies[proj.id].role || ""}
                                onChange={(e) => {
                                  const updatedCase = { ...editData.caseStudies[proj.id], role: e.target.value };
                                  setEditData({
                                    ...editData,
                                    caseStudies: { ...editData.caseStudies, [proj.id]: updatedCase },
                                  });
                                }}
                                className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border text-text-primary focus:outline-none focus:border-gradient-start transition"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-bold mb-2">Timeline</label>
                              <input
                                type="text"
                                value={editData.caseStudies[proj.id].timeline || ""}
                                onChange={(e) => {
                                  const updatedCase = { ...editData.caseStudies[proj.id], timeline: e.target.value };
                                  setEditData({
                                    ...editData,
                                    caseStudies: { ...editData.caseStudies, [proj.id]: updatedCase },
                                  });
                                }}
                                className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border text-text-primary focus:outline-none focus:border-gradient-start transition"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-bold mb-2">Team</label>
                              <input
                                type="text"
                                value={editData.caseStudies[proj.id].team || ""}
                                onChange={(e) => {
                                  const updatedCase = { ...editData.caseStudies[proj.id], team: e.target.value };
                                  setEditData({
                                    ...editData,
                                    caseStudies: { ...editData.caseStudies, [proj.id]: updatedCase },
                                  });
                                }}
                                className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border text-text-primary focus:outline-none focus:border-gradient-start transition"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-bold mb-2">Overview Text</label>
                            <textarea
                              rows={4}
                              value={editData.caseStudies[proj.id].overview || ""}
                              onChange={(e) => {
                                const updatedCase = { ...editData.caseStudies[proj.id], overview: e.target.value };
                                setEditData({
                                  ...editData,
                                  caseStudies: { ...editData.caseStudies, [proj.id]: updatedCase },
                                });
                              }}
                              className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border text-text-primary focus:outline-none focus:border-gradient-start transition leading-relaxed"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-bold mb-2">Tools Used (Comma Separated)</label>
                            <input
                              type="text"
                              value={editData.caseStudies[proj.id].tools?.join(", ") || ""}
                              onChange={(e) => {
                                const updatedCase = {
                                  ...editData.caseStudies[proj.id],
                                  tools: e.target.value.split(",").map((t) => t.trim()),
                                };
                                setEditData({
                                  ...editData,
                                  caseStudies: { ...editData.caseStudies, [proj.id]: updatedCase },
                                });
                              }}
                              className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border text-text-primary focus:outline-none focus:border-gradient-start transition"
                            />
                          </div>

                          {/* Sections */}
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <h4 className="font-bold text-md text-text-primary">Case Study Sections</h4>
                              <button
                                onClick={() => {
                                  const updatedSections = [
                                    ...(editData.caseStudies[proj.id].sections || []),
                                    { title: "New Section", content: "Describe content here" },
                                  ];
                                  const updatedCase = { ...editData.caseStudies[proj.id], sections: updatedSections };
                                  setEditData({
                                    ...editData,
                                    caseStudies: { ...editData.caseStudies, [proj.id]: updatedCase },
                                  });
                                }}
                                className="px-3 py-1.5 rounded-lg border border-border hover:bg-bg-primary text-xs font-bold flex items-center gap-1 cursor-pointer transition"
                              >
                                <HiPlus /> Add Section
                              </button>
                            </div>

                            {(editData.caseStudies[proj.id].sections || []).map((sec, secIdx) => (
                              <div key={secIdx} className="p-4 rounded-xl border border-border bg-bg-primary relative group">
                                <button
                                  onClick={() => {
                                    const updatedSections = (editData.caseStudies[proj.id].sections || []).filter(
                                      (_, idx) => idx !== secIdx
                                    );
                                    const updatedCase = { ...editData.caseStudies[proj.id], sections: updatedSections };
                                    setEditData({
                                      ...editData,
                                      caseStudies: { ...editData.caseStudies, [proj.id]: updatedCase },
                                    });
                                  }}
                                  className="absolute top-4 right-4 p-1 text-text-muted hover:text-error hover:bg-error/10 rounded-lg cursor-pointer transition"
                                >
                                  <HiX size={16} />
                                </button>

                                <div className="space-y-3">
                                  <input
                                    type="text"
                                    value={sec.title || ""}
                                    placeholder="Section Title"
                                    onChange={(e) => {
                                      const updatedSections = [...(editData.caseStudies[proj.id].sections || [])];
                                      updatedSections[secIdx] = { ...sec, title: e.target.value };
                                      const updatedCase = { ...editData.caseStudies[proj.id], sections: updatedSections };
                                      setEditData({
                                        ...editData,
                                        caseStudies: { ...editData.caseStudies, [proj.id]: updatedCase },
                                      });
                                    }}
                                    className="w-[85%] px-3 py-1.5 rounded-lg bg-bg-card border border-border font-bold text-sm focus:outline-none focus:border-gradient-start transition"
                                  />

                                  <textarea
                                    rows={4}
                                    value={sec.content || ""}
                                    placeholder="Section content markdown or text..."
                                    onChange={(e) => {
                                      const updatedSections = [...(editData.caseStudies[proj.id].sections || [])];
                                      updatedSections[secIdx] = { ...sec, content: e.target.value };
                                      const updatedCase = { ...editData.caseStudies[proj.id], sections: updatedSections };
                                      setEditData({
                                        ...editData,
                                        caseStudies: { ...editData.caseStudies, [proj.id]: updatedCase },
                                      });
                                    }}
                                    className="w-full px-3 py-1.5 rounded-lg bg-bg-card border border-border text-sm leading-relaxed focus:outline-none focus:border-gradient-start transition"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()
              )}
            </div>
          )}

          {/* ──────────────── 4. SKILLS & EXPERTISE ──────────────── */}
          {activeTab === "skills" && (
            <div className="space-y-8">
              <div className="flex justify-between items-center border-b border-border pb-4">
                <span className="text-text-muted text-sm font-medium">Manage categorised design and tech proficiency levels.</span>
                <button
                  onClick={() => {
                    const newCategory = {
                      category: "New Skill Area",
                      items: [{ name: "Skill Name", level: 80 }],
                    };
                    setEditData({
                      ...editData,
                      skills: [...editData.skills, newCategory],
                    });
                    showToast("Created new skill category card");
                  }}
                  className="px-4 py-2 bg-gradient-start text-white rounded-xl text-sm font-bold flex items-center gap-2 cursor-pointer transition shadow"
                >
                  <HiPlus /> Add Category Group
                </button>
              </div>

              <div className="space-y-6">
                {editData.skills.map((group, gi) => (
                  <div key={gi} className="glass p-6 rounded-2xl border border-border relative">
                    {/* Delete Category Button */}
                    <button
                      onClick={() => {
                        if (confirm(`Delete the entire "${group.category}" skill category group?`)) {
                          setEditData({
                            ...editData,
                            skills: editData.skills.filter((_, idx) => idx !== gi),
                          });
                          showToast("Skill category deleted");
                        }
                      }}
                      className="absolute top-4 right-4 p-2 text-text-muted hover:text-error hover:bg-error/10 rounded-xl transition cursor-pointer"
                    >
                      <HiTrash size={18} />
                    </button>

                    <div className="mb-4 w-2/3">
                      <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1">Category Label</label>
                      <input
                        type="text"
                        value={group.category}
                        onChange={(e) => {
                          const updatedSkills = [...editData.skills];
                          updatedSkills[gi].category = e.target.value;
                          setEditData({ ...editData, skills: updatedSkills });
                        }}
                        className="px-3 py-1.5 rounded-lg bg-bg-primary border border-border text-text-primary focus:outline-none focus:border-gradient-start transition font-bold"
                      />
                    </div>

                    {/* Skill items under this category */}
                    <div className="space-y-3 mt-6">
                      <div className="flex justify-between items-center text-xs font-bold text-text-muted">
                        <span>SKILL / COMPETENCY NAME</span>
                        <span>LEVEL (0-100%)</span>
                      </div>

                      {group.items.map((item, ii) => (
                        <div key={ii} className="flex gap-4 items-center bg-bg-primary/50 p-2 rounded-xl border border-border/30">
                          <input
                            type="text"
                            value={item.name}
                            placeholder="e.g. Figma"
                            onChange={(e) => {
                              const updatedSkills = [...editData.skills];
                              updatedSkills[gi].items[ii].name = e.target.value;
                              setEditData({ ...editData, skills: updatedSkills });
                            }}
                            className="flex-1 px-3 py-1.5 rounded-lg bg-bg-card border border-border text-sm focus:outline-none focus:border-gradient-start transition"
                          />

                          <div className="w-24 flex items-center gap-2">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={item.level}
                              onChange={(e) => {
                                const updatedSkills = [...editData.skills];
                                updatedSkills[gi].items[ii].level = parseInt(e.target.value, 10) || 0;
                                setEditData({ ...editData, skills: updatedSkills });
                              }}
                              className="w-16 px-2 py-1.5 rounded-lg bg-bg-card border border-border text-center text-sm focus:outline-none focus:border-gradient-start transition font-mono"
                            />
                            <span className="text-xs text-text-muted font-bold">%</span>
                          </div>

                          <button
                            onClick={() => {
                              const updatedSkills = [...editData.skills];
                              updatedSkills[gi].items = updatedSkills[gi].items.filter((_, idx) => idx !== ii);
                              setEditData({ ...editData, skills: updatedSkills });
                              showToast(`Removed skill`);
                            }}
                            className="p-2 text-text-muted hover:text-error hover:bg-error/10 rounded-lg cursor-pointer transition"
                          >
                            <HiX size={16} />
                          </button>
                        </div>
                      ))}

                      <button
                        onClick={() => {
                          const updatedSkills = [...editData.skills];
                          updatedSkills[gi].items.push({ name: "New Skill", level: 80 });
                          setEditData({ ...editData, skills: updatedSkills });
                        }}
                        className="mt-2 text-xs font-bold text-gradient-start hover:text-gradient-end flex items-center gap-1 cursor-pointer transition"
                      >
                        <HiPlus /> Add Competency Item
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ──────────────── 5. WORK EXPERIENCE ──────────────── */}
          {activeTab === "experience" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-border pb-4">
                <span className="text-text-muted text-sm font-medium">Log chronological professional employment experience.</span>
                <button
                  onClick={() => {
                    const newExp = {
                      title: "New Role",
                      company: "Company Name",
                      location: "City, Country",
                      period: "Month Year — Present",
                      description: "Brief summary of role responsibilities.",
                      highlights: ["Added a major feature", "Led team of developers"],
                    };
                    setEditData({
                      ...editData,
                      experience: [newExp, ...editData.experience],
                    });
                    showToast("Added new experience entry");
                  }}
                  className="px-4 py-2 bg-gradient-start text-white rounded-xl text-sm font-bold flex items-center gap-2 cursor-pointer transition shadow"
                >
                  <HiPlus /> Add Job Experience
                </button>
              </div>

              <div className="space-y-6">
                {editData.experience.map((exp, idx) => (
                  <div key={idx} className="glass p-6 rounded-2xl border border-border relative space-y-4">
                    {/* Delete Experience Button */}
                    <button
                      onClick={() => {
                        if (confirm(`Delete the experience entry for "${exp.title}" at "${exp.company}"?`)) {
                          setEditData({
                            ...editData,
                            experience: editData.experience.filter((_, i) => i !== idx),
                          });
                          showToast("Experience entry deleted");
                        }
                      }}
                      className="absolute top-4 right-4 p-2 text-text-muted hover:text-error hover:bg-error/10 rounded-xl transition cursor-pointer"
                    >
                      <HiTrash size={18} />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-[90%]">
                      <div>
                        <label className="block text-xs font-bold text-text-muted mb-1">Job Title</label>
                        <input
                          type="text"
                          value={exp.title}
                          onChange={(e) => {
                            const updatedExp = [...editData.experience];
                            updatedExp[idx].title = e.target.value;
                            setEditData({ ...editData, experience: updatedExp });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-bg-primary border border-border focus:outline-none focus:border-gradient-start transition font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-text-muted mb-1">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => {
                            const updatedExp = [...editData.experience];
                            updatedExp[idx].company = e.target.value;
                            setEditData({ ...editData, experience: updatedExp });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-bg-primary border border-border focus:outline-none focus:border-gradient-start transition font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-text-muted mb-1">Period (Dates)</label>
                        <input
                          type="text"
                          value={exp.period}
                          placeholder="e.g. Jul 2025 — Present"
                          onChange={(e) => {
                            const updatedExp = [...editData.experience];
                            updatedExp[idx].period = e.target.value;
                            setEditData({ ...editData, experience: updatedExp });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-bg-primary border border-border focus:outline-none focus:border-gradient-start transition text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-text-muted mb-1">Location</label>
                        <input
                          type="text"
                          value={exp.location}
                          placeholder="e.g. Vadodara, Gujarat"
                          onChange={(e) => {
                            const updatedExp = [...editData.experience];
                            updatedExp[idx].location = e.target.value;
                            setEditData({ ...editData, experience: updatedExp });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-bg-primary border border-border focus:outline-none focus:border-gradient-start transition text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text-muted mb-1">Job Description</label>
                      <textarea
                        rows={2}
                        value={exp.description}
                        onChange={(e) => {
                          const updatedExp = [...editData.experience];
                          updatedExp[idx].description = e.target.value;
                          setEditData({ ...editData, experience: updatedExp });
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-bg-primary border border-border focus:outline-none focus:border-gradient-start transition text-sm leading-relaxed"
                      />
                    </div>

                    {/* Highlights Bullets */}
                    <div className="space-y-2 pt-2">
                      <label className="block text-xs font-bold text-text-muted">Highlights / Key Achievements</label>
                      {(exp.highlights || []).map((hl, hlIdx) => (
                        <div key={hlIdx} className="flex gap-2 items-center">
                          <span className="text-text-muted font-bold text-sm shrink-0">•</span>
                          <input
                            type="text"
                            value={hl}
                            placeholder="Detail key performance highlight..."
                            onChange={(e) => {
                              const updatedExp = [...editData.experience];
                              updatedExp[idx].highlights[hlIdx] = e.target.value;
                              setEditData({ ...editData, experience: updatedExp });
                            }}
                            className="flex-1 px-3 py-1.5 rounded-lg bg-bg-primary border border-border text-xs focus:outline-none focus:border-gradient-start transition"
                          />
                          <button
                            onClick={() => {
                              const updatedExp = [...editData.experience];
                              updatedExp[idx].highlights = updatedExp[idx].highlights.filter((_, i) => i !== hlIdx);
                              setEditData({ ...editData, experience: updatedExp });
                            }}
                            className="p-1.5 text-text-muted hover:text-error hover:bg-error/10 rounded-lg cursor-pointer transition"
                          >
                            <HiX size={14} />
                          </button>
                        </div>
                      ))}

                      <button
                        onClick={() => {
                          const updatedExp = [...editData.experience];
                          if (!updatedExp[idx].highlights) updatedExp[idx].highlights = [];
                          updatedExp[idx].highlights.push("New highlight");
                          setEditData({ ...editData, experience: updatedExp });
                        }}
                        className="text-xs font-bold text-gradient-start hover:text-gradient-end flex items-center gap-1 cursor-pointer transition mt-1"
                      >
                        <HiPlus /> Add Highlight Bullet
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ──────────────── 6. EDUCATION & CERTIFICATIONS ──────────────── */}
          {activeTab === "education" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-border pb-4">
                <span className="text-text-muted text-sm font-medium">Add educational degrees, diplomas, and official industry certifications.</span>
                <button
                  onClick={() => {
                    const newEdu = {
                      degree: "Degree / Certification Title",
                      field: "Field of Study",
                      institution: "Institution / Academy name",
                      location: "Location name",
                      period: "2024 — 2026",
                      description: "Brief summary description.",
                      achievements: ["Grade: 9.0 CGPA"],
                    };
                    setEditData({
                      ...editData,
                      education: [...editData.education, newEdu],
                    });
                    showToast("Added education entry");
                  }}
                  className="px-4 py-2 bg-gradient-start text-white rounded-xl text-sm font-bold flex items-center gap-2 cursor-pointer transition shadow"
                >
                  <HiPlus /> Add Degree/Cert
                </button>
              </div>

              <div className="space-y-6">
                {editData.education.map((edu, idx) => (
                  <div key={idx} className="glass p-6 rounded-2xl border border-border relative space-y-4">
                    {/* Delete Education Button */}
                    <button
                      onClick={() => {
                        if (confirm(`Delete educational entry for "${edu.degree}" from "${edu.institution}"?`)) {
                          setEditData({
                            ...editData,
                            education: editData.education.filter((_, i) => i !== idx),
                          });
                          showToast("Education entry deleted");
                        }
                      }}
                      className="absolute top-4 right-4 p-2 text-text-muted hover:text-error hover:bg-error/10 rounded-xl transition cursor-pointer"
                    >
                      <HiTrash size={18} />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-[90%]">
                      <div>
                        <label className="block text-xs font-bold text-text-muted mb-1">Degree / Certification Title</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => {
                            const updatedEdu = [...editData.education];
                            updatedEdu[idx].degree = e.target.value;
                            setEditData({ ...editData, education: updatedEdu });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-bg-primary border border-border focus:outline-none focus:border-gradient-start transition font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-text-muted mb-1">Field of Study</label>
                        <input
                          type="text"
                          value={edu.field}
                          onChange={(e) => {
                            const updatedEdu = [...editData.education];
                            updatedEdu[idx].field = e.target.value;
                            setEditData({ ...editData, education: updatedEdu });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-bg-primary border border-border focus:outline-none focus:border-gradient-start transition font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-text-muted mb-1">Institution / Academy</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => {
                            const updatedEdu = [...editData.education];
                            updatedEdu[idx].institution = e.target.value;
                            setEditData({ ...editData, education: updatedEdu });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-bg-primary border border-border focus:outline-none focus:border-gradient-start transition"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-text-muted mb-1">Period (Dates)</label>
                          <input
                            type="text"
                            value={edu.period}
                            placeholder="e.g. 2022 — 2026"
                            onChange={(e) => {
                              const updatedEdu = [...editData.education];
                              updatedEdu[idx].period = e.target.value;
                              setEditData({ ...editData, education: updatedEdu });
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-bg-primary border border-border focus:outline-none focus:border-gradient-start transition text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-text-muted mb-1">Location</label>
                          <input
                            type="text"
                            value={edu.location}
                            placeholder="e.g. Vadodara"
                            onChange={(e) => {
                              const updatedEdu = [...editData.education];
                              updatedEdu[idx].location = e.target.value;
                              setEditData({ ...editData, education: updatedEdu });
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-bg-primary border border-border focus:outline-none focus:border-gradient-start transition text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text-muted mb-1">Course Details / Summary</label>
                      <textarea
                        rows={2}
                        value={edu.description}
                        onChange={(e) => {
                          const updatedEdu = [...editData.education];
                          updatedEdu[idx].description = e.target.value;
                          setEditData({ ...editData, education: updatedEdu });
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-bg-primary border border-border focus:outline-none focus:border-gradient-start transition text-sm leading-relaxed"
                      />
                    </div>

                    {/* Achievements bullets */}
                    <div className="space-y-2 pt-2">
                      <label className="block text-xs font-bold text-text-muted">Grade / Key Achievements</label>
                      {(edu.achievements || []).map((ach, achIdx) => (
                        <div key={achIdx} className="flex gap-2 items-center">
                          <span className="text-text-muted font-bold text-sm shrink-0">•</span>
                          <input
                            type="text"
                            value={ach}
                            placeholder="e.g. Grade: 8.63 / 10"
                            onChange={(e) => {
                              const updatedEdu = [...editData.education];
                              updatedEdu[idx].achievements[achIdx] = e.target.value;
                              setEditData({ ...editData, education: updatedEdu });
                            }}
                            className="flex-1 px-3 py-1.5 rounded-lg bg-bg-primary border border-border text-xs focus:outline-none focus:border-gradient-start transition"
                          />
                          <button
                            onClick={() => {
                              const updatedEdu = [...editData.education];
                              updatedEdu[idx].achievements = updatedEdu[idx].achievements.filter((_, i) => i !== achIdx);
                              setEditData({ ...editData, education: updatedEdu });
                            }}
                            className="p-1.5 text-text-muted hover:text-error hover:bg-error/10 rounded-lg cursor-pointer transition"
                          >
                            <HiX size={14} />
                          </button>
                        </div>
                      ))}

                      <button
                        onClick={() => {
                          const updatedEdu = [...editData.education];
                          if (!updatedEdu[idx].achievements) updatedEdu[idx].achievements = [];
                          updatedEdu[idx].achievements.push("New Achievement");
                          setEditData({ ...editData, education: updatedEdu });
                        }}
                        className="text-xs font-bold text-gradient-start hover:text-gradient-end flex items-center gap-1 cursor-pointer transition mt-1"
                      >
                        <HiPlus /> Add Achievement
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ──────────────── 7. HOMEPAGE STATS ──────────────── */}
          {activeTab === "stats" && (
            <div className="space-y-8">
              <div className="flex justify-between items-center border-b border-border pb-4">
                <span className="text-text-muted text-sm font-medium">Modify stats boxes displayed inside the Hero/Footer sections.</span>
                <button
                  onClick={() => {
                    const newStat = {
                      value: "99%",
                      label: "Stat Label",
                    };
                    setEditData({
                      ...editData,
                      stats: [...editData.stats, newStat],
                    });
                    showToast("Added homepage stat panel");
                  }}
                  className="px-4 py-2 bg-gradient-start text-white rounded-xl text-sm font-bold flex items-center gap-2 cursor-pointer transition shadow"
                >
                  <HiPlus /> Add Stat Box
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {editData.stats.map((st, idx) => (
                  <div key={idx} className="glass p-6 rounded-2xl border border-border relative flex flex-col gap-4">
                    {/* Delete Stat Button */}
                    <button
                      onClick={() => {
                        setEditData({
                          ...editData,
                          stats: editData.stats.filter((_, i) => i !== idx),
                        });
                        showToast("Stat panel deleted");
                      }}
                      className="absolute top-4 right-4 p-2 text-text-muted hover:text-error hover:bg-error/10 rounded-xl transition cursor-pointer"
                    >
                      <HiTrash size={18} />
                    </button>

                    <div className="w-[85%]">
                      <label className="block text-xs font-bold text-text-muted mb-1">Display Value</label>
                      <input
                        type="text"
                        value={st.value}
                        placeholder="e.g. 4+ or 100%"
                        onChange={(e) => {
                          const updatedStats = [...editData.stats];
                          updatedStats[idx].value = e.target.value;
                          setEditData({ ...editData, stats: updatedStats });
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-bg-primary border border-border focus:outline-none focus:border-gradient-start transition font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text-muted mb-1">Stat Label Description</label>
                      <input
                        type="text"
                        value={st.label}
                        placeholder="e.g. Projects Completed"
                        onChange={(e) => {
                          const updatedStats = [...editData.stats];
                          updatedStats[idx].label = e.target.value;
                          setEditData({ ...editData, stats: updatedStats });
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-bg-primary border border-border focus:outline-none focus:border-gradient-start transition"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ──────────────── 8. PHOTO GALLERY ──────────────── */}
          {activeTab === "gallery" && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
                <div>
                  <p className="text-text-muted text-sm font-medium">
                    Upload and manage portfolio assets stored directly on the server to keep your footprint clean.
                  </p>
                </div>
                <label className="px-5 py-2.5 bg-gradient-to-r from-gradient-start to-gradient-end hover:from-gradient-end hover:to-gradient-start text-white rounded-xl text-sm font-bold flex items-center gap-2 cursor-pointer transition shadow shadow-gradient-start/15 select-none self-start">
                  <HiPlus /> Upload New Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      if (!file.type.startsWith("image/")) {
                        showToast("Only image files are allowed", "error");
                        return;
                      }
                      try {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = async () => {
                          const base64Content = reader.result;
                          const token = localStorage.getItem("adminToken");
                          const res = await fetch(`${apiBaseUrl}/api/admin/upload`, {
                            method: "POST",
                            headers: { 
                              "Content-Type": "application/json",
                              "Authorization": `Bearer ${token}`
                            },
                            body: JSON.stringify({ filename: file.name, base64: base64Content }),
                          });
                          const data = await res.json();
                          if (!res.ok) throw new Error(data.error || "Upload failed");
                          showToast("Photo uploaded successfully!");
                          fetchGalleryPhotos();
                        };
                      } catch (err) {
                        showToast(err.message, "error");
                      }
                    }}
                    className="hidden"
                  />
                </label>
              </div>

              {isLoadingPhotos ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-3 border-gradient-start border-t-transparent rounded-full animate-spin"></div>
                  <span className="ml-3 font-semibold text-text-secondary text-sm">Scanning assets...</span>
                </div>
              ) : galleryPhotos.length === 0 ? (
                <div className="border border-dashed border-border rounded-3xl p-12 text-center bg-bg-card/20">
                  <HiCamera size={48} className="text-text-muted mx-auto mb-4 opacity-40" />
                  <h3 className="font-bold text-lg mb-1">No Assets Uploaded Yet</h3>
                  <p className="text-text-muted text-sm max-w-sm mx-auto">Upload images here to host them on the server, then copy their paths to use them on your projects.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {galleryPhotos.map((photo, idx) => {
                    const filename = photo.name || (typeof photo === "string" ? photo.split("/").pop() : "");
                    const pathUrl = photo.path || (typeof photo === "string" ? photo : "");
                    const isLargeFile = photo.bytes > 500 * 1024 || (photo.size && (photo.size.includes("MB") || photo.size.includes("GB")));
                    return (
                      <div key={idx} className="glass rounded-2xl border border-border overflow-hidden flex flex-col group relative">
                        {/* Image Preview Box */}
                        <div className="aspect-[4/3] w-full bg-bg-primary overflow-hidden relative border-b border-border flex items-center justify-center">
                          <img src={pathUrl} alt={filename} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                          
                          {/* Quick Delete Overlay Button */}
                          <button
                            onClick={async () => {
                              const isStatic = photo.type === "static" || (typeof photo === "string" && !photo.startsWith("/uploads/"));
                              const confirmMsg = isStatic
                                ? "WARNING: This is a static system photo inside client/public/images/. Deleting it might break default rendering on your live site. Are you sure you want to permanently delete it?"
                                : "Are you sure you want to permanently delete this photo? Any project referencing this path will fail to load it.";
                              if (!window.confirm(confirmMsg)) return;
                              try {
                                const token = localStorage.getItem("adminToken");
                                const fileType = photo.type || (typeof photo === "string" && photo.startsWith("/uploads/") ? "uploaded" : "static");
                                const res = await fetch(`${apiBaseUrl}/api/admin/gallery/${filename}?type=${fileType}`, {
                                  method: "DELETE",
                                  headers: { Authorization: `Bearer ${token}` }
                                });
                                const data = await res.json();
                                if (!res.ok) throw new Error(data.error || "Failed to delete file");
                                showToast("Photo deleted successfully!");
                                fetchGalleryPhotos();
                              } catch (err) {
                                showToast(err.message, "error");
                              }
                            }}
                            className="absolute top-3 right-3 p-2 bg-black/60 backdrop-blur-md text-error hover:bg-error hover:text-white rounded-xl transition cursor-pointer"
                            title="Delete Image"
                          >
                            <HiTrash size={16} />
                          </button>
                        </div>
                        
                        {/* Asset Info */}
                        <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              {/* Type Badge */}
                              {(() => {
                                const isUploaded = photo.type === "uploaded" || (typeof photo === "string" && photo.startsWith("/uploads/"));
                                return (
                                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider border ${
                                    isUploaded 
                                      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                                      : "text-blue-400 bg-blue-500/10 border-blue-500/20"
                                  }`}>
                                    {isUploaded ? "Uploaded" : "Static Asset"}
                                  </span>
                                );
                              })()}
                              
                              {/* Size Badge */}
                              <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold border flex items-center gap-1 ${
                                isLargeFile 
                                  ? "text-amber-400 bg-amber-500/10 border-amber-500/20 animate-pulse" 
                                  : "text-text-muted bg-bg-primary border-border"
                              }`} title={isLargeFile ? "Consider compressing this image to optimize load speed!" : "Good file size!"}>
                                {photo.size || "N/A"}
                                {isLargeFile && "⚠️"}
                              </span>
                            </div>
                            
                            <div className="space-y-1">
                              <span className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Web Relative Path</span>
                              <div className="font-mono text-xs select-all bg-bg-primary border border-border px-2 py-1.5 rounded-lg break-all text-text-secondary">
                                {pathUrl}
                              </div>
                            </div>
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(pathUrl);
                              showToast("Path copied to clipboard!");
                            }}
                            className="w-full py-2 bg-bg-primary border border-border hover:bg-bg-card rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer text-text-secondary"
                          >
                            Copy Path Link
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
        </div>
      </main>
    </div>
  );
}
