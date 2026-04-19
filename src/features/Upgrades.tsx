import { useEffect, useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTreasuryStore } from "./store/treasuryStore";
import { useUpgradesStore } from "./store/upgradesStore";
import { useItemStore } from "./store/itemStore";

type SortMode = "alphabetical" | "costs" | "level";

export const Upgrades = () => {
  const upgrades = useUpgradesStore((s) => s.data);
  const loading = useUpgradesStore((s) => s.loading);
  const error = useUpgradesStore((s) => s.error);
  const refresh = useTreasuryStore((s) => s.refresh);
  const treasury = useTreasuryStore((s) => s.data);
  const items = useItemStore((s) => s.items);
  const itemMap = new Map(items?.map((i) => [i.id, i]));
  const treasuryMap = new Map(treasury?.map((t) => [t.item_id, t.count]));
  const [sortMode, setSortMode] = useState<SortMode>("alphabetical");

  useEffect(() => {
    if (!upgrades) {
      useTreasuryStore.getState().fetchTreasury();
    }
  }, [upgrades]);

  const sortedUpgrades = upgrades
    ? [...upgrades].sort((a, b) => {
        if (sortMode === "alphabetical") {
          return (a.name ?? "").localeCompare(b.name ?? "");
        }
        if (sortMode === "costs") {
          const costA = a.costs?.reduce((sum, c) => sum + c.count, 0) ?? 0;
          const costB = b.costs?.reduce((sum, c) => sum + c.count, 0) ?? 0;
          return costB - costA;
        }
        if (sortMode === "level") {
          return (a.required_level ?? 0) - (b.required_level ?? 0);
        }
        return 0;
      })
    : null;

  const sortOptions: { label: string; value: SortMode }[] = [
    { label: "Alphabetical", value: "alphabetical" },
    { label: "Material costs", value: "costs" },
    { label: "Required level", value: "level" },
  ];

  return (
    <div className="w-full flex flex-col items-center gap-6 px-6 py-8">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold tracking-tight mb-0">Upgrades</h1>
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
      {loading && (
        <p className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="animate-spin" size={16} />
          Loading...
        </p>
      )}
      {error && <p className="text-destructive">{error}</p>}
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
      {sortedUpgrades && (
        <TooltipProvider>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-3 w-full">
            {sortedUpgrades.map((upgrade) => {
              const costEntries =
                upgrade.costs?.filter((c) => c.count > 0) ?? [];
              return (
                <Tooltip key={upgrade.id}>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col gap-2 rounded-xl p-4 bg-card outline outline-1 outline-border">
                      <div className="flex items-center gap-3">
                        {upgrade.icon && (
                          <img
                            src={upgrade.icon}
                            alt={upgrade.name}
                            className="size-10 shrink-0"
                          />
                        )}
                        <span className="font-medium leading-tight">
                          {upgrade.name}
                        </span>
                      </div>
                      {upgrade.type && (
                        <span className="text-xs text-muted-foreground capitalize">
                          {upgrade.type.replace(/_/g, " ")}
                        </span>
                      )}
                      {upgrade.description && (
                        <p className="text-sm text-muted-foreground">
                          {upgrade.description}
                        </p>
                      )}
                      {(upgrade.required_level !== undefined ||
                        upgrade.experience !== undefined) && (
                        <div className="flex gap-3 text-xs text-muted-foreground mt-auto">
                          {upgrade.required_level !== undefined && (
                            <span>Level {upgrade.required_level}</span>
                          )}
                          {upgrade.experience !== undefined && (
                            <span>
                              {upgrade.experience.toLocaleString()} XP
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </TooltipTrigger>
                  {costEntries.length > 0 && (
                    <TooltipContent
                      side="bottom"
                      className="bg-surface-container backdrop-blur-md outline outline-1 outline-border"
                    >
                      <div className="flex flex-col gap-1">
                        {costEntries.map((cost, i) => {
                          const item =
                            cost.item_id != null
                              ? itemMap.get(cost.item_id)
                              : undefined;
                          const hasEnough =
                            cost.item_id != null &&
                            (treasuryMap.get(cost.item_id) ?? 0) >= cost.count;
                          return (
                            <div
                              key={i}
                              className={`flex items-center gap-2 ${hasEnough ? "text-green-400" : ""}`}
                            >
                              {item?.icon && (
                                <img
                                  src={item.icon}
                                  alt={item.name}
                                  className="size-4 shrink-0"
                                />
                              )}
                              <span>
                                {cost.count.toLocaleString()}×{" "}
                                {item?.name ?? cost.name}
                              </span>
                            </div>
                          );
                        })}
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
