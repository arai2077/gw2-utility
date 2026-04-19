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
    <div className="w-full flex flex-col items-center gap-6 px-6 py-8">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold tracking-tight mb-0">Treasury</h1>
        <Button
          onClick={refresh}
          disabled={loading}
          variant="ghost"
          size="sm"
          title="Refresh"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          Refresh
        </Button>
      </div>
      <div className="flex gap-2">
        {sortOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setSortMode(opt.value)}
            className={`px-3 py-1 rounded-full text-sm transition-colors cursor-pointer ${
              sortMode === opt.value
                ? "bg-[linear-gradient(135deg,var(--primary),var(--primary-container))] text-on-primary font-medium"
                : "bg-surface-container-high text-muted-foreground hover:text-foreground hover:bg-surface-bright"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {loading && (
        <p className="flex items-center gap-2 text-muted-foreground">
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
                  return name
                    ? {
                        name,
                        count: nb.count,
                        hasEnough: treasuryItem.count >= nb.count,
                      }
                    : null;
                })
                .filter(
                  (e): e is { name: string; count: number; hasEnough: boolean } =>
                    e !== null,
                );
              const pct = Math.min(treasuryItem.count / totalNeeded, 1) * 100;
              return (
                <Tooltip key={treasuryItem.item_id}>
                  <TooltipTrigger asChild>
                    <div
                      className="flex flex-col items-center gap-2 rounded-xl p-3 text-center bg-card"
                      style={{
                        outline: `1px solid color-mix(in srgb, ${color} 20%, transparent)`,
                      }}
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
                      <div className="w-full mt-auto h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${pct}%`,
                            background: "var(--primary)",
                            boxShadow: "0 0 4px var(--primary)",
                          }}
                        />
                      </div>
                    </div>
                  </TooltipTrigger>
                  {upgradeEntries.length > 0 && (
                    <TooltipContent
                      side="bottom"
                      className="bg-surface-container backdrop-blur-md"
                      style={{
                        outline: `1px solid color-mix(in srgb, ${color} 25%, transparent)`,
                      }}
                    >
                      <div className="flex flex-col gap-0.5">
                        {upgradeEntries.map(({ name, count, hasEnough }) => (
                          <span key={name} className={hasEnough ? "text-green-400" : ""}>
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
