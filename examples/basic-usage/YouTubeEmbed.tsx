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
      messages={{
        consentRequired: 'This YouTube video requires consent for {category} cookies to load.',
        managePreferences: 'Allow YouTube Videos',
        loading: 'Loading video...'
      }}
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
