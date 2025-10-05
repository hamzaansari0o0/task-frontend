

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const role = params.get("role");

    if (role) {
      localStorage.setItem("role", role);
      window.dispatchEvent(new Event("storage"));
    }

    if (role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/profile");
    }
  }, [navigate]);

  return <p>Logging you in with Google...</p>;
};

export default GoogleSuccess;
