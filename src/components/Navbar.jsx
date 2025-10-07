// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "../css/Navbar.css";

// const Navbar = () => {
//   const [role, setRole] = useState(localStorage.getItem("role"));

//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRole(localStorage.getItem("role"));
//     };
//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   return (
//     <nav className="navbar">
//       <Link to="/signup">Signup</Link>
//       <Link to="/signin">Signin</Link>
//       <Link to="/profile">Profile</Link>
//       {role === "admin" && <Link to="/admin/dashboard">Admin</Link>}
//     </nav>
//   );
// };

// export default Navbar;
