import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema({
    prodId : {
        type : String,
        minlength : 5,
        unique : true,
        required : true
    },
    title : {
        type : String,
        required : true
    },  
    desc : {
        type : String,
        minlength : 10,
        required : true
    },
    price : {
        type : Number,
        required : true
    } 
});

const Product = mongoose.model('Product', productSchema);

export default Product;