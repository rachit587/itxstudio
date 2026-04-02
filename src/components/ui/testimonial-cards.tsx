import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/150?img=12",
    text: `"ITX Studio built our hotel's website in under a week. The design is stunning and we've already seen a 30% increase in direct bookings. Worth every rupee."`,
    author: "Ramesh Agarwal — Owner, Hotel Shree Palace, Rampurhat",
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/150?img=27",
    text: `"They built us a custom inventory management system that our whole team now uses daily. Simple, fast, and exactly what we needed. No unnecessary features, just pure value."`,
    author: "Priya Mehta — Operations Head, Mehta Industrial Supplies",
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/150?img=45",
    text: `"I was skeptical at first, but the team delivered a full web application for my clinic that handles appointments and patient records. Absolutely professional."`,
    author: "Dr. Ankit Sharma — Dental Surgeon, Rampurhat",
  },
];

const CARD_OFFSET = 10;
const SCALE_FACTOR = 0.06;

export function ShuffleCards() {
  const [cards, setCards] = useState<Testimonial[]>(testimonials);

  const moveToEnd = (id: number) => {
    setCards((prev) => {
      const idx = prev.findIndex((card) => card.id === id);
      const activeCard = prev[idx];
      const newArray = [...prev];
      newArray.splice(idx, 1);
      newArray.push(activeCard);
      return newArray;
    });
  };

  return (
    <div className="relative flex items-center justify-center w-full max-w-[400px] h-[350px] md:h-[400px] mx-auto perspective-1200">
      {cards.map((card, index) => {
        const isFront = index === 0;
        return (
          <TestimonialCard
            key={card.id}
            card={card}
            index={index}
            isFront={isFront}
            moveToEnd={() => moveToEnd(card.id)}
          />
        );
      })}
    </div>
  );
}

function TestimonialCard({
  card,
  index,
  isFront,
  moveToEnd,
}: {
  card: Testimonial;
  index: number;
  isFront: boolean;
  moveToEnd: () => void;
}) {
  const x = useMotionValue(0);
  const dragProgress = useTransform(x, [-150, 0, 150], [1, 0, 1]);
  
  const handleDragEnd = (_: any, info: any) => {
    if (Math.abs(info.offset.x) > 100) {
      moveToEnd();
    } else {
      x.set(0);
    }
  };

  return (
    <motion.div
      style={{ x }}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={{
        scale: 1 - index * SCALE_FACTOR + dragProgress.get() * SCALE_FACTOR,
        y: index * CARD_OFFSET - dragProgress.get() * CARD_OFFSET,
        zIndex: 10 - index,
        rotateZ: index % 2 === 0 ? index * 2 : -index * 2,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`absolute w-full h-[320px] md:h-[350px] p-8 md:p-10 rounded-3xl bg-[#111111] border border-[#222222] shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex flex-col justify-between cursor-grab active:cursor-grabbing origin-bottom`}
    >
      <div className="flex-1">
        <p className="text-[#9a9a9a] text-lg md:text-xl leading-relaxed italic">
          {card.text}
        </p>
      </div>
      <div className="flex items-center gap-4 mt-6">
        <img
          src={card.avatar}
          alt={card.author}
          className="w-12 h-12 rounded-full border-2 border-[#222222] object-cover pointer-events-none"
        />
        <div className="flex-1">
          <p className="text-[#00ff66] text-sm md:text-base font-medium leading-tight">
            {card.author}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
