import { defineStore } from "pinia";
import { getMe, login, logout, register } from "@/api/auth";
import type { LoginData, RegisterData, User } from "@/types";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    // user: null as User | null,
    user: localStorage.getItem("na_user") ? JSON.parse(localStorage.getItem("na_user")!) as User : null,
    token: localStorage.getItem("na_token") || null,
    isLoading: false,
    error: null as string | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    userFullName: (state) =>
      state.user ? `${state.user.first_name} ${state.user.last_name}` : "",
    isAdmin: (state) => state.user?.role === "admin",
    isMaster: (state) => state.user?.role === "master",
  },
  actions: {
    async login(credentials: LoginData) {
      try {
        this.isLoading = true;
        const response = await login(credentials);
        this.token = response.token;
        this.user = response.user;
        localStorage.setItem("na_token", response.token);
        localStorage.setItem("na_user", JSON.stringify(response.user));
        this.error = null;
      } catch (error: any) {
        this.error = error.response?.data?.message || error.message;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    async register(userData: RegisterData) {
      try {
        this.isLoading = true;
        const response = await register(userData);
        this.token = response.token;
        this.user = response.user;
        localStorage.setItem("na_token", response.token);
        localStorage.setItem("na_user", JSON.stringify(response.user));
        this.error = null;
      } catch (error: any) {
        this.error = error.response?.data?.message || error.message;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    async logout() {
      try {
        await logout();
        this.token = null;
        this.user = null;
        localStorage.removeItem("na_token");
        localStorage.removeItem("na_user");
      } catch (error) {
        console.error("Logout error:", error);
      }
    },
    async fetchUser() {
      try {
        if (this.token) {
          const user = await getMe();
          localStorage.setItem("na_user", JSON.stringify(user));
        }
      } catch (error) {
        this.token = null;
        localStorage.removeItem("na_token");
        localStorage.removeItem("na_user");
        await logout();
      }
    },
  },
});
