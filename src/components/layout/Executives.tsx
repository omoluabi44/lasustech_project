"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const executives = [
  { name: "Adekunte Tolu", role: "President", img: "/student_spot_1.png" },
  { name: "Olamide B.", role: "Vice President", img: "/welfare_med_1.png" },
  { name: "Chinedu E.", role: "General Secretary", img: "/welfare_police_1.png" },
  { name: "Fatima A.", role: "Welfare Director", img: "/event_bento_main.png" },
];

export function Executives({ data = [] }: { data?: any[] }) {
  const displayExecs = data.length > 0 ? data : executives;
  return (
    <section className="w-full py-16 md:py-32 bg-sky-50/50 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-20 px-4 md:px-8 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-sky-blue font-medium tracking-[0.2em] uppercase text-[9px] md:text-[10px] flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-sky-blue" />
              The Leadership
              <span className="w-1 h-1 rounded-full bg-sky-blue" />
            </span>
          </div>
          <h2 className="font-sans text-3xl md:text-5xl font-medium text-slate-800 tracking-tighter">
            Executive <span className="text-slate-400 italic font-light">Council</span>
          </h2>
        </motion.div>

        {/* Horizontal scroll strictly on mobile, breaking into 4-column grid on larger screens */}
        <div className="flex flex-row overflow-x-auto snap-x snap-mandatory md:overflow-visible md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 no-scrollbar px-4 md:px-8 pb-4 w-full">
          {displayExecs.map((exe, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col group cursor-pointer shrink-0 w-[85vw] md:w-full snap-center md:snap-align-none"
            >
              {/* Magazine Style Image Crop */}
              <div className="relative w-full aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 shadow-sm border border-sky-100 bg-sky-50">
                <Image
                  src={exe.img || exe.imgUrl || "/student_spot_1.png"}
                  alt={exe.name}
                  fill
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-sky-blue/0 group-hover:bg-sky-blue/10 transition-colors duration-500" />
              </div>

              {/* Permanently Visible Text */}
              <div className="flex flex-col items-center px-2">
                <h3 className="font-sans text-3xl md:text-2xl font-black text-slate-text group-hover:text-sky-blue transition-colors duration-300 tracking-tight">
                  {exe.name}
                </h3>
                <span className="text-sky-deep text-[10px] md:text-xs font-bold uppercase tracking-wider mt-1.5 opacity-80 block">
                  {exe.role}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
