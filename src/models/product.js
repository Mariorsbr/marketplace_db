const mongoose = require('../database');


const ProductSchema = new mongoose.Schema({
    store:{
        type: String,
        require: true,
    },
    name:{
        type: String,
        require: true,
    },
    description:{
        type:String,
        require: true,
    },
    photo_main:{
        type:String,
        require: true,
    },
    photo_1:{
        type:String,
        require: true,
    },
    photo_2:{
        type:String,
        require: true,
    },
    category:{
        type: String,
        require: true,
    },
    price: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;