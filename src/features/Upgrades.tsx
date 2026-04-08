import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTreasuryStore } from "./store/treasuryStore";
import { useUpgradesStore } from "./store/upgradesStore";
import { useItemStore } from "./store/itemStore";

export const Upgrades = () => {
  const upgrades = useUpgradesStore((s) => s.data);
  const loading = useUpgradesStore((s) => s.loading);
  const error = useUpgradesStore((s) => s.error);
  const items = useItemStore((s) => s.items);
  const itemMap = new Map(items?.map((i) => [i.id, i]));

  useEffect(() => {
    if (!upgrades) {
      useTreasuryStore.getState().fetchTreasury();
    }
  }, [upgrades]);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h1 className="text-lg font-semibold">Upgrades</h1>
      {loading && (
        <p className="flex items-center gap-2">
          <Loader2 className="animate-spin" size={16} />
          Loading...
        </p>
      )}
      {error && <p className="text-destructive">{error}</p>}
      {upgrades && (
        <TooltipProvider>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-3 w-full">
            {upgrades.map((upgrade) => {
              const costEntries =
                upgrade.costs?.filter((c) => c.count > 0) ?? [];
              return (
                <Tooltip key={upgrade.id}>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col gap-2 rounded-lg border-2 p-4">
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
                    <TooltipContent side="bottom" style={{ borderWidth: 2 }}>
                      <div className="flex flex-col gap-1">
                        {costEntries.map((cost, i) => {
                          const item =
                            cost.item_id != null
                              ? itemMap.get(cost.item_id)
                              : undefined;
                          return (
                            <div key={i} className="flex items-center gap-2">
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
