import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import useSmoothScroll from "./hooks/useSmoothScroll";
import Navbar from "./components/Navbar";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import Hero from "./components/Hero";
import ClientLogos from "./components/ClientLogos";
import Projects from "./components/Projects";
import CaseStudy from "./components/CaseStudy";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Education from "./components/Education";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProjectsPage from "./pages/ProjectsPage";
import AdminPanel from "./pages/AdminPanel";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Notify Lenis smooth scroller to also jump to top
    window.dispatchEvent(new Event("scrollToTop"));
  }, [pathname]);

  return null;
}

export default function App() {
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Initialize smooth scroll
  useSmoothScroll();

  // Lock body scroll when case study is open
  useEffect(() => {
    document.body.style.overflow = activeProjectId ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProjectId]);

  return (
    <>
      <ScrollToTop />
      <LoadingScreen />
      <CustomCursor />
      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Hero />
              {/* <ClientLogos /> */}
              <Projects onOpenCaseStudy={(id) => setActiveProjectId(id)} />
              <Skills />
              <Experience />
              <Education />
              <About />
              <Contact />
            </main>
          }
        />
        <Route
          path="/projects"
          element={
            <ProjectsPage onOpenCaseStudy={(id) => setActiveProjectId(id)} />
          }
        />
        <Route
          path="/kishan-admin"
          element={
            <AdminPanel />
          }
        />
      </Routes>

      <Footer />

      <CaseStudy
        activeProjectId={activeProjectId}
        onClose={() => setActiveProjectId(null)}
      />
    </>
  );
}
