import React, { useState, useEffect } from "react";
import ListProduct from "./ListProduct";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import { Product } from "../../../interface/Product";
import { addProduct, deleteProduct, getAllProducts, updateProduct } from "../../../api/apiProduct";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Có lỗi xảy ra khi tải danh sách sản phẩm.", error);
      }
    };

    fetchProductList();
  }, []);

  const handleRemove = async (id: number | string) => {
    try {
      const confirm = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
      if (confirm) {
        await deleteProduct(id);
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
        toast.success("Xóa sản phẩm thành công!"); 
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi xóa sản phẩm.", error);
      toast.error("Có lỗi xảy ra khi xóa sản phẩm."); 
    }
  };

  const handleAdd = async (newProduct: Product) => {
    try {
      const addedProduct = await addProduct(newProduct);
      setProducts((prevProducts) => [...prevProducts, addedProduct]);
      setIsAdding(false); 
      toast.success("Thêm sản phẩm thành công!"); 
    } catch (error) {
      console.error("Có lỗi xảy ra khi thêm sản phẩm.", error);
      toast.error("Có lỗi xảy ra khi thêm sản phẩm."); 
    }
  };

  const handleEdit = async (updatedProduct: Product) => {
    try {
      await updateProduct(updatedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
      );
      setCurrentProduct(null);
      setIsEditing(false); 
      toast.success("Sửa sản phẩm thành công!"); 
    } catch (error) {
      console.error("Có lỗi xảy ra khi sửa sản phẩm.", error);
      toast.error("Có lỗi xảy ra khi sửa sản phẩm."); 
    }
  };

  return (
    <div>
      <ToastContainer />
      {isAdding && !isEditing ? (
        <AddProduct
          onAdd={handleAdd}
          onCancel={() => setIsAdding(false)}
        />
      ) : isEditing && currentProduct ? (
        <EditProduct
          product={currentProduct}
          onEdit={handleEdit}
          onCancel={() => {
            setCurrentProduct(null);
            setIsEditing(false);
          }}
        />
      ) : (
        <ListProduct
          products={products}
          handleRemove={handleRemove}
          onAdd={() => {
            setCurrentProduct(null);
            setIsAdding(true);
          }}
          onEdit={(product) => {
            setCurrentProduct(product);
            setIsEditing(true);
          }}
        />
      )}
    </div>
  );
};

export default ProductPage;
