// ============================================================
//  PORTFOLIO CONTENT — Edit this file to update everything.
//  No UI needed. Just save and the site reflects your changes.
// ============================================================

export const personal = {
  name: "Marlon Aquino",
  title: "Full-Stack Software Developer",
  tagline: "",
  bio: `
Full-stack developer with 3+ years building software for real operational environments — from industrial
SCADA to healthcare operations. In 2024, I began pursuing software development professionally and
left college to gain real-world experience directly. Worked with the CEO and Senior Developers while
also helping Junior Developers deliver. For an international 100-bed skilled nursing facility, built a
system spanning admissions, resident operations, staffing, and revenue-related MDS workflows —
exposing me to systems where software affects patient operations, compliance, staffing, and revenue.`,
  email: "aquinomarlonjoseph@gmail.com",
  phone: "+63 991 720 5532",
  location: "Pampanga, Philippines",
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
  { value: 3, suffix: "+", label: "Years of Experience" },
  { value: 6, suffix: "+", label: "Projects Delivered" },
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
      { name: "React / Next.js", level: 98 },
      { name: "Vue / Quasar", level: 94 },
      { name: "Javascript / Typescript", level: 95 },
      { name: "MongoDB / NoSQL", level: 92 },
      { name: "Node.js / Elysia.js", level: 91 },
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
      { name: "Roadmap Planning", level: 91 },
      { name: "Risk Management", level: 92 },
      // { name: "OKR Frameworks", level: 80 },
      { name: "Stakeholder Alignment", level: 92 },
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
      { name: "Prototyping", level: 92 },
      { name: "Proper Scoping", level: 92 },
      { name: "Conflict Resolution", level: 90 },
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
      "A full-stack reading productivity platform that turns raw sessions into measurable data — tracking reading speed, managing a personal book library, and capturing insights through summaries, quotes, and vocabulary.",
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
    link: "https://captibookfinal-2.onrender.com/",
    github: null,
    images: [
      "/images/captibook1.png",
      "/images/captibook2.png",
      "/images/captibook3.png",
      "/images/captibook4.png",
    ],
  },
  {
    id: 2,
    title: "Computerized Maintenance Management Software (CMMS)",
    subtitle: "Web Application",
    description:
      "A role-based fleet management system that replaced paper maintenance logs with a centralized live database — covering asset profiles, service records, inspection history, and document storage across multi-site construction operations.",
    tags: ["React", "TypeScript", "Firebase", "Ant Design"],
    role: "Software Developer",
    year: "2023",
    status: "Live",
    featured: true,
    metrics: [
      // { label: "GitHub Stars", value: "2.1k" },
      // { label: "Weekly downloads", value: "18k" },
      // { label: "Contributors", value: "34" },
    ],
    link: "https://cmms-z4xj.onrender.com/",
    github: "https://github.com",
    images: ["/images/cmms.png", "/images/cmms2.png"],
  },
  {
    id: 3,
    title: "AI Companions (Chat)",
    subtitle: "AI Chat Platform",
    description:
      "An invite-only AI companion platform with three distinct personas, configurable personality intensity (1–10 scale), and real-time streaming responses — built with SSE and deployed behind lightweight access control.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI API"],
    role: "Software Developer",
    year: "2025",
    status: "Live",
    featured: true,
    metrics: [
      { label: "Ahead of schedule", value: "6 wks" },
      { label: "Downtime during migration", value: "0" },
      { label: "Performance improvement", value: "4×" },
    ],
    link: "https://aigf-fe.vercel.app/", // ?key=df2fb23702974f8d8f5c2f78d1646b82
    github: null,
    images: ["/images/aicomp.png"],
  },
  {
    id: 4,
    title: "VetDesk",
    subtitle: "Clinic Management",
    description:
      "A full-featured veterinary clinic management platform — patient records for pets and owners, appointment scheduling with vet assignment, vaccination history with due-date tracking, and invoice lifecycle management.",
    tags: ["Next.js", "TypeScript", "Mantine UI", "Tabler Icons"],
    role: "Software Developer",
    year: "2025",
    status: "Live",
    featured: true,
    metrics: [
      { label: "Ahead of schedule", value: "6 wks" },
      { label: "Downtime during migration", value: "0" },
      { label: "Performance improvement", value: "4×" },
    ],
    link: "https://vetdesk-flame.vercel.app/",
    github: null,
    images: ["/images/vet.png", "/images/vetlyt.png"],
  },
  {
    id: 5,
    title: "OSHA Compliance System",
    subtitle: "Compliance Dashboard",
    description:
      "A multi-site OSHA compliance dashboard covering five form types — with live scoring, automated risk flagging, AI-generated audit reports via GPT-4.1, and 5-week trend analytics. Fully static, no backend required.",
    tags: ["React", "TypeScript", "Recharts", "OpenAI API"],
    role: "Software Developer",
    year: "2025",
    status: "Live",
    featured: true,
    metrics: [
      { label: "Ahead of schedule", value: "6 wks" },
      { label: "Downtime during migration", value: "0" },
      { label: "Performance improvement", value: "4×" },
    ],
    link: "https://osha-one.vercel.app/",
    github: null,
    images: ["/images/safeops.png", "/images/safeopslyt.png"],
  },
  {
    id: 6,
    title: "CareOps",
    subtitle: "Healthcare Compliance",
    description:
      "A HIPAA-aware compliance platform for skilled nursing facilities — eight staff roles, automatic PHI redaction by role, AI-powered QAPI reporting, and an append-only audit trail covering every system action.",
    tags: ["React", "SurveyJS", "OpenAI API", "Recharts"],
    role: "Software Developer",
    year: "2025",
    status: "Live",
    featured: true,
    metrics: [
      { label: "Ahead of schedule", value: "6 wks" },
      { label: "Downtime during migration", value: "0" },
      { label: "Performance improvement", value: "4×" },
    ],
    link: "https://round-delta-ten.vercel.app/",
    github: null,
    images: ["/images/careops.png", "/images/careopslyt.png"],
  },
  {
    id: 7,
    title: "CoreSTED",
    subtitle: "Healthcare SNF Operations Platform",
    description:
      "A 100-bed skilled nursing facility operations platform built around real facility workflows — covering patient admissions, resident records, MDS tracking, room & bed management, staff scheduling, and staffing-risk tracking.",
    tags: ["React", "SurveyJS", "OpenAI API", "Claude Code"],
    role: "Software Developer",
    year: "2026",
    status: "Live",
    featured: true,
    metrics: [
      { label: "Facility scale", value: "100 beds" },
      { label: "Workflow areas", value: "6+" },
      { label: "Core operations", value: "Admissions → Staffing" },
    ],
    link: null,
    github: null,
    images: [
      "/images/corested1.png",
      "/images/corested2.png",
      "/images/corested3.png",
      "/images/corested4.png",
    ],
  },
];

