import mongoose from "mongoose";
import { cartModel } from "./models/carts.model.js";
import ProductManager from "./ProductManager.class.js";

export default class CartManager {
  connection = mongoose.connect("mongodb+srv://ezequielleiblich:1Q2w3e4r@leibliche.nmve4kb.mongodb.net/?retryWrites=true&w=majority");

  productManager = new ProductManager();

  async createCart() {
    try{
    const result = await cartModel.create({ products: [] });
    return result;
    }
    catch (error) {
        console.error(error);
        return error;
    }
  }
  async getCartById (cid) {
    try{
        const result = await cartModel
        .findOne({ _id: cid })
        .populate("products.product");
        return result;
    }
    catch (error) {
        console.error(error);
        return error;
    }
  }

  async getAllCarts() {
    const result = await cartModel.find();
    return result
  }

  async addProductToCart(cid, pid) {
    const product = await this.productManager.getProductById(pid);
    const cart = await this.getCartById(cid);
    cart.products.push({ product: product });
    // Buscar si el producto ya está en el carrito
    const existingProductIndex = cart.products.findIndex(
      (item) => item.product._id.toString() === pid
    );

    if (existingProductIndex !== -1) {
      // Si el producto ya está en el carrito, aumentar su cantidad
      cart.products[existingProductIndex].quantity += 1;
    } else {
      // Si el producto no está en el carrito, agregarlo con una cantidad de 1
      cart.products.push({ product, quantity: 1 });
    }
    await cart.save()
    return;
  }

  async deleteProductFromCart(cid, pid) {
    const cart = await this.getCartById(cid);
    cart.products.pull(pid);
    await cart.save();
    return;
  }

  async deleteAllProductsFromCart(cid) {
    const cart = await this.getCartById(cid);
    cart.products = [];
    await cart.save();
    return;
  }

  async deleteCart(id) {
    const result = await cartModel.deleteOne({ _id: id });
    return result;
  }

  async updateCart(cid, products) {
    try {
        const cart = await this.getCartById(cid);
        cart.products = [];
        await cart.save();
        let productsArray = products.products;
        productsArray.forEach(pid => this.addToCart(cid, pid)) 
        return;
    }
    catch (error) {
        console.error(error);
        return error;
    }
  }
}