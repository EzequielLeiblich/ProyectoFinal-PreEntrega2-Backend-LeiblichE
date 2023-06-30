import fs from 'fs'
import mongoose from "mongoose";
import { productsModel } from "./models/products.model.js";

export default class ProductManager {
    connection = mongoose.connect("mongodb+srv://ezequielleiblich:1Q2w3e4r@leibliche.nmve4kb.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log('Conexión exitosa a MongoDB Atlas'))
    .catch((err) => console.error('Error al conectarse a MongoDB Atlas:', err))
    
    async addProduct(product) {
        try{
        let result = await productsModel.create(product);
        return result;
        }catch(e){
            console.log(e)
            return e
        }
    }
    async getProducts(limit = 10, page = 1, sort = 0, filtro = null, filtroVal = null){
        try {
            let whereOptions = {};
            if (filtro != "" && filtroVal != "") {
                whereOptions = { [filtro]: filtroVal };
            }
            if (sort == 1 || sort == -1) {
            let result = await productsModel.paginate(whereOptions, {limit: limit, page: page, sort: { price: sort}});
            return result;
            }
            else{
                let result = await productsModel.paginate(whereOptions, {limit: limit, page: page});
                return result;
            }
        }
        catch (error) {
            console.error(error);
            return error;
        }
    }

    async getProductById(id) {
        try {
            let result = await productsModel.findOne({ _id: id });
            return result;
        }
        catch (error) {
            console.error(error);
            return error;
        }
    }
    
    async updateProduct(id, updatedProduct) {
        try{
            let result = await productsModel.updateOne(
            { _id: id },
            { $set: updatedProduct }
            );
            return result;
        }
        catch (error) {
            console.error(error);
            return error;
        }
    }
    
    async deleteProduct(id) {
        try {
            let result = productsModel.deleteOne(
                { _id: id },
                { $set: updatedProduct }
                );
            return result;
        } 
        catch (error) {
            console.error(error);
            return error;
        }
    }
}