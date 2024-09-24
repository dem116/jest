/*las siguientes funciones y variables:

resetProducts(): reinicia la lista de productos y el id.
addProduct(name, price): agrega un producto a la lista de productos.
removeProduct(id): elimina un producto de la lista de productos.
getProducts(): devuelve todos los productos.
resetProducts(): reinicia la lista de productos.
getProduct(id): devuelve un producto por su id.
updateProduct(id, name, price): actualiza un producto por su id.
products: array de productos. Por defecto, estará vacío.
id: id del producto. Por defecto, será 0. Cada vez que se añada un producto, se incrementará en 1.*/

let products = [];
let id = 0;

function resetProducts() {
  products = [];
  id = 0;
}

function addProduct(name, price) {
  if (!name || price === undefined) {
    throw new Error('Name and price must be defined');
  }
  
  const productExists = products.some(product => product.name === name);
  if (productExists) {
    throw new Error('Product already exists');
  }

  products.push({ id: ++id, name, price });
}

function removeProduct(productId) {
  const index = products.findIndex(product => product.id === productId);
  if (index === -1) {
    throw new Error('Product does not exist');
  }
  products.splice(index, 1);
}

function getProducts() {
  return products;
}

function getProduct(productId) {
  const product = products.find(product => product.id === productId);
  if (!product) {
    throw new Error('Product does not exist');
  }
  return product;
}

function updateProduct(productId, name, price) {
  const product = products.find(product => product.id === productId);
  if (!product) {
    throw new Error('Product does not exist');
  }
  if (name) product.name = name;
  if (price !== undefined) product.price = price;
}

module.exports = { resetProducts, addProduct, removeProduct, getProducts, getProduct, updateProduct };
