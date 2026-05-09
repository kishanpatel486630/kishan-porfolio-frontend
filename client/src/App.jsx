import { useState, useEffect } from "react";
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
      <LoadingScreen />
      <CustomCursor />
      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

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

      <Footer />

      <CaseStudy
        activeProjectId={activeProjectId}
        onClose={() => setActiveProjectId(null)}
      />
    </>
  );
}
