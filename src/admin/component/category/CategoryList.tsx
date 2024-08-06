import React, { useState, useEffect } from 'react';
import { deleteCategory, getAllCategories } from '../../../api/apiCategory'; 
import { Category } from '../../../interface/Category';
import EditCategoryModal from './EditCategory';
import AddCategoryModal from './AddCategory';

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteCategory(id);
      setCategories(categories.filter(category => category.id !== id));
    } catch (error) {
      console.error('Failed to delete category', error);
    }
  };

  const handleUpdate = (updatedCategory: Category) => {
    setCategories(categories.map(category => (category.id === updatedCategory.id ? updatedCategory : category)));
  };

  const handleAdd = (newCategory: Category) => {
    setCategories([...categories, newCategory]);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Danh Mục</h2>
      <div className="flex justify-end mb-4">
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Category
        </button>
      </div>
      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-md">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.length > 0 ? (
              categories.map(category => (
                <tr key={category.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{category.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={category.image} alt={category.name} className="w-20 h-20 object-cover rounded-lg" />
                  </td>
                  <td className="py-2">
                <button
                  className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
                  onClick={() => setEditingCategory(category)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                  onClick={() => handleDelete(category.id)}
                >
                  Delete
                </button>
              </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  No categories available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {editingCategory && (
        <EditCategoryModal
          category={editingCategory}
          onClose={() => setEditingCategory(null)}
          onUpdate={handleUpdate}
        />
      )}
      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAdd}
      />
    </div>
  );
};

export default CategoryList;
