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

export default function Home({ products }) {
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
                                <Button size="small" color="primary">
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
