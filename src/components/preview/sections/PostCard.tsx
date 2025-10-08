import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface PostCardProps {
  baseLib: string;
}

export const PostCard = ({ baseLib }: PostCardProps) => {
  return (
    <div className="rounded-[var(--radius-md)] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-primary))] shadow-[var(--shadow-level-1)] overflow-hidden">
      {/* Post Image */}
      <div className="relative">
        <img
          src="https://picsum.photos/seed/post-hero/720/480"
          alt="New York Music Festival"
          className="w-full h-48 object-cover"
        />
      </div>
      
      {/* Post Content */}
      <div className="p-4 space-y-3">
        {/* Avatar and User Info */}
        <div className="flex items-center gap-3">
          <img
            src="https://picsum.photos/seed/avatar1/96"
            alt="User avatar"
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-[rgb(var(--color-text-primary))]">New York Music Festival 2023</h3>
            <p className="text-sm text-[rgb(var(--color-text-secondary))]">Thank you new york city — an unforgettable show.</p>
          </div>
        </div>
        
        {/* Engagement Stats */}
        <div className="flex items-center gap-4 pt-2">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[rgb(var(--color-bg-secondary))] text-xs text-[rgb(var(--color-text-secondary))]">
            <Heart size={12} />
            207,696
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[rgb(var(--color-bg-secondary))] text-xs text-[rgb(var(--color-text-secondary))]">
            <MessageCircle size={12} />
            23
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[rgb(var(--color-bg-secondary))] text-xs text-[rgb(var(--color-text-secondary))]">
            <Share2 size={12} />
            23
          </span>
        </div>
      </div>
    </div>
  );
};
