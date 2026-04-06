import { useEffect } from "react";
import { useItemStore } from "./store/itemStore";
import { useTreasuryStore } from "./store/treasuryStore";

export const Treasury = () => {
  const data = useTreasuryStore((s) => s.data);
  const loading = useTreasuryStore((s) => s.loading);
  const error = useTreasuryStore((s) => s.error);
  const items = useItemStore((s) => s.items);

  useEffect(() => {
    useTreasuryStore.getState().fetchTreasury();
  }, []);

  const itemMap = new Map(items?.map((item) => [item.id, item]));

  const rarityColor = (rarity?: string) => {
    const key = rarity?.toLowerCase();
    const map: Record<string, string> = {
      junk: "var(--rarity-junk)",
      basic: "var(--rarity-basic)",
      fine: "var(--rarity-fine)",
      masterwork: "var(--rarity-masterwork)",
      rare: "var(--rarity-rare)",
      exotic: "var(--rarity-exotic)",
      ascended: "var(--rarity-ascended)",
      legendary: "var(--rarity-legendary)",
    };
    return key ? (map[key] ?? "var(--rarity-basic)") : "var(--rarity-basic)";
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h2 className="text-lg font-semibold">Treasury</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-destructive">{error}</p>}
      {data && items && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-3 w-full">
          {data.map((treasuryItem) => {
            const item = itemMap.get(treasuryItem.item_id);
            const totalNeeded = treasuryItem.needed_by.reduce(
              (sum, nb) => sum + nb.count,
              0,
            );
            const color = rarityColor(item?.rarity);
            return (
              <div
                key={treasuryItem.item_id}
                className="flex flex-col items-center gap-2 rounded-lg border-2 p-3 text-center"
                style={{ borderColor: color }}
              >
                {item?.icon && (
                  <img src={item.icon} alt={item.name} className="size-12" />
                )}
                <span
                  className="text-sm font-medium leading-tight"
                  style={{ color }}
                >
                  {item?.name ?? `Item ${treasuryItem.item_id}`}
                </span>
                <span className="text-sm text-muted-foreground">
                  {treasuryItem.count} / {totalNeeded}
                </span>
                <div className="w-full mt-auto h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-green-500"
                    style={{
                      width: `${Math.min(treasuryItem.count / totalNeeded, 1) * 100}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
