import Cart from '../models/cart.js';

async function getOrCreateCart(userId) {
    try {
        let cart = await Cart.findOne({ cartId : userId });
        if(!cart) {
            cart = await Cart.create({
                cartId : userId,
                items : []
            });
            console.log('Cart', cart);
        }
        return cart;
    } catch(error) {
        console.log(error.message);
        return null;
    }
}

export async function updateCart(userId, product) {
    try {
        let cart = await getOrCreateCart(userId);
        if (!cart) {
            throw new Error("Cart not found or could not be created");
        }

        const item = cart.items.find(item => item.prodId === product.prodId);
        if(item) {            
            item.qty = product.qty; 
        } else {
            cart.items.push(product);
        }

        if (product.qty === 0) {
            cart.items = cart.items.filter(item => item.prodId !== product.prodId);            
        }
        await cart.save();
        return cart;
    } catch(error) {
        console.log(error.message);
        return null;
    }
}

export async function getCarts() {
    try {
        let carts = await Cart.find();
        return carts;
    } catch(error) {
        console.log(error.message);
        return null;
    }
}

export async function getCart(cartId) {
    try {
        let cart = await Cart.findOne({ cartId : cartId });
        return cart;
    } catch(error) {
        console.log(error.message);
        return null;
    }
}

export async function deleteCart(cartId) {
    try {
        let result = await Cart.deleteOne({ cartId : cartId });
        return result;
    } catch(error) {
        console.log(error.message);
        return null;
    }
}