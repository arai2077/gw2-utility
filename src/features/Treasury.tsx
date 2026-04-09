import { useEffect, useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useItemStore } from "./store/itemStore";
import { useTreasuryStore } from "./store/treasuryStore";
import { useUpgradesStore } from "./store/upgradesStore";

type SortMode = "count" | "alphabetical" | "needed";

export const Treasury = () => {
  const data = useTreasuryStore((s) => s.data);
  const loading = useTreasuryStore((s) => s.loading);
  const error = useTreasuryStore((s) => s.error);
  const items = useItemStore((s) => s.items);
  const upgrades = useUpgradesStore((s) => s.data);
  const refresh = useTreasuryStore((s) => s.refresh);
  const [sortMode, setSortMode] = useState<SortMode>("count");

  useEffect(() => {
    useTreasuryStore.getState().fetchTreasury();
  }, []);

  const upgradeMap = new Map(upgrades?.map((u) => [u.id, u]));

  const itemMap = new Map(items?.map((item) => [item.id, item]));

  const sortedData = data
    ? [...data].sort((a, b) => {
        if (sortMode === "count") {
          const totalA = a.needed_by.reduce((sum, nb) => sum + nb.count, 0);
          const totalB = b.needed_by.reduce((sum, nb) => sum + nb.count, 0);
          return totalB - totalA;
        }
        if (sortMode === "alphabetical") {
          const nameA = itemMap.get(a.item_id)?.name ?? "";
          const nameB = itemMap.get(b.item_id)?.name ?? "";
          return nameA.localeCompare(nameB);
        }
        if (sortMode === "needed") {
          return b.needed_by.length - a.needed_by.length;
        }
        return 0;
      })
    : null;

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

  const sortOptions: { label: string; value: SortMode }[] = [
    { label: "Alphabetical", value: "alphabetical" },
    { label: "Amount needed", value: "count" },
    { label: "Needed by upgrade", value: "needed" },
  ];

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="flex justify-items-center gap-2">
        <h1 className="text-lg font-semibold">Treasury</h1>
        <Button
          onClick={refresh}
          disabled={loading}
          className="p-1 rounded hover:text-foreground disabled:opacity-50 transition-colors cursor-pointer"
          title="Refresh"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />{" "}
          Refresh
        </Button>
      </div>
      <div className="flex gap-2">
        {sortOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setSortMode(opt.value)}
            className={`px-3 py-1 rounded-full text-sm border transition-colors cursor-pointer ${
              sortMode === opt.value
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:border-foreground"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {loading && (
        <p className="flex items-center gap-2">
          <Loader2 className="animate-spin" size={16} />
          Loading...
        </p>
      )}
      {error && <p className="text-destructive">{error}</p>}
      {sortedData && items && (
        <TooltipProvider>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-3 w-full">
            {sortedData.map((treasuryItem) => {
              const item = itemMap.get(treasuryItem.item_id);
              const totalNeeded = treasuryItem.needed_by.reduce(
                (sum, nb) => sum + nb.count,
                0,
              );
              const color = rarityColor(item?.rarity);
              const upgradeEntries = treasuryItem.needed_by
                .map((nb) => {
                  const name = upgradeMap.get(nb.upgrade_id)?.name;
                  return name ? { name, count: nb.count } : null;
                })
                .filter(
                  (e): e is { name: string; count: number } => e !== null,
                );
              return (
                <Tooltip key={treasuryItem.item_id}>
                  <TooltipTrigger asChild>
                    <div
                      className="flex flex-col items-center gap-2 rounded-lg border-2 p-3 text-center"
                      style={{ borderColor: color }}
                    >
                      {item?.icon && (
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="size-12"
                        />
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
                  </TooltipTrigger>
                  {upgradeEntries.length > 0 && (
                    <TooltipContent
                      side="bottom"
                      style={{ borderColor: color, borderWidth: 2 }}
                    >
                      <div className="flex flex-col gap-0.5">
                        {upgradeEntries.map(({ name, count }) => (
                          <span key={name}>
                            {name}: {count}
                          </span>
                        ))}
                      </div>
                    </TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>
      )}
    </div>
  );
};
