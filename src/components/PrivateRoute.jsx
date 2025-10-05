import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, roleRequired }) => {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/signin" replace />;
  }

  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default PrivateRoute;
