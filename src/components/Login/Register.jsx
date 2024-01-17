import React, { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    // Send data to the API
    fetch('http://localhost:88/apiReact_gadget/register.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Username: username,
        Address: address,
        Tel: tel,
        Email: email,
        Password: password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        // Check data received from the API
        if (data.error) {
          alert(data.error);
        } else {
          // Do something when registration is successful
          console.log('Registration successful:', data);
          // Change route to login page after successful registration
          navigate('/login');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  const handleBackToLogin = () => {
    // Navigate back to the login page
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full">

        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">สมัครสมาชิก</h2>
        <div className="mb-5">

        <label className="mb-4">
          <span className="block block text-gray-700 text-sm font-semibold mb-2 text-sm font-semibold mb-2">ชื่อผู้ใช้งาน </span>
          <input
            type="text"
            
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
        </label>
            </div>

        <div className="mb-5">
        <label className="mb-4">
          <span className="block text-gray-700 text-sm font-semibold mb-2">ที่อยู่ </span>
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </label>
        </div>

        <div className="mb-5">
        <label className="mb-4">
          <span className="block text-gray-700 text-sm font-semibold mb-2">เบอร์โทรศัพท์ </span>
          <input
            type="text"
            value={tel}
            onChange={e => setTel(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </label>
        </div>
        
        <div className="mb-5">
        <label className="mb-4">
          <span className="block text-gray-700 text-sm font-semibold mb-2">Email </span>
          <input
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </label>
        </div>

        <div className="mb-5">
        <label className="mb-4">
          <span className="block text-gray-700 text-sm font-semibold mb-2">รหัสผ่าน </span>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </label>
        </div>
        <div className="flex justify-between items-center mb-4">
        
        <button
          onClick={handleRegister}
          className="bg-green-600 text-white px-4 py-2 rounded-md  hover:bg-green-700 focus:outline-none focus:bg-green-700"
        >
          สมัครสมาชิก
        </button>
        <Link to="/login" className="text-sm text-gray-600 hover:underline focus:outline-none transition duration-300 ease-in-out transform">
          กลับหน้าเข้าสู่ระบบ
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
