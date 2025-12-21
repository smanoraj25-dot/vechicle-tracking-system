import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResetPassword.css";

const API_URL =import.meta.env.VITE_BACKENDURL;

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Get token from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      toast.error("All fields are required!");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/users/reset-password`, {
        token,
        newPassword,
      });
      toast.success(response.data.message);
      navigate("/login"); // Redirect to login page after success
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <h2 className="reset-password-title">Reset Password</h2>
        <p className="reset-password-subtitle">Enter your new password below</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">New Password</label>
            <input
              type="password"
              className="reset-password-input"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Confirm Password</label>
            <input
              type="password"
              className="reset-password-input"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="reset-password-button"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;