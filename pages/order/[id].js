import Layout from '@/components/Layout';
import { Store } from '@/utils/Store';
import {
    Typography,
    Grid,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Card,
    List,
    ListItem,
    Link,
    CircularProgress,
} from '@mui/material';
import NextLink from 'next/link';
import React, { useContext, useEffect, useReducer } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import useStyles from '@/utils/styles';
import CheckoutWizard from '@/components/CheckoutWizard';
import { getError } from '@/utils/error';
import axios from 'axios';
import { FETCH_FAIL, FETCH_REQUEST, FETCH_SUCCESS } from '@/constants/types';

const reducer = (state, action) => {
    switch (action.type) {
        case FETCH_REQUEST:
            return { ...state, loading: true, error: '' };
        case FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
                error: '',
            };
        case FETCH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

function OrderScreen({ params }) {
    const { state } = useContext(Store);
    const { userInfo } = state;
    const router = useRouter();
    const classes = useStyles();
    const orderId = params.id;
    const [{ loading, error, order }, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',
    });
    const {
        shippingAddress,
        paymentMethod,
        orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        isPaid,
        paidAt,
        isDelilvered,
        deliveredAt,
    } = order;

    useEffect(() => {
        if (!userInfo) {
            return router.push('/login');
        }

        const fetchOrder = async () => {
            try {
                dispatch({ type: FETCH_REQUEST });
                const { data } = await axios.get(`/api/orders/${orderId}`, {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                });
                dispatch({ type: FETCH_SUCCESS, payload: data });
            } catch (error) {
                dispatch({ type: FETCH_FAIL, payload: getError(error) });
            }
        };

        if (!order._id || (order._id && order._id !== orderId)) {
            fetchOrder();
        }
    }, [userInfo, router, order]);

    return (
        <Layout title={`Order ${orderId}`}>
            <CheckoutWizard activeStep={3}></CheckoutWizard>
            <Typography component="h1" variant="h1">
                Order {orderId}
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography className={classes.error}>{error}</Typography>
            ) : (
                <Grid container spacing={1}>
                    <Grid item md={9} xs={12}>
                        <Card className={classes.section}>
                            <List>
                                <ListItem>
                                    <Typography component="h2" variant="h2">
                                        Shipping Address
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    {shippingAddress.fullName},{' '}
                                    {shippingAddress.address},{' '}
                                    {shippingAddress.city},{' '}
                                    {shippingAddress.postalCode},{' '}
                                    {shippingAddress.country}
                                </ListItem>
                                <ListItem>
                                    Status:
                                    {isDelilvered
                                        ? `Delivered at ${deliveredAt}`
                                        : 'Not delivered'}
                                </ListItem>
                            </List>
                        </Card>
                        <Card className={classes.section}>
                            <List>
                                <ListItem>
                                    <Typography component="h2" variant="h2">
                                        Payment Method
                                    </Typography>
                                </ListItem>
                                <ListItem>{paymentMethod}</ListItem>
                                <ListItem>
                                    Status:
                                    {isPaid ? `Paid at ${paidAt}` : 'Not paid'}
                                </ListItem>
                            </List>
                        </Card>
                        <Card className={classes.section}>
                            <List>
                                <ListItem>
                                    <Typography component="h2" variant="h2">
                                        Order Items
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Image</TableCell>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell align="right">
                                                        Quantity
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        Price
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {orderItems.map((item) => (
                                                    <TableRow key={item._id}>
                                                        <TableCell>
                                                            <NextLink
                                                                href={`/product/${item.slug}`}
                                                            >
                                                                <Image
                                                                    src={
                                                                        item.image
                                                                    }
                                                                    alt={
                                                                        item.name
                                                                    }
                                                                    width={50}
                                                                    height={50}
                                                                />
                                                            </NextLink>
                                                        </TableCell>
                                                        <TableCell>
                                                            <NextLink
                                                                href={`/product/${item.slug}`}
                                                                passHref
                                                            >
                                                                <Typography>
                                                                    <Link>
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </Link>
                                                                </Typography>
                                                            </NextLink>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Typography>
                                                                {item.quantity}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Typography>
                                                                ${item.price}
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </ListItem>
                            </List>
                        </Card>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <Card className={classes.section}>
                            <List>
                                <ListItem>
                                    <Typography variant="h2">
                                        Order Summary
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography>Items:</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography align="right">
                                                ${itemsPrice}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography>Tax:</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography align="right">
                                                ${taxPrice}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography>Shipping:</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography align="right">
                                                ${shippingPrice}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography>
                                                <strong>Total:</strong>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography align="right">
                                                <strong>${totalPrice}</strong>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            </List>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </Layout>
    );
}

export async function getServerSideProps({ params }) {
    return { props: { params } };
}

export default dynamic(() => Promise.resolve(OrderScreen), { ssr: false });
