import Layout from '@/components/Layout';
import { USER_REGISTER } from '@/constants/types';
import { getError } from '@/utils/error';
import { Store } from '@/utils/Store';
import useStyles from '@/utils/styles';
import {
    Button,
    Card,
    Grid,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography,
} from '@mui/material';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import NextLink from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import Cookies from 'js-cookie';

function Profile() {
    const router = useRouter();
    const {
        state: { userInfo },
        dispatch,
    } = useContext(Store);
    const classes = useStyles();
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const submitHandler = async ({
        name,
        email,
        password,
        confirmPassword,
    }) => {
        closeSnackbar();

        if (password !== confirmPassword) {
            enqueueSnackbar("Passwords don't match!", { variant: 'error' });
            return;
        }

        try {
            const { data } = await axios.put(
                '/api/users/profile',
                {
                    name: name,
                    email: email,
                    password: password,
                },
                { headers: { Authorization: `Bearer ${userInfo.token}` } }
            );
            dispatch({ type: USER_REGISTER, payload: data });
            Cookies.set('userInfo', JSON.stringify(data));
            enqueueSnackbar('Profile updated successfully', {
                variant: 'success',
            });
        } catch (error) {
            enqueueSnackbar(getError(error), { variant: 'error' });
        }
    };

    useEffect(() => {
        if (!userInfo) {
            return router.push('/login');
        }
        setValue('name', userInfo.name);
        setValue('email', userInfo.email);
        setValue('password', userInfo.password);
    }, []);

    return (
        <Layout title={`Profile`}>
            <Grid container spacing={1}>
                <Grid item md={3} xs={12}>
                    <Card className={classes.section}>
                        <List>
                            <NextLink href="/profile" passHref>
                                <ListItem selected button component="a">
                                    <ListItemText primary="User Profile"></ListItemText>
                                </ListItem>
                            </NextLink>
                            <NextLink href="/order-history" passHref>
                                <ListItem button component="a">
                                    <ListItemText primary="Order History"></ListItemText>
                                </ListItem>
                            </NextLink>
                        </List>
                    </Card>
                </Grid>
                <Grid item md={9} xs={12}>
                    <Card className={classes.section}>
                        <List>
                            <ListItem>
                                <Typography component="h1" variant="h1">
                                    Order History
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <form
                                    onSubmit={handleSubmit(submitHandler)}
                                    className={classes.form}
                                >
                                    <List>
                                        <ListItem>
                                            <Controller
                                                name="name"
                                                control={control}
                                                defaultValue=""
                                                rules={{
                                                    required: true,
                                                    minLength: 2,
                                                }}
                                                render={({ field }) => (
                                                    <TextField
                                                        variant="outlined"
                                                        fullWidth
                                                        id="name"
                                                        label="Name"
                                                        inputProps={{
                                                            type: 'name',
                                                        }}
                                                        error={Boolean(
                                                            errors.name
                                                        )}
                                                        helperText={
                                                            errors.name
                                                                ? errors.name
                                                                      .type ===
                                                                  'minLength'
                                                                    ? 'Name length is more than 1'
                                                                    : 'Name is required'
                                                                : ''
                                                        }
                                                        {...field}
                                                    />
                                                )}
                                            ></Controller>
                                        </ListItem>
                                        <ListItem>
                                            <Controller
                                                name="email"
                                                control={control}
                                                defaultValue=""
                                                rules={{
                                                    required: true,
                                                    pattern:
                                                        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                                }}
                                                render={({ field }) => (
                                                    <TextField
                                                        variant="outlined"
                                                        fullWidth
                                                        id="email"
                                                        label="Email"
                                                        inputProps={{
                                                            type: 'email',
                                                        }}
                                                        error={Boolean(
                                                            errors.email
                                                        )}
                                                        helperText={
                                                            errors.email
                                                                ? errors.email
                                                                      .type ===
                                                                  'pattern'
                                                                    ? 'Email is not valid'
                                                                    : 'Email is required'
                                                                : ''
                                                        }
                                                        {...field}
                                                    />
                                                )}
                                            ></Controller>
                                        </ListItem>
                                        <ListItem>
                                            <Controller
                                                name="password"
                                                control={control}
                                                defaultValue=""
                                                rules={{
                                                    validate: (value) =>
                                                        value === '' ||
                                                        value.length > 5 ||
                                                        'Password length is more than 5',
                                                }}
                                                render={({ field }) => (
                                                    <TextField
                                                        variant="outlined"
                                                        fullWidth
                                                        id="password"
                                                        label="Password"
                                                        inputProps={{
                                                            type: 'password',
                                                        }}
                                                        error={Boolean(
                                                            errors.password
                                                        )}
                                                        helperText={
                                                            errors.password
                                                                ? 'Password Length should be at least 6 characters'
                                                                : ''
                                                        }
                                                        {...field}
                                                    />
                                                )}
                                            ></Controller>
                                        </ListItem>
                                        <ListItem>
                                            <Controller
                                                name="confirmPassword"
                                                control={control}
                                                defaultValue=""
                                                rules={{
                                                    validate: (value) =>
                                                        value === '' ||
                                                        value.length > 5 ||
                                                        'Confirm Password length is more than 5',
                                                }}
                                                render={({ field }) => (
                                                    <TextField
                                                        variant="outlined"
                                                        fullWidth
                                                        id="confirmPassword"
                                                        label="Confirm Password"
                                                        inputProps={{
                                                            type: 'password',
                                                        }}
                                                        error={Boolean(
                                                            errors.confirmPassword
                                                        )}
                                                        helperText={
                                                            errors.confirmPassword
                                                                ? 'Confirm Password Length should be at least 6 characters'
                                                                : ''
                                                        }
                                                        {...field}
                                                    />
                                                )}
                                            ></Controller>
                                        </ListItem>
                                        <ListItem>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                fullWidth
                                            >
                                                Update
                                            </Button>
                                        </ListItem>
                                    </List>
                                </form>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    );
}

export default dynamic(() => Promise.resolve(Profile), { ssr: false });
