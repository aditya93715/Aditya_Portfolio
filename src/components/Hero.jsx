// src/components/Hero.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Import your slider images
import slide1 from "../assets/Aditya1.png";
import slide2 from "../assets/Aditya2.png";
// Mobile-only versions — framed/cropped differently so nothing important gets cut off on small screens
import mob1 from "../assets/mob1.png";
import mob2 from "../assets/mob2.png";

const slides = [
  {
    image: slide1,
    mobileImage: mob1,
    eyebrow: "R.D. National College · Final Year of 2025",
    fullText: "Transforming Ambition Into Achievement.....",
    subtext: (
      <>
        Computer Science graduate with <span className="bg-crimson-light px-2 py-0.5 text-white font-bold rounded whitespace-nowrap">CGPA 8.60</span> — 
        blending academic excellence with practical innovation to build solutions that make a difference.
      </>
    ),
    ctaLabel: "View My Journey",
  },
  {
    image: slide2,
    mobileImage: mob2,
    eyebrow: "Srishti Wireless Solution · Full Stack Web Developer",
    fullText: "To Build Real World Applications.....",
    subtext: (
      <>
        <span className="bg-crimson-light px-2 py-0.5 text-white font-bold rounded whitespace-nowrap">Full Stack Developer</span> 
        {" "}specializing in production-grade web applications delivering robust,scalable solutions that drive business growth and user engagement.
      </>
    ),
    ctaLabel: "Explore My Work",
  },
];

// Typewriter hook — reveals text character by character.
// Calls onDone() once, the moment typing finishes.
function useTypewriter(text, speed, onDone) {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setTyped("");
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
        if (onDone) onDone();
      }
    }, speed);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed]);

  return { typed, done };
}

// How long to hold on a slide AFTER its typing animation finishes, before advancing.
const HOLD_AFTER_TYPING_MS = 3200;
// Typing speed — higher number = slower / smoother typing.
const TYPING_SPEED_MS = 160;

/**
 * Hero — accepts two callbacks from App.jsx:
 *   onExploreClick  — fired by the slide's main CTA button ("View My Journey" /
 *                      "Explore My Work"), opens the standalone Projects page.
 *   onContactClick  — fired by the "Contact Me" button, opens the standalone
 *                      Contact page (same page the Header's "Contact Us" opens).
 */
export default function Hero({ onExploreClick, onContactClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const active = slides[currentSlide];

  const { typed: typedFullText, done: fullTextDone } = useTypewriter(
    active.fullText,
    TYPING_SPEED_MS
  );

  // Advance to the next slide only after typing fully completes,
  // then wait a bit so people can actually read it before it switches.
  useEffect(() => {
    if (!fullTextDone) return;
    const timeout = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, HOLD_AFTER_TYPING_MS);
    return () => clearTimeout(timeout);
  }, [fullTextDone, currentSlide]);

  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-ink"
    >
      {/* Background Slider with Ken Burns Effect */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`h-full w-full bg-cover bg-center bg-no-repeat transition-transform duration-[9000ms] ease-linear sm:hidden ${
                index === currentSlide ? "scale-100" : "scale-125"
              }`}
              style={{ backgroundImage: `url(${slide.mobileImage})` }}
            />
            <div
              className={`hidden h-full w-full scale-100 bg-cover bg-center bg-no-repeat transition-transform duration-[7000ms] ease-in-out sm:block ${
                index === currentSlide ? "sm:scale-110" : ""
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          </div>
        ))}

        {/* Light Aqua Overlay */}
        <div className="absolute inset-0 bg-crimson-light/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-crimson-light/10 to-transparent" />

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 h-1.5 bg-crimson"
                  : "w-4 h-1.5 bg-white/50 hover:bg-white/80"
              } rounded-full`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Content — on mobile: centered horizontally & vertically, then nudged
          down slightly (toward the bottom) via translate-y on the inner div.
          On sm and up: original bottom-left anchored layout, unchanged. */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center sm:items-start sm:justify-end sm:pb-16 md:pb-20 lg:pb-24 px-6 sm:px-12 md:px-20 lg:px-32 xl:px-40 2xl:px-48">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-2xl text-center translate-y-28 sm:mx-0 sm:max-w-2xl sm:text-left sm:translate-y-0 lg:max-w-3xl xl:max-w-4xl"
          >
            {/* Eyebrow label - smaller */}
            <p className="mb-2 flex items-center justify-center gap-2 text-sm sm:justify-start sm:text-xs font-bold uppercase tracking-[0.2em] text-white sm:font-medium sm:text-white/70">
              <span className="h-px w-6 bg-white" />
              {active.eyebrow}
            </p>

            {/* Full Text with typewriter - single line, all caps */}
            <p className="font-display font-bold text-2xl xs:text-3xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-[1.1] text-white">
              <motion.span
                key={currentSlide}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block bg-highlight/30 px-2 py-0.5 sm:px-3 sm:py-1 rounded-none"
              >
                {typedFullText}
                <span
                  className={`inline-block w-[2px] sm:w-[2px] h-[0.85em] bg-white align-middle ml-1 ${
                    fullTextDone ? "animate-pulse" : ""
                  }`}
                />
              </motion.span>
            </p>

            <div className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 max-w-xl sm:max-w-2xl md:max-w-3xl">
              <p className="font-display font-semibold text-base xs:text-lg sm:text-base sm:font-normal md:text-lg lg:text-xl leading-tight text-white sm:text-white/90">
                {active.subtext}
              </p>

              {/* CTA row - smaller */}
              <div className="mt-4 sm:mt-5 flex items-center justify-center gap-3 flex-wrap sm:justify-start">
                <button
                  type="button"
                  onClick={onExploreClick}
                  className="rounded-none bg-highlight px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-xs font-semibold uppercase tracking-wide text-white transition-transform duration-300 hover:scale-105 hover:opacity-90"
                >
                  {active.ctaLabel}
                </button>
                <button
                  type="button"
                  onClick={onContactClick}
                  className="rounded-none border border-highlight px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-xs font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-highlight/20"
                >
                  Contact Me
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}