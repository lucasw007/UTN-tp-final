import Category, { ICategory } from '../models/categoryModel';

const categoryService = {
  createCategory: async (data: Partial<ICategory>): Promise<ICategory> => {
    const newCategory = new Category(data);
    return await newCategory.save();
  },

  getAllCategories: async (): Promise<ICategory[]> => {
    return await Category.find();
  },

  getCategoryById: async (id: string): Promise<ICategory | null> => {
    return await Category.findById(id);
  },

  updateCategory: async (id: string, data: Partial<ICategory>): Promise<ICategory | null> => {
    return await Category.findByIdAndUpdate(id, data, { new: true });
  },

  deleteCategory: async (id: string): Promise<ICategory | null> => {
    return await Category.findByIdAndDelete(id);
  }
};

export default categoryService;