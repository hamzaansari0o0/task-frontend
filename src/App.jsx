// src/App.jsx

import { Routes, Route } from "react-router-dom";

// Layout and Pages
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import DashboardPage from "./pages/DashboardPage";
import AdminDashboard from "./pages/AdminDashboard";

// Auth and other components
import PrivateRoute from "./components/PrivateRoute";
import ResetPassword from "./components/auth/ResetPassword";
import GoogleSuccess from "./components/GoogleSuccess";

const App = () => {
  return (
    <>
      <Routes>
        {/* ✅ Public routes jo Navbar ke saath dikhein gay */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          {/* Aap yahan aur public pages jaise 'About Us', 'Contact' bhi add kar sakte hain */}
        </Route>

        {/* ✅ Auth routes jo alag se, bina Navbar ke, dikhein gay */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/google-success" element={<GoogleSuccess />} />

        {/* ✅ Protected Routes (Sirf login ke baad access honge) */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute roleRequired="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;