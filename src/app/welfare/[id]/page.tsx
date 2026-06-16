import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Heart } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const revalidate = 60;

export default async function WelfarePage({ params }: { params: { id: string } }) {
  const welfare = await prisma.welfareInitiative.findUnique({
    where: { id: parseInt(params.id) }
  });

  if (!welfare) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-sky-50/50 relative overflow-hidden">
      <Navbar />
      
      <article className="max-w-4xl mx-auto px-4 py-24 md:py-32">
        <Link href="/#welfare" className="inline-flex items-center text-sky-blue hover:text-sky-deep mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Back to Initiatives
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 text-xs font-medium bg-red-50 text-red-600 rounded-full border border-red-100 shadow-sm flex items-center gap-1.5">
              <Heart size={12} className="fill-red-600" /> Initiative
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 font-sans tracking-tight">
            {welfare.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed mb-8">
            {welfare.description}
          </p>
        </div>

        <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-16 shadow-xl">
          <Image src={welfare.imgUrl} alt={welfare.title} fill className="object-cover" priority />
        </div>

        <div className="prose prose-slate prose-lg md:prose-xl max-w-none prose-img:rounded-2xl prose-img:shadow-lg prose-headings:font-sans prose-headings:font-bold prose-a:text-sky-blue">
          {welfare.content ? (
            <ReactMarkdown>{welfare.content}</ReactMarkdown>
          ) : (
            <p className="text-slate-500 italic">No additional details available for this initiative.</p>
          )}
        </div>
      </article>

      <Footer />
    </main>
  );
}
