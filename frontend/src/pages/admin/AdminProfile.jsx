import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance"; // Your axios setup
import { User, Lock, Save } from "lucide-react";
import { toast } from "react-toastify"; // Assuming you use react-toastify
import Loader from "../../component/Loader";

export const AdminProfile = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  // Fetch current admin data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoadingData(true);
        const { data } = await axiosInstance.get("/api/admin/getprofile");
        setUsername(data.username);
      } catch (error) {
        toast.error("Failed to load profile data");
      }finally{
        setLoadingData(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (password && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password && password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const payload = { username };

      // Only send password if the user actually typed one
      if (password) {
        payload.password = password;
      }

      const { data } = await axiosInstance.put("/api/admin/profile", payload);

      toast.success(data.message || "Profile updated successfully!");

      // Clear password fields after successful update
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      const msg = error.response?.data?.message || "Update failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (<Loader />);
  }

  return (
    <div className="p-4 sm:p-8 min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <User size={24} /> Admin Profile
            </h2>
            <p className="text-blue-100 mt-1">
              Update your account credentials and security settings.
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              <hr className="border-gray-100 my-6" />

              {/* Password Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Lock size={18} className="text-gray-500" /> Change Password
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Leave these blank if you do not want to change your password.
                </p>

                <div className="space-y-4">
                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                      placeholder="Enter new password"
                      autoComplete="new-password"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                      placeholder="Confirm new password"
                      autoComplete="new-password"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    "Updating..."
                  ) : (
                    <>
                      <Save size={20} /> Update Profile
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
