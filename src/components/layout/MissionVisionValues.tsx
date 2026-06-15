"use client";
import { motion } from "framer-motion";

const blocks = [
  {
    title: "Our Mission",
    desc: "To relentlessly engineer opportunities for every student, ensuring academic excellence and unyielding welfarism.",
    color: "bg-white border-sky-100"
  },
  {
    title: "The Vision",
    desc: "A globally recognized student body that champions innovation, transparency, and progressive leadership.",
    color: "bg-white border-sky-100"
  },
  {
    title: "Core Values",
    desc: "Integrity. Kinetic action. Radical transparency. We don't just speak; we execute with precision.",
    color: "bg-white border-sky-100"
  }
];

export function MissionVisionValues({ data = [] }: { data?: any[] }) {
  const displayBlocks = data.length > 0 ? data : blocks;
  return (
    <section className="w-full py-16 md:py-32 bg-sky-50/50 relative z-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {displayBlocks.map((block, i) => (
            <motion.div
              key={block.id || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className={`p-10 md:p-12 rounded-[2rem] border shadow-sm transition-all hover:shadow-md hover:-translate-y-1 duration-500 flex flex-col justify-end min-h-[300px] ${block.color || 'bg-white border-sky-100'}`}
            >
              <div className="mb-auto">
                 <div className="w-1.5 h-1.5 rounded-full bg-sky-blue mb-4" />
              </div>
              <h3 className="font-sans text-2xl md:text-3xl font-medium text-slate-800 tracking-tighter mb-4">{block.title}</h3>
              <p className="text-slate-500 leading-relaxed font-light text-sm md:text-base">
                {block.description || block.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

