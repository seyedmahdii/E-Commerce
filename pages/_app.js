import '@/styles/globals.css';
import { StoreProvider } from '@/utils/Store';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { SnackbarProvider } from 'notistack';
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
        <SnackbarProvider
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <StoreProvider>
                <PayPalScriptProvider deferLoading={true}>
                    <Component {...pageProps} />
                </PayPalScriptProvider>
            </StoreProvider>
        </SnackbarProvider>
    );
}
