// src/data/projectsData.js
// Standalone data source for the Projects page (src/components/ProjectsSection.jsx).
// Kept separate from menuData.js so Projects can be edited/maintained independently.

// ---------------------------------------------------------------------------
// PROJECT SCREENSHOTS
// Drop your screenshots into src/assets/ and import them here, then
// reference the imported variable in the `image` field below.
// ---------------------------------------------------------------------------

// Import project images - all images are directly in src/assets/
import rhtImage from "../assets/proj3.png";
import freetrackImage from "../assets/proj1.png";
import siwiImage from "../assets/proj2.png";

export const projectsContent = {
  eyebrow: "Selected Work",
  headline: "Production systems — monitoring, tracking, and corporate platforms.",
  items: [
    {
      title: "RHT Monitor Dashboard",
      image: rhtImage,
      link: "http://chaukas.in:4480",
      overview:
        "A real-time environmental monitoring platform tracking temperature and humidity from connected devices.",
      contributions: [
        "Node.js and Express.js backend ingesting sensor data via REST APIs",
        "MongoDB collections optimized for high-volume, time-based data",
        "React front end with live values, trend charts, and threshold alerts",
        "Configured and maintained Linux (Ubuntu) production deployment",
      ],
      stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Linux", "REST API"],
    },
    {
      title: "Freetrack",
      image: freetrackImage,
      link: "http://freetrack.in",
      overview:
        "A real-time tracking system with a multi-level administration platform (Super Admin, Admin, Sub-Admin).",
      contributions: [
        "JWT-based authentication with role-based route protection",
        "MongoDB schemas for tracking records, status history, and permissions",
        "REST APIs for creating, updating, and retrieving entries per role",
        "Responsive React front end with status timelines and role dashboards",
      ],
      stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "REST APIs"],
    },
    {
      title: "Srishti Wireless Solution Website",
      image: siwiImage,
      link: "https://siwi.in",
      overview: "Official corporate website representing company services, projects, and inquiry management.",
      contributions: [
        "Responsive React front end covering overview, services, and inquiry forms",
        "Node.js and Express.js APIs handling contact form submissions",
        "MongoDB-backed editable content, allowing updates without code changes",
        "Deployed and maintained on the company's production server",
      ],
      stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Linux Server"],
    },
  ],
};