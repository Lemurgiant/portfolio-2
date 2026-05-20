// ============================================================
//  PORTFOLIO CONTENT — Edit this file to update everything.
//  No UI needed. Just save and the site reflects your changes.
// ============================================================

export const personal = {
  name: "Marlon Aquino",
  title: "Full-Stack Software Developer",
  tagline: "Building systems that scale.\nLeading teams that ship.",
  bio: "I'm a full-stack engineer with 2+ years of experience building scalable products and solving business problems through software. I operate across both engineering and strategy — turning complex requirements into practical, maintainable systems while communicating clearly with clients and stakeholders.",
  email: "aquinomarlonjoseph@gmail.com",
  phone: "+63 991 720 5532",
  location: "Angeles, Pampanga",
  availability: "Open to new opportunities",
  initials: "MJ",
  avatarUrl: "/images/my-photo.jpg", // Set to your image URL or import path to replace the placeholder, e.g. "/my-photo.jpg"
  resumeUrl: "#",
  social: [
    { label: "GitHub", url: "https://github.com/Lemurgiant", icon: "github" },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/marlon-joseph-aquino-941678319/",
      icon: "linkedin",
    },
    // { label: "Twitter", url: "https://twitter.com", icon: "twitter" },
  ],
};

export const stats = [
  { value: 2, suffix: "+", label: "Years of Experience" },
  { value: 4, suffix: "+", label: "Projects Delivered" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
  { value: 8, suffix: "", label: "Team Members Led" },
];

export const skills = [
  {
    category: "Development and Tech",
    icon: "⚙",
    color: "#F0A500",
    description:
      "Full-stack systems design, API architecture, and performance engineering.",
    items: [
      { name: "React / Next.js", level: 86 },
      { name: "Vue / Quasar", level: 94 },
      { name: "Javascript / Typescript", level: 95 },
      { name: "MongoDB / NoSQL", level: 92 },
      { name: "Node.js / Elysia.js", level: 90 },
    ],
  },
  {
    category: "Project Management",
    icon: "◈",
    color: "#4ECDC4",
    description:
      "End-to-end delivery ownership — from discovery to production.",
    items: [
      { name: "Agile / Scrum", level: 93 },
      { name: "Roadmap Planning", level: 88 },
      { name: "Risk Management", level: 92 },
      // { name: "OKR Frameworks", level: 80 },
      { name: "Stakeholder Alignment", level: 87 },
    ],
  },
  {
    category: "Client Communication",
    icon: "◉",
    color: "#FF6B6B",
    description:
      "Translating technical complexity into clear executive narratives.",
    items: [
      { name: "Technical Consulting", level: 92 },
      { name: "Requirement Discovery", level: 94 },
      { name: "Prototyping", level: 87 },
      { name: "Proper Scoping", level: 89 },
      { name: "Conflict Resolution", level: 86 },
    ],
  },
  // {
  //   category: "Tech Adaptability",
  //   icon: "⬡",
  //   color: "#A78BFA",
  //   description:
  //     "Rapidly fluent in emerging stacks — from AI/ML to embedded systems.",
  //   items: [
  //     { name: "Cloud (AWS / GCP / Azure)", level: 87 },
  //     { name: "DevOps / CI/CD", level: 82 },
  //     { name: "AI/ML Integration", level: 78 },
  //     { name: "Blockchain / Web3", level: 70 },
  //     { name: "IoT / Embedded Systems", level: 65 },
  //   ],
  // },
];

export const projects = [
  {
    id: 1,
    title: "Book Session Manager",
    subtitle: "Web Application",
    description:
      "Book Session Manager is for book enthusiasts who want to track their progress, structure their thoughts by its input notes feature, and much more.",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "Render"],
    role: "Software Developer",
    year: "2024",
    status: "Live",
    featured: true,
    metrics: [
      // { label: "Ops overhead reduction", value: "67%" },
      // { label: "Enterprise clients", value: "12" },
      // { label: "Integrations shipped", value: "30+" },
    ],
    link: "https://example.com",
    github: null,
  },
  {
    id: 2,
    title: "Lightweight Inventory Management",
    subtitle: "Web Application",
    description:
      "A management system designed to simplify inventory management and maximize speed and accuracy.",
    tags: ["HTML/CSS", "Javascript", "React", "LowDB"],
    role: "Software Developer",
    year: "2025",
    status: "Live",
    featured: true,
    metrics: [
      // { label: "Events per day", value: "2M+" },
      // { label: "Detection latency", value: "<200ms" },
      // { label: "False positive rate", value: "0.3%" },
    ],
    link: "https://example.com",
    github: "https://github.com",
  },
  {
    id: 3,
    title: "Computerized Maintenance Management Software (CMMS)",
    subtitle: "Web Application",
    description:
      "CMMS is designed to solve messy paperwork. It accelerates the way they record, update, and track maintenance tasks.",
    tags: ["HTML/CSS", "Javascript", "React", "Firebase"],
    role: "Software Developer",
    year: "2023",
    status: "Live",
    featured: true,
    metrics: [
      // { label: "GitHub Stars", value: "2.1k" },
      // { label: "Weekly downloads", value: "18k" },
      // { label: "Contributors", value: "34" },
    ],
    link: null,
    github: "https://github.com",
  },
  {
    id: 4,
    title: "Inventory Management System (With User Access Controls)",
    subtitle: "Web Application",
    description:
      "A software that can supercharge any business with inventory, it also supports control access for different users. This application can scale infinitely.",
    tags: ["MongoDB", "ElysiaJS", "Quasar", "VueJS"],
    role: "Software Developer",
    year: "2024",
    status: "Open Source",
    featured: true,
    metrics: [
      { label: "Ahead of schedule", value: "6 wks" },
      { label: "Downtime during migration", value: "0" },
      { label: "Performance improvement", value: "4×" },
    ],
    link: null,
    github: null,
  },
  {
    id: 5,
    title: "Restaurant Website (Bella Vista)",
    subtitle: "Landing Page",
    description:
      "A beautiful website designed for italian restaurant that attracts customers.",
    tags: ["Next.js", "ShadCN", "Tailwind CSS"],
    role: "Software Developer",
    year: "2024",
    status: "Open Source",
    featured: true,
    metrics: [
      { label: "Ahead of schedule", value: "6 wks" },
      { label: "Downtime during migration", value: "0" },
      { label: "Performance improvement", value: "4×" },
    ],
    link: null,
    github: null,
  },
];

