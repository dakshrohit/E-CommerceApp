import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { toast } from "react-hot-toast";
import { useCart } from "@/context/CartContext.jsx";
import { useNavigate } from "react-router-dom";


const AuthPage = () => {
  const navigate = useNavigate();
  const {syncCartAfterLogin} = useCart();
  const { setAuthUser } = useAuth();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [activeTab, setActiveTab] = useState("login");

  //connecting to backend server for login and signup

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
        credentials: "include",
      });
      const data = await res.json();
      console.log(data); // or handle response
      if (res.ok) {
        setAuthUser(data.user); // Set the authenticated user in context
        // console.log("Login successful!");
        toast.success("Login successful!");
      } else {
        // console.log(data.message || "Login failed");
        toast.error(data.message || "Login failed");
      }
      await syncCartAfterLogin(); // Sync cart after login
      navigate("/") // Redirect to home page after successful login
      
    } catch (err) {
      // console.error("Login error", err);
      toast.error("Something went wrong!");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST", // POST request for signupo
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData), // Convert signupData object to JSON string to send in the request body to the server
      });
      const data = await res.json();
      console.log(data);

      //for automatically logging in the user after signup
      if (res.ok) {
        toast.success("Signup successful!");
        setAuthUser(data.user);
      } else {
        // console.log(data.message || "Signup failed");
        toast.error(data.message || "Signup failed");
      }
       await syncCartAfterLogin(); // Sync cart after login
      navigate("/") // Redirect to home page after successful login
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");

      // console.error("Signup error", err);
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
        <div className="w-full max-w-md bg-[#1a1a1a] text-white rounded-xl shadow-md p-6 sm:p-8">
          {/* <!-- Tabs --> */}
          <div className="flex justify-between mb-6">
            <button
              onClick={() => {
                setActiveTab("login");
              }}
              className={`w-1/2 py-2 rounded-l-md ${
                activeTab === "login"
                  ? " bg-blue-600 text-white font-semibold hover:bg-blue-800 transition"
                  : "w-1/2  py-2 rounded-r-md bg-[#2a2a2a] hover:bg-gray-700 hover:text-gray-300  text-gray-400 font-semibold"
              }`}
            >
              Login
            </button>
            <button
              className={`w-1/2 py-2 rounded-r-md ${
                activeTab === "signup"
                  ? " bg-blue-600 text-white font-semibold hover:bg-blue-800 active:bg-blue-700 transition"
                  : "w-1/2  py-2 rounded-r-md bg-[#2a2a2a] hover:bg-gray-700 hover:text-gray-300 text-gray-400 font-semibold"
              }`}
              onClick={() => {
                setActiveTab("signup");
              }}
            >
              Signup
            </button>
          </div>

          {/* LOGIN FORM */}
          {activeTab === "login" && (
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="text-sm block mb-1">Email</label>
                <input
                  onChange={(e) => {
                    setLoginData({
                      ...loginData,
                      email: e.target.value,
                    });
                  }}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 rounded-md bg-[#2a2a2a] border border-[#3a3a3a] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm block mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 rounded-md bg-[#2a2a2a] border border-[#3a3a3a] focus:outline-none"
                  onChange={(e) => {
                    setLoginData({
                      ...loginData,
                      password: e.target.value,
                    });
                  }}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-md"
              >
                Login
              </button>
            </form>
          )}

          {/*  Signup Form */}
          {activeTab === "signup" && (
            <form className="space-y-4 mt-6 " onSubmit={handleSignup}>
              <div>
                <label className="text-sm block mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-2 rounded-md bg-[#2a2a2a] border border-[#3a3a3a] focus:outline-none"
                  onChange={(e) => {
                    setSignupData({
                      ...signupData,
                      fullName: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <label className="text-sm block mb-1">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 rounded-md bg-[#2a2a2a] border border-[#3a3a3a] focus:outline-none"
                  onChange={(e) => {
                    setSignupData({
                      ...signupData,
                      email: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <label className="text-sm block mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  onChange={(e) => {
                    setSignupData({
                      ...signupData,
                      password: e.target.value,
                    });
                  }}
                  className="w-full px-4 py-2 rounded-md bg-[#2a2a2a] border border-[#3a3a3a] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm block mb-1">Confirm Password</label>
                <input
                  type="password"
                  onChange={(e) => {
                    setSignupData({
                      ...signupData,
                      confirmPassword: e.target.value,
                    });
                  }}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 rounded-md bg-[#2a2a2a] border border-[#3a3a3a] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-md"
              >
                Signup
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
