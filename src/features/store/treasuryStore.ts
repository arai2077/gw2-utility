import { create } from "zustand";

interface TreasuryState {
  apiKey: string;
  setApiKey: (key: string) => void;
}

export const useTreasuryStore = create<TreasuryState>()((set) => ({
  apiKey: "",
  setApiKey: (key) => set({ apiKey: key }),
}));
