import { create } from "zustand";

type AuthState = {
  isHandshakeDone: boolean;
  isPasswordDone: boolean; 
  isLoggedIn: boolean; 
  handshakeData: any | null;
  userData: any | null;
  setHandshakeData: (data: any) => void;
  setPasswordSuccess: () => void;
  setLoginSuccess: (userData: any) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isHandshakeDone: false,
  isPasswordDone: false,
  isLoggedIn: false,
  handshakeData: null,
  userData: null,

  setHandshakeData: (data) => set({ handshakeData: data, isHandshakeDone: true }),
  setPasswordSuccess: () => set({ isPasswordDone: true }),
  setLoginSuccess: (userData) => set({ userData: userData, isLoggedIn: true }),
}));