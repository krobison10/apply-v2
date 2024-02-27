'use client';

import React from 'react';
import useSearchParam from '@/hooks/useSearchParam';
import dynamic from 'next/dynamic';
const ApplicationsFeed = dynamic(() => import('@/components/applications_feed/ApplicationsFeed'), {ssr: false});

export default function SearchPage() {
  const searchTerm = useSearchParam();
  return <ApplicationsFeed searchTerm={searchTerm}/>;
}
