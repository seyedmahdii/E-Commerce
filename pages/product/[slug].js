import Layout from '@/components/Layout';
// import data from '@/utils/data';
// import { useRouter } from 'next/router';
import NextLink from 'next/link';
import useStyles from '@/utils/styles';
import { Grid, List, ListItem, Typography, Card, Button } from '@mui/material';
import Image from 'next/image';
import db from '@/utils/db';
import Product from '@/models/Product';

export default function ProductScreen({ product }) {
    // const router = useRouter();
    // const { slug } = router.query;
    // const product = data.products.find((product) => product.slug === slug);
    const classes = useStyles();

    if (!product) {
        return (
            <div>
                <h1>Product not found!</h1>
            </div>
        );
    }

    return (
        <Layout title={product.name} description={product.description}>
            <div className={classes.section}>
                <NextLink href="/">
                    <Typography>back to products</Typography>
                </NextLink>
            </div>
            <Grid container spacing={1}>
                <Grid item md={6} xs={12}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={640}
                        height={640}
                        layout="responsive"
                    />
                </Grid>
                <Grid item md={3} xs={12}>
                    <List>
                        <ListItem>
                            {/* set variant to "h1" to use the theme */}
                            <Typography component="h1" variant="h1">
                                {product.name}
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>
                                Category: {product.category}
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>Brand: {product.brand}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>
                                Rating: {product.rating} stars (
                                {product.numReviews} Reviews)
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>
                                Description: {product.description}
                            </Typography>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item md={3} xs={12}>
                    <Card>
                        <List>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Price</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            ${product.price}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Status</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            {product.countInStock > 0
                                                ? 'In stock'
                                                : 'Unavailable'}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    Add to cart
                                </Button>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const {
        params: { slug },
    } = context;
    await db.connect();
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();
    return {
        props: {
            product: db.convertDocToObj(product),
        },
    };
}
