"use client";

import { LoaderIcon } from "lucide-react";
import {
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "@/components/base/ui/tooltip";
import type { Activity } from "@/components/kibo-ui/contribution-graph";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/components/kibo-ui/contribution-graph";
import { cn } from "@/lib/utils";

const THEME_CLASS = cn(
  "data-[level='0']:fill-[var(--border)]",
  "data-[level='1']:fill-[var(--text)]/30",
  "data-[level='2']:fill-[var(--text)]/55",
  "data-[level='3']:fill-[var(--text)]/70",
  "data-[level='4']:fill-[var(--text)]"
);

export function GitHubContributionGraph({ data }: { data: Activity[] }) {
  return (
    <TooltipProvider>
      <ContributionGraph
        className="mx-auto py-2"
        data={data}
        blockSize={11}
        blockMargin={3}
        blockRadius={2}
      >
        <ContributionGraphCalendar
          className="no-scrollbar px-2"
          title="GitHub Contributions"
          hideMonthLabels={false}
        >
          {({ activity, dayIndex, weekIndex }) => (
            <TooltipRoot>
              <TooltipTrigger render={<g />}>
                <ContributionGraphBlock
                  activity={activity}
                  dayIndex={dayIndex}
                  weekIndex={weekIndex}
                  className={THEME_CLASS}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {activity.count} contribution{activity.count !== 1 ? "s" : ""}{" "}
                  on{" "}
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }).format(new Date(activity.date))}
                </p>
              </TooltipContent>
            </TooltipRoot>
          )}
        </ContributionGraphCalendar>

        <ContributionGraphFooter className="px-2">
          <ContributionGraphTotalCount>
            {({ totalCount, year }) => (
              <div className="text-sm text-[var(--muted-foreground)]">
                {new Intl.NumberFormat("en-US").format(totalCount)} contributions
                in {year} on{" "}
                <a
                  className="font-medium underline underline-offset-4 hover:text-[var(--foreground)]"
                  href="https://github.com/dhruvrankoti"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                .
              </div>
            )}
          </ContributionGraphTotalCount>

          <ContributionGraphLegend>
            {({ level }) => (
              <svg width={11} height={11}>
                <rect
                  width={11}
                  height={11}
                  rx={2}
                  ry={2}
                  className={THEME_CLASS}
                  data-level={level}
                />
              </svg>
            )}
          </ContributionGraphLegend>
        </ContributionGraphFooter>
      </ContributionGraph>
    </TooltipProvider>
  );
}

export function GitHubContributionFallback() {
  return (
    <div className="flex h-40 w-full items-center justify-center">
      <LoaderIcon className="animate-spin text-[var(--muted-foreground)]" />
    </div>
  );
}
