import Head from 'next/head';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import useStyles from '@/utils/styles';
import NextLink from 'next/link';

export default function Layout({ children, title, description }) {
    const classes = useStyles();

    return (
        <div>
            <Head>
                <title>{title ? `${title} - ` : null}E-Commerce</title>
                {description && (
                    <meta name="description" content={description} />
                )}
            </Head>
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
                <Typography>All rights reserved. Next E-commerce.</Typography>
            </footer>
        </div>
    );
}
