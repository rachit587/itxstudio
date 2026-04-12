import { motion } from "framer-motion";
import { Globe, Code, Smartphone, LayoutDashboard, Zap, Bot } from "lucide-react";
import { LiquidMetalButton } from "./ui/liquid-metal-button";
import { SplineScene } from "./ui/splite";
import { Spotlight } from "./ui/spotlight";

export default function Services() {
  const services = [
    { icon: Globe, title: "Websites", desc: "Clean, fast, professional websites that represent your business online" },
    { icon: Code, title: "Full Stack Applications", desc: "End-to-end web apps with a proper backend, database and real-time features" },
    { icon: Smartphone, title: "Mobile Applications", desc: "Apps your customers can use directly from their phones" },
    { icon: LayoutDashboard, title: "Internal Business Tools", desc: "Custom tools like inventory systems, billing dashboards, employee managers" },
    { icon: Zap, title: "AI Automations", desc: "Automate repetitive tasks — invoices, follow-ups, data entry and more" },
    { icon: Bot, title: "AI Websites & Chatbots", desc: "Smart websites with built-in AI that talks to your customers for you" }
  ];

  return (
    <div className="min-h-[100vh] lg:h-screen w-full flex items-center justify-center overflow-hidden bg-[#0d0d0d] relative z-10 px-4 md:px-12 py-4 lg:py-6 text-center">
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-between relative">
        
        {/* Top: Title */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center shrink-0 pt-4 md:pt-6"
        >
          <h2 className="text-4xl md:text-5xl lg:text-5xl text-white font-normal lowercase" style={{ textTransform: 'capitalize' }}>
            What We Build
          </h2>
        </motion.div>

        {/* Layout container: Left for Spline 3D, Right for Services */}
        <div className="flex-1 w-full my-4 md:my-6 flex flex-col lg:flex-row items-center justify-end relative">
          
          {/* Spline 3D Robot (Left 50%) */}
          <div className="w-full lg:w-[50%] hidden lg:flex items-center justify-center h-full relative">
            <Spotlight
              className="-top-40 left-0 md:left-60 md:-top-20"
              fill="white"
            />
            <div style={{ width: "500px", height: "600px" }}>
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
          
          {/* Right Side Services List (Right 50%) */}
          <div className="w-full lg:w-[50%] flex flex-col gap-[6px] md:gap-2 px-2 md:px-4 shrink-0">
            {services.map((svc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * idx, duration: 0.4 }}
                className="group w-full relative rounded-2xl bg-[#1a1a1a] border border-[#222222] transition-all duration-300 hover:bg-[#00ff66] hover:border-[#00ff66] hover:shadow-[0_0_30px_rgba(0,255,102,0.5)] hover:scale-[1.01] cursor-pointer"
              >
                <div className="px-5 py-[10px] md:py-3">
                  <div className="flex items-center gap-4">
                    <svc.icon className="w-5 h-5 text-[#9a9a9a] group-hover:text-black transition-colors duration-300 shrink-0" strokeWidth={1.5} />
                    <h3 className="text-base md:text-lg text-white group-hover:text-black transition-colors duration-300 m-0 shrink-0 text-left">
                      {svc.title}
                    </h3>
                  </div>
                  {/* Minimized description height optimized to cleanly fit a single screen stack */}
                  <div className="overflow-hidden transition-all duration-300 max-h-0 opacity-0 group-hover:max-h-[50px] group-hover:opacity-100 group-hover:mt-1">
                    <p className="text-black/80 text-xs md:text-sm pl-9 font-medium text-left leading-snug m-0">
                      {svc.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Bottom: Let's Build Together button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center shrink-0 pb-4 md:pb-6 flex justify-center mt-auto"
        >
          <div className="relative group inline-block">
            <div className="absolute inset-0 bg-[#00ff66] opacity-0 group-hover:opacity-10 blur-[30px] transition-opacity duration-500 rounded-full" />
            <LiquidMetalButton
              label="Let's Build Together"
              onClick={() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
