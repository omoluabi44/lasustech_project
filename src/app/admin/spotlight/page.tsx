'use client';

import { useState, useEffect } from 'react';
import { getSpotlights, createSpotlight, deleteSpotlight } from '../actions';
import { Trash2, Plus, Loader2 } from 'lucide-react';

export default function SpotlightAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [talent, setTalent] = useState('');
  const [quote, setQuote] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setItems(await getSpotlights());
    setLoading(false);
  };

  const handleUpload = async () => {
    if (!file) return '';
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    return data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const imgUrl = await handleUpload();
    await createSpotlight({ name, talent, quote, imgUrl });
    setName(''); setTalent(''); setQuote(''); setFile(null);
    await loadData();
    setIsSubmitting(false);
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    await deleteSpotlight(id);
    await loadData();
    setDeletingId(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Manage Spotlight</h1>

      <div className="bg-white p-6 rounded-2xl shadow-sm border mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Plus size={20}/> Add Spotlight</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border p-2 rounded" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
          <input className="border p-2 rounded" placeholder="Talent" value={talent} onChange={e=>setTalent(e.target.value)} required />
          <textarea className="border p-2 rounded md:col-span-2" placeholder="Quote" value={quote} onChange={e=>setQuote(e.target.value)} required />
          <input type="file" className="border p-2 rounded md:col-span-2" onChange={e=>setFile(e.target.files?.[0] || null)} required />
          <button type="submit" disabled={isSubmitting} className="bg-slate-900 text-white p-2 rounded hover:bg-slate-800 md:col-span-2 flex items-center justify-center gap-2 disabled:bg-slate-700 disabled:cursor-not-allowed">
            {isSubmitting && <Loader2 className="animate-spin" size={20} />}
            {isSubmitting ? 'Adding Student...' : 'Add Student'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Talent</th>
              <th className="p-4">Quote</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={5} className="p-4 text-center">Loading...</td></tr> : items.map(it => (
              <tr key={it.id} className="border-b last:border-0 hover:bg-slate-50">
                <td className="p-4"><img src={it.imgUrl} className="w-16 h-16 object-cover rounded" /></td>
                <td className="p-4 font-medium">{it.name}</td>
                <td className="p-4">{it.talent}</td>
                <td className="p-4 line-clamp-2">{it.quote}</td>
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
