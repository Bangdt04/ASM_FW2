import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import Button from '@mui/material/Button';
import { Category } from '../../../interface/Category';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '500px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

type AddCategoryProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (category: Category) => void;
};

type FormData = {
  name: string;
  image: string;
};

const AddCategoryModal = ({ isOpen, onClose, onAdd }: AddCategoryProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post('http://localhost:3000/categories', data);
      onAdd(response.data);
      onClose();
      navigate('/admin/categories');
    } catch (error) {
      console.error('Failed to add category', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Add Category Modal"
    >
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register('name', { required: 'Tên danh mục là bắt buộc', minLength: { value: 3, message: 'Tên danh mục phải có ít nhất 3 ký tự' } })}
              className={`mt-1 block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
          </div>
          <div className="mb-4">
  <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
  <input
    type="text"
    id="image"
    {...register('image', { required: 'URL ảnh là bắt buộc' })}
    className={`mt-1 block w-full px-3 py-2 border ${errors.image ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
  />
  {errors.image && <span className="text-red-500 text-xs mt-1">{errors.image.message}</span>}
</div>

          <div className="flex justify-end gap-2">
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Add Category
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddCategoryModal;
