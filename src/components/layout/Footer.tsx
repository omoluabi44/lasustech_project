import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full py-12 px-4 md:px-8 border-t border-sky-100/50 bg-sky-50/50 relative z-10 text-center md:text-left">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-sky-200 bg-slate-100 flex-shrink-0">
              <Image
                src="/LSCA-LOGO.jpg"
                alt="LSCA Logo"
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>
            <h2 className="font-sans text-xl font-black text-slate-text uppercase tracking-tight">LASUSTECH SCA</h2>
          </div>
          <p className="text-slate-muted text-xs mt-1 max-w-sm">
            Official Student Consultative Assembly of LASUSTECH. Empowering students, shaping the future.
          </p>
        </div>
        
        <div className="flex gap-6 text-sm text-slate-muted">
          <a href="#" className="hover:text-sky-blue transition-colors">Contact</a>
          <a href="#" className="hover:text-sky-blue transition-colors">Constitution</a>
          <a href="#" className="hover:text-sky-blue transition-colors">News</a>
        </div>
      </div>
    </footer>
  );
}

