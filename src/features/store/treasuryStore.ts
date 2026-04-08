import { clearCache, getGuildTreasury } from "@/api";
import { useItemStore } from "./itemStore";
import { useUpgradesStore } from "./upgradesStore";
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
  refresh: () => Promise<void>;
}

export const useTreasuryStore = create<TreasuryState>()((set) => ({
  data: null,
  loading: false,
  error: null,

  refresh: async () => {
    clearCache();
    await useTreasuryStore.getState().fetchTreasury();
  },

  fetchTreasury: async () => {
    set({ loading: true, error: null });

    try {
      const response = await getGuildTreasury();

      set({ data: response, loading: false });

      const ids = (response as TreasuryItem[]).map((item) => item.item_id);
      await useItemStore.getState().fetchItemDetails(ids);

      const upgradeIds = [
        ...new Set(
          (response as TreasuryItem[]).flatMap((item) =>
            item.needed_by.map((nb) => nb.upgrade_id),
          ),
        ),
      ];
      await useUpgradesStore.getState().fetchUpgradeDetails(upgradeIds);

      const costItemIds = [
        ...new Set(
          (useUpgradesStore.getState().data ?? []).flatMap(
            (u) =>
              u.costs
                ?.filter((c) => c.type === "Item" && c.item_id != null)
                .map((c) => c.item_id!) ?? [],
          ),
        ),
      ];
      if (costItemIds.length > 0) {
        await useItemStore.getState().fetchItemDetails(costItemIds);
      }
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },
}));
