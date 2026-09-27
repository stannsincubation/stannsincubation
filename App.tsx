import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import { CommercePage } from "./pages/CommercePage";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"landing" | "commerce">("landing");

  const handleNavigate = (page: "landing" | "commerce", sectionId?: string) => {
    setCurrentPage(page);

    if (page === "landing" && sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  // 1. Show Commerce Marketplace Page when active
  if (currentPage === "commerce") {
    return <CommercePage onBackToMain={() => setCurrentPage("landing")} />;
  }

  // 2. Show original landing page in its exact original styling & colors
  return (
    <>
      {/* Floating Glass Navbar */}
      <Navbar currentPage="landing" onNavigate={handleNavigate} />

      {/* Your complete original website */}
      <Index />
    </>
  );
}