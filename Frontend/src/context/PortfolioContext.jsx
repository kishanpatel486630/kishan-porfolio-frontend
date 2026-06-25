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
      // Merge with safe defaults for fields that may be missing in older JSON
      setData({
        ...fetchedData,
        projectFilters: fetchedData.projectFilters || ["All", "Designer", "Manager"],
        caseStudies: fetchedData.caseStudies || {},
        // Ensure each project has a role field
        projects: (fetchedData.projects || []).map((p) => ({
          role: "Designer",
          projectUrl: "",
          images: [p.image],
          ...p,
        })),
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
      const res = await fetch(`${API_BASE_URL}/api/portfolio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Failed to update portfolio data.");
      }

      setData(updatedData);
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
