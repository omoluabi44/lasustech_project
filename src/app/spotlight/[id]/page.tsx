import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const revalidate = 60;

export default async function SpotlightPage({ params }: { params: { id: string } }) {
  const spotlight = await prisma.studentSpotlight.findUnique({
    where: { id: parseInt(params.id) }
  });

  if (!spotlight) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-sky-50/50 relative overflow-hidden">
      <Navbar />
      
      <article className="max-w-4xl mx-auto px-4 py-24 md:py-32">
        <Link href="/#spotlight" className="inline-flex items-center text-sky-blue hover:text-sky-deep mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Back to Spotlight
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 text-xs font-medium bg-white text-slate-800 rounded-full border shadow-sm flex items-center gap-1.5">
              <Star size={12} className="text-yellow-500 fill-yellow-500" /> {spotlight.talent}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 font-sans tracking-tight">
            {spotlight.name}
          </h1>
          
          <blockquote className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed italic border-l-4 border-sky-blue pl-6 mb-8">
            &quot;{spotlight.quote}&quot;
          </blockquote>
        </div>

        <div className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-3xl overflow-hidden mb-16 shadow-xl">
          <Image src={spotlight.imgUrl} alt={spotlight.name} fill className="object-cover" priority />
        </div>

        <div className="prose prose-slate prose-lg md:prose-xl max-w-none prose-img:rounded-2xl prose-img:shadow-lg prose-headings:font-sans prose-headings:font-bold prose-a:text-sky-blue">
          {spotlight.content ? (
            <ReactMarkdown>{spotlight.content}</ReactMarkdown>
          ) : (
            <p className="text-slate-500 italic">No additional story available for this student.</p>
          )}
        </div>
      </article>

      <Footer />
    </main>
  );
}
