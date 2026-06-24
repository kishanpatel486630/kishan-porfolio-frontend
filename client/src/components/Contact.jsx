import { useState } from "react";
import { motion } from "framer-motion";
import { HiMail, HiLocationMarker, HiPhone } from "react-icons/hi";
import { FiSend } from "react-icons/fi";
import { usePortfolio } from "../context/PortfolioContext";
import SectionHeading from "./ui/SectionHeading";
import Card from "./ui/Card";
import GlowOrb from "./ui/GlowOrb";
import FadeInOnScroll from "./motion/FadeInOnScroll";

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
const IS_PRODUCTION = import.meta.env.PROD;

export default function Contact({
  title = "Get in Touch",
  subtitle = "Have an idea to implement for real? Let's create something extraordinary together.",
}) {
  const { personalInfo } = usePortfolio();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      if (!WEB3FORMS_ACCESS_KEY) {
        setStatus("error");
        setStatusMessage(
          IS_PRODUCTION
            ? "Contact form is not configured in this deployment. Set VITE_WEB3FORMS_ACCESS_KEY in your hosting environment and redeploy."
            : "Web3Forms key is missing. Add VITE_WEB3FORMS_ACCESS_KEY in client/.env.",
        );
        setTimeout(() => setStatus("idle"), 4000);
        return;
      }

      const payload = new FormData();
      payload.append("access_key", WEB3FORMS_ACCESS_KEY);
      payload.append("name", formData.name.trim());
      payload.append("email", formData.email.trim());
      payload.append("phone", formData.phone.trim());
      payload.append("interest", formData.interest);
      payload.append("message", formData.message.trim());
      payload.append(
        "subject",
        `Portfolio contact from ${formData.name.trim()} (${formData.interest || "General"})`,
      );

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });

      const responseData = await res.json().catch(() => ({}));

      if (res.ok && responseData.success) {
        setStatus("success");
        setStatusMessage("Message sent successfully.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          interest: "",
          message: "",
        });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setStatusMessage(
          responseData.message || "Failed to send message. Please try again.",
        );
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setStatusMessage(
        "Network error. Please check your connection and try again.",
      );
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inputClasses = `w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-border
    text-text-primary placeholder:text-text-muted text-sm
    focus:outline-none focus:border-gradient-start focus:shadow-[0_0_20px_rgba(37,99,235,0.1)]
    transition-all duration-300`;

  const selectOptions = [
    { value: "", label: "Select an option" },
    { value: "UI/UX Design", label: "UI/UX Design" },
    { value: "Product Strategy", label: "Product Strategy" },
    { value: "Freelance Project", label: "Freelance Project" },
    { value: "Full-Time Opportunity", label: "Full-Time Opportunity" },
    { value: "General Inquiry", label: "General Inquiry" },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      <GlowOrb color="blue" size={400} className="bottom-0 left-[-5%]" />
      <GlowOrb
        color="purple"
        size={300}
        className="top-[10%] right-[-5%]"
        delay={3}
      />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Contact Info */}
          <FadeInOnScroll className="lg:col-span-2" direction="left">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Let's talk about your project
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  I'm always excited to work on new challenges. Whether it's a
                  full product design, a quick consultation, or a design system
                  — let's connect.
                </p>
              </div>

              {/* Contact details */}
              <div className="space-y-4">
                {[
                  {
                    icon: HiMail,
                    label: "Email",
                    value: personalInfo.email,
                    href: `mailto:${personalInfo.email}`,
                  },
                  {
                    icon: HiLocationMarker,
                    label: "Location",
                    value: personalInfo.location,
                  },
                  {
                    icon: HiPhone,
                    label: "Availability",
                    value: "Open to freelance & full-time",
                  },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div
                    key={label}
                    className="flex items-start gap-4 p-4 rounded-xl glass group hover:border-border-hover transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gradient-start/20 to-gradient-end/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="text-gradient-end" size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider mb-0.5">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm font-medium text-text-primary hover:text-gradient-end transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-text-primary">
                          {value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInOnScroll>

          {/* Form */}
          <FadeInOnScroll
            className="lg:col-span-3"
            direction="right"
            delay={0.2}
          >
            <Card className="p-6 md:p-8" hover={false}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs text-text-muted uppercase tracking-wider mb-2 font-medium"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs text-text-muted uppercase tracking-wider mb-2 font-medium"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs text-text-muted uppercase tracking-wider mb-2 font-medium"
                    >
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-interest"
                      className="block text-xs text-text-muted uppercase tracking-wider mb-2 font-medium"
                    >
                      Interest
                    </label>
                    <select
                      id="contact-interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className={inputClasses}
                      style={{
                        color: formData.interest ? "#f8fafc" : "#94a3b8",
                      }}
                    >
                      {selectOptions.map((option) => (
                        <option
                          key={option.value || "placeholder"}
                          value={option.value}
                          style={{
                            backgroundColor: "#ffffff",
                            color: "#0f172a",
                          }}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs text-text-muted uppercase tracking-wider mb-2 font-medium"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={5}
                    required
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-gradient-start to-gradient-end
                    text-white font-semibold flex items-center justify-center gap-2
                    hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all duration-300
                    disabled:opacity-60 disabled:cursor-not-allowed btn-shine"
                  whileTap={{ scale: 0.98 }}
                >
                  {status === "sending" ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      Sending...
                    </>
                  ) : status === "success" ? (
                    "✓ Message Sent!"
                  ) : status === "error" ? (
                    "Failed — Try Again"
                  ) : (
                    <>
                      Send Message
                      <FiSend size={16} />
                    </>
                  )}
                </motion.button>

                {status === "success" && (
                  <motion.p
                    className="text-center text-sm text-success"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {statusMessage ||
                      "Thank you! I'll get back to you within 24 hours."}
                  </motion.p>
                )}

                {status === "error" && (
                  <motion.p
                    className="text-center text-sm text-error"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {statusMessage ||
                      "Failed to send message. Please try again."}
                  </motion.p>
                )}
              </form>
            </Card>
          </FadeInOnScroll>
        </div>
      </div>
    </section>
  );
}
