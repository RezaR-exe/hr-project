import { fetchUser } from '../store/thunks/userThunks';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: '', password: '' });
  const dispatch = useDispatch();

  const handleChange = (event) => {
    if (event.target.name === 'email') {
      setUser({ email: event.target.value, password: user.password });
    } else if (event.target.name === 'password') {
      setUser({ email: user.email, password: event.target.value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await dispatch(fetchUser(user));
    try {
      if (response.payload.success) {
        console.log('Login successful');
        navigate('/');
      } else {
        console.log('Login failed');
        alert('Invalid credentials');
      }
    } catch (error) {
      console.log('Login failed' + error);
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="flex items-center justify-center bg-white p-8 rounded-lg shadow-lg w-96">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            <h1 className="text-2xl font-bold mb-4">Login Page</h1>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              onChange={handleChange}
            />
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="Enter your Password"
              required
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between mt-6 flex-col space-y-4">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2 leading-tight" />
              <label htmlFor="remember" className="text-sm text-gray-700">
                Remember Me
              </label>
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
