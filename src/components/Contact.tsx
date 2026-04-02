import { motion } from "framer-motion";
import { MessageCircle, Mail } from "lucide-react";
import { LiquidMetalButton } from "./ui/liquid-metal-button";

export default function Contact() {
  return (
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden px-4 md:px-8 py-32 z-10">
      {/* Background glow coming from bottom center */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_bottom_center,rgba(0,255,102,0.05)_0%,transparent_70%)] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 relative z-20"
      >
        <h2 className="text-5xl md:text-6xl lg:text-7xl text-white mb-6">
          Ready to go digital?
        </h2>
        <p className="text-[#9a9a9a] text-xl md:text-2xl">
          We're one message away.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-20 w-full"
      >
        <a 
          href="https://wa.me/918167558126" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex flex-row items-center gap-3 bg-[#00ff66] text-black font-bold text-lg md:text-xl px-8 py-4 md:py-3 md:h-[50px] rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,255,102,0.3)] min-w-[200px] justify-center"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          Chat on WhatsApp
        </a>

        <div className="hidden md:block">
          <LiquidMetalButton 
            label="Send an Email"
            onClick={() => window.location.href = "mailto:itxstudio.com@gmail.com"}
          />
        </div>
        
        <div className="block md:hidden w-full max-w-[280px]">
          <a
            href="mailto:itxstudio.com@gmail.com"
            className="group flex flex-row items-center justify-center gap-3 bg-[#111111] border border-[#222222] text-[#9a9a9a] text-lg px-8 py-4 rounded-full transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
            Send an Email
          </a>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-12 relative z-20"
      >
        <a 
          href="mailto:itxstudio.com@gmail.com"
          className="text-[#9a9a9a] text-sm md:text-base italic hover:text-[#00ff66] transition-colors"
        >
          or write to us at itxstudio.com@gmail.com
        </a>
      </motion.div>
    </div>
  );
}
