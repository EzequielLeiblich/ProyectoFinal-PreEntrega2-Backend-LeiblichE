import { Router } from "express";
import ProductManager from "../daos/mongodb/ProductManager.class.js";
import __dirname from "../utils.js";

let productManager = new ProductManager();

const router = Router();

router.get("/", async (req, res) => {
  try {
    let limit = Number(req.query.limit);
    let page = Number(req.query.page);
    let sort = Number(req.query.sort);
    let filtro = req.query.filtro;
    let filtroVal = req.query.filtroVal;

    const products = await productManager.getProducts(
      limit, 
      page, 
      sort, 
      filtro, 
      filtroVal
    );
  res.send({ products });
  } catch (error) {
    console.log('Error al obtener todos los productos:', error);
    res.status(500).send('Error al obtener todos los productos');
  }
});

router.get("/:pid", async (req, res) => {
  let id = req.params.pid;

  let product = await productManager.getProductById(id);

  if (!product) {
    res.send("No se encontró el producto");
    return;
  }

  res.send(product);
});

router.post('/', async (req, res) => {
  let newProduct = req.body

  await productManager.addProduct(newProduct);
  const products = await productManager.getProducts();
  req.socketServer.sockets.emit('update-products', products);
  res.send({status: "success"});
});

router.put('/:pid', async (req, res) => {
  let id = req.params.pid
  let newProduct = req.body

  await productManager.updateProduct(id, newProduct)

  res.send({status: "success"})
});

router.delete('/:pid', async (req, res) => {
  let id = req.params.pid
  
  await productManager.deleteProduct(id)

  res.send({status: "success"})
});

export default router