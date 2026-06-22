import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { X, Quote } from "lucide-react";

type Review = {
  id: number;
  name: string;
  avatar: string;
  text: string;
};

const reviews: Review[] = [
  { id: 1, name: "Rahul Sharma", avatar: "https://randomuser.me/api/portraits/men/32.jpg", text: "The attention to detail is unmatched. They built exactly what we needed without any unnecessary complexity. The final product exceeded our expectations." },
  { id: 2, name: "Priya Patel", avatar: "https://randomuser.me/api/portraits/women/44.jpg", text: "Communication was crystal clear from day one. I knew exactly where my project stood at all times. Working directly with the engineers made a huge difference." },
  { id: 3, name: "Amit Kumar", avatar: "https://randomuser.me/api/portraits/men/45.jpg", text: "Finally, a studio that doesn't rely on templates. Our website feels truly unique, and the performance optimizations are incredible. It loads instantly." },
  { id: 4, name: "Neha Singh", avatar: "https://randomuser.me/api/portraits/women/68.jpg", text: "They completely transformed our digital presence. The new design is sleek, modern, and perfectly captures our brand. Highly recommended." },
  { id: 5, name: "Vikram Desai", avatar: "https://randomuser.me/api/portraits/men/22.jpg", text: "Professional, efficient, and incredibly talented. Worth every penny for the premium quality they deliver. The ROI was almost immediate." },
  { id: 6, name: "Anjali Gupta", avatar: "https://randomuser.me/api/portraits/women/12.jpg", text: "I was impressed by how they handled complex requirements. They made the difficult seem effortless and delivered a flawless user experience." },
  { id: 7, name: "Rohan Mehta", avatar: "https://randomuser.me/api/portraits/men/75.jpg", text: "The performance improvements are day and night. Our bounce rate dropped significantly after the redesign, and user engagement skyrocketed." },
  { id: 8, name: "Kavita Reddy", avatar: "https://randomuser.me/api/portraits/women/10.jpg", text: "No hidden costs or surprises. The pricing is completely fair, and the results speak for themselves. An absolute pleasure to work with." },
  { id: 9, name: "Sanjay Joshi", avatar: "https://randomuser.me/api/portraits/men/11.jpg", text: "It felt like working with an internal team. They really took the time to understand our business goals before writing a single line of code." },
  { id: 10, name: "Sneha Rao", avatar: "https://randomuser.me/api/portraits/women/20.jpg", text: "A premium experience from start to finish. The animations are buttery smooth and the layout is spotless. I wouldn't hesitate to work with them again." },
];

function Marquee({ items, onItemClick }: { items: Review[], onItemClick: (item: Review) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const hasDragged = useRef(false);
  const isPaused = useRef(false);
  const speedRef = useRef(0.6); 

  useEffect(() => {
    let rafId: number;
    const el = scrollRef.current;
    if (!el) return;

    const tick = () => {
      if (!isDragging.current && !isPaused.current && el) {
        el.scrollLeft += speedRef.current;
        const halfWidth = el.scrollWidth / 2;
        if (el.scrollLeft >= halfWidth) {
          el.scrollLeft -= halfWidth;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollRef.current?.scrollLeft || 0;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current.offsetLeft || 0);
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(walk) > 5) hasDragged.current = true;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollRef.current?.scrollLeft || 0;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const x = e.touches[0].pageX - (scrollRef.current.offsetLeft || 0);
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(walk) > 5) hasDragged.current = true;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleCardClick = useCallback((item: Review) => {
    if (!hasDragged.current) {
      onItemClick(item);
    }
  }, [onItemClick]);

  const allItems = [...items, ...items];

  return (
    <div
      ref={scrollRef}
      className="relative w-full overflow-x-auto h-[320px] md:h-[350px] flex items-center bg-[#0a0a0a] cursor-grab active:cursor-grabbing select-none"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => { isDragging.current = false; isPaused.current = false; }}
      onMouseEnter={() => { isPaused.current = true; }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex w-max space-x-6 md:space-x-8 px-6 md:px-8 py-8">
        {allItems.map((review, index) => (
          <motion.div
            key={`${review.id}-${index}`}
            onClick={() => handleCardClick(review)}
            whileHover={{ y: -5 }}
            className="relative flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px] h-[220px] md:h-[240px] rounded-2xl bg-[#111111] border border-[#222222] p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#00ff66]/50 hover:shadow-[0_0_30px_rgba(0,255,102,0.1)] group/card"
          >
            <Quote className="absolute top-6 right-6 w-8 h-8 text-[#222222] group-hover/card:text-[#00ff66]/20 transition-colors duration-300" />
            <p className="text-[#9a9a9a] text-sm md:text-base leading-relaxed line-clamp-4 italic relative z-10">
              "{review.text}"
            </p>
            <div className="flex items-center gap-4 mt-4">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-12 h-12 rounded-full border-2 border-[#222222] object-cover pointer-events-none"
                loading="lazy"
                draggable={false}
              />
              <p className="text-white text-base md:text-lg font-medium">
                {review.name}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const openReview = (review: Review) => {
    setSelectedReview(review);
    document.body.style.overflow = "hidden";
  };

  const closeReview = () => {
    setSelectedReview(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="py-24 bg-[#0a0a0a] relative z-20 flex flex-col items-center justify-center min-h-[80vh] overflow-hidden">
      <div className="text-center mb-10 md:mb-16 px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease: [0.25, 0.46, 0.45, 0.94], duration: 0.7 }}
          className="text-4xl md:text-5xl lg:text-6xl text-white mb-4 tracking-tight"
        >
          What People Say
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-[#9a9a9a] text-lg lg:text-xl"
        >
          Hover or tap to pause. Click to read the full story.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        <Marquee items={reviews} onItemClick={openReview} />
      </motion.div>

      {/* Review Detail Modal */}
      <AnimatePresence>
        {selectedReview && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeReview}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#111111] border border-[#222222] rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col items-center text-center"
            >
              <button 
                onClick={closeReview}
                className="absolute top-4 right-4 z-20 text-[#9a9a9a] hover:text-white transition-colors p-2"
              >
                <X className="w-6 h-6" />
              </button>

              <Quote className="w-12 h-12 text-[#00ff66]/20 mb-6" />
              
              <p className="text-white text-lg md:text-2xl leading-relaxed italic mb-8">
                "{selectedReview.text}"
              </p>
              
              <div className="flex flex-col items-center gap-3">
                <img
                  src={selectedReview.avatar}
                  alt={selectedReview.name}
                  className="w-16 h-16 rounded-full border-2 border-[#00ff66] object-cover"
                />
                <p className="text-[#00ff66] text-lg font-medium">
                  {selectedReview.name}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
