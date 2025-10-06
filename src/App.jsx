import { Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import ResetPassword from "./components/auth/ResetPassword";
import GoogleSuccess from "./components/GoogleSuccess";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";
import DashboardPage from "./pages/DashboardPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/google-success" element={<GoogleSuccess />} />
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
