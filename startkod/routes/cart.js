import { Router } from 'express';
import { validateCartBody } from '../middlewares/validators.js';
import { getProduct } from '../services/menu.js';
import { getUser } from '../services/users.js';
import { getCarts, getCart, updateCart } from '../services/cart.js';
import { v4 as uuid } from 'uuid';

const router = Router();

router.get('/', async (req, res, next) => {
    const carts = await getCarts();    
    if(carts) {
        res.json({
            success : true,
            carts : carts
        });
    } else {
        next({
            status : 404,
            message : 'No carts found'
        });
    }
})

router.get('/:cartId', async (req, res, next) => {
    const cart = await getCart(req.params.cartId);
    if(cart) {
        res.json({
            success : true,
            cart : cart
        });
    } else {
        next({
            status : 404,
            message : 'No cart found'
        });
    }
})

router.put('/', validateCartBody, async (req, res, next) => {
    const { prodId, qty, guestId } = req.body;
    if(global.user) {
        const user = await getUser(global.user.username);
        if(user) {
            const product = await getProduct(prodId);
            if(product) {
                const result = await updateCart(user.userId, { 
                    prodId : prodId, 
                    title : product.title, 
                    price: product.price, 
                    qty : qty 
                });
                if(result) {
                    res.status(201).json({
                        success : true,
                        message : 'Cart updated',
                        cart : result
                    });
                } else {
                    next({
                        status : 400,
                        message : 'Could not add to cart'
                    });
                }
            } else {
                next({
                    status : 400,
                    message : 'Invalid prodId provided'
                });
            }
        } else {
            next({
                status : 404,
                message : 'Something went wrong'
            });
        }
    } else {
        const product = await getProduct(prodId);
            if(product) {
                const result = await updateCart(guestId || `guest-${uuid().substring(0, 5)}`, { 
                    prodId : prodId, 
                    title : product.title, 
                    price: product.price, 
                    qty : qty 
                });
                if(result) {
                    res.status(201).json({
                        success : true,
                        message : 'Cart updated',
                        cart : result
                    });
                } else {
                    next({
                        status : 400,
                        message : 'Could not add to cart'
                    });
                }
            } else {
                next({
                    status : 400,
                    message : 'Invalid prodId provided'
                });
            }
    }
});

export default router;