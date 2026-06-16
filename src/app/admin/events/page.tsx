'use client';

import { useState, useEffect } from 'react';
import { getEvents, createEvent, deleteEvent } from '../actions';
import { Trash2, Plus, Loader2 } from 'lucide-react';
import { MarkdownEditor } from '@/components/admin/MarkdownEditor';

export default function EventsAdmin() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isPast, setIsPast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const data = await getEvents();
    setEvents(data);
    setLoading(false);
  };

  const handleUpload = async () => {
    if (!file) return '';
    
    const presignRes = await fetch(`/api/upload/presign?filename=${encodeURIComponent(file.name)}&contentType=${encodeURIComponent(file.type)}`);
    const { presignedUrl, publicUrl } = await presignRes.json();

    if (!presignedUrl) throw new Error("Failed to get presigned URL");

    const uploadRes = await fetch(presignedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    if (!uploadRes.ok) throw new Error("Failed to upload to S3");

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (file && file.size > 20 * 1024 * 1024) {
      alert("Image is too large. Please upload an image smaller than 20MB.");
      return;
    }
    setIsSubmitting(true);
    try {
      const imgUrl = await handleUpload();
      await createEvent({ title, category, date, desc, content, imgUrl, isPast });
      setTitle(''); setCategory(''); setDate(''); setDesc(''); setContent(''); setFile(null); setIsPast(false);
      await loadData();
    } catch (error) {
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    await deleteEvent(id);
    await loadData();
    setDeletingId(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Manage Events</h1>

      <div className="bg-white p-6 rounded-2xl shadow-sm border mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Plus size={20}/> Add New Event</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border p-2 rounded" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
          <input className="border p-2 rounded" placeholder="Category (e.g. Academic)" value={category} onChange={e=>setCategory(e.target.value)} required />
          <input className="border p-2 rounded" placeholder="Date (e.g. Aug 24, 2026)" value={date} onChange={e=>setDate(e.target.value)} required />
          <div className="flex items-center gap-2">
            <input type="checkbox" id="ispast" checked={isPast} onChange={e=>setIsPast(e.target.checked)} />
            <label htmlFor="ispast">Is Past Event?</label>
          </div>
          <textarea className="border p-2 rounded md:col-span-2" placeholder="Short Excerpt (shows on homepage)" value={desc} onChange={e=>setDesc(e.target.value)} required />
          <MarkdownEditor value={content} onChange={setContent} placeholder="Write the full event details here... Use markdown for styling and insert images to make it rich." />
          <input type="file" accept="image/*" className="border p-2 rounded md:col-span-2" onChange={e=>{
            const selectedFile = e.target.files?.[0] || null;
            if (selectedFile && selectedFile.size > 20 * 1024 * 1024) {
              alert("Image is too large. Please select an image smaller than 20MB.");
              e.target.value = '';
              setFile(null);
            } else {
              setFile(selectedFile);
            }
          }} required />
          <button type="submit" disabled={isSubmitting} className="bg-slate-900 text-white p-2 rounded hover:bg-slate-800 md:col-span-2 flex items-center justify-center gap-2 disabled:bg-slate-700 disabled:cursor-not-allowed">
            {isSubmitting && <Loader2 className="animate-spin" size={20} />}
            {isSubmitting ? 'Creating Event...' : 'Create Event'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={6} className="p-4 text-center">Loading...</td></tr> : events.map(ev => (
              <tr key={ev.id} className="border-b last:border-0 hover:bg-slate-50">
                <td className="p-4"><img src={ev.imgUrl} className="w-16 h-16 object-cover rounded" /></td>
                <td className="p-4 font-medium">{ev.title}</td>
                <td className="p-4">{ev.category}</td>
                <td className="p-4">{ev.date}</td>
                <td className="p-4">{ev.isPast ? 'Past' : 'Upcoming'}</td>
                <td className="p-4">
                  <button onClick={() => handleDelete(ev.id)} disabled={deletingId === ev.id} className="text-red-500 hover:text-red-700 disabled:opacity-50">
                    {deletingId === ev.id ? <Loader2 className="animate-spin" size={20}/> : <Trash2 size={20}/>}
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
