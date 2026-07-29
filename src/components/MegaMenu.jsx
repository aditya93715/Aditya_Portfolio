// src/components/MegaMenu.jsx
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { categories, menuContent, profile } from "../data/menuData";
import { FORMSPREE_ENDPOINT } from "../data/contactData";
import slide2 from "../assets/Profile.png";
// The CV must live at src/assets/Aditya_CV.pdf — Vite resolves this import
// to the built asset's URL automatically, no plugin required.
import cvFile from "../assets/Aditya_CV.pdf";
import {
  ChevronRight,
  Mail,
  Star,
  ArrowUpRight,
  Download,
} from "lucide-react";

const panelEase = [0.16, 1, 0.3, 1];

/**
 * Tile — the shared "square type" container used across every tab.
 * Bordered, glassy box with a magnetic tilt on mouse move and an
 * animated corner bracket on hover. Optionally renders a full-bleed
 * media block (image or fallback) above the padded content.
 */
function Tile({ href, className = "", square = false, media, children }) {
  const ref = useRef(null);
  const isLink = Boolean(href);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    // Skip the tilt effect on touch devices — mousemove doesn't really fire there,
    // but guarding avoids any weirdness on hybrid devices too.
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
      className={`tile group relative flex min-w-0 flex-col overflow-hidden border border-white/15 bg-white/[0.04] p-4 backdrop-blur-sm transition-colors duration-300 hover:border-white/40 hover:bg-white/[0.08] sm:p-5 ${
        square ? "aspect-square" : ""
      } ${className}`}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {/* corner bracket, draws in on hover */}
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

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-sm border border-white/15 bg-white/[0.06] px-2 py-1 text-[11px] font-medium tracking-wide text-white/80">
      {children}
    </span>
  );
}

function SectionHeader({ eyebrow, headline }) {
  return (
    <div className="text-center">
      <p className="flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/60">
        <span aria-hidden="true">&#10022;</span> {eyebrow}
      </p>
      <h3 className="mt-3 w-full font-display text-xl leading-snug text-white sm:text-2xl md:text-3xl xl:text-[2.15rem]">
        {headline}
      </h3>
    </div>
  );
}

/** GitHub mark, rendered inline — lucide-react's current release no longer ships brand logos. */
function GithubIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.17c0 4.48 2.87 8.28 6.84 9.62.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.28 9.28 0 0 1 5 0c1.9-1.33 2.74-1.05 2.74-1.05.56 1.42.2 2.47.1 2.73.65.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.17C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

/** LinkedIn mark, rendered inline — lucide-react's current release no longer ships brand logos. */
function LinkedinIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 10h4v11H3V10Zm7 0h3.8v1.5h.05c.53-1 1.83-2 3.77-2 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3-.02-2.97-1.8-2.97-1.8 0-2.08 1.4-2.08 2.87V21h-4V10Z" />
    </svg>
  );
}

/**
 * Small round icon button used for social / contact links. Pass `download`
 * (a filename string, or `true`) to make it trigger a file download instead
 * of navigating — used for the CV link.
 *
 * `tone="light"` (default) renders white-on-transparent icons, for use on the
 * dark crimson content panel. `tone="dark"` renders ink-colored icons, for
 * use on the cream sidebar — without this the white icons are invisible
 * against a light background.
 */
