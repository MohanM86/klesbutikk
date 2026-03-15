'use client';
import { useEffect } from 'react';
import { trackVisit } from './RecentlyViewed';

export default function TrackPageView({ name, href, type }: { name: string; href: string; type: 'by' | 'butikk' | 'merke' }) {
  useEffect(() => {
    trackVisit(name, href, type);
  }, [name, href, type]);
  return null;
}
