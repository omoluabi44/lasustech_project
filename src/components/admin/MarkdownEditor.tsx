'use client';

import { useState, useRef } from 'react';
import { Image as ImageIcon, Loader2 } from 'lucide-react';

interface MarkdownEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size
    if (file.size > 20 * 1024 * 1024) {
      alert("Image is too large. Please select an image smaller than 20MB.");
      return;
    }

    setIsUploading(true);
    try {
      // 1. Get presigned URL
      const presignRes = await fetch(`/api/upload/presign?filename=${encodeURIComponent(file.name)}&contentType=${encodeURIComponent(file.type)}`);
      const { presignedUrl, publicUrl } = await presignRes.json();

      if (!presignedUrl) throw new Error("Failed to get presigned URL");

      // 2. Upload to S3
      const uploadRes = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type },
      });

      if (!uploadRes.ok) throw new Error("Failed to upload to S3");

      // 3. Append to markdown
      const markdownImage = `\n![Image](${publicUrl})\n`;
      onChange(value + markdownImage);
      
    } catch (error) {
      console.error(error);
      alert("Failed to upload image.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="border rounded-md overflow-hidden bg-white md:col-span-2">
      <div className="bg-slate-50 border-b p-2 flex items-center gap-2">
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleImageUpload} 
        />
        <button
          type="button"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 text-sm px-3 py-1.5 bg-white border shadow-sm rounded hover:bg-slate-50 disabled:opacity-50"
        >
          {isUploading ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />}
          {isUploading ? 'Uploading...' : 'Insert Image'}
        </button>
        <span className="text-xs text-slate-500 ml-2">Supports Markdown formatting (**, *, #, [], etc)</span>
      </div>
      <textarea
        className="w-full p-4 min-h-[300px] outline-none resize-y"
        placeholder={placeholder || "Write your content here... Use markdown for styling."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </div>
  );
}
