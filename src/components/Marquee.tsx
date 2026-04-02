const ITEMS = [
  "ITX Studio",
  "Full Stack Development",
  "AI Automations",
  "Internal Business Tools",
  "One-Time Fee",
  "Built For You"
];

export default function Marquee() {
  const repeatedItems = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS]; // Enough for infinite scroll illusion

  return (
    <div className="w-full h-[52px] bg-[#111111] overflow-hidden whitespace-nowrap flex items-center shadow-inner relative z-20 border-y border-[#222222]">
      <div className="inline-block" style={{ animation: "marquee 150s linear infinite" }}>
        {repeatedItems.map((item, i) => (
          <span key={i} className="inline-flex items-center text-[#9a9a9a] uppercase tracking-[0.12em] text-[12px] font-delius mx-4">
            {item}
            <span className="text-[#00ff66] mx-8">·</span>
          </span>
        ))}
        {repeatedItems.map((item, i) => (
          <span key={`repeat-${i}`} className="inline-flex items-center text-[#9a9a9a] uppercase tracking-[0.12em] text-[12px] font-delius mx-4">
            {item}
            <span className="text-[#00ff66] mx-8">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
