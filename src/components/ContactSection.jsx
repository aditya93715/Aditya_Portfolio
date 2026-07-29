// src/components/ContactSection.jsx
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Mail, Download } from "lucide-react";
import { contactContent, FORMSPREE_ENDPOINT } from "../data/contactData";
import { profile } from "../data/menuData";
// The CV must live at src/assets/Aditya_CV.pdf — Vite resolves this import
// to the built asset's URL automatically, same as in MegaMenu.jsx.
import cvFile from "../assets/Aditya_CV.pdf";

const panelEase = [0.16, 1, 0.3, 1];

/** GitHub mark, rendered inline. Duplicated from MegaMenu.jsx to keep this file standalone. */
function GithubIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.17c0 4.48 2.87 8.28 6.84 9.62.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.28 9.28 0 0 1 5 0c1.9-1.33 2.74-1.05 2.74-1.05.56 1.42.2 2.47.1 2.73.65.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.17C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

/** LinkedIn mark, rendered inline. Duplicated from MegaMenu.jsx to keep this file standalone. */
function LinkedinIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 10h4v11H3V10Zm7 0h3.8v1.5h.05c.53-1 1.83-2 3.77-2 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3-.02-2.97-1.8-2.97-1.8 0-2.08 1.4-2.08 2.87V21h-4V10Z" />
    </svg>
  );
}

/**
 * Small round icon button used for social / contact links. Duplicated from
 * MegaMenu.jsx. Pass `download` (a filename string, or `true`) to make it
 * trigger a file download instead of navigating — used for the CV link.
 */
function IconLink({ icon: Icon, label, href, download }) {
  const isLink = Boolean(href) && href !== "#";
  const isExternal = isLink && !download && href.startsWith("http");
  const Comp = isLink ? "a" : "span";

  return (
    <Comp
      href={isLink ? href : undefined}
      download={download || undefined}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      aria-label={label}
      title={label}
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors duration-200 ${
        isLink ? "cursor-pointer hover:border-white/60 hover:text-white" : "cursor-default"
      }`}
    >
      <Icon size={17} strokeWidth={1.75} />
    </Comp>
  );
}

/**
 * ContactSection — standalone full-screen page (not part of the MegaMenu).
 * Opened by the Header's "Contact Us" button (and the Hero's "Contact Me"
 * button). Lives entirely on its own data (contactData.js) and its own file
 * so the contact form can be maintained independently of the mega menu.
 *
 * Icon row below the form matches the sidebar's four icons in MegaMenu.jsx —
 * GitHub, LinkedIn, Email, and CV download — instead of duplicating a
 * separate Phone/MapPin set. GitHub/LinkedIn/Email pull straight from
 * `profile` in menuData.js, so updating that file updates the links here too.
 */
export default function ContactSection({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.target),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: panelEase }}
          className="fixed inset-0 z-50 overflow-y-auto bg-crimson"
          role="dialog"
          aria-modal="true"
          aria-label="Contact"
        >
          {/* Technical dot-grid texture, matching the mega-menu's content panel */}
          <svg className="pointer-events-none fixed inset-0 h-full w-full opacity-[0.08]" aria-hidden="true">
            <defs>
              <pattern id="contact-dotgrid" width="22" height="22" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contact-dotgrid)" />
          </svg>
          <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/30" />

          <button
            onClick={onClose}
            aria-label="Close contact form"
            className="fixed right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/80 backdrop-blur-sm transition-colors duration-200 hover:border-white hover:text-white sm:right-8 sm:top-8"
          >
            <X size={20} />
          </button>

          <div className="relative z-10 mx-auto flex min-h-full max-w-3xl flex-col items-center justify-center px-6 py-16 sm:px-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: panelEase }}
              className="flex w-full flex-col items-center gap-6"
            >
              <div className="w-full text-center">
                <p className="flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/60">
                  <span aria-hidden="true">&#10022;</span> {contactContent.eyebrow}
                </p>
                <h2 className="mt-3 w-full font-display text-2xl leading-snug text-white sm:text-3xl md:text-4xl">
                  {contactContent.headline}
                </h2>
              </div>

              <p className="max-w-lg text-center text-sm leading-relaxed text-white/75 sm:text-base">
                {contactContent.description}
              </p>

              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col gap-4 rounded-sm border border-white/15 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
                  Send me a message
                </p>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/60">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-sm border border-white/20 bg-white/[0.06] px-3 py-2.5 text-sm text-white placeholder-white/40 outline-none focus:border-white/50"
                    placeholder="Your name"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/60">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-sm border border-white/20 bg-white/[0.06] px-3 py-2.5 text-sm text-white placeholder-white/40 outline-none focus:border-white/50"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/60">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full resize-none rounded-sm border border-white/20 bg-white/[0.06] px-3 py-2.5 text-sm text-white placeholder-white/40 outline-none focus:border-white/50"
                    placeholder="What would you like to talk about?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-2 rounded-sm bg-white px-5 py-3 text-sm font-semibold uppercase tracking-wide text-crimson transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>

                {status === "success" && (
                  <p className="text-sm text-green-300">
                    Thanks! Your message has been sent — I'll get back to you soon.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-sm text-red-300">
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}

                {/* Contact icons — same four as the mega-menu sidebar: GitHub,
                    LinkedIn, Email, and CV download. */}
                <div className="mt-3 flex flex-wrap items-center justify-center gap-4 border-t border-white/10 pt-5">
                  <IconLink icon={GithubIcon} label="GitHub" href={profile.github} />
                  <IconLink icon={LinkedinIcon} label="LinkedIn" href={profile.linkedin} />
                  <IconLink icon={Mail} label="Email" href={`mailto:${profile.email}`} />
                  <IconLink icon={Download} label="Download CV" href={cvFile} download="Aditya_CV.pdf" />
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}