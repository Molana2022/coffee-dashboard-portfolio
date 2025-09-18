import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const AdminApp = dynamic(() => import('../components/AdminApp'), {
    ssr: false,
    loading: () => <div>Loading Coffee Admin...</div>
});

export default function Page() {
    return (
        <Suspense fallback={<div>Loading Coffee Admin...</div>}>
            <AdminApp />
        </Suspense>
    );
}
