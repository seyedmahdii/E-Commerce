import Product from '@/models/Product';
import User from '@/models/User';
import data from '@/utils/data';
import db from '@/utils/db';
import nc from 'next-connect';

const handler = nc();

handler.get(async (req, res) => {
    await db.connect();
    await Product.deleteMany();
    await Product.insertMany(data.products);

    await User.deleteMany();
    await User.insertMany(data.users);
    await db.disconnect();
    res.send({ message: 'Seeded successfully!' });
});

export default handler;
