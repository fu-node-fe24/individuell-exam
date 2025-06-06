import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type : String,
        minlength : 6,
        unique : true,
        required : true
    },
    password : {
        type : String,
        minlength : 8,
        required : true
    },  
    role : {
        type : String,
        minlength : 4,
        required : true
    },
    userId : {
        type : String,
        minlength : 5,
        unique : true,
        required : true
    } 
});

const User = mongoose.model('User', userSchema);

export default User;