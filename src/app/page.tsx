import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/layout/Hero";
import { MissionVisionValues } from "@/components/layout/MissionVisionValues";
import { EventsBento } from "@/components/layout/EventsBento";
import { StudentWelfare } from "@/components/layout/StudentWelfare";
import { StudentSpotlight } from "@/components/layout/StudentSpotlight";
import { Executives } from "@/components/layout/Executives";
import { Footer } from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const [missions, events, spotlights, executives, welfares] = await Promise.all([
    prisma.missionVision.findMany(),
    prisma.event.findMany(),
    prisma.studentSpotlight.findMany(),
    prisma.executive.findMany(),
    prisma.welfareInitiative.findMany(),
  ]);

  return (
    <main className="min-h-screen bg-sky-50/50 relative overflow-hidden">
      {/* Soft Light Grid background for depth */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(14, 165, 233, 0.1) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      
      <Navbar />
      <Hero />
      <MissionVisionValues data={missions} />
      
      <div id="events" className="scroll-mt-20">
        <EventsBento data={events} />
      </div>
      
      <div id="welfare" className="scroll-mt-20">
        <StudentWelfare data={welfares} />
      </div>
      
      <div id="spotlight" className="scroll-mt-20">
        <StudentSpotlight data={spotlights} />
      </div>
      
      <div id="executives" className="scroll-mt-20">
        <Executives data={executives} />
      </div>
      
      <Footer />
    </main>
  );
}
