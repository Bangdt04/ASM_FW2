import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "./api/apiProduct";
import { Product } from "./interface/Product";
import EditProduct from "./admin/component/products/EditProduct";
import ListProduct from "./admin/component/products/ListProduct";
import LayOut from "./admin/layout";
import Page from "./page";
import HomePage from "./page/HomePage";
import ProductsList from "./page/ProductsList";
import AddProduct from "./admin/component/products/AddProduct";
import CategoryList from "./admin/component/category/CategoryList";
import ProductsByCategory from "./page/HomePage/component/ProductByCategory/ProductsByCategory";
import SearchResults from "./admin/component/SearchResult/SerchResult";
import Register from "./admin/component/Register";
import Login from "./admin/component/Login";
import PrivateRoute from "./PrivateRoute";
import ProductDetail from "./page/ProductDetail.tsx/ProductDetail";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!sessionStorage.getItem('user'));

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    })();
  }, []);

  const handleOpen = (product: Product | null = null) => {
    setIsEditing(!!product);
    setCurrentProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentProduct(null);
  };

  const handleAdd = async (data: Product) => {
    try {
      const newProduct = await addProduct(data);
      setProducts([...products, newProduct]);
      handleClose();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEdit = async (data: Product) => {
    try {
      await updateProduct(data);
      setProducts(products.map((item) => (item.id === data.id ? data : item)));
      handleClose();
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const handleRemove = async (id: number | string) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
      toast.success("Sản phẩm đã được xóa thành công!");
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error("Có lỗi xảy ra khi xóa sản phẩm.");
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Page />}>
          <Route index element={<HomePage />} />
          <Route path="/products-list" element={<ProductsList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:categoryId" element={<ProductsByCategory />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Route>
        <Route path="/admin" element={<LayOut />}>
          <Route
            index
            element={
              <PrivateRoute
                element={<ListProduct products={products} handleRemove={handleRemove} onAdd={() => handleOpen(null)} onEdit={handleOpen} />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          
          <Route path="categories" element={
            <PrivateRoute
              element={<CategoryList />}
              isAuthenticated={isAuthenticated}
            />
          } />
        </Route>
      </Routes>

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>{isEditing ? "Sửa sản phẩm" : "Thêm sản phẩm"}</DialogTitle>
        <DialogContent>
          {isEditing ? (
            <EditProduct onEdit={handleEdit} product={currentProduct} onCancel={handleClose} />
          ) : (
            <AddProduct onAdd={handleAdd} onCancel={handleClose} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default App;
