import { useState } from 'react';
import { logoutUser } from '../store/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleNavToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleNavigate = (event) => {
    if (user.isUserLoggedIn === false) {
      navigate('/login');
      return;
    }
    navigate(`/${event.target.name}`);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-center items-center">
        <div className="flex items-center space-x-4 justify-between w-full">
          <div>
            <button onClick={handleNavToggle}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex-grow text-center">
            <h1 className="text-2xl font-bold">Welcome to HR App</h1>
          </div>
          <div className="flex justify-center mt-2">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleLogout}
              style={{ visibility: user.isUserLoggedIn ? 'visible' : 'hidden' }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white text-black shadow-lg z-40 transform transition-transform
        duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 flex flex-col space-y-4">
          <button onClick={handleNavToggle} className="self-end text-gray-500 hover:text-gray-700">
            ✕
          </button>
          <button
            className="text-left px-4 py-2 rounded hover:bg-blue-100"
            onClick={handleNavigate}
            name="profile"
          >
            Profile
          </button>
          <button
            className="text-left px-4 py-2 rounded hover:bg-blue-100"
            onClick={handleNavigate}
            name=""
          >
            Dashboard
          </button>
          <button
            className="text-left px-4 py-2 rounded hover:bg-blue-100"
            onClick={handleNavigate}
            name="feedback"
          >
            Feedback
          </button>
          <button
            className="text-left px-4 py-2 rounded hover:bg-blue-100"
            onClick={handleNavigate}
            name="absences"
          >
            Submit Absence
          </button>
          <button
            className="text-left px-4 py-2 rounded hover:bg-blue-100"
            onClick={handleNavigate}
            name="user-absences-list"
          >
            My Absences
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
