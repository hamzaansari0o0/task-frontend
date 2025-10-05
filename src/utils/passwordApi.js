import api from "./api";

// Request reset email
export const requestPasswordReset = (email) =>
  api.post("/forgot-password", { email });

// Reset password
export const resetPassword = (token, password) =>
  api.post(`/reset-password/${token}`, { password });
