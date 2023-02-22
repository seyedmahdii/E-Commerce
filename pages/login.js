import Layout from '@/components/Layout';
import { USER_LOGIN } from '@/constants/types';
import { Store } from '@/utils/Store';
import useStyles from '@/utils/styles';
import {
    Button,
    Link,
    List,
    ListItem,
    TextField,
    Typography,
} from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

export default function LoginScreen() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;
    const router = useRouter();
    const { redirect } = router.query;
    console.log('redirect', redirect);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('/api/users/login', {
                email,
                password,
            });
            dispatch({ type: USER_LOGIN, payload: data });
            Cookies.set('userInfo', JSON.stringify(data));
            router.push(redirect || '/');
        } catch (error) {
            console.log(
                'Error loging in!',
                error.response?.data
                    ? error.response.data?.message
                    : error.message
            );
        }
    };

    useEffect(() => {
        if (userInfo) {
            router.push('/');
        }
    }, [router, userInfo]);

    return (
        <Layout title="Login">
            <form onSubmit={submitHandler} className={classes.form}>
                <Typography component="h1" variant="h1">
                    Login
                </Typography>
                <List>
                    <ListItem>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="email"
                            label="Email"
                            inputProps={{ type: 'email' }}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </ListItem>
                    <ListItem>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="password"
                            label="Password"
                            inputProps={{ type: 'password' }}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </ListItem>
                    <ListItem>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                        >
                            Login
                        </Button>
                    </ListItem>
                    <ListItem>
                        Don&apos;t have an account? &nbsp;
                        <NextLink href="/register" passHref>
                            <Link>Register</Link>
                        </NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    );
}
