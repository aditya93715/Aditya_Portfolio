// src/App.jsx
import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MegaMenu from "./components/MegaMenu";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="relative">
      <Header
        isOpen={menuOpen}
        onToggle={() => setMenuOpen((v) => !v)}
        onContactClick={() => setContactOpen(true)}
      />

      <MegaMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Standalone pages — each opens independently of the mega menu */}
      <ProjectsSection isOpen={projectsOpen} onClose={() => setProjectsOpen(false)} />
      <ContactSection isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      <main>
        <Hero
          onExploreClick={() => setProjectsOpen(true)}
          onContactClick={() => setContactOpen(true)}
        />
      </main>
    </div>
  );
}