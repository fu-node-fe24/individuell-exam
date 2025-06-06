import Order from '../models/order.js';

export async function getOrders() {
    try {
        const orders = await Order.find();
        return orders;
    } catch(error) {
        console.log(error.message);
        return null;
    }
}

export async function getOrdersByUserId(userId) {
    try {
        const orders = await Order.find({ userId : userId });
        return orders;
    } catch(error) {
        console.log(error.message);
        return null;
    }
}

export async function createOrder(order) {
    try {
        const result = Order.create(order);
        return result;
    } catch(error) {
        console.log(error.message);
        return null;
    }
}