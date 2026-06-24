import { FiLinkedin, FiGithub, FiTwitter, FiHeart } from "react-icons/fi";
import { SiBehance } from "react-icons/si";
import { useLocation } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";

export default function Footer() {
  const { personalInfo, navLinks } = usePortfolio();
  const location = useLocation();
  if (location.pathname.startsWith("/kishan-admin")) return null;
  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: SiBehance, href: personalInfo.social.behance, label: "Behance" },
    { icon: FiLinkedin, href: personalInfo.social.linkedin, label: "LinkedIn" },
    { icon: FiGithub, href: personalInfo.social.github, label: "GitHub" },
    // { icon: FiTwitter, href: personalInfo.social.twitter, label: "Twitter" },
  ];

  return (
    <footer className="relative border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gradient-start to-gradient-end flex items-center justify-center font-bold text-sm">
              K
            </div>
            <span className="font-bold">
              {personalInfo.name.split(" ")[0]}
              <span className="gradient-text">.</span>
            </span>
          </div>

          {/* Nav links */}
          <div className="flex items-center justify-center gap-4 md:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-muted hover:text-text-primary transition-colors duration-300 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center justify-center md:justify-end gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-text-muted
                  hover:text-text-primary hover:bg-white/[0.05] transition-all duration-300"
                aria-label={label}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-text-muted flex items-center justify-center gap-1">
            © {year} {personalInfo.name}. Crafted with{" "}
            <FiHeart className="text-error" size={14} /> and attention to
            detail.
          </p>
        </div>
      </div>
    </footer>
  );
}
