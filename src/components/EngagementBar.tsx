'use client';

import { useState, useEffect } from 'react';
import { Heart, Share2, MessageCircle, Send, Loader2 } from 'lucide-react';
import { addLike, postComment } from '@/app/admin/actions';

interface Comment {
  id: number;
  authorName: string;
  text: string;
  createdAt: Date;
}

interface EngagementBarProps {
  type: 'event' | 'spotlight' | 'welfare';
  id: number;
  initialLikes: number;
  comments: Comment[];
}

export function EngagementBar({ type, id, initialLikes, comments }: EngagementBarProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Check local storage on mount to see if user already liked
  useEffect(() => {
    const likedStr = localStorage.getItem(`liked_${type}_${id}`);
    if (likedStr === 'true') {
      setHasLiked(true);
    }
  }, [type, id]);

  const handleLike = async () => {
    if (hasLiked || isLiking) return;
    
    setIsLiking(true);
    try {
      // Optimistic update
      setLikes(prev => prev + 1);
      setHasLiked(true);
      localStorage.setItem(`liked_${type}_${id}`, 'true');
      
      await addLike(type, id);
    } catch (error) {
      // Revert on fail
      setLikes(prev => prev - 1);
      setHasLiked(false);
      localStorage.removeItem(`liked_${type}_${id}`);
      alert("Failed to like.");
    } finally {
      setIsLiking(false);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check this out on Lasustech',
          url: url
        });
      } catch (err) {
        console.error('Share failed', err);
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    
    setIsSubmitting(true);
    try {
      await postComment(type, id, name.trim(), message.trim());
      setName('');
      setMessage('');
    } catch (error) {
      alert("Failed to post comment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-16 pt-8 border-t border-sky-100/50">
      
      {/* Interaction Bar */}
      <div className="flex items-center gap-4 mb-12">
        <button 
          onClick={handleLike}
          disabled={hasLiked || isLiking}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
            hasLiked 
              ? 'bg-red-50 text-red-600 border border-red-100 cursor-default' 
              : 'bg-white text-slate-700 border shadow-sm hover:border-red-200 hover:text-red-500'
          }`}
        >
          <Heart size={20} className={hasLiked ? 'fill-red-600' : ''} />
          {likes} {likes === 1 ? 'Like' : 'Likes'}
        </button>
        
        <button 
          onClick={handleShare}
          className="flex items-center gap-2 px-6 py-3 rounded-full font-medium bg-white text-slate-700 border shadow-sm hover:border-sky-200 hover:text-sky-blue transition-all"
        >
          <Share2 size={20} />
          Share
        </button>
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-sky-50">
        <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
          <MessageCircle className="text-sky-blue" />
          Comments ({comments.length})
        </h3>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="mb-10 bg-slate-50 p-4 md:p-6 rounded-2xl border">
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="Your Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full md:w-1/2 p-3 rounded-xl border outline-none focus:border-sky-blue focus:ring-2 focus:ring-sky-100 transition-all bg-white"
              required 
            />
          </div>
          <div className="mb-4">
            <textarea 
              placeholder="Share your thoughts..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 rounded-xl border outline-none min-h-[100px] focus:border-sky-blue focus:ring-2 focus:ring-sky-100 transition-all bg-white resize-y"
              required 
            />
          </div>
          <div className="flex justify-end">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.length === 0 ? (
            <p className="text-slate-500 italic text-center py-8">Be the first to share your thoughts!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="border-b border-slate-100 last:border-0 pb-6 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-800">{comment.authorName}</span>
                  <span className="text-xs text-slate-400 font-medium">
                    {new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{comment.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
