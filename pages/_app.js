import '@/styles/globals.css';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
    // Fixing the server side rendering of material ui
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return <Component {...pageProps} />;
}
