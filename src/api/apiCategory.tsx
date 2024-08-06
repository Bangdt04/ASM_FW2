import axios from 'axios';
import { Category } from '../interface/Category';

const API_URL = 'http://localhost:3000/categories';

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await axios.get(API_URL);
  return response.data;
  
};
export const updateCategory = async (id: number, category: Category) => {
  const response = await axios.put(`http://localhost:3000/categories/${id}`, category);
  return response.data;
};
export const deleteCategory = async (categoryId: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${categoryId}`);
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  };
}
export const getProductsByCategory = async (category: string) => {
  const response = await axios.get(`http://localhost:3000/products?category=${category}`);
  return response.data;
};