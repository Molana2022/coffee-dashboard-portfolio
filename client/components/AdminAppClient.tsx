'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const AdminApp = dynamic(() => import('./AdminApp'), {
  ssr: false,
  loading: () => <div>Loading Coffee Admin...</div>,
});

export default function AdminAppClient() {
  return (
    <Suspense fallback={<div>Loading Coffee Admin...</div>}>
      <AdminApp />
    </Suspense>
  );
}
