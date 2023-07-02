import { Router } from "express";
import ProductManager from "../daos/mongodb/ProductManager.class.js";
import __dirname from "../utils.js";

let productManager = new ProductManager();

const router = Router();

router.get('/', async (req, res) => { // ?limit=x
  let limit = Number(req.query.limit);
  let page = Number(req.query.page);
  let sort = Number(req.query.sort);
  let filtro = req.query.filtro;
  let filtroVal = req.query.filtroVal;
  let products = await productManager.obtenerProductos(
      limit,
      page,
      sort,
      filtro,
      filtroVal
  );

  res.send({ products });
});

router.get('/:pid', async (req, res) => {
  let productId = req.params.pid;
  let product = await productManager.consultarProducto(productId);
  res.send(product)
});

router.post('/', async (req, res) => {
  const product = req.body;
  const result = await productManager.agregarProducto(product);
  res.send({ status: result });
});

router.put('/:pid', async(req, res) => {
  let productId = req.params.pid;
  let product= req.body;
  const result = await productManager.modificarProducto(productId, product)
  res.send({ status: result })
})

router.delete('/:pid', async(req, res) => {
  let productId = req.params.pid;
  const result = await productManager.eliminarProducto(productId);
  res.send({ status: result })
});

export default router