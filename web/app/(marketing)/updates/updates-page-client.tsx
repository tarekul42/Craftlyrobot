"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { UpdateCard, typeConfig } from "@/components/blocks/update-card";
import type { Update, UpdateType } from "@/types/update";

interface UpdatesPageClientProps {
  updates: Update[];
}

const INITIAL_COUNT = 6;
const LOAD_MORE_COUNT = 4;

function getAllTypes(updates: Update[]): UpdateType[] {
  const types = new Set<UpdateType>();
  for (const update of updates) {
    types.add(update.type);
  }
  return Array.from(types);
}

function groupByMonth(updates: Update[]): Map<string, Update[]> {
  const groups = new Map<string, Update[]>();
  for (const update of updates) {
    const key = new Date(update.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
    const existing = groups.get(key);
    if (existing) {
      existing.push(update);
    } else {
      groups.set(key, [update]);
    }
  }
  return groups;
}

export function UpdatesPageClient({ updates }: UpdatesPageClientProps) {
  const availableTypes = useMemo(() => getAllTypes(updates), [updates]);
  const [activeFilter, setActiveFilter] = useState<"all" | UpdateType>("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const filteredUpdates = useMemo(() => {
    if (activeFilter === "all") return updates;
    return updates.filter((u) => u.type === activeFilter);
  }, [updates, activeFilter]);

  const visibleUpdates = filteredUpdates.slice(0, visibleCount);
  const hasMore = visibleCount < filteredUpdates.length;
  const grouped = groupByMonth(visibleUpdates);

  const handleFilterChange = (filter: "all" | UpdateType) => {
    setActiveFilter(filter);
    setVisibleCount(INITIAL_COUNT);
  };

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-2">
        <button
          onClick={() => handleFilterChange("all")}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors",
            activeFilter === "all"
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
          )}
        >
          All
        </button>
        {availableTypes.map((type) => {
          const config = typeConfig[type];
          return (
            <button
              key={type}
              onClick={() => handleFilterChange(type)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors",
                activeFilter === type
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
              )}
            >
              {config.icon}
              {config.label}
            </button>
          );
        })}
      </div>

      <div className="mt-10 space-y-10">
        {Array.from(grouped.entries()).map(([month, monthUpdates]) => (
          <div key={month}>
            <h2 className="text-muted-foreground sticky top-20 mb-4 text-sm font-semibold uppercase tracking-wider">
              {month}
            </h2>
            <div className="space-y-4">
              {monthUpdates.map((update) => (
                <UpdateCard
                  key={update.id}
                  update={update}
                  variant="full"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredUpdates.length === 0 && (
        <p className="text-muted-foreground mt-10 text-center text-sm">
          No updates match this filter.
        </p>
      )}

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setVisibleCount((c) => c + LOAD_MORE_COUNT)}
            className="border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 rounded-full border px-5 py-2 text-sm font-medium transition-colors"
          >
            Load more ({filteredUpdates.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {!hasMore && filteredUpdates.length > 0 && (
        <p className="text-muted-foreground mt-8 text-center text-sm">
          You&apos;ve seen all {filteredUpdates.length} update{filteredUpdates.length !== 1 ? "s" : ""}.
        </p>
      )}
    </>
  );
}
