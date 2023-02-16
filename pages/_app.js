import '@/styles/globals.css';
import { StoreProvider } from '@/utils/Store';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
    // Fixing the server side rendering of material ui
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <StoreProvider>
            <Component {...pageProps} />
        </StoreProvider>
    );
}
