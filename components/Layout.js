import Head from 'next/head';
import {
    AppBar,
    Container,
    Toolbar,
    Typography,
    CssBaseline,
    createTheme,
    Switch,
    Badge,
} from '@mui/material';
import useStyles from '@/utils/styles';
import NextLink from 'next/link';
import { ThemeProvider } from '@mui/material/styles';
import { useContext, useState, useEffect } from 'react';
import { Store } from '@/utils/Store';
import { DARK_MODE_OFF, DARK_MODE_ON } from '@/constants/types';
import Cookies from 'js-cookie';

export default function Layout({ children, title, description }) {
    const { state, dispatch } = useContext(Store);
    const { darkMode, cart } = state;
    const classes = useStyles();
    const theme = createTheme({
        typography: {
            h1: {
                fontSize: '1.6rem',
                fontWeight: 400,
                margin: '1rem 0',
            },
            h2: {
                fontSize: '1.4rem',
                fontWeight: 400,
                margin: '1rem 0',
            },
        },
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: '#f0c000',
            },
            secondary: {
                main: '#208080',
            },
        },
    });
    const [cartItemsLength, setCartItemsLength] = useState(0);

    const darkModeChangeHandler = () => {
        dispatch({ type: darkMode ? DARK_MODE_OFF : DARK_MODE_ON });
        const newDarkMode = !darkMode;
        Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
    };

    // This is used to fix the "React Hydration Error"
    useEffect(() => {
        setCartItemsLength(cart.cartItems.length);
    }, [cart.cartItems.length]);

    return (
        <div>
            <Head>
                <title>{title ? `${title} - ` : null}E-Commerce</title>
                {description && (
                    <meta name="description" content={description} />
                )}
            </Head>

            <ThemeProvider theme={theme}>
                <CssBaseline />

                <AppBar position="static" className={classes.navbar}>
                    <Toolbar>
                        <NextLink href="/">
                            <Typography className={classes.brand}>
                                E-Commerce
                            </Typography>
                        </NextLink>
                        <div className={classes.grow}></div>
                        <div>
                            <Switch
                                checked={darkMode}
                                onChange={darkModeChangeHandler}
                            ></Switch>
                            <NextLink href="/cart">
                                {cartItemsLength > 0 ? (
                                    <Badge
                                        badgeContent={cartItemsLength}
                                        color="secondary"
                                    >
                                        Cart
                                    </Badge>
                                ) : (
                                    'Cart'
                                )}
                            </NextLink>
                            <NextLink href="/login">Login</NextLink>
                        </div>
                    </Toolbar>
                </AppBar>

                <Container className={classes.main}>{children}</Container>

                <footer className={classes.footer}>
                    <Typography>
                        All rights reserved. Next E-commerce.
                    </Typography>
                </footer>
            </ThemeProvider>
        </div>
    );
}
