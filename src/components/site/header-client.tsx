'use client';

import dynamic from 'next/dynamic';

const Header = dynamic(
  () => import('@/components/site/header').then(mod => ({ default: mod.Header })),
  { ssr: false }
);

export function HeaderClient() {
  return <Header />;
}
