import { prisma } from '@/lib/prisma';
import { Calendar, Users, Target, HeartHandshake } from 'lucide-react';

export default async function AdminDashboard() {
  const [eventCount, spotlightCount, execCount, missionCount, welfareCount] = await Promise.all([
    prisma.event.count(),
    prisma.studentSpotlight.count(),
    prisma.executive.count(),
    prisma.missionVision.count(),
    prisma.welfareInitiative.count(),
  ]);

  const stats = [
    { name: 'Events', count: eventCount, icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-100' },
    { name: 'Spotlights', count: spotlightCount, icon: Users, color: 'text-purple-500', bg: 'bg-purple-100' },
    { name: 'Executives', count: execCount, icon: Users, color: 'text-orange-500', bg: 'bg-orange-100' },
    { name: 'Missions', count: missionCount, icon: Target, color: 'text-green-500', bg: 'bg-green-100' },
    { name: 'Welfare', count: welfareCount, icon: HeartHandshake, color: 'text-rose-500', bg: 'bg-rose-100' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm border flex items-center gap-4">
              <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.name}</p>
                <p className="text-2xl font-bold text-slate-800">{stat.count}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
