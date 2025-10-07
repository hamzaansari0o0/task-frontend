// src/components/layout/Navbar.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTasks, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status on component mount
  useEffect(() => {
    // Aap login ke waqt cookie ya local storage set karte hain. Hum usay check karenge.
    // Farz karein humne login par localStorage.setItem('isLoggedIn', 'true') set kiya hai.
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  const handleLogout = () => {
    // Yahan aap logout API call kar sakte hain
    // api.post("/logout");
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    navigate('/signin');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side: Logo and Dashboard Link */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 text-indigo-600">
              <FaTasks className="h-8 w-8" />
              <span className="font-bold text-xl">TaskMaster</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/dashboard" className="text-gray-700 hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side: Signup/Logout Button */}
          <div className="hidden md:block">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/signup"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                Sign Up
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/dashboard" className="text-gray-700 hover:bg-indigo-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Dashboard
            </Link>
            {isLoggedIn ? (
               <button onClick={handleLogout} className="w-full text-left bg-red-500 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-red-600">
                 Logout
               </button>
            ) : (
              <Link to="/signup" className="bg-indigo-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700">
                Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;