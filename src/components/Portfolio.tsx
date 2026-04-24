import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  images: string[];
};

const projects: Project[] = [
  {
    id: 1,
    title: "Apex CRM",
    category: "Internal Tool",
    description: "A custom Customer Relationship Management dashboard built for a real estate agency to track leads, schedule follow-ups, and monitor sales performance with real-time analytics.",
    images: ["/portfolio/crm_1_1777039070641.png", "/portfolio/crm_2_1777039090461.png"],
  },
  {
    id: 2,
    title: "Stockify Manager",
    category: "Internal Tool",
    description: "A modern inventory management system built for a retail chain. Features include automated stock level tracking, low stock alerts, and comprehensive product history logs.",
    images: ["/portfolio/inventory_1_1777039107802.png", "/portfolio/inventory_2_1777039126667.png"],
  },
  {
    id: 3,
    title: "PeopleOps Hub",
    category: "Internal Tool",
    description: "A streamlined HR and payroll dashboard allowing HR managers to seamlessly track employee attendance, manage benefits, and process automated payrolls securely.",
    images: ["/portfolio/hr_1_1777039141968.png", "/portfolio/hr_2_1777039163348.png"],
  },
  {
    id: 4,
    title: "DataSphere",
    category: "Internal Tool",
    description: "A high-tech data analytics platform designed for a financial firm, featuring complex interactive visualizations, predictive heatmaps, and geographic data plotting.",
    images: ["/portfolio/analytics_1_1777039178475.png", "/portfolio/analytics_2_1777039194178.png"],
  },
  {
    id: 5,
    title: "FleetTrack Pro",
    category: "Internal Tool",
    description: "A comprehensive logistics and fleet tracking application that provides real-time GPS positioning of delivery trucks, route optimization, and shipment status.",
    images: ["/portfolio/logistics_1_1777039210894.png", "/portfolio/logistics_2_1777039230212.png"],
  },
  {
    id: 6,
    title: "The Azure Resort",
    category: "Hotel Website",
    description: "A stunning, luxurious resort website featuring high-end web design, elegant typography, and a seamless online room booking experience for premium suites.",
    images: ["/portfolio/hotel1_1_1777039253265.png", "/portfolio/hotel1_2_1777039271169.png"],
  },
  {
    id: 7,
    title: "Maison Boutique",
    category: "Hotel Website",
    description: "A chic and trendy boutique hotel website. The minimalistic UI showcases their stylish interior, spa amenities, and wellness center with effortless navigation.",
    images: ["/portfolio/hotel2_1_1777039287687.png", "/portfolio/hotel2_2_1777039306023.png"],
  },
  {
    id: 8,
    title: "L'Epicure",
    category: "Restaurant Website",
    description: "An elegant, dark-themed fine dining restaurant website displaying exquisite gourmet dishes, an interactive menu with wine pairings, and reservation capabilities.",
    images: ["/portfolio/restaurant_1_1777039323253.png", "/portfolio/restaurant_2_1777039347169.png"],
  },
  {
    id: 9,
    title: "SmileCare Clinic",
    category: "Dentist Website",
    description: "A modern and trustworthy dental clinic website providing a clean user interface for patients to view services, meet the team, and easily book available timeslots online.",
    images: ["/portfolio/dentist_1_1777039362193.png", "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=2000"],
  },
  {
    id: 10,
    title: "Nova AI",
    category: "Custom AI Startup",
    description: "A futuristic custom-built website for an AI startup, featuring dark mode aesthetics, interactive 3D elements, and an integrated natural language processing chatbot.",
    images: ["https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=2000", "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000"],
  },
];

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Auto-scroll logic inside the modal
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (selectedProject) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [selectedProject]);

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
    }
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev === 0 ? selectedProject.images.length - 1 : prev - 1));
    }
  };

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    // Lock body scroll
    document.body.style.overflow = "hidden";
  };

  const closeProject = () => {
    setSelectedProject(null);
    // Restore body scroll
    document.body.style.overflow = "auto";
  };

  return (
    <div className="min-h-[80vh] py-16 md:py-20 bg-[#0a0a0a] relative z-10 overflow-hidden flex flex-col justify-center">
      <div className="max-w-[100vw] mx-auto w-full">
        
        <div className="text-center mb-10 md:mb-12 px-4 md:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl md:text-5xl lg:text-6xl text-white capitalize mb-4 font-normal"
          >
            Some Of Our Best Work
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-[#9a9a9a] text-lg lg:text-xl"
          >
            Hover or tap to pause. Click to explore.
          </motion.p>
        </div>

        {/* Infinite Scroll Marquee */}
        <div className="relative w-full overflow-hidden h-[300px] md:h-[400px] flex items-center bg-[#0a0a0a] group cursor-pointer">
          <div className="flex w-max animate-marquee space-x-6 md:space-x-8 px-6 md:px-8">
            {/* Render projects array twice for seamless infinite scrolling */}
            {[...projects, ...projects].map((project, index) => (
              <div 
                key={`${project.id}-${index}`}
                onClick={() => openProject(project)}
                className="relative flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px] aspect-video rounded-2xl bg-[#111111] border border-[#222222] overflow-hidden transition-all duration-300 hover:border-[#00ff66]/50 hover:shadow-[0_0_30px_rgba(0,255,102,0.15)] group/card"
              >
                <img 
                  src={project.images[0]} 
                  alt={project.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 transition-transform duration-300 group-hover/card:translate-y-0">
                  <p className="text-[#00ff66] text-xs uppercase tracking-widest font-bold mb-1">
                    {project.category}
                  </p>
                  <h3 className="text-white text-2xl font-medium">
                    {project.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProject}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl bg-[#111111] border border-[#222222] rounded-3xl overflow-hidden flex flex-col shadow-2xl"
            >
              <button 
                onClick={closeProject}
                className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image Carousel */}
              <div className="relative w-full aspect-video bg-[#0a0a0a] group/carousel overflow-hidden touch-pan-y">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentImageIndex}
                    src={selectedProject.images[currentImageIndex]}
                    alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </AnimatePresence>
                
                {/* Carousel Controls */}
                {selectedProject.images.length > 1 && (
                  <>
                    <button 
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#00ff66] text-white hover:text-black p-3 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-all backdrop-blur-md"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#00ff66] text-white hover:text-black p-3 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-all backdrop-blur-md"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedProject.images.map((_, idx) => (
                        <div 
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentImageIndex ? "bg-[#00ff66] w-6" : "bg-white/30"}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Description Section */}
              <div className="p-6 md:p-10 bg-[#111111]">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div>
                    <p className="text-[#00ff66] text-sm uppercase tracking-widest font-bold mb-2">
                      {selectedProject.category}
                    </p>
                    <h3 className="text-3xl md:text-4xl text-white font-medium mb-4">
                      {selectedProject.title}
                    </h3>
                  </div>
                  <div className="max-w-2xl text-[#9a9a9a] text-base md:text-lg leading-relaxed">
                    <p>{selectedProject.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
