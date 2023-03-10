import bcrypt from 'bcryptjs';

const data = {
    products: [
        {
            name: 'free shirt',
            slug: 'free-shirt',
            category: 'shirts',
            image: '/images/shirt1.jpg',
            price: 70,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: 'A popular shirt',
        },
        {
            name: 'fit shirt',
            slug: 'fit-shirt',
            category: 'shirts',
            image: '/images/shirt2.jpg',
            price: 70,
            brand: 'Adidas',
            rating: 4.2,
            numReviews: 8,
            countInStock: 20,
            description: 'A popular shirt',
        },
        {
            name: 'slim shirt',
            slug: 'slim-shirt',
            category: 'shirts',
            image: '/images/shirt3.jpg',
            price: 90,
            brand: 'Raymond',
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: 'A popular shirt',
        },
        {
            name: 'golf pants',
            slug: 'golf-pants',
            category: 'pants',
            image: '/images/pants1.jpg',
            price: 70,
            brand: 'Oliver',
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: 'smart looking pants',
        },
        {
            name: 'fit pants',
            slug: 'fit-pants',
            category: 'shirts',
            image: '/images/pants2.jpg',
            price: 95,
            brand: 'zora',
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: 'A popular shirt',
        },
        {
            name: 'classic pants',
            slug: 'classic-pants',
            category: 'pants',
            image: '/images/pants3.jpg',
            price: 100,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: 'A popular pants',
        },
    ],
    users: [
        {
            name: 'Seyed Mahdi',
            email: 'seyedmahdi@gmail.com',
            password: bcrypt.hashSync('12345678'),
            isAdmin: true,
        },
        {
            name: 'Sara',
            email: 'sara@gmail.com',
            password: bcrypt.hashSync('sara'),
            isAdmin: false,
        },
    ],
};

export default data;
