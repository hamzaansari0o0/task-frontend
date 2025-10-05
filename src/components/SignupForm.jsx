import { useState } from "react";
import api from "../utils/api";
import GoogleAuthButton from "./GoogleAuthButton";
import { Link, useNavigate } from "react-router-dom";
import ImagePreview from "./ImagePreview";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("password", formData.password);
      if (file) form.append("profilePicture", file);

      const res = await api.post("/signup", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { user } = res.data;
      if (user?.role) localStorage.setItem("role", user.role);

      alert(res.data.message);
      navigate("/signin");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed ❌");
    }
  };

  return (
    // Main container - centers the form on the page
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      
      {/* Form wrapper with card styling */}
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg md:p-8">
        
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Create an Account
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            required
          />

          {/* Styled file input */}
          <label className="block text-sm font-medium text-gray-700">
            Profile Picture (Optional)
          </label>
          <input
            type="file"
            name="profilePicture"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:rounded-full file:border-0
              file:bg-blue-50 file:px-4 file:py-2
              file:text-sm file:font-semibold file:text-blue-700
              hover:file:bg-blue-100"
          />
          
          {/* Image preview */}
          {preview && <ImagePreview src={preview} alt="Preview" />}

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 p-3 font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Signup
          </button>
          
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="font-medium text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </form>

        {/* Divider with 'OR' */}
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 flex-shrink text-sm font-semibold text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Auth Button will be placed here */}
        <GoogleAuthButton />
      </div>
    </div>
  );
};

export default SignupForm;