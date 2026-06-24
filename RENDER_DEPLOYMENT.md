# 🚀 Render Deployment Guide for Express Backend

Your backend server is completely self-contained in the `/backend` directory of your project. You can deploy it to **Render** using their free Web Service tier.

Below is the step-by-step guide to get it up and running.

---

## Step 1: Create a Web Service on Render
1. Go to [Render Dashboard](https://dashboard.render.com/) and click **New +** -> **Web Service**.
2. Connect your GitHub repository (`new-update-portfolio`).
3. Configure the following settings:
   * **Name**: `kishan-portfolio-backend` (or any name you like)
   * **Region**: Choose the closest region to you (e.g., `Singapore` or `Oregon`)
   * **Branch**: `main`
   * **Root Directory**: `backend` 👈 *(This is critical! It tells Render to deploy only the backend folder)*
   * **Runtime**: `Node`
   * **Build Command**: `npm install`
   * **Start Command**: `npm start`
   * **Instance Type**: `Free`

---

## Step 2: Set Environment Variables on Render
Under the **Environment** section of your Render Web Service settings, add the following environment variables:

| Key | Value | Description |
| :--- | :--- | :--- |
| `PORT` | `10000` (Render default) | The port Render will expose the backend on |
| `CLIENT_URL` | `https://kishan-portfolio-v2.vercel.app` | **Your Live Vercel App URL** (Allows frontend to bypass CORS security) |
| `ADMIN_USERNAME` | `k-admin` | Your desired admin login username |
| `ADMIN_PASSWORD` | `Kishan-admin@2004` | Your desired admin login password |
| `SESSION_SECRET` | `generate-some-random-long-key-string-here` | Key to sign admin session cookies |
| `SMTP_HOST` | `smtp.gmail.com` | Your SMTP email server host |
| `SMTP_PORT` | `587` | Your SMTP email server port |
| `SMTP_SECURE` | `false` | Set to `true` if using port 465, or `false` for 587 |
| `SMTP_USER` | `kishanpatel486630@gmail.com` | Your SMTP user email address |
| `SMTP_PASS` | `your-app-password-from-google` | Gmail app password (not standard password) |
| `CONTACT_EMAIL` | `kishanpatel486630@gmail.com` | The email address where contact requests and alert emails will be sent |

---

## Step 3: Link Vercel Frontend to Render Backend
Once your Render web service finishes deploying, Render will give you a public URL (e.g. `https://kishan-portfolio-backend.onrender.com`).

1. Log in to your **Vercel Dashboard**.
2. Click on your portfolio project (`new-update-portfolio`).
3. Go to **Settings** -> **Environment Variables**.
4. Create a new environment variable:
   * **Key**: `VITE_API_URL`
   * **Value**: `https://your-deployed-backend-url.onrender.com` *(Use the URL Render gave you, without a trailing slash `/`)*
5. Go to **Deployments** on Vercel, click on your latest deployment, choose **Redeploy** so that Vercel rebuilds the React app containing the new backend URL.

---

## ⚠️ Important Note About Server Load / File Persistence
Render's **Free Web Service Tier** does not have persistent storage. This means:
* Whenever the free tier server goes to sleep (after 15 minutes of inactivity) or restarts, any images you uploaded to `backend/uploads/` will be reset, and changes saved in `portfolio.json` will reset back to the database state last pushed to your GitHub repository.
* **Best Practice**: If you are using the Free tier, use the **local admin panel workflow** (`http://localhost:5173/kishan-admin`) to modify text and upload pictures. This saves the updates directly to your local file structure. Once you are done customizing, push your changes to GitHub to keep Vercel and Render synchronized.
