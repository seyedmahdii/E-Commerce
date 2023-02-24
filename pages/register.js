import Layout from '@/components/Layout';
import { USER_REGISTER } from '@/constants/types';
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

export default function RegisterScreen() {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;
    const router = useRouter();
    const { redirect } = router.query;

    const submitHandler = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        try {
            const { data } = await axios.post('/api/users/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });
            dispatch({ type: USER_REGISTER, payload: data });
            Cookies.set('userInfo', JSON.stringify(data));
            router.push(redirect || '/');
        } catch (error) {
            console.log(
                'Error Registering!',
                error.response?.data
                    ? error.response.data?.message
                    : error.message
            );
        }
    };

    const changeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        if (userInfo) {
            router.push('/');
        }
    }, [router, userInfo]);

    return (
        <Layout title="Register">
            <form onSubmit={submitHandler} className={classes.form}>
                <Typography component="h1" variant="h1">
                    Register
                </Typography>
                <List>
                    <ListItem>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="name"
                            label="Name"
                            inputProps={{ type: 'name' }}
                            name="name"
                            onChange={changeHandler}
                        />
                    </ListItem>
                    <ListItem>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="email"
                            label="Email"
                            inputProps={{ type: 'email' }}
                            name="email"
                            onChange={changeHandler}
                        />
                    </ListItem>
                    <ListItem>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="password"
                            label="Password"
                            inputProps={{ type: 'password' }}
                            name="password"
                            onChange={changeHandler}
                        />
                    </ListItem>
                    <ListItem>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="confirmPassword"
                            label="Confirm Password"
                            inputProps={{ type: 'password' }}
                            name="confirmPassword"
                            onChange={changeHandler}
                        />
                    </ListItem>
                    <ListItem>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                        >
                            Register
                        </Button>
                    </ListItem>
                    <ListItem>
                        Already have an account? &nbsp;
                        <NextLink
                            href={`/login?redirect=${redirect || '/'}`}
                            passHref
                        >
                            <Link>Login</Link>
                        </NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    );
}
