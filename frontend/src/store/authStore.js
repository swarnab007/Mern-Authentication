import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:7397/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: false,

  register: async (email, password, name) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.post(`${API_URL}/register`, {
        email,
        password,
        name,
      });
      
      console.log(res);
      set({ user: res?.data?.user, isAuthenticated: true, isLoading: false });
      
      
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Sign up error";
      set({ error: errorMsg, isLoading: false });
      throw err;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.post(`${API_URL}/verify`, { code });
      console.log(res);
      
      set({ user: res?.data?.user, isAuthenticated: true, isLoading: false });
      
      return res.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Verification error";
      set({ error: errorMsg, isLoading: false });
      throw new Error(errorMsg);
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      set({ user: res?.data?.user, isAuthenticated: true, isLoading: false });
      return res.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login error";
      set({ error: errorMsg, isLoading: false });
      throw new Error(errorMsg);
    }
  },

  checkAuth: async () => {
		set({ isCheckingAuth: true, error: null });
		try {
			const response = await axios.get(`${API_URL}/profile`);
			set({ user: response?.data?.user, isAuthenticated: true, isCheckingAuth: false });
		} catch (error) {
			set({ error: null, isCheckingAuth: false, isAuthenticated: false });
		}
	},
}));
