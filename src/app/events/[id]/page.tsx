import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { EngagementBar } from '@/components/EngagementBar';

export const revalidate = 60;

export default async function EventPage({ params }: { params: { id: string } }) {
  const event = await prisma.event.findUnique({
    where: { id: parseInt(params.id) },
    include: { comments: { orderBy: { createdAt: 'desc' } } }
  });

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-sky-50/50 relative overflow-hidden">
      <Navbar />
      
      <article className="max-w-4xl mx-auto px-4 py-24 md:py-32">
        <Link href="/#events" className="inline-flex items-center text-sky-blue hover:text-sky-deep mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Back to Events
        </Link>

        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-3 py-1 text-xs font-medium bg-white text-slate-800 rounded-full border shadow-sm flex items-center gap-1.5">
              <Tag size={12} /> {event.category}
            </span>
            <span className="px-3 py-1 text-xs font-medium bg-slate-900 text-white rounded-full flex items-center gap-1.5">
              <Calendar size={12} /> {event.date}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 font-sans tracking-tight">
            {event.title}
          </h1>
          
          <p className="text-xl text-slate-600 font-light leading-relaxed mb-8">
            {event.desc}
          </p>
        </div>

        <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-16 shadow-xl">
          <Image src={event.imgUrl} alt={event.title} fill className="object-cover" priority />
        </div>

        <div className="prose prose-slate prose-lg md:prose-xl max-w-none prose-img:rounded-2xl prose-img:shadow-lg prose-headings:font-sans prose-headings:font-bold prose-a:text-sky-blue">
          {event.content ? (
            <ReactMarkdown>{event.content}</ReactMarkdown>
          ) : (
            <p className="text-slate-500 italic">No additional details available for this event.</p>
          )}
        </div>

        <EngagementBar 
          type="event" 
          id={event.id} 
          initialLikes={event.likes || 0} 
          comments={event.comments} 
        />
      </article>

      <Footer />
    </main>
  );
}