export const experience = [
  // {
  //   company: "Desco INC",
  //   role: "Full-Stack Developer",
  //   period: "Jul 2024 - Aug 2024",
  //   location: "Remote",
  //   type: "Contract",
  //   highlights: [
  //     "Developed systems that streamlined operational workflows and improved efficiency.",
  //     "Translated complex functionality into intuitive, user-friendly interfaces.",
  //     "Maintained clean and scalable database structures to support long-term growth.",
  //   ],
  // },
  {
    company: "Information Technology Business Solutions",
    role: "Front-end Developer",
    period: "Oct 2024 - Apr 2025",
    location: "San Fernando City, Pampanga",
    type: "Full-time",
    highlights: [
      "Handled large-scale SCADA systems in an IT company, working directly with the CEO and Senior Developers while also assisting Junior Developers in delivering their work.",
      "Worked on industrial monitoring and control software through rapid prototyping and close collaboration with senior technical and business stakeholders.",
    ],
  },

  {
    company: "SNF Healthcare Nursing Facility",
    role: "Full-stack Developer & Project Manager",
    period: "Apr 2025 - Sep 2026",
    location: "Remote",
    type: "Contract",
    highlights: [
      "Worked directly with an international 100-bed skilled nursing facility, developing a system around its broader operations — from patient admissions and resident records to room and bed management, staff scheduling, and staffing-risk tracking.",
      "Handled evolving requirements and stakeholder feedback across a complex healthcare workflow, taking responsibility for both software development and project coordination while integrating AI and external technologies into the system.",
    ],
  },
];

export const contact = {
  heading: "Let's build something together.",
  subheading:
    "Whether it's a complex engineering challenge, a team that needs leadership, or a product that needs a clear technical vision — I'm interested.",
  cta: "Send a Message",
};
