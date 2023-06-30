import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productCollection = 'products'

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnails: { 
        type: Array, 
        required: true 
    },
    status: {
        type: Boolean, 
        requiered: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    stock: { 
        type: Number, 
        required: true 
    }

})

ProductSchema.plugin(mongoosePaginate)
export const productsModel = mongoose.model(productCollection, ProductSchema)