function IconLink({ icon: Icon, label, href, download, tone = "light" }) {
  const isLink = Boolean(href) && href !== "#";
  const isExternal = isLink && !download && href.startsWith("http");
  const Comp = isLink ? "a" : "span";

  const toneClasses =
    tone === "dark"
      ? "border-ink/25 text-ink/70 hover:border-crimson hover:text-crimson"
      : "border-white/20 text-white/70 hover:border-white/60 hover:text-white";

  return (
    <Comp
      href={isLink ? href : undefined}
      download={download || undefined}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      aria-label={label}
      title={label}
      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-200 ${toneClasses} ${
        isLink ? "cursor-pointer" : "cursor-default"
      }`}
    >
      <Icon size={17} strokeWidth={1.75} />
    </Comp>
  );
}

/** Fractional 5-star rating, derived from a score out of `max`. */
function StarRating({ score, max = 10, size = 16 }) {
  const totalStars = 5;
  const pct = Math.max(0, Math.min(1, score / max)) * 100;

  return (
    <div className="relative inline-flex" role="img" aria-label={`Rated ${score} out of ${max}`}>
      <div className="flex gap-1 text-white/15">
        {Array.from({ length: totalStars }).map((_, i) => (
          <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <div className="absolute inset-0 flex gap-1 overflow-hidden text-amber-300" style={{ width: `${pct}%` }}>
        {Array.from({ length: totalStars }).map((_, i) => (
          <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
    </div>
  );
}

export default function MegaMenu({ isOpen, onClose }) {
  const [active, setActive] = useState(categories[0]);
  const [mobileOpenCategory, setMobileOpenCategory] = useState(null);
  const [mobileView, setMobileView] = useState(true); // true = categories, false = content
  const gridRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setActive(categories[0]);
      setMobileView(true);
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

  // GSAP stagger reveal for every tile whenever the active tab (or the
  // menu itself) changes. Runs after framer-motion mounts the panel.
  useEffect(() => {
    if (!isOpen || !gridRef.current) return;
    const items = gridRef.current.querySelectorAll(".tile");
    if (!items.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 26, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.05,
          delay: 0.12,
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [active, isOpen]);

  const activeContent = menuContent[active];

  const handleCategoryClick = (cat) => {
    setActive(cat);
    // On mobile, switch to content view
    if (window.innerWidth < 1024) {
      setMobileView(false);
    }
  };

  const handleBackToCategories = () => {
    setMobileView(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: panelEase }}
          className="fixed inset-0 z-40 flex flex-col overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="flex h-full w-full flex-col overflow-y-auto scrollbar-hide pt-[72px] sm:pt-[92px] lg:flex-row lg:overflow-hidden">
            {/* LEFT — category list - slides in from left on mobile */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.5, ease: panelEase }}
              className={`relative z-10 flex w-full flex-shrink-0 flex-col justify-between bg-cream px-5 pb-6 pt-5 sm:px-10 sm:pb-8 sm:pt-8 lg:w-[38%] lg:px-14 lg:pb-14 lg:pt-12 ${
                mobileView ? "block" : "hidden lg:block"
              }`}
            >
              <div>
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-crimson">
                  <span aria-hidden="true">&#10022;</span> Navigate
                </p>

                <nav className="mt-5 flex flex-col gap-0.5 sm:mt-6 lg:mt-10 lg:gap-2">
                  {categories.map((cat, i) => {
                    const isActive = cat === active;
                    return (
                      <div key={cat} className="lg:contents">
                        <motion.button
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.15 + i * 0.05, ease: panelEase }}
                          onClick={() => handleCategoryClick(cat)}
                          className={`w-full text-left font-display text-xl xs:text-2xl sm:text-3xl lg:text-4xl leading-tight transition-colors duration-200 flex items-center justify-between group ${
                            isActive ? "text-crimson" : "text-ink/50 hover:text-ink"
                          }`}
                          aria-current={isActive ? "true" : undefined}
                        >
                          <span>{cat}</span>
                          <ChevronRight
                            size={20}
                            className={`lg:hidden transition-transform duration-300 ${
                              isActive ? "text-crimson translate-x-1" : "text-ink/30"
                            }`}
                          />
                        </motion.button>

                        {/* Mobile inline description */}
                        <div className="lg:hidden">
                          <AnimatePresence>
                            {mobileOpenCategory === cat && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.35, ease: panelEase }}
                                className="overflow-hidden"
                              >
                                <p className="my-3 border-l-2 border-crimson/30 pl-4 text-sm text-ink/70">
                                  {menuContent[cat].headline}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    );
                  })}
                </nav>
              </div>

              {/* Profile strip + social/CV icons — sits under the tab list on every
                  breakpoint, so it's visible in the mobile category view too.
                  This is the ONE place these links live (GitHub, LinkedIn, Email,
                  CV download) — the Contact tab no longer duplicates them. */}
              <div className="mt-8 flex items-center justify-between lg:mt-0">
                <div className="hidden sm:block">
                  <p className="font-display text-base text-ink">{profile.name}</p>
                  <p className="text-xs text-ink/50">{profile.role}</p>
                </div>
                <div className="flex items-center gap-4 sm:gap-5">
                  <IconLink tone="dark" icon={GithubIcon} label="GitHub" href={profile.github} />
                  <IconLink tone="dark" icon={LinkedinIcon} label="LinkedIn" href={profile.linkedin} />
                  <IconLink tone="dark" icon={Mail} label="Email" href={`mailto:${profile.email}`} />
                  <IconLink tone="dark" icon={Download} label="Download CV" href={cvFile} download="Aditya_CV.pdf" />
                </div>
              </div>
            </motion.div>

            {/* RIGHT — content panel - slides in from right on mobile */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: panelEase, delay: 0.05 }}
              className={`relative min-w-0 flex-1 overflow-y-auto scrollbar-hide bg-crimson px-5 py-7 sm:px-10 sm:py-8 lg:px-14 lg:py-12 xl:px-20 ${
                !mobileView ? "block" : "hidden lg:block"
              }`}
            >
              {/* Mobile back button */}
              <button
                onClick={handleBackToCategories}
                className="lg:hidden flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors duration-200"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5" />
                  <path d="M12 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-medium">Back</span>
              </button>

              {/* Technical dot-grid texture */}
              <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]" aria-hidden="true">
                <defs>
                  <pattern id="dotgrid" width="22" height="22" patternUnits="userSpaceOnUse">
                    <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dotgrid)" />
              </svg>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/30" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.32, ease: panelEase }}
                  className="relative z-10 flex h-full flex-col"
                >
                  {/* The About tab renders its own centered header (photo first),
                      so we skip the shared left-aligned header for it. */}
                  {active !== "About" && (
                    <SectionHeader eyebrow={activeContent.eyebrow} headline={activeContent.headline} />
                  )}

                  <div
                    ref={gridRef}
                    className={`overflow-y-auto pr-1 scrollbar-hide lg:max-h-[60vh] ${
                      active === "About" ? "mt-1" : "mt-6 sm:mt-7"
                    }`}
                  >
                    {active === "About" && <AboutPanel content={activeContent} />}
                    {active === "Skills" && <SkillsPanel content={activeContent} />}
                    {active === "Projects" && <ProjectsPanel content={activeContent} />}
                    {active === "Experience" && <ExperiencePanel content={activeContent} />}
                    {active === "Education" && <EducationPanel content={activeContent} />}
                    {active === "Contact" && <ContactPanel content={activeContent} />}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------------------- Tab panels ---------------------------- */

function AboutPanel({ content }) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 text-center">
      {/* Circular profile photo, centered */}
      <div className="relative">
        <span className="absolute -inset-2 rounded-full border border-white/10" aria-hidden="true" />
        <img
          src={slide2}
          alt="Aditya Yadav"
          className="h-28 w-28 rounded-full border-2 border-white/25 object-cover shadow-2xl sm:h-36 sm:w-36 lg:h-40 lg:w-40"
        />
      </div>

      {/* Header text + paragraph, below the photo */}
      <div>
        <p className="flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/60">
          <span aria-hidden="true">&#10022;</span> {content.eyebrow}
        </p>
        <h3 className="mt-3 font-display text-xl leading-snug text-white sm:text-2xl md:text-3xl xl:text-[2.15rem]">
          {content.headline}
        </h3>
      </div>

      <div className="space-y-3 text-left text-sm leading-relaxed text-white/80 sm:text-base">
        {content.bio.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      <div className="grid w-full grid-cols-1 gap-3 pt-2 xs:grid-cols-2 xl:grid-cols-3">
        {content.highlights.map((item) => (
          <Tile key={item.title} className="text-left">
            <p className="font-display text-lg text-white">{item.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{item.detail}</p>
          </Tile>
        ))}
      </div>
    </div>
  );
}

/**
 * SkillsPanel — deliberately not a grid of boxes. Each category is a labeled
 * row (numbered, like a spec sheet) with its skills flowing as pills, split
 * by hairline dividers. Reads like a capabilities list rather than a card wall.
 */
function SkillsPanel({ content }) {
  return (
    <div className="tile flex flex-col divide-y divide-white/10 border-t border-white/10">
      {content.groups.map((group, i) => {
        return (
          <div key={group.title} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-baseline sm:gap-8">
            <div className="flex items-baseline gap-2 sm:w-52 sm:flex-shrink-0">
              <span className="font-mono text-[11px] text-white/35">0{i + 1}</span>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">{group.title}</p>
            </div>
            <div className="flex flex-1 flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 text-[13px] leading-none text-white/85 transition-colors duration-200 hover:border-white/40 hover:bg-white/[0.08]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * ProjectsPanel — mirrors the standalone ProjectsSection.jsx page so the
 * "Projects" tab inside the mega menu shows the exact same cards. Content
 * comes from menuContent.Projects (menuData.js), which is kept in sync with
 * projectsData.js.
 */
function ProjectsPanel({ content }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {content.items.map((project) => {
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
  );
}

function ExperiencePanel({ content }) {
  return (
    <div className="flex flex-col gap-4">
      {content.items.map((job) => (
        <Tile key={job.role} className="min-w-0 lg:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-display text-lg text-white sm:text-xl md:text-2xl">{job.role}</p>
              <p className="mt-1 text-sm text-white/70">{job.company}</p>
            </div>
            <span className="rounded-sm border border-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
              {job.duration}
            </span>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70">{job.summary}</p>
          <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-1.5 sm:grid-cols-2">
            {job.points.map((point) => (
              <div key={point} className="flex gap-2 text-[13px] leading-snug text-white/75">
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-white/50" aria-hidden="true" />
                {point}
              </div>
            ))}
          </div>
        </Tile>
      ))}
    </div>
  );
}

function EducationPanel({ content }) {
  return (
    <div className="flex flex-col gap-4">
      <Tile>
        <p className="font-display text-lg text-white sm:text-xl md:text-2xl">{content.degree}</p>
        <p className="mt-1 text-sm text-white/70">{content.institution}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Chip>{content.duration}</Chip>
          <Chip>{content.field}</Chip>
        </div>
      </Tile>

      <div className="grid grid-cols-1 gap-3 xs:grid-cols-3">
        {content.stats.map((stat) => (
          <Tile key={stat.label} className="items-center justify-center gap-3 py-6 text-center">
            <p className="text-[10px] uppercase tracking-[0.14em] text-white/55 sm:text-[11px] sm:tracking-[0.18em]">
              {stat.label}
            </p>
            <p className="font-display text-3xl text-white sm:text-4xl">{stat.value}</p>
            <StarRating score={parseFloat(stat.value)} max={10} />
          </Tile>
        ))}
      </div>

      {/* Research & Focus Pillars — pulled from the resume's "Research & Focus Pillars" section */}
      {content.focusAreas && (
        <div className="tile flex flex-col gap-4 border-t border-white/10 pt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
            Research &amp; Focus Pillars
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {content.focusAreas.map((area) => (
              <div key={area.title} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rotate-45 bg-white/50" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-white">{area.title}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-white/65">{area.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * ContactPanel — mirrors the standalone ContactSection.jsx page so the
 * "Contact" tab inside the mega menu has the same working form. Copy comes
 * from menuContent.Contact (menuData.js); the Formspree endpoint is imported
 * from contactData.js so there's exactly one place to update it.
 *
 * Note: GitHub / LinkedIn / Email / CV-download icons now live ONLY in the
 * left sidebar (next to the tab list) so they're always visible — including
 * on the mobile category view — rather than being duplicated here.
 */
function ContactPanel({ content }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

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
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-6">
      <p className="max-w-lg text-center text-sm leading-relaxed text-white/75 sm:text-base">
        {content.description}
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
      </form>
    </div>
  );
}