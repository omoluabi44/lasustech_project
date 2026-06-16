"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const students = [
  { id: 1, name: "Sarah O.", talent: "AI Developer", quote: "Building models that solve real campus problems.", img: "/student_spot_1.png" },
  { id: 2, name: "Michael T.", talent: "Acclaimed Author", quote: "Words have the power to engineer movements.", img: "/welfare_med_1.png" },
  { id: 3, name: "David K.", talent: "Community Leader", quote: "Unity and resilience define our generation.", img: "/welfare_police_1.png" },
  { id: 4, name: "Aisha M.", talent: "Star Athlete", quote: "Pushing limits on the track and in the classroom.", img: "/event_bento_main.png" }
];

export function StudentSpotlight({ data = [] }: { data?: any[] }) {
  const displayStudents = data.length > 0 ? data : students;
  const [activeItem, setActiveItem] = useState(1);

  return (
    <section className="w-full py-16 md:py-32 bg-sky-50/50 relative z-10 border-y border-sky-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-10 md:mb-16 px-4 md:px-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sky-blue font-medium tracking-[0.2em] uppercase text-[9px] md:text-[10px] flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-sky-blue" />
              Excellence Amplified
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-sans text-3xl md:text-5xl font-medium text-slate-800 tracking-tighter">
              Student <span className="text-slate-400 italic font-light">Spotlight</span>
            </h2>
            <p className="text-slate-500 max-w-sm text-sm font-light leading-relaxed">
              Meet the trailblazers redefining what it means to be a student at our institution.
            </p>
          </div>
        </motion.div>

        {/* Desktop: Expanding Flex Accordion */}
        <div className="hidden md:flex h-[500px] lg:h-[600px] w-full gap-4 relative">
          {displayStudents.map((stu) => {
            const isActive = activeItem === stu.id;
            return (
              <div
                key={stu.id}
                onMouseEnter={() => setActiveItem(stu.id)}
                className={`relative rounded-3xl overflow-hidden cursor-pointer bg-slate-900 transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'flex-[4] shadow-2xl' : 'flex-[1] shadow-none'}`}
              >
                <Image 
                  src={stu.img || stu.imgUrl || "/student_spot_1.png"} 
                  alt={stu.name} 
                  fill 
                  sizes="(max-width: 768px) 85vw, 25vw"
                  className={`object-cover transition-transform duration-[2000ms] ${isActive ? 'scale-100' : 'scale-110 opacity-60'}`} 
                  priority 
                />
                
                <div className={`absolute inset-0 transition-opacity duration-700 ${isActive ? 'bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent' : 'bg-slate-900/50'}`} />
                
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                   <div className="w-full relative h-[100px]">
                      
                      {/* Vertical text for inactive panels */}
                      <div
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 origin-bottom -rotate-90 whitespace-nowrap text-white font-bold tracking-[0.2em] uppercase text-sm transition-all duration-500 ${isActive ? 'opacity-0 pointer-events-none translate-y-10' : 'opacity-100 translate-y-2'}`}
                      >
                         {stu.talent}
                      </div>
                      
                      {/* Full content for active panel */}
                      <div
                        className={`absolute bottom-0 left-0 w-full transition-all duration-700 transform ${isActive ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-10 pointer-events-none'}`}
                      >
                         <span className="px-4 py-1.5 text-xs font-bold tracking-wider uppercase bg-sky-blue/20 backdrop-blur-md rounded-full text-sky-100 border border-sky-blue/30 mb-4 inline-block">
                           {stu.talent}
                         </span>
                         <h3 className="font-sans text-4xl lg:text-5xl font-black text-white mb-3 tracking-tight">{stu.name}</h3>
                         <p className="text-sky-100/90 italic max-w-md border-l-2 border-sky-400 pl-4 py-1 text-sm lg:text-base">
                           "{stu.quote}"
                         </p>
                         <div className="mt-4">
                           {stu.id && typeof stu.id === 'number' && stu.id > 10 ? (
                             <Link href={`/spotlight/${stu.id}`} className="text-sm font-semibold text-white bg-sky-blue px-4 py-2 rounded-full hover:bg-sky-500 transition-colors inline-block">Read Full Story</Link>
                           ) : (
                             <span className="text-sm font-semibold text-white/50 px-4 py-2 border border-white/20 rounded-full inline-block">Preview Only</span>
                           )}
                         </div>
                      </div>

                   </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Layout: Ultra-premium horizontal swipe. */}
        <div className="flex md:hidden flex-row gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 -mx-4 px-4 w-[calc(100%+2rem)]">
           {displayStudents.map((stu) => (
             <div key={stu.id} className="relative w-[85vw] h-[450px] rounded-3xl overflow-hidden shrink-0 snap-center shadow-lg border border-sky-100">
                <Image src={stu.img || stu.imgUrl || "/student_spot_1.png"} alt={stu.name} fill sizes="85vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent" />
                
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <span className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-sky-blue/20 backdrop-blur-md rounded-full text-sky-100 border border-sky-blue/30 mb-4 inline-block">
                     {stu.talent}
                  </span>
                  <h3 className="font-sans text-3xl font-black text-white mb-3 tracking-tight">{stu.name}</h3>
                  <p className="text-sky-100/90 italic text-sm border-l-2 border-sky-400 pl-3 py-1 mb-4">
                     "{stu.quote}"
                  </p>
                  {stu.id && typeof stu.id === 'number' && stu.id > 10 ? (
                    <Link href={`/spotlight/${stu.id}`} className="text-xs font-semibold text-white bg-sky-blue px-4 py-2 rounded-full hover:bg-sky-500 transition-colors inline-block">Read Full Story</Link>
                  ) : (
                    <span className="text-xs font-semibold text-white/50 px-4 py-2 border border-white/20 rounded-full inline-block">Preview Only</span>
                  )}
                </div>
             </div>
           ))}
        </div>

      </div>
    </section>
  );
}
