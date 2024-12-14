import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Add login logic here
    try {
      await login(email, password);
      toast.success("Logged in successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
        overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Log in to your account
        </h2>
        <form onSubmit={handleLogin}>
          <Input
            required
            icon={Mail}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            required
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="flex items-center mb-6">
            <Link
              to="/forgot-password"
              className="text-sm text-green-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <motion.button
            type="submit"
            className="mt-2 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-green-600
						hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? "Loading..." : "Log in"}
          </motion.button>
        </form>
      </div>
      <div className="flex justify-center items-center bg-gray-700 bg-opacity-50 p-6">
        <p className="text-gray-400 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginPage;
