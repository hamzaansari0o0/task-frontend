import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/reset-password/${token}`, { password });
      setMessage(res.data.message);
      // Wait for 2 seconds before redirecting to the sign-in page
      setTimeout(() => navigate("/signin"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Password reset failed ❌");
    }
  };

  return (
    // Main page container: centers the content card
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      {/* Content Card */}
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h3 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Reset Your Password
        </h3>

        {message ? (
          // Display success or error message after submission
          <p className="text-center text-lg font-medium text-gray-700">
            {message}
          </p>
        ) : (
          // The form to enter the new password
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <p className="text-center text-sm text-gray-600">
              Please enter your new password below.
            </p>
            <input
              type="password"
              placeholder="Enter New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-3 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              required
            />
            <button
              type="submit"
              className="mt-2 w-full rounded-md bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;