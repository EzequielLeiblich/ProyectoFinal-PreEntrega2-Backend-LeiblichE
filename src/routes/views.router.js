import { Router } from 'express';
import __dirname from "../utils.js"
import express from 'express';
import ProductManager from '../daos/mongodb/ProductManager.class.js';

const router = express.Router();
const productManager = new ProductManager();

router.get('/', async(req, res) => {
  const page = req.query.page || 1;
  let result = await productManager.obtenerProductos(2, page);
  let prod = result.docs;
  console.log(result.docs);
  res.render('home', {
    products: prod,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    nextPage: result.nextPage,
    prevPage: result.prevPage,
    page: result.page
  });
});

router.get('/realtimeproducts', async(req, res) => {
  let products = await productManager.obtenerProductos();
  res.render('realTimeProducts', {products});
});

router.get('/chat',(req,res)=>{
  res.render('chat');
})

export default router;