import { Home, Layers, Briefcase, Info, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function LimelightNav() {
  const [activeTab, setActiveTab] = useState("Home");

  useEffect(() => {
    // Basic intersection observer could be used here to update active tab based on scroll
    // For simplicity, we just bind the click
  }, []);

  const tabs = [
    { id: "Home", icon: Home, hash: "#home" },
    { id: "Services", icon: Layers, hash: "#services" },
    { id: "Portfolio", icon: Briefcase, hash: "#portfolio" },
    { id: "About", icon: Info, hash: "#about" },
    { id: "Contact", icon: MessageCircle, hash: "#contact" },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string, id: string) => {
    e.preventDefault();
    setActiveTab(id);
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#111111] border-t border-[#222222] pb-safe-area pt-2 px-4 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.8)]">
      <div className="flex justify-between items-center max-w-md mx-auto relative pb-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <a
              key={tab.id}
              href={tab.hash}
              onClick={(e) => handleClick(e, tab.hash, tab.id)}
              className="relative flex flex-col items-center justify-center w-14 h-14"
            >
              <tab.icon
                className={`w-6 h-6 transition-colors duration-300 ${
                  isActive ? "text-[#00ff66]" : "text-[#9a9a9a]"
                }`}
              />
              <span className={`text-[10px] mt-1 transition-colors duration-300 ${isActive ? "text-[#00ff66]" : "text-[#9a9a9a]"}`}>
                {tab.id}
              </span>
              {isActive && (
                <motion.div
                  layoutId="limelight-indicator"
                  className="absolute -top-3 w-10 h-1 bg-[#00ff66] rounded-full shadow-[0_0_10px_rgba(0,255,102,0.8)]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
