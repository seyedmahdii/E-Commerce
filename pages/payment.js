import CheckoutWizard from '@/components/checkoutWizard';
import Layout from '@/components/Layout';
import { SAVE_PAYMENT_METHOD } from '@/constants/types';
import { Store } from '@/utils/Store';
import useStyles from '@/utils/styles';
import {
    Button,
    FormControl,
    FormControlLabel,
    List,
    ListItem,
    Radio,
    RadioGroup,
    Typography,
} from '@mui/material';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useContext, useEffect, useState } from 'react';

export default function Payment() {
    const {
        state: {
            cart: { shippingAddress },
        },
        dispatch,
    } = useContext(Store);
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState('');
    const classes = useStyles();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const submitHandler = (e) => {
        e.preventDefault();
        closeSnackbar();

        if (!paymentMethod) {
            enqueueSnackbar('Payment method is required', { variant: 'error' });
        } else {
            dispatch({ type: SAVE_PAYMENT_METHOD, action: paymentMethod });
            Cookies.set('paymentMethod', paymentMethod);
            router.push('/placeOrder');
        }
    };

    useEffect(() => {
        if (!shippingAddress.address) {
            router.push('/shipping');
        } else {
            setPaymentMethod(Cookies.get('paymentMethod') || '');
        }
    }, [router, shippingAddress.address]);

    return (
        <Layout title="Payment Method">
            <CheckoutWizard activeStep={2}></CheckoutWizard>
            <form className={classes.form} onSubmit={submitHandler}>
                <Typography component="h1" variant="h1">
                    Payment Method
                </Typography>
                <List>
                    <ListItem>
                        <FormControl component="fieldset">
                            <RadioGroup
                                aria-label="Payment Method"
                                name="paymentMethod"
                                value={paymentMethod}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                            >
                                <FormControlLabel
                                    label="PayPal"
                                    value="PayPal"
                                    control={<Radio />}
                                ></FormControlLabel>
                                <FormControlLabel
                                    label="Stripe"
                                    value="Stripe"
                                    control={<Radio />}
                                ></FormControlLabel>
                                <FormControlLabel
                                    label="Cash"
                                    value="Cash"
                                    control={<Radio />}
                                ></FormControlLabel>
                            </RadioGroup>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Continue
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button
                            fullWidth
                            type="button"
                            variant="outlined"
                            onClick={() => router.push('/shipping')}
                        >
                            Back
                        </Button>
                    </ListItem>
                </List>
            </form>
        </Layout>
    );
}
