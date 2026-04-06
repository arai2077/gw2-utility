import { getItemDetails } from "@/api";
import { create } from "zustand";

interface Item {
  id: number;
  name: string;
  icon: string;
  rarity: string;
}

interface TreasuryState {
  items: Item[] | null;
  loading: boolean;
  error: string | null;
  fetchItemDetails: (ids: number[]) => Promise<void>;
}

export const useItemStore = create<TreasuryState>()((set) => ({
  items: null,
  loading: false,
  error: null,

  fetchItemDetails: async (ids: number[]) => {
    set({ loading: true, error: null });

    try {
      const response = await getItemDetails(ids);

      set({ items: response, loading: false });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },
}));
