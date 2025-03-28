'use client';

import React from 'react';
import { ConsentGate, ConsentCategory } from '../../'; // In a real project, this would be '@yunicorn/cookiebanner'

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  width?: number;
  height?: number;
}

export function YouTubeEmbed({ 
  videoId, 
  title = 'YouTube video player',
  width = 560,
  height = 315
}: YouTubeEmbedProps) {
  return (
    <ConsentGate 
      category={ConsentCategory.Marketing}
      loading={<div>Loading...</div>}
      fallback={
        <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded border border-gray-300" style={{ width, height }}>
          <p className="text-gray-700 mb-4 text-center">
            This content requires marketing cookies consent.
          </p>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Manage Cookie Settings
          </button>
        </div>
      }
    >
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </ConsentGate>
  );
}
