import instance from ".";
import { Product } from "../interface/Product";

// Fetch all products
export const getAllProducts = async () => {
  try {
    const { data } = await instance.get("/products");
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw new Error("Failed to fetch products");
  }
};
export const getProductsByCategory = async (category: string) => {
  const response = await instance.get(`http://localhost:3000/products?category=${category}`);
  return response.data;
};

// Fetch a single product by its ID
export const getProductById = async (id: string | number) => {
  try {
    const { data } = await instance.get(`/products/${id}`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch product with ID ${id}:`, error);
    throw new Error(`Failed to fetch product with ID ${id}`);
  }
};

// Delete a product by its ID
export const deleteProduct = async (id: string | number) => {
  try {
    const { data } = await instance.delete(`/products/${id}`);
    return data;
  } catch (error) {
    console.error(`Failed to delete product with ID ${id}:`, error);
    throw new Error(`Failed to delete product with ID ${id}`);
  }
};

// Add a new product
export const addProduct = async (product: Product) => {
  try {
    const { data } = await instance.post("/products", product);
    return data;
  } catch (error) {
    console.error("Failed to add product:", error);
    throw new Error("Failed to add product");
  }
};

export const updateProduct = async (product: Product) => {
  try {
    const { data } = await instance.put(`/products/${product.id}`, product);
    return data;
  } catch (error) {
    console.error(`Failed to update product with ID ${product.id}:`, error);
    throw new Error(`Failed to update product with ID ${product.id}`);
  }
};
