import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { HiMenuAlt3, HiX, HiSun, HiMoon } from "react-icons/hi";
import { usePortfolio } from "../context/PortfolioContext";
import Button from "./ui/Button";

export default function Navbar({ isDarkMode, toggleTheme }) {
  const { navLinks, personalInfo } = usePortfolio();
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/kishan-admin");

  if (isAdminPage) return null;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled ? "glass-strong py-3 shadow-lg shadow-black/20" : "py-5 bg-transparent"}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gradient-start to-gradient-end flex items-center justify-center font-bold text-lg transition-transform duration-300 group-hover:scale-110">
              K
            </div>
            <span className="font-bold text-lg hidden sm:block">
              {personalInfo.name.split(" ")[0]}
              <span className="gradient-text">.</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={isHomePage ? link.href : `/${link.href}`}
                className="px-4 py-2 text-sm text-text-secondary font-medium rounded-lg
                  transition-all duration-300 hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-lg text-text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? (
                <HiSun size={22} className="text-yellow-400" />
              ) : (
                <HiMoon size={22} className="text-slate-700" />
              )}
            </button>

            <Button
              href={isHomePage ? "#contact" : "/#contact"}
              variant="primary"
              className="hidden md:inline-flex !px-5 !py-2.5 text-sm"
            >
              Let's Talk
            </Button>
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 glass-strong flex flex-col items-center justify-center gap-6 md:hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={isHomePage ? link.href : `/${link.href}`}
                className="text-2xl font-semibold text-text-primary hover:text-gradient-end transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
            <Button
              href={isHomePage ? "#contact" : "/#contact"}
              variant="primary"
              className="mt-4"
              onClick={() => setMobileOpen(false)}
            >
              Let's Talk
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
