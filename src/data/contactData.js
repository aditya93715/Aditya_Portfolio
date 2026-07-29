// src/data/contactData.js
// Standalone data source for the Contact page (src/components/ContactSection.jsx).
// Kept separate from menuData.js so Contact can be edited/maintained independently.
// profile (email/phone/location/github/linkedin/portfolio) still lives in
// menuData.js since it's shared with the Header and MegaMenu footer — import
// it from there wherever needed.

// Formspree endpoint — replace with your own after signing up at formspree.io
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

export const contactContent = {
  eyebrow: "Get In Touch",
  headline: "Let's build something great together.",
  description:
    "I'm always interested in new opportunities, exciting projects, and meaningful collaborations — as a Full Stack Developer, Backend Developer, or Server Developer.",
};