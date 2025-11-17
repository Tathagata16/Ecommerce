import mongoose, { mongo } from "mongoose";
const productSchema = new mongoose.Schema({
     name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['electronics', 'clothing', 'books', 'home', 'sports']
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        default: ''
    },
    
},{timestamps:true});

const Product = mongoose.model("Product",productSchema);
export default Product;