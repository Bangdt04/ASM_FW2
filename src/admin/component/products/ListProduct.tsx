import React from "react";
import Button from "@mui/material/Button";
import { Product } from "../../../interface/Product";

type Props = {
  products: Product[];
  handleRemove: (id: number | string) => void;
  onAdd: () => void;
  onEdit: (product: Product) => void;
};

const ListProduct = ({ products, handleRemove, onAdd, onEdit }: Props) => {
  return (
    <div className="container mx-auto flex flex-col gap-5 py-8">
      <h2 className="text-2xl font-bold mb-4">Danh sách sản phẩm</h2>
      <Button onClick={onAdd} variant="contained" className="w-1/5">
        Thêm sản phẩm
      </Button>

      <div className="relative overflow-x-auto border border-gray-300 shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Tên sản phẩm
              </th>
              <th scope="col" className="px-6 py-3 w-[150px]">
                Ảnh
              </th>
              <th scope="col" className="px-6 py-3">
                Mô tả
              </th>
              <th scope="col" className="px-6 py-3">
                Giá
              </th>
              <th scope="col" className="px-6 py-3">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Không có sản phẩm nào
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {product.name}
                  </th>
                  <td className="px-6 py-4">
                    <img
                      src={product.image}
                      className="w-16 h-16 object-cover rounded"
                      alt={product.name}
                    />
                  </td>
                  <td className="px-6 py-4">{product.desc}</td>
                  <td className="px-6 py-4">${product.price}</td>
                  <td className="px-6 py-4 flex gap-2 items-center">
                    <Button
                      onClick={() => {
                        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
                          handleRemove(product.id);
                        }
                      }}
                      variant="outlined"
                      color="error"
                    >
                      Xóa
                    </Button>
                    <Button
                      onClick={() => onEdit(product)}
                      variant="contained"
                      color="success"
                    >
                      Sửa
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListProduct;
