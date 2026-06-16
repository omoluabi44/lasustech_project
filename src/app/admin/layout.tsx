'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Calendar, Users, Target, HeartHandshake, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const sidebarItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Events', href: '/admin/events', icon: Calendar },
  { name: 'Spotlight', href: '/admin/spotlight', icon: Users },
  { name: 'Executives', href: '/admin/executives', icon: Users },
  { name: 'Mission & Vision', href: '/admin/mission', icon: Target },
  { name: 'Welfare', href: '/admin/welfare', icon: HeartHandshake },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 text-white flex items-center justify-between px-4 z-20">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-800 flex-shrink-0 border border-slate-700">
            <Image
              src="/LSCA-LOGO.jpg"
              alt="LSCA Logo"
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <h2 className="text-base font-bold tracking-tight text-white">Admin Panel</h2>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-800 rounded-lg">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        w-64 bg-slate-900 text-white flex flex-col fixed h-full z-30 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 hidden md:flex items-center gap-3 border-b border-slate-800">
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-800 flex-shrink-0 border border-slate-700">
            <Image
              src="/LSCA-LOGO.jpg"
              alt="LSCA Logo"
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <h2 className="text-base font-bold tracking-tight text-white">Admin Panel</h2>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto mt-16 md:mt-0">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive ? 'bg-sky-500/10 text-sky-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 w-full max-w-full overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
