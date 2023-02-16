import Head from 'next/head';
import {
    AppBar,
    Container,
    Toolbar,
    Typography,
    CssBaseline,
    createTheme,
} from '@mui/material';
import useStyles from '@/utils/styles';
import NextLink from 'next/link';
import { ThemeProvider } from '@mui/material/styles';

export default function Layout({ children, title, description }) {
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
            type: 'light',
            primary: {
                main: '#f0c000',
            },
            secondary: {
                main: '#208080',
            },
        },
    });

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
                            <NextLink href="/cart">Cart</NextLink>
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
