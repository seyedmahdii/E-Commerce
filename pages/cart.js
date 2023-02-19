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
    Select,
    MenuItem,
    Button,
    Card,
    List,
    ListItem,
    Link,
} from '@mui/material';
import NextLink from 'next/link';
import React, { useContext } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '@/constants/types';
import { useRouter } from 'next/router';

function CartScreen() {
    const { state, dispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;
    const router = useRouter();

    const updateCartHandler = async (item, quantity) => {
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < quantity) {
            alert('Product is out of stock');
            return;
        }
        dispatch({ type: CART_ADD_ITEM, payload: { ...item, quantity } });
    };

    const removeItemHandler = (item) => {
        dispatch({ type: CART_REMOVE_ITEM, payload: item });
    };

    const checkoutHandler = () => {
        router.push('/shipping');
    };

    return (
        <Layout title="Shopping Cart">
            <Typography component="h1" variant="h1"></Typography>
            {cartItems.length === 0 ? (
                <div>
                    Cart is empty!{' '}
                    <NextLink href="/" passHref>
                        <Link>Go Shopping</Link>
                    </NextLink>
                </div>
            ) : (
                <Grid container spacing={1}>
                    <Grid item md={9} xs={12}>
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
                                        <TableCell align="right">
                                            Action
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cartItems.map((item) => (
                                        <TableRow key={item._id}>
                                            <TableCell>
                                                <NextLink
                                                    href={`/product/${item.slug}`}
                                                >
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
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
                                                        <Link>{item.name}</Link>
                                                    </Typography>
                                                </NextLink>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Select
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        updateCartHandler(
                                                            item,
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    {[
                                                        ...Array(
                                                            item.countInStock
                                                        ).keys(),
                                                    ].map((x) => (
                                                        <MenuItem
                                                            key={x + 1}
                                                            value={x + 1}
                                                        >
                                                            {x + 1}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </TableCell>
                                            <TableCell align="right">
                                                ${item.price}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() =>
                                                        removeItemHandler(item)
                                                    }
                                                >
                                                    X
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <Card>
                            <List>
                                <ListItem>
                                    <Typography variant="h2">
                                        Subtotal (
                                        {cartItems.reduce(
                                            (total, item) =>
                                                total + item.quantity,
                                            0
                                        )}{' '}
                                        items) : $
                                        {cartItems.reduce(
                                            (total, item) =>
                                                total +
                                                item.quantity * item.price,
                                            0
                                        )}
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={checkoutHandler}
                                    >
                                        Check Out
                                    </Button>
                                </ListItem>
                            </List>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </Layout>
    );
}

// This page will not render in the sever side. It will only render in client. Because we're not gonna index this page
// in the search engines like google.
export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
