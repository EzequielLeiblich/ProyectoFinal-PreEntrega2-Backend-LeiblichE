import { Router } from 'express';
import __dirname from "../utils.js"
import ProductManager from '../daos/mongodb/ProductManager.class.js';
import CartManager from '../daos/mongodb/CartManager.class.js';
import { productsModel } from '../daos/mongodb/models/products.model.js';

let productManager = new ProductManager()
let cartManager = new CartManager()

const router = Router();

router.get('/', async (req,res)=>{
  let products = await productManager.getProducts();
  res.render('home', {
    title: "Inicio",
    products: products
  });
})

router.get('/realtimeproducts', async (req,res)=>{
  res.render('realTimeProducts',{
    title: "Tiempo Real"
  });
})

// router.get('/products', async (req,res)=>{
//   let page = parseInt(req.query.page);
//   let products = await productManager.getProducts();
//   let result = await productsModel.paginate({},{page,limit:5,lean:true})
//   result.prevLink = result.hasPrevPage?`http://localhost:8080/products?page=${result.prevPage}`:'';
//   result.nextLink = result.hasNextPage?`http://localhost:8080/products?page=${result.nextPage}`:'';
//   result.isValid= !(page<=0||page>result.totalPages)
//   res.render('products', {
//     title: "Productos",
//     products: products
//   });
// })

// router.get('/carts', async (req,res)=>{
//   let carts = await cartManager.getAllCarts()
//   res.render('carts', {
//     title: "Carritos",
//     carts: carts
//   });
// })

export default router;