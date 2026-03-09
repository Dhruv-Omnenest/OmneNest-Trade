import { create } from "zustand";

type AuthState = {
  isHandshakeDone: boolean;
  handshakeData: any | null;
  setHandshakeData: (data: any) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isHandshakeDone: false,
  handshakeData: null,
  setHandshakeData: (data) => set({ handshakeData: data, isHandshakeDone: true }),
}));