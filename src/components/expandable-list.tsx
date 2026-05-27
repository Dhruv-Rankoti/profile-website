"use client";

import { Children, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExpandableListProps {
  children: React.ReactNode;
  initialCount: number;
  className?: string;
  buttonClassName?: string;
}

export function ExpandableList({
  children,
  initialCount,
  className,
  buttonClassName,
}: ExpandableListProps) {
  const [showAll, setShowAll] = useState(false);
  const items = Children.toArray(children);
  const visibleItems = showAll ? items : items.slice(0, initialCount);

  return (
    <>
      <div className={className}>{visibleItems}</div>
      {items.length > initialCount && (
        <div className={cn("mt-4 flex justify-center", buttonClassName)}>
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors duration-200"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)", backgroundColor: "transparent" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--bg-hover)")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            {showAll ? (
              <>Show Less <ChevronUpIcon className="size-4" /></>
            ) : (
              <>Show More <ChevronDownIcon className="size-4" /></>
            )}
          </button>
        </div>
      )}
    </>
  );
}
