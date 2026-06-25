import { createContext, useContext, useState, useEffect } from "react";
import * as staticData from "../data/portfolio";

const PortfolioContext = createContext(null);

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export function PortfolioProvider({ children }) {
  const [data, setData] = useState({
    personalInfo: staticData.personalInfo,
    navLinks: staticData.navLinks,
    clientLogos: staticData.clientLogos,
    projects: staticData.projects,
    caseStudies: staticData.caseStudies,
    skills: staticData.skills,
    experience: staticData.experience,
    education: staticData.education,
    stats: staticData.stats,
    projectFilters: staticData.projectFilters || ["All", "Designer", "Manager"],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPortfolio = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/portfolio`);
      if (!res.ok) {
        throw new Error("Failed to fetch dynamic portfolio data.");
      }
      const fetchedData = await res.json();

      // Prepend API_BASE_URL to any image paths starting with /uploads/
      const processImagePath = (path) => {
        if (typeof path === "string" && path.startsWith("/uploads/")) {
          return `${API_BASE_URL}${path}`;
        }
        return path;
      };

      const processedPersonalInfo = {
        ...fetchedData.personalInfo,
        profileImage: processImagePath(fetchedData.personalInfo?.profileImage)
      };

      const processedProjects = (fetchedData.projects || []).map((p) => {
        const rawImages = p.images || [p.image || ""];
        return {
          role: "Designer",
          projectUrl: "",
          ...p,
          image: processImagePath(p.image),
          images: rawImages.map(processImagePath),
        };
      });

      setData({
        ...fetchedData,
        personalInfo: processedPersonalInfo,
        projects: processedProjects,
        projectFilters: fetchedData.projectFilters || ["All", "Designer", "Manager"],
        caseStudies: fetchedData.caseStudies || {},
      });
      setError(null);
    } catch (err) {
      console.warn("⚠️ API fetch failed, falling back to static local portfolio data:", err.message);
      // Fallback is already initialized in state
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const updatePortfolio = async (updatedData, token) => {
    try {
      // Strip API_BASE_URL from any image paths starting with API_BASE_URL/uploads/
      const stripImagePath = (path) => {
        if (typeof path === "string" && path.startsWith(`${API_BASE_URL}/uploads/`)) {
          return path.substring(API_BASE_URL.length);
        }
        return path;
      };

      const strippedPersonalInfo = {
        ...updatedData.personalInfo,
        profileImage: stripImagePath(updatedData.personalInfo?.profileImage)
      };

      const strippedProjects = (updatedData.projects || []).map((p) => {
        return {
          ...p,
          image: stripImagePath(p.image),
          images: (p.images || []).map(stripImagePath),
        };
      });

      const dataToSave = {
        ...updatedData,
        personalInfo: strippedPersonalInfo,
        projects: strippedProjects
      };

      const res = await fetch(`${API_BASE_URL}/api/portfolio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSave),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Failed to update portfolio data.");
      }

      // Process and set local state with prepended URLs so client-side state is consistent
      const processImagePath = (path) => {
        if (typeof path === "string" && path.startsWith("/uploads/")) {
          return `${API_BASE_URL}${path}`;
        }
        return path;
      };

      const processedPersonalInfo = {
        ...updatedData.personalInfo,
        profileImage: processImagePath(updatedData.personalInfo?.profileImage)
      };

      const processedProjects = (updatedData.projects || []).map((p) => {
        const rawImages = p.images || [p.image || ""];
        return {
          role: "Designer",
          projectUrl: "",
          ...p,
          image: processImagePath(p.image),
          images: rawImages.map(processImagePath),
        };
      });

      setData({
        ...updatedData,
        personalInfo: processedPersonalInfo,
        projects: processedProjects
      });

      return { success: true };
    } catch (err) {
      console.error("❌ Error updating portfolio:", err);
      return { success: false, error: err.message };
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        ...data,
        isLoading,
        error,
        refreshPortfolio: fetchPortfolio,
        updatePortfolio,
        apiBaseUrl: API_BASE_URL,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
