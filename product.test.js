/*tests*/
/*Los tests deberían cubrir los siguientes casos:

addProduct
debería agregar un producto.
debería incrementar el id en 1 cada vez que se añada un producto.
debería lanzar un error si el nombre o el precio no están definidos.
debería lanzar un error si el producto ya existe.
removeProduct
debería eliminar un producto
debería lanzar un error si el producto no existe.
getProduct
debería devolver un producto por su id.
debería lanzar un error si el producto no existe.
updateProduct
debería actualizar un producto por su id.
debería lanzar un error si el producto no existe.*/

const { resetProducts,  addProduct, removeProduct, getProducts, getProduct, updateProduct} = require('./product');

beforeEach(() => {
  resetProducts();
});

describe('addProduct', () => {
  it('should add a product', () => {
    addProduct('Product 1', 100);
    const products = getProducts();
    expect(products.length).toBe(1);
    expect(products[0]).toMatchObject({ name: 'Product 1', price: 100 });
  });

  it('should increment the id', () => {
    addProduct('Product 1', 100);
    addProduct('Product 2', 200);
    const products = getProducts();
    expect(products[1].id).toBe(2);
  });

  it('should throw an error if name or price is not defined', () => {
    expect(() => addProduct('', 100)).toThrow('Name and price must be defined');
    expect(() => addProduct('Product 1')).toThrow('Name and price must be defined');
  });

  it('should throw an error if the product already exists', () => {
    addProduct('Product 1', 100);
    expect(() => addProduct('Product 1', 100)).toThrow('Product already exists');
  });
});

describe('removeProduct', () => {
  it('should remove a product', () => {
    addProduct('Product 1', 100);
    removeProduct(1);
    expect(getProducts().length).toBe(0);
  });

  it('should throw a error if the product does not exist', () => {
    expect(() => removeProduct(999)).toThrow('Product does not exist');
  });
});

describe('getProduct', () => {
  it('should return product by id', () => {
    addProduct('Product 1', 100);
    const product = getProduct(1);
    expect(product).toMatchObject({ id: 1, name: 'Product 1', price: 100 });
  });

  it('should throw an error if the product does not exist', () => {
    expect(() => getProduct(999)).toThrow('Product does not exist');
  });
});

describe('updateProduct', () => {
  it('should update a product by id', () => {
    addProduct('Product 1', 100);
    updateProduct(1, 'Updated Product', 150);
    const product = getProduct(1);
    expect(product).toMatchObject({ id: 1, name: 'Updated Product', price: 150 });
  });

  it('should throw an error if the product does not exist', () => {
    expect(() => updateProduct(999, 'Updated Product', 150)).toThrow('Product does not exist');
  });

  it('should only update the name', () => {
    addProduct('Product 1', 100);
    updateProduct(1, 'Updated Product');
    const product = getProduct(1);
    expect(product.name).toBe('Updated Product');
    expect(product.price).toBe(100);
  });

  it('should only update price', () => {
    addProduct('Product 1', 100);
    updateProduct(1, undefined, 150);
    const product = getProduct(1);
    expect(product.price).toBe(150);
  });
});
