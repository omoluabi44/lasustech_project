'use client';

import { useState, useEffect } from 'react';
import { getMissions, createMission, deleteMission } from '../actions';
import { Trash2, Plus, Loader2 } from 'lucide-react';

export default function MissionAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setItems(await getMissions());
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await createMission({ title, description });
    setTitle(''); setDescription('');
    await loadData();
    setIsSubmitting(false);
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    await deleteMission(id);
    await loadData();
    setDeletingId(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Manage Mission & Vision</h1>

      <div className="bg-white p-6 rounded-2xl shadow-sm border mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Plus size={20}/> Add Entry</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input className="border p-2 rounded" placeholder="Title (e.g. Mission)" value={title} onChange={e=>setTitle(e.target.value)} required />
          <textarea className="border p-2 rounded h-32" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} required />
          <button type="submit" disabled={isSubmitting} className="bg-slate-900 text-white p-2 rounded hover:bg-slate-800 flex items-center justify-center gap-2 disabled:bg-slate-700 disabled:cursor-not-allowed">
            {isSubmitting && <Loader2 className="animate-spin" size={20} />}
            {isSubmitting ? 'Adding Entry...' : 'Add Entry'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Description</th>
              <th className="p-4 w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={3} className="p-4 text-center">Loading...</td></tr> : items.map(it => (
              <tr key={it.id} className="border-b last:border-0 hover:bg-slate-50">
                <td className="p-4 font-medium">{it.title}</td>
                <td className="p-4 whitespace-pre-wrap">{it.description}</td>
                <td className="p-4">
                  <button onClick={() => handleDelete(it.id)} disabled={deletingId === it.id} className="text-red-500 hover:text-red-700 disabled:opacity-50">
                    {deletingId === it.id ? <Loader2 className="animate-spin" size={20}/> : <Trash2 size={20}/>}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
