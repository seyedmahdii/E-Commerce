import { Store } from '@/utils/Store';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

export default function ShippingScreen() {
    const router = useRouter();
    const { state } = useContext(Store);
    const { userInfo } = state;

    useEffect(() => {
        if (!userInfo) {
            router.push('/login?redirect=/shipping');
        }
    }, [router, userInfo]);

    return <div>shipping</div>;
}
