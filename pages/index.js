import Layout from '@/components/Layout';
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from '@mui/material';
// import data from '@/utils/data';
import NextLink from 'next/link';
import db from '@/utils/db';
import Product from '@/models/Product';
import axios from 'axios';
import { CART_ADD_ITEM } from '@/constants/types';
import { useContext } from 'react';
import { Store } from '@/utils/Store';
import { useRouter } from 'next/router';

export default function Home({ products }) {
    const { dispatch, state } = useContext(Store);
    const router = useRouter();

    const addToCarthandler = async (product) => {
        const existItem = state.cart.cartItems.find(
            (item) => item._id === product._id
        );
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${product._id}`);
        if (quantity > data.countInStock) {
            alert('Product is out of stock!');
            return;
        }
        dispatch({
            type: CART_ADD_ITEM,
            payload: { ...product, quantity },
        });
        router.push('/cart');
    };

    return (
        <Layout>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item md={4} key={product.name}>
                        <Card>
                            <NextLink href={`/product/${product.slug}`}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        image={product.image}
                                        title={product.name}
                                    ></CardMedia>
                                    <CardContent>
                                        <Typography>{product.name}</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </NextLink>
                            <CardActions>
                                <Typography>${product.price}</Typography>
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={() => addToCarthandler(product)}
                                >
                                    Add to cart
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Layout>
    );
}

export async function getServerSideProps() {
    await db.connect();
    const products = await Product.find({}).lean();
    await db.disconnect();
    return {
        props: {
            products: products.map(db.convertDocToObj),
        },
    };
}
