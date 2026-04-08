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

export const useItemStore = create<TreasuryState>()((set, get) => ({
  items: null,
  loading: false,
  error: null,

  fetchItemDetails: async (ids: number[]) => {
    const existingIds = new Set(get().items?.map((i) => i.id) ?? []);
    const newIds = ids.filter((id) => !existingIds.has(id));
    if (newIds.length === 0) return;

    set({ loading: true, error: null });

    try {
      const response = await getItemDetails(newIds);

      set((state) => ({
        items: [...(state.items ?? []), ...response],
        loading: false,
      }));
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },
}));
