export interface RegisterData {
    username: string;
    email: string;
    password: string;
  }
  
  export const registerUser = async (data: RegisterData) => {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to register user");
    }
    return await response.json();
  };
  export interface LoginData {
    email: string;
    password: string;
  }
  
  export const loginUser = async (data: LoginData) => {
    const response = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(data.email)}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    const users = await response.json();
    const user = users[0]; // Giả sử email là duy nhất
  
    if (user && user.password === data.password) { // So sánh mật khẩu đã băm thực tế với mật khẩu gửi lên
      // Đăng nhập thành công, trả về thông tin người dùng hoặc token
      return { token: "fake-jwt-token" }; // Thay thế với token thực tế nếu có
    } else {
      throw new Error("Invalid email or password");
    }
  };