import { motion } from "framer-motion";
import { ShuffleCards } from "./ui/testimonial-cards";

export default function Testimonials() {
  return (
    <div className="py-24 bg-[#0a0a0a] relative z-20 flex flex-col items-center justify-center min-h-[80vh]">
      <div className="text-center mb-16 px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl text-white mb-4"
        >
          what people say
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#9a9a9a] text-lg lg:text-xl"
        >
          Trusted by businesses and individuals.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        <ShuffleCards />
        
        <p className="text-[#9a9a9a] text-sm italic text-center mt-8">
          drag to explore &rarr;
        </p>
      </motion.div>
    </div>
  );
}
