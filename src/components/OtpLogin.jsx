import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const OtpLogin = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  // Step 1: Request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/request-otp", { email });
      alert(res.data.message); // "OTP sent to email 📩"
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP ❌");
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/verify-otp", { email, code: otp });
      const { user } = res.data;
      if (user?.role) {
        localStorage.setItem("role", user.role);
        window.dispatchEvent(new Event("storage"));
      }
      alert(res.data.message);
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed ❌");
    }
  };

  return (
    // Modal Overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
        >
          ✕
        </button>

        {/* Step 1: Email Input */}
        {step === 1 && (
          <form onSubmit={handleRequestOtp} className="flex flex-col gap-4">
            <h3 className="text-center text-xl font-bold text-gray-800">
              Login with OTP
            </h3>
            <p className="text-center text-sm text-gray-500">
              We'll send a verification code to your email.
            </p>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 p-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 py-2.5 font-semibold text-white transition hover:bg-blue-700"
            >
              Send OTP
            </button>
          </form>
        )}

        {/* Step 2: OTP Input */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
            <h3 className="text-center text-xl font-bold text-gray-800">
              Enter OTP
            </h3>
            <p className="text-center text-sm text-gray-500">
              A 6-digit code has been sent to <br />
              <span className="font-medium text-gray-800">{email}</span>
            </p>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 p-2.5 text-center text-lg tracking-widest focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              maxLength="6"
            />
            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 py-2.5 font-semibold text-white transition hover:bg-blue-700"
            >
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default OtpLogin;