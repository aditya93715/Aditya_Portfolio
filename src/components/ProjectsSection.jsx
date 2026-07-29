// src/components/ProjectsSection.jsx
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { X, ArrowUpRight } from "lucide-react";
import { projectsContent } from "../data/projectsData";

const panelEase = [0.16, 1, 0.3, 1];

/**
 * Tile — same bordered/glassy/magnetic-tilt container used in MegaMenu.jsx.
 * Duplicated here (rather than imported) to keep this file fully standalone,
 * matching the project's flat components/ folder structure.
 */
function Tile({ href, className = "", media, children }) {
  const ref = useRef(null);
  const isLink = Boolean(href);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateX: y * -6,
      rotateY: x * 6,
      duration: 0.45,
      ease: "power2.out",
      transformPerspective: 700,
    });
  };

  const handleLeave = () => {
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
  };

  const Tag = isLink ? "a" : "div";
  const linkProps = isLink
    ? {
        href,
        target: href.startsWith("http") ? "_blank" : undefined,
        rel: href.startsWith("http") ? "noreferrer" : undefined,
      }
    : {};

  return (
    <Tag
      ref={ref}
      {...linkProps}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`tile group relative flex min-w-0 flex-col overflow-hidden border border-white/15 bg-white/[0.04] p-4 backdrop-blur-sm transition-colors duration-300 hover:border-white/40 hover:bg-white/[0.08] sm:p-5 ${className}`}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      <span className="pointer-events-none absolute left-0 top-0 h-px w-0 bg-white/70 transition-all duration-300 group-hover:w-6" />
      <span className="pointer-events-none absolute left-0 top-0 h-0 w-px bg-white/70 transition-all duration-300 group-hover:h-6" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-px w-0 bg-white/70 transition-all duration-300 group-hover:w-6" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-0 w-px bg-white/70 transition-all duration-300 group-hover:h-6" />
      <div className="relative z-10 flex h-full flex-col" style={{ transform: "translateZ(20px)" }}>
        {media && (
          <div className="-mx-4 -mt-4 mb-4 overflow-hidden sm:-mx-5 sm:-mt-5 sm:mb-5">{media}</div>
        )}
        {children}
      </div>
    </Tag>
  );
}

/** Small rounded pill used for tech-stack tags. Duplicated from MegaMenu.jsx's style. */
function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-sm border border-white/15 bg-white/[0.06] px-2 py-1 text-[11px] font-medium tracking-wide text-white/80">
      {children}
    </span>
  );
}

/**
 * ProjectsSection — standalone full-screen page (not part of the MegaMenu).
 * Opened by the Hero banner's primary CTA button ("View My Journey" /
 * "Explore My Work"). Lives entirely on its own data (projectsData.js) and
 * its own file so Projects can be maintained independently of the mega menu.
 */
export default function ProjectsSection({ isOpen, onClose }) {
  const gridRef = useRef(null);

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

  // GSAP stagger reveal for the project tiles whenever the page opens.
  useEffect(() => {
    if (!isOpen || !gridRef.current) return;
    const items = gridRef.current.querySelectorAll(".tile");
    if (!items.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 26, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out", stagger: 0.08, delay: 0.2 }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [isOpen]);

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
          aria-label="Projects"
        >
          {/* Technical dot-grid texture, matching the mega-menu's content panel */}
          <svg className="pointer-events-none fixed inset-0 h-full w-full opacity-[0.08]" aria-hidden="true">
            <defs>
              <pattern id="projects-dotgrid" width="22" height="22" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#projects-dotgrid)" />
          </svg>
          <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/30" />

          <button
            onClick={onClose}
            aria-label="Close projects"
            className="fixed right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/80 backdrop-blur-sm transition-colors duration-200 hover:border-white hover:text-white sm:right-8 sm:top-8"
          >
            <X size={20} />
          </button>

          <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: panelEase }}
            >
              {/* Title block — centered, to match every other page's heading */}
              <div className="text-center">
                <p className="flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/60">
                  <span aria-hidden="true">&#10022;</span> {projectsContent.eyebrow}
                </p>
                <h2 className="mt-3 w-full font-display text-2xl leading-snug text-white sm:text-3xl md:text-4xl">
                  {projectsContent.headline}
                </h2>
              </div>

              <div ref={gridRef} className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
                {projectsContent.items.map((project) => {
                  const initials = project.title
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("");

                  return (
                    <Tile
                      key={project.title}
                      className="min-w-0 lg:min-h-[26rem]"
                      media={
                        project.image ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            loading="lazy"
                            className="h-40 w-full object-cover sm:h-44"
                          />
                        ) : (
                          <div className="flex h-40 items-center justify-center bg-gradient-to-br from-white/10 to-transparent font-display text-4xl text-white/20 sm:h-44">
                            {initials}
                          </div>
                        )
                      }
                    >
                      <p className="font-display text-xl text-white">{project.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">{project.overview}</p>
                      <ul className="mt-4 space-y-1.5">
                        {project.contributions.map((point) => (
                          <li key={point} className="flex gap-2 text-[13px] leading-snug text-white/70">
                            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-white/50" aria-hidden="true" />
                            {point}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                        {project.stack.map((tech) => (
                          <Chip key={tech}>{tech}</Chip>
                        ))}
                      </div>

                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-flex w-fit items-center justify-center gap-1.5 rounded-sm border border-white/25 px-4 py-2 text-[12px] font-semibold uppercase tracking-wide text-white transition-colors duration-200 hover:border-white hover:bg-white hover:text-crimson"
                        >
                          Visit Project
                          <ArrowUpRight size={14} />
                        </a>
                      )}
                    </Tile>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}