import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'

import routerProducts from './routes/products.router.js' 
import routerCarts from './routes/carts.router.js'
import routerViews from './routes/views.router.js'

import { Server } from "socket.io";

import ProductManager from './daos/mongodb/ProductManager.class.js'
import MessageManager from './daos/mongodb/MessageManager.class.js'

const productManager = new ProductManager();
const messageManager = new MessageManager();

// initial configuration

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static

app.use(express.static(__dirname + "/public"));


// handlebars configuration

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


// server start and socket io

const expressServer = app.listen(8080, () => console.log("Servidor levantado"))
const socketServer = new Server(expressServer)

socketServer.on("connection", async (socket) => {
  console.log("Estas conectado " + socket.id)
  
  socket.on('message', data => {
    console.log(data)
  })

  socket.on("message", (data) => {
    console.log(data)
    agregarYEnviarMensajes(data)
  });

  socket.on('crearProducto', async(product) => {
    await productManager.agregarProducto(product);
    let products = await productManager.obtenerProductos();
    socket.emit('productosActualizados', (products));
  })

  socket.on('eliminarProducto', async(productId) => {
      console.log("eliminando")
      await productManager.eliminarProducto(productId);
      let products = await productManager.obtenerProductos();
      socket.emit('productosActualizados', (products));
  })

  socket.on("message", (data) => {
      console.log(data)
      agregarYEnviarMensajes(data)
  });

  socket.on('authenticatedUser', (data)=>{
      socket.broadcast.emit('newUserAlert', data)
  })
});

async function agregarYEnviarMensajes(msg) {
  await messageManager.agregarMessage(msg);
  const messages = await messageManager.obtenerMessages();
  socketServer.emit("imprimir", messages);
}

// routers

app.use((req, res, next) => {
  req.socketServer = socketServer;
  next()
});

app.use("/", routerViews);
app.use("/api/products/", routerProducts);
app.use("/api/carts/", routerCarts);