export const experience = [
  {
    company: "Desco INC",
    role: "Full-Stack Developer",
    period: "Jul 2024 - Aug 2024",
    location: "Remote",
    type: "Contract",
    highlights: [
      "Developed systems that streamlined operational workflows and improved efficiency.",
      "Translated complex functionality into intuitive, user-friendly interfaces.",
      "Maintained clean and scalable database structures to support long-term growth.",
    ],
  },
  {
    company: "Information Technology Business Solutions",
    role: "Front-end Developer",
    period: "Oct 2024 - Apr 2025",
    location: "San Fernando City, Pampanga",
    type: "Full-time",
    highlights: [
      "Developed and maintained modern web applications using Vue.js and Quasar.",
      "Led rapid prototyping efforts to validate requirements and align with client expectations.",
      "Maintained high engineering standards and guided junior developers within a small team.",
    ],
  },
  {
    company: "Fidus Resource Management",
    role: "Full-stack Developer & Project Manager",
    period: "Apr 2025 - May 2026",
    location: "Remote",
    type: "Contract",
    highlights: [
      "Handled vague scoping and evolving requirements through Agile workflows and rapid communication cycles.",
      "Built software with enterprise-grade scalability and long-term maintainability.",
      "Integrated AI capabilities and external technologies into core product workflows.",
      "Tracked project progress using project management tools to provide clear visibility into deliverables.",
    ],
  },
];

export const contact = {
  heading: "Let's build something together.",
  subheading:
    "Whether it's a complex engineering challenge, a team that needs leadership, or a product that needs a clear technical vision — I'm interested.",
  cta: "Send a Message",
};
