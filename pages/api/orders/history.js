import Order from '@/models/Order';
import db from '@/utils/db';
import nc from 'next-connect';
import { onError } from '@/utils/error';
import { isAuth } from '@/utils/auth';

const handler = nc({
    onError,
});

// Auth Middleware
handler.use(isAuth);

handler.get(async (req, res) => {
    await db.connect();
    const orders = await Order.find({ user: req.user._id });
    res.status(200).send(orders);
    await db.disconnect();
});

export default handler;
