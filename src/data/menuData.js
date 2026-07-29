// Central data source for the mega-menu.
// Every tab pulls from Aditya's actual resume/portfolio content.
// Add/remove/rename categories and content blocks here — the menu renders from this file.

// ---------------------------------------------------------------------------
// PROJECT SCREENSHOTS
// Drop your screenshots into src/assets/projects/ and import them here, then
// reference the imported variable in the `image` field below.
// ---------------------------------------------------------------------------

// Import project images
import rhtImage from "../assets/proj3.png";
import freetrackImage from "../assets/proj1.png";
import siwiImage from "../assets/proj2.png";

export const categories = ["About", "Skills", "Projects", "Experience", "Education", "Contact"];

export const profile = {
  name: "Aditya Yadav",
  role: "Junior Full Stack Developer",
  roleTags: ["MERN Stack Developer", "Server Developer"],
  email: "adityayadav93715@gmail.com",
  phone: "+91 9371508037",
  location: "Nallasopara East, Mumbai, Maharashtra, India",
  github: "https://github.com/aditya93715",
  linkedin: "https://www.linkedin.com/in/aditya-yadav-b4b611357/",
};

export const menuContent = {
  About: {
    label: "About",
    eyebrow: "Who I Am",
    headline: "Full-stack engineer who ships backend, frontend, and the server it runs on.",
    bio: [
      "Full Stack Developer and Server Developer with hands-on, production experience building and supporting scalable MERN stack applications end to end — from API design through deployment.",
      "Comfortable owning server-side responsibilities in Linux (Ubuntu) and Windows environments, and have delivered three live, production applications: the RHT Monitor Dashboard, the Freetrack multi-level tracking and admin platform, and the company's official corporate website, Srishti Wireless Solution.",
      "Known for taking full ownership of assigned modules, writing clean and maintainable code, and collaborating closely with cross-functional teams to ship reliable software on schedule.",
      "Actively building expertise in agentic AI and LLM-integrated development — LangChain/LangGraph workflows, RAG pipelines, and MCP-based tool integration — to bring AI-powered features into full stack products.",
    ],
    highlights: [
      {
        title: "Full Stack Development",
        detail: "Building responsive and scalable web applications using the MERN Stack.",
      },
      {
        title: "Backend Development",
        detail: "Developing secure REST APIs, authentication systems, and scalable server-side applications.",
      },
      {
        title: "Server Administration",
        detail: "Managing Linux (Ubuntu) servers, deployments, hosting, maintenance, and production environments.",
      },
      {
        title: "Database Design",
        detail: "Designing efficient MongoDB and PostgreSQL schemas for high-performance applications.",
      },
      {
        title: "Agentic AI & LLM Integration",
        detail: "Building agent workflows with LangChain/LangGraph, RAG pipelines, and MCP-based tool integration.",
      },
      {
        title: "API Integration",
        detail: "Building and integrating RESTful APIs, JWT/OAuth authentication, with frontend applications.",
      },
    ],
  },

  Skills: {
    label: "Skills",
    eyebrow: "What I Work With",
    headline: "A JavaScript-first stack, backed by real server operations and emerging AI expertise.",
    groups: [
      {
        title: "Languages",
        icon: "languages",
        items: ["JavaScript (ES6+)", "TypeScript", "Python"],
      },
      {
        title: "Frontend",
        icon: "frontend",
        items: ["React.js", "Next.js", "Redux", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Material UI (MUI)"],
      },
      {
        title: "Backend",
        icon: "backend",
        items: ["Node.js", "Express.js", "REST APIs", "JWT / OAuth Authentication"],
      },
      {
        title: "Database",
        icon: "database",
        items: ["MongoDB", "PostgreSQL (basics)", "Schema & Data Modeling"],
      },
      {
        title: "Agentic AI & LLM Integration",
        icon: "ai",
        items: [
          "LLM APIs (OpenAI, Claude, Gemini)",
          "LangChain",
          "LangGraph",
          "RAG",
          "Vector Databases (Pinecone / Chroma)",
          "Prompt Engineering",
          "MCP (Model Context Protocol)",
        ],
      },
      {
        title: "DevOps & Tools",
        icon: "devops",
        items: ["Linux (Ubuntu)", "Git", "GitHub", "Docker", "CI/CD Basics", "Postman", "AWS Fundamentals", "Production Deployment"],
      },
      {
        title: "Core Concepts",
        icon: "core",
        items: [
          "Responsive Design",
          "Cross Browser Compatibility",
          "API Integration",
          "Authentication & Authorization",
          "Performance Optimization",
        ],
      },
    ],
  },

  Projects: {
    label: "Projects",
    eyebrow: "Selected Work",
    headline: "Production systems — monitoring, tracking, and corporate platforms.",
    items: [
      {
        title: "RHT Monitor Dashboard",
        image: rhtImage,
        link: "http://chaukas.in:4480",
        overview: "A real-time environmental monitoring platform that tracks temperature and humidity from IoT devices.",
        contributions: [
          "Backend built with Node.js and Express.js",
          "Responsive React dashboard with real-time monitoring",
          "Optimized MongoDB collections",
          "Configured and maintained Linux production deployment",
        ],
        stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Linux", "REST API"],
      },
      {
        title: "Freetrack",
        image: freetrackImage,
        link: "http://freetrack.in",
        overview: "A real-time tracking system with a multi-level administration platform supporting different user roles.",
        contributions: [
          "Super Admin, Admin, and Sub Admin dashboards",
          "JWT authentication with role-based access control",
          "Tracking timeline with responsive React frontend",
          "Complete MongoDB schema design",
        ],
        stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "REST APIs"],
      },
      {
        title: "Srishti Wireless Solution Website",
        image: siwiImage,
        link: "https://siwi.in",
        overview: "Official corporate website representing company services, projects, and inquiry management.",
        contributions: [
          "React frontend and backend API development",
          "MongoDB integration and inquiry management system",
          "Managed deployment and production server maintenance",
        ],
        stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Linux Server"],
      },
    ],
  },

  Experience: {
    label: "Experience",
    eyebrow: "Track Record",
    headline: "Full lifecycle ownership — API to deployment.",
    items: [
      {
        role: "Junior Full Stack Developer & Server Developer",
        company: "Srishti Wireless Solution",
        duration: "July 2025 — Present",
        summary:
          "As part of the development team, I contribute to the complete software development lifecycle — from backend API development to frontend implementation and production deployment.",
        points: [
          "Develop scalable MERN Stack applications",
          "Build RESTful APIs using Node.js and Express.js",
          "Design MongoDB collections and schemas",
          "Deploy and maintain applications on Linux servers",
          "Collaborate with cross-functional teams",
          "Participate in code reviews",
          "Support production server operations",
          "Troubleshoot deployment and backend issues",
        ],
      },
    ],
  },

  Education: {
    label: "Education",
    eyebrow: "Academic Background",
    headline: "Bachelor of Computer Science, R.D. National College.",
    degree: "Bachelor of Computer Science",
    institution: "R.D. National College, Bandra, Mumbai",
    duration: "2022 – 2025",
    field: "Computer Science",
    stats: [
      { label: "Year 1 SGPA", value: "8.60" },
      { label: "Year 2 SGPA", value: "7.97" },
      { label: "Year 3 SGPA", value: "8.50" },
    ],
    focusAreas: [
      {
        title: "Agentic AI & LLM-Integrated Apps",
        detail: "Building agent workflows with LangChain/LangGraph, RAG pipelines, and MCP-based tool integration.",
      },
      {
        title: "Distributed Systems",
        detail: "Learning microservices concepts and high-availability server clusters.",
      },
      {
        title: "Scalable Backend Development",
        detail: "Building skills in high-traffic Node.js patterns and MongoDB performance tuning.",
      },
      {
        title: "Real-Time & IoT Systems",
        detail: "Exploring real-time data pipelines for sensor-based monitoring solutions.",
      },
    ],
  },

  Contact: {
    label: "Contact",
    eyebrow: "Get In Touch",
    headline: "Let's build something great together.",
    description:
      "I'm always interested in new opportunities, exciting projects, and meaningful collaborations — as a Full Stack Developer, Backend Developer, or Server Developer.",
  },
};

export const quickLinks = ["Download Resume", "View GitHub", "LinkedIn Profile", "Hire Me", "Testimonials", "Get in Touch"];

export const schoolInfo = {
  name: "Aditya Yadav — Full Stack Web Developer",
  address: "Mumbai, Maharashtra, India",
  phone: "+91 9371508037",
};