import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface PostCardProps {
  baseLib: string;
}

export const PostCard = ({ baseLib }: PostCardProps) => {
  if (baseLib === 'shadcn') {
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
  }

  if (baseLib === 'daisyui') {
    return (
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://picsum.photos/seed/post-hero/720/480"
            alt="New York Music Festival"
            className="w-full h-48 object-cover"
          />
        </figure>
        <div className="card-body p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="avatar">
              <div className="w-8 h-8 rounded-full">
                <img src="https://picsum.photos/seed/avatar1/96" alt="User avatar" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="card-title text-base">New York Music Festival 2023</h2>
              <p className="text-sm opacity-70">Thank you new york city — an unforgettable show.</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <div className="badge badge-ghost gap-1">
              <Heart size={12} />
              207,696
            </div>
            <div className="badge badge-ghost gap-1">
              <MessageCircle size={12} />
              23
            </div>
            <div className="badge badge-ghost gap-1">
              <Share2 size={12} />
              23
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (baseLib === 'flowbite') {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
        <img
          src="https://picsum.photos/seed/post-hero/720/480"
          alt="New York Music Festival"
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <img
              className="w-8 h-8 rounded-full"
              src="https://picsum.photos/seed/avatar1/96"
              alt="User avatar"
            />
            <div className="flex-1">
              <h5 className="font-semibold text-gray-900 dark:text-white">New York Music Festival 2023</h5>
              <p className="text-sm text-gray-500 dark:text-gray-400">Thank you new york city — an unforgettable show.</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-400">
              <Heart size={12} />
              207,696
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-400">
              <MessageCircle size={12} />
              23
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-400">
              <Share2 size={12} />
              23
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Default implementation for chakra, mui, radix, and tailwind
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