'use client';

import { useState, useEffect } from 'react';
import { getWelfares, createWelfare, deleteWelfare } from '../actions';
import { Trash2, Plus, Loader2 } from 'lucide-react';
import { MarkdownEditor } from '@/components/admin/MarkdownEditor';

export default function WelfareAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setItems(await getWelfares());
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
      await createWelfare({ title, description, content, imgUrl });
      setTitle(''); setDescription(''); setContent(''); setFile(null);
      await loadData();
    } catch (error) {
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    await deleteWelfare(id);
    await loadData();
    setDeletingId(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Manage Welfare Initiatives</h1>

      <div className="bg-white p-6 rounded-2xl shadow-sm border mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Plus size={20}/> Add Initiative</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border p-2 rounded md:col-span-2" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
          <textarea className="border p-2 rounded md:col-span-2" placeholder="Short Excerpt (shows on homepage)" value={description} onChange={e=>setDescription(e.target.value)} required />
          <MarkdownEditor value={content} onChange={setContent} placeholder="Write the full initiative details here... Use markdown for styling." />
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
            {isSubmitting ? 'Adding Initiative...' : 'Add Initiative'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-x-auto">
        <table className="w-full text-left min-w-[500px]">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Title</th>
              <th className="p-4">Description</th>
              <th className="p-4 w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={4} className="p-4 text-center">Loading...</td></tr> : items.map(it => (
              <tr key={it.id} className="border-b last:border-0 hover:bg-slate-50">
                <td className="p-4"><img src={it.imgUrl} className="w-16 h-16 object-cover rounded" /></td>
                <td className="p-4 font-medium">{it.title}</td>
                <td className="p-4 line-clamp-2">{it.description}</td>
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
