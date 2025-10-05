// // src/components/GoogleLoginButton.jsx
// import React from "react";

// const GoogleLoginButton = () => {
//   const handleGoogleLogin = () => {
//     // Backend ka google route hit hoga
//     window.location.href = "http://localhost:5000/api/users/google";
//   };

//   return (
//     <button
//       onClick={handleGoogleLogin}
//       className="flex items-center justify-center w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700 font-medium hover:bg-gray-50 transition mt-3"
//     >
//       <img
//         src="https://developers.google.com/identity/images/g-logo.png"
//         alt="Google logo"
//         className="w-5 h-5 mr-2"
//       />
//       Continue with Google
//     </button>
//   );
// };

// export default GoogleLoginButton;
////////////////////////////////////////////////

import React from "react";

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    // ✅ Backend ka google route ab dynamic URL se hit hoga
    window.location.href = `${process.env.REACT_APP_API_URL}/api/users/google`; // ✅ CHANGE HERE
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center justify-center w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700 font-medium hover:bg-gray-50 transition mt-3"
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google logo"
        className="w-5 h-5 mr-2"
      />
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;