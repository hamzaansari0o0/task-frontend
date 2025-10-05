import { useState } from "react";
import api from "../../utils/api";

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/forgot-password", { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending email ❌");
    }
  };

  return (
    // Modal Overlay: Covers the entire screen with a semi-transparent background
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose} // Optional: Close modal when clicking on the overlay
    >
      {/* Modal Content: The actual dialog box */}
      <div
        className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside it
      >
        <h3 className="mb-4 text-center text-xl font-bold text-gray-800">
          Forgot Password
        </h3>

        {message ? (
          // View after submitting the form
          <div className="flex flex-col items-center gap-4">
            <p className="text-center text-gray-700">{message}</p>
            <button
              onClick={onClose}
              className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        ) : (
          // Initial form view
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <p className="text-center text-sm text-gray-600">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              required
            />
            {/* Action Buttons */}
            <div className="mt-2 flex flex-col gap-2 sm:flex-row-reverse">
              <button
                type="submit"
                className="flex-1 rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
              >
                Send Reset Link
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-md bg-gray-200 px-4 py-2 font-semibold text-gray-800 transition hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;