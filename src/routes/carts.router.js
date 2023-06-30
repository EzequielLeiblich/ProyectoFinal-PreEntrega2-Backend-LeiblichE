import { Router } from "express";
import CartManager from "../daos/mongodb/CartManager.class.js";
import __dirname from "../utils.js";


let cartManager = new CartManager()

const router = Router();

router.get('/', async (req, res) => {
  let carts = await cartManager.getAllCarts()
  
  if (!carts) {
    res.send("No se existen carritos")
    return
  }
  
  res.send(carts)
})

router.get('/:cid', async (req, res) => {
  const id = req.params.id
  const cart = await cartManager.getCartById(id)

  if (!cart) {
    res.send("No se encontró el carrito")
    return
  }

  res.send(cart)
})

router.post('/', async (req, res) => {
  await cartManager.createCart()

  res.send({status: "success"})
})

router.post('/:cid/product/:pid', async (req, res) => {
  let cartId = req.params.cid
  let productId = req.params.pid

  await cartManager.addProductToCart(cartId, productId)

  res.send({status: "success"})
})

router.delete("/:cid", async (req, res) => {
  let cartId = req.params.cid;
  await cartManager.deleteCart(cartId);
  res.send({ status: "success" });
});

router.delete("/:cid", async (req, res) => {
  let cartId = req.params.cid;
  await cartManager.deleteAllProductsFromCart(cartId);
  res.send({ status: "success" });
});

router.delete("/:cid/product/:pid", async (req, res) => {
  let cartId = req.params.cid;
  let productId = req.params.pid;

  await cartManager.deleteProductFromCart(cartId, productId);

  res.send({ status: "success" });
});

router.put("/:cid/products/:pid", async (req, res) => { 
  let cartId = req.params.cid;
  let productId = req.params.pid;
  let quantity = req.body.quantity;

  await managerCarts.updateProductQuantity(cartId, productId, quantity);

  res.send({ status: "success" });
});

router.put("/:cid", async (req, res) => {
  const products = req.body;
  const cartId = req.params.cid;
  await cartManager.updateCart(cartId, products);
  res.send({ status: "success" });
})


export default router