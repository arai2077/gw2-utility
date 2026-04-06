import { getGuildTreasury } from "@/api";
import { useItemStore } from "./itemStore";
import { create } from "zustand";

interface TreasuryNeededBy {
  upgrade_id: number;
  count: number;
}

interface TreasuryItem {
  item_id: number;
  count: number;
  needed_by: TreasuryNeededBy[];
}

interface TreasuryState {
  data: TreasuryItem[] | null;
  loading: boolean;
  error: string | null;
  fetchTreasury: () => Promise<void>;
}

export const useTreasuryStore = create<TreasuryState>()((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchTreasury: async () => {
    set({ loading: true, error: null });

    try {
      const response = await getGuildTreasury();

      set({ data: response, loading: false });

      const ids = (response as TreasuryItem[]).map((item) => item.item_id);
      await useItemStore.getState().fetchItemDetails(ids);
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },
}));
