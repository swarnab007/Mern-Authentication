import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:7000/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,

  register: async (email, password, name) => {
    set({ isLoading: true, error: null });

    axios
      .post(`${API_URL}/register`, { email, password, name })
      .then((res) => {
        set({ user: res.data, isAuthenticated: true, isLoading: false });
      })
      .catch((err) => {
        set({
          error: err.response.data.message || "Sign up error",
          isLoading: false,
        });
        throw err;
      });
  },
}));
