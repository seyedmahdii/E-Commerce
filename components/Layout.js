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
    Button,
    Menu,
    MenuItem,
} from '@mui/material';
import useStyles from '@/utils/styles';
import NextLink from 'next/link';
import { ThemeProvider } from '@mui/material/styles';
import { useContext, useState, useEffect } from 'react';
import { Store } from '@/utils/Store';
import { DARK_MODE_OFF, DARK_MODE_ON, USER_LOGOUT } from '@/constants/types';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function Layout({ children, title, description }) {
    const { state, dispatch } = useContext(Store);
    const { darkMode, cart, userInfo } = state;
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
    const [anchorEl, setAnchorEl] = useState(null);
    const router = useRouter();

    const darkModeChangeHandler = () => {
        dispatch({ type: darkMode ? DARK_MODE_OFF : DARK_MODE_ON });
        const newDarkMode = !darkMode;
        Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
    };

    const loginClickHandler = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const loginMenuCloseHandler = (e, redirect) => {
        setAnchorEl(null);
        if (redirect) {
            router.push(redirect);
        }
    };

    const logoutClickHandler = () => {
        Cookies.remove('userInfo');
        Cookies.remove('cartItems');
        dispatch({ type: USER_LOGOUT });
        loginMenuCloseHandler();
        router.push('/');
    };

    // This is used to fix the "React Hydration Error   "
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
                            {userInfo ? (
                                <>
                                    <Button
                                        className={classes.navbarButton}
                                        aria-controls="menu"
                                        aria-haspopup="true"
                                        onClick={loginClickHandler}
                                    >
                                        {userInfo.name}
                                    </Button>
                                    <Menu
                                        id="menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={loginMenuCloseHandler}
                                    >
                                        <MenuItem
                                            onClick={(e) =>
                                                loginMenuCloseHandler(
                                                    e,
                                                    '/profile'
                                                )
                                            }
                                        >
                                            Profile
                                        </MenuItem>
                                        <MenuItem
                                            onClick={(e) =>
                                                loginMenuCloseHandler(
                                                    e,
                                                    '/order-history'
                                                )
                                            }
                                        >
                                            Order History
                                        </MenuItem>
                                        <MenuItem onClick={logoutClickHandler}>
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <NextLink href="/login">Login</NextLink>
                            )}
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
