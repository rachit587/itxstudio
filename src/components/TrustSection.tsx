import { motion } from "framer-motion";
import { CheckCircle2, Code2, MessagesSquare, Zap } from "lucide-react";

const trustPillars = [
  {
    id: 1,
    title: "100% Custom Built",
    description: "We don't do templates. Every line of code and every pixel is crafted specifically for your brand's unique needs.",
    icon: <Code2 className="w-8 h-8 text-[#00ff66]" />,
  },
  {
    id: 2,
    title: "Pixel-Perfect Precision",
    description: "Our obsessive attention to detail ensures your digital presence looks and feels premium across all devices.",
    icon: <CheckCircle2 className="w-8 h-8 text-[#00ff66]" />,
  },
  {
    id: 3,
    title: "Direct Communication",
    description: "No project managers playing telephone. You speak directly to the engineers building your product.",
    icon: <MessagesSquare className="w-8 h-8 text-[#00ff66]" />,
  },
  {
    id: 4,
    title: "Lightning Fast Performance",
    description: "Speed is a feature. We optimize everything so your site loads instantly, improving both SEO and user experience.",
    icon: <Zap className="w-8 h-8 text-[#00ff66]" />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { ease: [0.25, 0.46, 0.45, 0.94], duration: 0.8 }
  },
};

export default function TrustSection() {
  return (
    <div className="py-24 md:py-32 bg-[#0a0a0a] relative z-10 overflow-hidden flex flex-col justify-center">
      <div className="max-w-[100vw] mx-auto w-full px-4 md:px-8">
        
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ease: [0.25, 0.46, 0.45, 0.94], duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 font-normal tracking-tight"
          >
            Why Brands Trust Us
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94], duration: 0.8 }}
            className="text-[#9a9a9a] text-lg lg:text-xl max-w-2xl mx-auto"
          >
            We let our craftsmanship speak for itself. No shortcuts, no compromises. Just premium digital experiences built to elevate your brand.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto"
        >
          {trustPillars.map((pillar) => (
            <motion.div
              key={pillar.id}
              variants={itemVariants}
              className="group relative bg-[#111111] border border-[#222222] rounded-3xl p-8 md:p-10 overflow-hidden transition-all duration-500 hover:border-[#00ff66]/30 hover:shadow-[0_0_30px_rgba(0,255,102,0.05)]"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00ff66]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="bg-[#1a1a1a] border border-[#222222] w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 ease-out">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl text-white font-medium mb-4">
                  {pillar.title}
                </h3>
                <p className="text-[#9a9a9a] text-base md:text-lg leading-relaxed flex-grow">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
