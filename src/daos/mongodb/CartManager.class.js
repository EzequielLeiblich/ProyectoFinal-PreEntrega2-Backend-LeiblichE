import mongoose from "mongoose";
import { cartModel } from "./models/carts.model.js";

export default class CartManager {
  connection = mongoose.connect('mongodb+srv://ezequielleiblich:1Q2w3e4r@leibliche.nmve4kb.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Conexión exitosa a MongoDB Atlas'))
  .catch((err) => console.error('Error al conectarse a MongoDB Atlas:', err))

  async agregarCarrito () {
    let result = await cartModel.create({items: []}) 
    return result;
  }

  async consultarCarrito (id) {
    const result = await cartModel.findOne({ _id: id }).populate('items.product');
    return result
  }

  async consultarCarritos () {
      let result = await cartModel.find()
      return result
  }

  async agregarProductoAlCarrito(cartId, productId) {
    try {
      const existingCartItem = await cartModel.findOneAndUpdate(
        { _id: cartId, 'items.product': productId },
        { $inc: { 'items.$.quantity': 1 } },
        { new: true }
      );
      if (existingCartItem) {
        return existingCartItem;
      }
  
      const cart = await cartModel.findOneAndUpdate(
        { _id: cartId },
        { $push: { items: { product: productId } } },
        { new: true }
      );
  
      return cart;
    } catch (error) {
    console.log(error)
    }
  }

  async quitarProductoDelCarrito(cartId, productId) {
    try {
      const cart = await cartModel.findOneAndUpdate(
        { _id: cartId },
        { $inc: { 'items.$[elem].quantity': -1 } },
        { arrayFilters: [{ 'elem.product': productId, 'elem.quantity': { $gt: 0 } }], new: true }
      );
  
      if (cart) {
        const updatedItems = cart.items.filter(item => item.quantity > 0);
        cart.items = updatedItems;
        await cart.save();
      }
  
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async quitarTodosLosProductos(cartId) {
    try {
      const cart = await cartModel.findById(cartId);
      cart.items = [];
      await cart.save();
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async actualizarCantProductos(cartId, productId, newQuantity){
    try {
      const cart = await cartModel.findOneAndUpdate(
        { _id: cartId, 'items.product': productId },
        { $set: { 'items.$.quantity': newQuantity } },
        { new: true }
      );
      cart.save()
      return cart;
    } catch (error) {
      console.log(error)
    }
  }

  async actualizarArrayProductos(cartId, array) {
    try {
      const cart = await cartModel.findOneAndUpdate(
        { _id: cartId },
        { $set: { 'items': array } },
        { new: true }
      );
      cart.save()
      return cart;
    } catch (error) {
    console.log(error)
    }
  }
}