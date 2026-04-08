import { getGuildUpgradeDetails } from "@/api";
import { create } from "zustand";

interface UpgradeCost {
  type: string;
  name: string;
  count: number;
  item_id?: number;
}

interface Upgrade {
  id: number;
  name: string;
  description?: string;
  type?: string;
  icon?: string;
  required_level?: number;
  experience?: number;
  prerequisites?: number[];
  costs?: UpgradeCost[];
}

interface UpgradesState {
  data: Upgrade[] | null;
  loading: boolean;
  error: string | null;
  fetchUpgradeDetails: (ids: number[]) => Promise<void>;
}

export const useUpgradesStore = create<UpgradesState>()((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchUpgradeDetails: async (ids: number[]) => {
    if (ids.length === 0) return;
    set({ loading: true, error: null });

    try {
      const response = await getGuildUpgradeDetails(ids);
      set({ data: response, loading: false });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },
}));
