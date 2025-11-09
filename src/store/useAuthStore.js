import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: !!localStorage.getItem("authToken"),
      isLoading: false,
      error: null,
      user: JSON.parse(localStorage.getItem("authUser")) || null,

      login: (email, password) => {
        set({ isLoading: true, error: null });

        // ✅ Hardcoded Admin
        if (email === "admin" && password === "Admin@123") {
          const token = btoa(`${email}-${Date.now()}`);
          const userData = { email, name: "Admin User", role: "admin" };
          localStorage.setItem("authToken", token);
          localStorage.setItem("authUser", JSON.stringify(userData));

          set({ isAuthenticated: true, isLoading: false, user: userData });
          return true;
        }

        // ✅ Doctor login
        if (email === "Doctor" && password === "Doctor@123") {
          const token = btoa(`${email}-${Date.now()}`);
          const userData = { email, name: "Doctor User", role: "doctor" };
          localStorage.setItem("authToken", token);
          localStorage.setItem("authUser", JSON.stringify(userData));

          set({ isAuthenticated: true, isLoading: false, user: userData });
          return true;
        }

        // ✅ Nurse login
        if (email === "Nurse" && password === "Nurse@123") {
          const token = btoa(`${email}-${Date.now()}`);
          const userData = { email, name: "Nurse User", role: "nurse" };
          localStorage.setItem("authToken", token);
          localStorage.setItem("authUser", JSON.stringify(userData));

          set({ isAuthenticated: true, isLoading: false, user: userData });
          return true;
        }

        

        // ❌ Invalid login
        set({ isLoading: false, error: "Invalid email or password" });
        return false;
      },

      logout: () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
        set({ isAuthenticated: false, user: null, error: null, isLoading: false });
      },

      clearError: () => set({ error: null }),

      // ✅ Role Helpers
      isAdmin: () => get().user?.role === "admin",
      isDoctor: () => get().user?.role === "doctor",
      isNurse: () => get().user?.role === "nurse",
      isGuest: () => get().user?.role === "guest",
    }),
    { name: "auth-storage" }
  )
);

export default useAuthStore;
