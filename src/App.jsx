import React, { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProjectDetail from "./components/ProjectDetail";
import { projects } from "./data/content";

export default function App() {
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const handleSelectProject = (id) => {
    setSelectedProjectId(id);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleBack = () => {
    setSelectedProjectId(null);
    setTimeout(() => {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const selectedProject = selectedProjectId
    ? projects.find((p) => p.id === selectedProjectId)
    : null;

  return (
    <ThemeProvider>
      <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text-primary)" }}>
        <Navbar />
        {selectedProject ? (
          <ProjectDetail project={selectedProject} onBack={handleBack} />
        ) : (
          <main>
            <Hero />
            <Skills />
            <Projects onSelectProject={handleSelectProject} />
            <Experience />
            <Contact />
          </main>
        )}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
