import { isAuth } from '@/utils/auth';
import nc from 'next-connect';

const handler = nc();

handler.use(isAuth);
handler.get(async (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
});

export default handler;
