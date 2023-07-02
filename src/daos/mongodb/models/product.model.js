import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productCollection = 'products'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    category: {
        type: String,
    },
    thumbnails: { 
        type: Array,
    },
    status: {
        type: Boolean,
    },
    code: {
        type: String,
        unique: true
    },
    stock: { 
        type: Number,
    }

})

productSchema.plugin(mongoosePaginate)
export const productModel = mongoose.model(productCollection, productSchema)