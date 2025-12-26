import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  }
}, { timestamps: true });

const Product = mongoose.model<IProduct>('Product', productSchema);
export default Product;