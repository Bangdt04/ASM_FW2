import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { IUser } from '../../interface/User';

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<IUser>();
  const navigate = useNavigate();

  const onSubmit = async (registerData: IUser) => {
    try {
      // Validate confirm password
      if (registerData.password !== getValues('confirmPassword')) {
        alert('Mật khẩu và xác nhận mật khẩu không khớp');
        return;
      }

      await axios.post('http://localhost:3000/register', registerData);
      alert('Đăng ký thành công');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      alert('Có lỗi xảy ra khi đăng ký');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-12 rounded-lg shadow-lg w-full max-w-[80%] max-w-3xl" style={{ maxWidth: '1000px' }}>
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-700">Đăng ký</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Nhập email"
              {...register('email', { required: true, pattern: /^\S+@(\S+\.)+\S{2,6}$/ })}
              className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <span className="text-red-500 text-xs">Sai định dạng email</span>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Mật khẩu</label>
            <input
              type="password"
              id="password"
              placeholder="Nhập mật khẩu"
              {...register('password', { required: true, minLength: 6 })}
              className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : ''}`}
            />
            {errors.password && <span className="text-red-500 text-xs">Mật khẩu phải lớn hơn 6 kí tự</span>}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">Xác nhận mật khẩu</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              {...register('confirmPassword', { required: true })}
              className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.confirmPassword ? 'border-red-500' : ''}`}
            />
            {errors.confirmPassword && <span className="text-red-500 text-xs">Vui lòng xác nhận mật khẩu</span>}
          </div>
          <button type="submit" className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Đăng ký</button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Đã có tài khoản? <a href="/login" className="text-blue-600 hover:underline">Đăng nhập</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
