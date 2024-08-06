import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

interface IUser {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IUser>();
  const navigate = useNavigate();

  const onSubmit = async (loginData: IUser) => {
    try {
      // Giả lập endpoint đăng nhập
      const { data } = await axios.get(`http://localhost:3000/users?email=${encodeURIComponent(loginData.email)}`);

      // Kiểm tra xem email có tồn tại không
      const user = data[0];
      if (user && user.password === loginData.password) {
        // Đăng nhập thành công
        sessionStorage.setItem('user', JSON.stringify(user));
        alert('Đăng nhập thành công');
        navigate('/admin'); // Điều hướng đến trang admin
      } else {
        // Đăng nhập thất bại
        alert('Sai tên đăng nhập hoặc mật khẩu');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Có lỗi xảy ra khi đăng nhập');
    }
  };

  return (
    <>
      <h1>Đăng nhập</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type='text'
          placeholder='Email'
          {...register('email', {
            required: 'Email là bắt buộc',
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Email không hợp lệ'
            }
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
        
        <input
          type='password'
          placeholder='Mật khẩu'
          {...register('password', {
            required: 'Mật khẩu là bắt buộc',
            minLength: {
              value: 6,
              message: 'Mật khẩu phải có ít nhất 6 ký tự'
            }
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}
        
        <button type='submit'>Đăng nhập</button>
      </form>
    </>
  );
};

export default Login;
