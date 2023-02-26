import CheckoutWizard from '@/components/checkoutWizard';
import Layout from '@/components/Layout';
import { SAVE_SHIPPING_ADDRESS } from '@/constants/types';
import { Store } from '@/utils/Store';
import useStyles from '@/utils/styles';
import { Button, List, ListItem, TextField, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

export default function ShippingScreen() {
    const classes = useStyles();
    const { state, dispatch } = useContext(Store);
    const {
        userInfo,
        cart: { shippingAddress },
    } = state;
    const router = useRouter();
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm();

    const submitHandler = ({
        fullName,
        address,
        city,
        postalCode,
        country,
    }) => {
        dispatch({
            type: SAVE_SHIPPING_ADDRESS,
            payload: {
                fullName,
                address,
                city,
                postalCode,
                country,
            },
        });
        Cookies.set(
            'shippingAddress',
            JSON.stringify({
                fullName,
                address,
                city,
                postalCode,
                country,
            })
        );
        router.push('/payment');
    };

    useEffect(() => {
        if (!userInfo) {
            router.push('/login?redirect=/shipping');
        }
        setValue('fullName', shippingAddress.fullName);
        setValue('address', shippingAddress.address);
        setValue('city', shippingAddress.city);
        setValue('postalCode', shippingAddress.postalCode);
        setValue('country', shippingAddress.country);
    }, [
        router,
        userInfo,
        setValue,
        shippingAddress.fullName,
        shippingAddress.address,
        shippingAddress.city,
        shippingAddress.postalCode,
        shippingAddress.country,
    ]);

    return (
        <Layout title="Shipping Address">
            <CheckoutWizard activeStep={1} />
            <form
                onSubmit={handleSubmit(submitHandler)}
                className={classes.form}
            >
                <Typography component="h1" variant="h1">
                    Shipping Address
                </Typography>
                <List>
                    <ListItem>
                        <Controller
                            name="fullName"
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
                                    id="fullName"
                                    label="Full Name"
                                    error={Boolean(errors.fullName)}
                                    helperText={
                                        errors.fullName
                                            ? errors.fullName.type ===
                                              'minLength'
                                                ? 'Full Name length is more than 1'
                                                : 'Full Name is required'
                                            : ''
                                    }
                                    {...field}
                                />
                            )}
                        ></Controller>
                    </ListItem>
                    <ListItem>
                        <Controller
                            name="address"
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
                                    id="address"
                                    label="Address"
                                    error={Boolean(errors.address)}
                                    helperText={
                                        errors.address
                                            ? errors.address.type ===
                                              'minLength'
                                                ? 'Address length is more than 1'
                                                : 'Address is required'
                                            : ''
                                    }
                                    {...field}
                                />
                            )}
                        ></Controller>
                    </ListItem>
                    <ListItem>
                        <Controller
                            name="city"
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
                                    id="city"
                                    label="City"
                                    error={Boolean(errors.city)}
                                    helperText={
                                        errors.city
                                            ? errors.city.type === 'minLength'
                                                ? 'City length is more than 1'
                                                : 'City is required'
                                            : ''
                                    }
                                    {...field}
                                />
                            )}
                        ></Controller>
                    </ListItem>
                    <ListItem>
                        <Controller
                            name="postalCode"
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
                                    id="postalCode"
                                    label="Postal Code"
                                    error={Boolean(errors.postalCode)}
                                    helperText={
                                        errors.postalCode
                                            ? errors.postalCode.type ===
                                              'minLength'
                                                ? 'Postal Code length is more than 1'
                                                : 'Postal Code is required'
                                            : ''
                                    }
                                    {...field}
                                />
                            )}
                        ></Controller>
                    </ListItem>
                    <ListItem>
                        <Controller
                            name="country"
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
                                    id="country"
                                    label="Country"
                                    error={Boolean(errors.country)}
                                    helperText={
                                        errors.country
                                            ? errors.country.type ===
                                              'minLength'
                                                ? 'Country length is more than 1'
                                                : 'Country is required'
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
                            Continue
                        </Button>
                    </ListItem>
                </List>
            </form>
        </Layout>
    );
}
