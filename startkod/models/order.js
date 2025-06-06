import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
    prodId: String,
    title: String,
    price: Number,
    qty: Number
});

const orderSchema = new mongoose.Schema({
    orderId : {
        type : String,
        required : true,
        unique : true
    },
    userId: { 
        type : String,
        required : true,
    },  
    items: [orderItemSchema],
    price : {
        type : Number,
        required : true,
    }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;