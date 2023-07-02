const socket = io();
socket.emit('message', 'Chat establecido')

socket.on('productosActualizados', (productos) => {
    const productList = document.getElementById("productList");
    productList.innerHTML= ''
    productos.forEach((producto) => {
      const newItem = document.createElement("li");
      newItem.innerHTML = `
        <p>Título: ${producto.title}</p>
        <p>Descripción: ${producto.description}</p>
        <p>Precio: ${producto.price}</p>
        <p>Código: ${producto.code}</p>
        <p>Stock: ${producto.stock}</p>
        <p>Categoría: ${producto.category}</p>
        <input type="button" value="Eliminar producto" id="${producto.id}" onclick="eliminarProducto('{{this.id}}')">
      `;
      productList.appendChild(newItem);
    });
  });

  function eliminarProducto(productId) {
    socket.emit('eliminarProducto', productId);
  }
  
  
  const crearProductoForm = document.getElementById('crearProductoForm');
  crearProductoForm.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const title = crearProductoForm.title.value;
    const price = crearProductoForm.price.value;
    const description = crearProductoForm.description.value;
    const code = crearProductoForm.code.value;
    const stock = crearProductoForm.stock.value;
    const category = crearProductoForm.category.value;

    socket.emit('crearProducto', {title, price, description, code, stock, category});
  
    crearProductoForm.reset();
  });