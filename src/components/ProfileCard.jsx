// import { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom"; // <-- Link ko yahan import kiya
// import api from "../utils/api";
// import ImagePreview from "./ImagePreview";

// const ProfileCard = () => {
//   const [user, setUser] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [formData, setFormData] = useState({ name: "", password: "" });
//   const [preview, setPreview] = useState(null);
//   const navigate = useNavigate();

//   // Fetch profile
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await api.get("/profile");
//         setUser(res.data.user);
//       } catch (err) {
//         alert("Not authorized ❌, please login again");
//         navigate("/signin");
//       }
//     };
//     fetchProfile();
//   }, [navigate]);

//   // Logout handler
//   const handleLogout = async () => {
//     try {
//       await api.post("/logout");
//       localStorage.removeItem("role");
//       window.dispatchEvent(new Event("storage"));
//       alert("Logout successful ✅");
//       navigate("/signin");
//     } catch (err) {
//       alert(err.response?.data?.message || "Logout failed ❌");
//     }
//   };

//   const openPopup = () => {
//     setFormData({ name: user.name, password: "" });
//     setPreview(null);
//     setShowPopup(true);
//   };

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const form = new FormData();
//       form.append("name", formData.name);
//       if (formData.password) form.append("password", formData.password);
//       if (formData.profilePicture) {
//         form.append("profilePicture", formData.profilePicture);
//       }
//       const res = await api.put("/update", form, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert(res.data.message);
//       setUser(res.data.user);
//       setShowPopup(false);
//       setPreview(null);
//     } catch (err) {
//       alert(err.response?.data?.message || "Update failed ❌");
//     }
//   };

//   if (!user) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <p className="text-lg font-semibold">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     // Main page container
//     <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
//       {/* Profile Card */}
//       <div className="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-lg">
//         {user.profilePicture ? (
//           <ImagePreview
//             src={`http://localhost:5000/${user.profilePicture}`}
//             alt="Profile"
//             className="mx-auto mb-4 h-32 w-32 rounded-full border-4 border-white shadow-md"
//           />
//         ) : (
//           <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-gray-200 text-5xl font-bold text-gray-500">
//             {user.name.charAt(0)}
//           </div>
//         )}

//         <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
//         <p className="text-md text-gray-500">{user.email}</p>

//         {/* Action Buttons */}
//         <div className="mt-6 flex flex-col gap-3">
//           {/* --- ADMIN DASHBOARD LINK (SIRF ADMIN KO NAZAR AAYEGA) --- */}
//           {user.role === "admin" && (
//             <Link
//               to="/admin/dashboard"
//               className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700"
//             >
//               Admin Dashboard
//             </Link>
//           )}

//           <button
//             onClick={openPopup}
//             className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
//           >
//             Update Profile
//           </button>
//           <button
//             onClick={handleLogout}
//             className="w-full rounded-lg bg-gray-200 px-4 py-2 font-semibold text-gray-800 transition hover:bg-gray-300"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Update Profile Popup/Modal */}
//       {showPopup && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
//           <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
//             <h3 className="mb-4 text-center text-xl font-bold text-gray-800">
//               Update Profile
//             </h3>
//             <form onSubmit={handleUpdate} className="flex flex-col gap-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Change Profile Picture
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => {
//                   const file = e.target.files[0];
//                   if (file) {
//                     setFormData((prev) => ({ ...prev, profilePicture: file }));
//                     setPreview(URL.createObjectURL(file));
//                   }
//                 }}
//                 className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
//               />
//               {preview && (
//                 <ImagePreview
//                   src={preview}
//                   alt="Preview"
//                   className="mx-auto h-24 w-24 rounded-full"
//                 />
//               )}

//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full rounded-md border border-gray-300 p-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
//               />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="New Password (optional)"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full rounded-md border border-gray-300 p-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
//               />

//               <div className="mt-2 flex flex-col gap-2 sm:flex-row-reverse">
//                 <button
//                   type="submit"
//                   className="flex-1 rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
//                 >
//                   Save
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowPopup(false)}
//                   className="flex-1 rounded-md bg-gray-200 px-4 py-2 font-semibold text-gray-800 transition hover:bg-gray-300"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileCard;
////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////


import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import ImagePreview from "./ImagePreview";

const ProfileCard = () => {
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        setUser(res.data.user);
      } catch (err) {
        alert("Not authorized ❌, please login again");
        navigate("/signin");
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      localStorage.removeItem("role");
      window.dispatchEvent(new Event("storage"));
      alert("Logout successful ✅");
      navigate("/signin");
    } catch (err) {
      alert(err.response?.data?.message || "Logout failed ❌");
    }
  };

  const openPopup = () => {
    setFormData({ name: user.name, password: "" });
    setPreview(null);
    setShowPopup(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("name", formData.name);
      if (formData.password) form.append("password", formData.password);
      if (formData.profilePicture) {
        form.append("profilePicture", formData.profilePicture);
      }
      const res = await api.put("/update", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
      setUser(res.data.user);
      setShowPopup(false);
      setPreview(null);
    } catch (err) {
      alert(err.response?.data?.message || "Update failed ❌");
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-lg">
        {user.profilePicture ? (
          <ImagePreview
            // ✅ Image source ab dynamic URL se aayega
            src={`${process.env.REACT_APP_API_URL}/${user.profilePicture}`} // ✅ CHANGE HERE
            alt="Profile"
            className="mx-auto mb-4 h-32 w-32 rounded-full border-4 border-white shadow-md"
          />
        ) : (
          <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-gray-200 text-5xl font-bold text-gray-500">
            {user.name.charAt(0)}
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
        <p className="text-md text-gray-500">{user.email}</p>

        <div className="mt-6 flex flex-col gap-3">
          {user.role === "admin" && (
            <Link
              to="/admin/dashboard"
              className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700"
            >
              Admin Dashboard
            </Link>
          )}

          <button
            onClick={openPopup}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Update Profile
          </button>
          <button
            onClick={handleLogout}
            className="w-full rounded-lg bg-gray-200 px-4 py-2 font-semibold text-gray-800 transition hover:bg-gray-300"
          >
            Logout
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-center text-xl font-bold text-gray-800">
              Update Profile
            </h3>
            <form onSubmit={handleUpdate} className="flex flex-col gap-4">
              <label className="block text-sm font-medium text-gray-700">
                Change Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setFormData((prev) => ({ ...prev, profilePicture: file }));
                    setPreview(URL.createObjectURL(file));
                  }
                }}
                className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
              />
              {preview && (
                <ImagePreview
                  src={preview}
                  alt="Preview"
                  className="mx-auto h-24 w-24 rounded-full"
                />
              )}

              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <input
                type="password"
                name="password"
                placeholder="New Password (optional)"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              <div className="mt-2 flex flex-col gap-2 sm:flex-row-reverse">
                <button
                  type="submit"
                  className="flex-1 rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="flex-1 rounded-md bg-gray-200 px-4 py-2 font-semibold text-gray-800 transition hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;