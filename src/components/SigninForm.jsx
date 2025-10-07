// src/components/SigninForm.jsx (or wherever this file is)

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import ForgotPassword from "../components/auth/ForgotPassword";
import GoogleAuthButton from "../components/GoogleAuthButton";
import OtpLogin from "../components/OtpLogin";

const SigninForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showForgot, setShowForgot] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", formData);
      const { user } = res.data;

      // ✅ Login status save karein taake Navbar update ho sake
      localStorage.setItem('isLoggedIn', 'true');

      if (user?.role) {
        localStorage.setItem("role", user.role);
        // window.dispatchEvent(new Event("storage")); // Yeh line abhi zaroori nahi
      }
      
      alert(res.data.message);

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    // Main container - centers the form on the page
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      {/* Form Card */}
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg md:p-8">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Welcome Back!
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-3 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-3 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            required
          />

          {/* Buttons for forgot password and OTP */}
          <div className="flex items-center justify-between text-sm">
            <button
              type="button"
              onClick={() => setShowForgot(true)}
              className="font-medium text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
            <button
              type="button"
              onClick={() => setShowOtp(true)}
              className="font-medium text-blue-600 hover:underline"
            >
              Login with OTP
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 flex-shrink text-sm font-semibold text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Auth and Signup Link */}
        <div className="flex flex-col gap-4">
          <GoogleAuthButton />
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Conditionally rendered modals */}
      {showOtp && <OtpLogin onClose={() => setShowOtp(false)} />}
      {showForgot && <ForgotPassword onClose={() => setShowForgot(false)} />}
    </div>
  );
};

export default SigninForm;