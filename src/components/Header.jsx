// src/components/Header.jsx
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { schoolInfo } from "../data/menuData";
import logo from "../assets/Adityaa.png";
import profileImg from "../assets/Profile.png";

export default function Header({ isOpen, onToggle, onContactClick }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="flex items-center justify-between gap-2 px-4 py-3 sm:px-8 sm:py-6 lg:px-12">
        {/* Logo and Profile Section */}
        <div className="flex min-w-0 items-center gap-0">
          {/* Profile Circle Image */}
          <div className="relative flex-shrink-0 transform transition-transform duration-300 hover:scale-105">
            <img
              src={profileImg}
              alt="Profile"
              className="h-10 w-10 rounded-full border-2 border-white/30 object-cover shadow-lg transition-all duration-300 hover:border-crimson sm:h-16 sm:w-16"
            />
            <div className="absolute inset-0 rounded-full border-2 border-transparent transition-all duration-300 hover:border-crimson/50"></div>
          </div>

          {/* Logo */}
          <a href="#top" className="flex min-w-0 items-center group">
            <img
              src={logo}
              alt={schoolInfo.name}
              className="h-10 w-auto object-contain sm:h-16"
            />
          </a>
        </div>

        {/* Right controls */}
        <div className="flex flex-shrink-0 items-center gap-1.5 sm:gap-3">
          <button
            type="button"
            onClick={onContactClick}
            className={`whitespace-nowrap rounded-[3px] px-3 py-2 text-[10px] font-semibold uppercase tracking-wide transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-sm ${
              isOpen
                ? "bg-ink text-cream hover:bg-crimson"
                : "bg-white/95 text-ink hover:bg-white"
            }`}
          >
            <span className="hidden xs:inline">Contact Us</span>
            <span className="xs:hidden">Contact</span>
          </button>

          <button
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className={`flex items-center gap-2 whitespace-nowrap rounded-[3px] px-3 py-2 text-[10px] font-semibold uppercase tracking-wide transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-sm ${
              isOpen
                ? "bg-crimson text-white hover:bg-crimson-dark"
                : "bg-crimson text-white hover:bg-crimson-light"
            }`}
          >
            <span className="hidden sm:inline">{isOpen ? "Close" : "Menu"}</span>
            <motion.span
              initial={false}
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex"
            >
              {isOpen ? <X size={16} /> : <Menu size={16} />}
            </motion.span>
          </button>
        </div>
      </div>
    </header>
  );
}