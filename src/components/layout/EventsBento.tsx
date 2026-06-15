"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const upcomingEvents = [
  {
    title: "The Impact Day Symposium",
    category: "Academic",
    date: "Aug 24, 2026",
    desc: "A comprehensive gathering uniting industry leaders and student innovators. Don't miss this landmark event.",
    img: "/event_bento_main.png"
  },
  {
    title: "Leadership Workshop",
    category: "Upcoming",
    date: "Sep 12, 2026",
    desc: "Building the next Gen. An exclusive workshop for class representatives and faculty presidents.",
    img: "/welfare_med_1.png"
  }
];

const pastEvents = [
  {
    title: "Campus Fiesta Unplugged",
    category: "Social",
    date: "July 10, 2026",
    desc: "A night of pure kinetic energy. The ultimate student gathering to unwind after exams.",
    img: "/welfare_police_1.png"
  },
  {
    title: "Tech Innovation Hackathon",
    category: "Academic",
    date: "June 05, 2026",
    desc: "36 hours of relentless coding, problem solving, and networking by top engineering students.",
    img: "/student_spot_1.png"
  }
];

function EventCard({ event, large = false }: { event: any, large?: boolean }) {
  return (
    <div className={`relative rounded-3xl overflow-hidden group border border-sky-100/50 shadow-sm shrink-0 snap-center md:snap-align-none bg-white w-[85vw] md:w-full ${large ? 'h-[350px] md:h-[400px]' : 'h-[250px] md:h-[300px]'}`}>
      <Image src={event.img || event.imgUrl} alt={event.title} fill sizes="(max-width: 768px) 85vw, 50vw" className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
      
      <div className="absolute top-5 left-5 md:top-6 md:left-6 flex gap-2">
        <span className="px-3 py-1 text-[9px] md:text-[10px] font-medium tracking-wide bg-white/90 backdrop-blur-md rounded-full text-slate-800">{event.category}</span>
        <span className="px-3 py-1 text-[9px] md:text-[10px] font-medium tracking-wide bg-slate-900/80 backdrop-blur-md rounded-full text-white/90">{event.date}</span>
      </div>

      <div className="absolute bottom-0 left-0 p-5 md:p-8 w-full transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 transition-transform duration-500 ease-out">
        <h3 className={`font-sans font-semibold text-white mb-2 leading-[1.1] tracking-tight ${large ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}>{event.title}</h3>
        <p className="text-white/70 max-w-xl text-xs md:text-sm md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 font-light line-clamp-2 md:line-clamp-none">
          {event.desc}
        </p>
      </div>
    </div>
  );
}

export function EventsBento({ data = [] }: { data?: any[] }) {
  const dynamicUpcoming = data.filter(e => !e.isPast);
  const dynamicPast = data.filter(e => e.isPast);
  
  const displayUpcoming = dynamicUpcoming.length > 0 ? dynamicUpcoming : upcomingEvents;
  const displayPast = dynamicPast.length > 0 ? dynamicPast : pastEvents;
  return (
    <section className="w-full py-16 md:py-24 bg-sky-50/50 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
      
      {/* Upcoming Events */}
      <div className="mb-16">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 md:mb-10 text-left px-4 md:px-8"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-[1px] w-6 bg-sky-blue/40" />
              <span className="text-sky-blue font-medium tracking-[0.2em] uppercase text-[9px] md:text-[10px]">Active</span>
            </div>
            <h2 className="font-sans text-3xl md:text-5xl font-medium text-slate-800 tracking-tighter">
              Upcoming <span className="text-slate-400 italic font-light">Events</span>
            </h2>
          </motion.div>

          {/* Horizontal scroll */}
          <div className="flex flex-row gap-4 overflow-x-auto snap-x snap-mandatory md:overflow-visible md:grid md:grid-cols-2 no-scrollbar px-4 md:px-8 pb-4 w-full">
             {displayUpcoming[0] && <EventCard event={displayUpcoming[0]} large />}
             {displayUpcoming[1] && <EventCard event={displayUpcoming[1]} large />}
          </div>
      </div>

      {/* Past Events */}
      <div>
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 md:mb-10 text-left px-4 md:px-8"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-[1px] w-6 bg-slate-300/60" />
              <span className="text-slate-500 font-medium tracking-[0.2em] uppercase text-[9px] md:text-[10px]">Archive</span>
            </div>
            <h2 className="font-sans text-3xl md:text-5xl font-medium text-slate-800 tracking-tighter">
              Past <span className="text-slate-400 italic font-light">Records</span>
            </h2>
          </motion.div>

          <div className="flex flex-row gap-4 overflow-x-auto snap-x snap-mandatory md:overflow-visible md:grid md:grid-cols-2 no-scrollbar px-4 md:px-8 pb-4 w-full">
             {displayPast[0] && <EventCard event={displayPast[0]} />}
             {displayPast[1] && <EventCard event={displayPast[1]} />}
          </div>
      </div>

      </div>
    </section>
  );
}
