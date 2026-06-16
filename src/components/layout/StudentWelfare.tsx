"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const staticWelfares = [
  { id: 1, title: 'Medical aid & intervention', desc: 'We coordinate immediate medical aid and financial assistance. The union operates a 24/7 rapid response framework ensuring no student faces a health crisis alone.', img: '/welfare_med_1.png' },
  { id: 2, title: 'Legal & security defense', desc: 'Unjust profiling, harassment, or off-campus security threats are met with immediate union intervention. Our task force ensures student rights are rigidly protected.', img: '/welfare_police_1.png' }
];

export function StudentWelfare({ data = [] }: { data?: any[] }) {
  const displayWelfares = data.length > 0 ? data : staticWelfares;

  return (
    <section className="w-full py-16 md:py-32 bg-sky-50/50 relative z-10 border-y border-sky-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-20 px-4 md:px-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sky-blue font-medium tracking-[0.2em] uppercase text-[9px] md:text-[10px] flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-sky-blue" />
              Protection Policy
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-sans text-3xl md:text-5xl font-medium text-slate-800 tracking-tighter">
              Student <span className="text-slate-400 italic font-light">Welfare</span>
            </h2>
            <p className="text-slate-500 max-w-sm text-sm font-light leading-relaxed">
              We provide immediate intervention for medical emergencies, legal conflicts, and direct institutional support.
            </p>
          </div>
        </motion.div>

        {/* Mobile Horizontal Scroll */}
        <div className="flex flex-row overflow-x-auto snap-x snap-mandatory md:overflow-visible md:grid md:grid-cols-2 gap-6 md:gap-10 no-scrollbar px-4 md:px-8 pb-4 w-full">
          
          {displayWelfares.map((wf, i) => (
            <motion.div
              key={wf.id || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col rounded-3xl overflow-hidden shrink-0 w-[85vw] md:w-full snap-center md:snap-align-none group cursor-default"
            >
              <div className="relative w-full h-[250px] md:h-[350px] rounded-3xl overflow-hidden mb-6">
                <Image src={wf.img || wf.imgUrl || "/welfare_med_1.png"} alt={wf.title} fill sizes="(max-width: 768px) 85vw, 50vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <div className="px-2">
                <h3 className="font-sans text-xl md:text-2xl font-semibold text-slate-800 mb-3 tracking-tight">{wf.title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed mb-4">
                  {wf.desc || wf.description}
                </p>
                {wf.id && typeof wf.id === 'number' && wf.id > 10 ? (
                  <Link href={`/welfare/${wf.id}`} className="text-xs font-semibold text-sky-blue hover:text-sky-deep flex items-center gap-1 transition-colors">Read Details &rarr;</Link>
                ) : (
                  <span className="text-xs font-semibold text-slate-300">Preview Only</span>
                )}
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
