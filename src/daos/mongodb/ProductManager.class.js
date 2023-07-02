import fs from 'fs'
import mongoose from "mongoose";
import { productModel } from "./models/product.model.js";

export default class ProductManager {
    connection = mongoose.connect("mongodb+srv://ezequielleiblich:1Q2w3e4r@leibliche.nmve4kb.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log('Conexión exitosa a MongoDB Atlas'))
    .catch((err) => console.error('Error al conectarse a MongoDB Atlas:', err))
    
    async agregarProducto (product) {
        try {
            let result = await productModel.create(product);
            return result;
        } catch (e) {
            console.log(e);
            return e;
        }
    }

    async obtenerProductos(
        limit = 1,
        page = 1,
        sort = 0,
        filtro = null,
        filtroVal = null) {
            let whereOptions = {};
            if (filtro != "" && filtroVal != "") {
                whereOptions = { [filtro]: filtroVal };
            }
                let result = await productModel.paginate(whereOptions, {
                lean: true,
                limit: limit,
                page: page,
                sort: { price: sort },
            });
            return result;
    }

    async consultarProducto (id) {
        let result = await productModel.findOne({_id: id})
        return result
    }
    
    async modificarProducto (id, updatedProduct) {
        let result = await productModel.updateOne(
            { _id: id },
            { $set: updatedProduct }
        );
        return result;
    }
    
    async eliminarProducto (id) {
        let result = await productModel.deleteOne({_id: id})
        return result
    }
}