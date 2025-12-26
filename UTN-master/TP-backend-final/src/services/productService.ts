import Product, { IProduct } from '../models/productModel';

interface ProductFilter {
  categoria?: string;
  precioMin?: number;
  precioMax?: number;
  nombre?: string;
}

const productService = {
  createProduct: async (data: Partial<IProduct>): Promise<IProduct> => {
    const newProduct = new Product(data);
    return await newProduct.save();
  },

  getAllProducts: async (filters: ProductFilter = {}): Promise<IProduct[]> => {
    const query: any = {};

    if (filters.categoria) {
      query.categoria = filters.categoria;
    }

    if (filters.precioMin !== undefined || filters.precioMax !== undefined) {
      query.precio = {};
      if (filters.precioMin !== undefined) {
        query.precio.$gte = filters.precioMin;
      }
      if (filters.precioMax !== undefined) {
        query.precio.$lte = filters.precioMax;
      }
    }

    if (filters.nombre) {
      query.nombre = { $regex: filters.nombre, $options: 'i' };
    }

    return await Product.find(query).populate('categoria', 'nombre descripcion');
  },

  getProductById: async (id: string): Promise<IProduct | null> => {
    return await Product.findById(id).populate('categoria', 'nombre descripcion');
  },

  updateProduct: async (id: string, data: Partial<IProduct>): Promise<IProduct | null> => {
    return await Product.findByIdAndUpdate(id, data, { new: true }).populate('categoria', 'nombre descripcion');
  },

  deleteProduct: async (id: string): Promise<IProduct | null> => {
    return await Product.findByIdAndDelete(id);
  }
};

export default productService;