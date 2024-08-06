import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

interface IUser {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IUser>();
  const navigate = useNavigate();

  const onSubmit = async (registerData: IUser) => {
    try {
      // Gửi yêu cầu đăng ký đến endpoint
      await axios.post('http://localhost:3000/users', registerData);
      alert('Đăng ký thành công! Bạn có thể đăng nhập ngay.');
      navigate('/login'); // Điều hướng đến trang đăng nhập sau khi đăng ký thành công
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Có lỗi xảy ra khi đăng ký');
    }
  };

  return (
    <>
      <h1>Đăng ký tài khoản</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type='text'
          placeholder='Tên người dùng'
          {...register('username', { required: 'Tên người dùng là bắt buộc' })}
        />
        {errors.username && <span>{errors.username.message}</span>}
        
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
        
        <button type='submit'>Đăng ký</button>
      </form>
    </>
  );
};

export default Register;
