import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  nombre: string;
  descripcion?: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>({
  nombre: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  descripcion: {
    type: String,
    required: false,
    trim: true,
  }
}, { timestamps: true });

const Category = mongoose.model<ICategory>('Category', categorySchema);
export default Category;