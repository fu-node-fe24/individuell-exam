import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { validateOrderBody } from '../middlewares/validators.js';
import { deleteCart, getCart } from '../services/cart.js';
import { createOrder, getOrders, getOrdersByUserId } from '../services/orders.js';

const router = Router();

router.get('/', async (req, res, next) => {
    const orders = await getOrders();
    if(orders) {
        res.json({
            success : true,
            orders: orders
        });
    } else {
        next({
            success : 404,
            message : 'No orders found'
        });
    }
});

router.get('/:userId', async (req, res, next) => {
    const orders = await getOrdersByUserId(req.params.userId);
    if(orders) {
        res.json({
            success : true,
            orders: orders
        });
    } else {
        next({
            success : 404,
            message : 'No orders found'
        });
    }
});

router.post('/', validateOrderBody, async (req, res, next) => {
    const { cartId } = req.body;
    const cart = await getCart(cartId);
    if(cart) {
        let price = 0;
        cart.items.forEach(item => price += item.qty * item.price);
        const order = await createOrder({
            orderId : `order-${uuid().substring(0, 5)}`,
            userId : cartId,
            items : cart.items,
            price : price
        });
        if(order) {
            const result = await deleteCart(cartId);
            if(result) {
                res.status(201).json({
                    success : true,
                    message : 'Order created successfully',
                    order : order
                });
            } else {
                next({
                    success : 400,
                    message : 'Order could not be created'
                });
            }

        } else {
            next({
                success : 400,
                message : 'Order could not be created'
            });
        }
    } else {
        next({
            success : 400,
            message : 'The requested cart does not exist'
        });
    }
});

export default router;