import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Leadership from "@/components/sections/Leadership";
import Connect from "@/components/sections/Connect";
import Footer from "@/components/Footer";
import { GitHubContributionFallback, GitHubContributionGraph } from "@/components/sections/GitHubActivity";
import { RecentPrs } from "@/components/sections/RecentPrs";
import type { Activity } from "@/components/kibo-ui/contribution-graph";
import { getGitHubData } from "@/lib/github";

export default async function Home() {
  let activities: Activity[] = [];
  let prs: Awaited<ReturnType<typeof getGitHubData>>["recentPrs"] = [];

  try {
    const data = await getGitHubData("dhruvrankoti");
    prs = data.recentPrs;
    if (data.contributions?.weeks) {
      data.contributions.weeks.forEach((week) => {
        week.contributionDays.forEach((day) => {
          let level = 0;
          if (day.contributionCount > 0) level = 1;
          if (day.contributionCount >= 4) level = 2;
          if (day.contributionCount >= 7) level = 3;
          if (day.contributionCount >= 10) level = 4;
          activities.push({ date: day.date, count: day.contributionCount, level });
        });
      });
    }
  } catch {
    // silently fall back to empty state
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <Navbar />

      {/* X-style: single centered column with side borders */}
      <div
        className="mx-auto max-w-[700px] relative"
        style={{ borderLeft: "1px solid var(--border)", borderRight: "1px solid var(--border)" }}
      >
        <main>
          <Hero />
          <Experience />

          {/* GitHub Activity */}
          <section
            id="github-activity"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <div className="p-4 sm:px-4 sm:py-5">
              <h2 className="text-xl font-bold mb-5" style={{ color: "var(--text)" }}>
                GitHub Activity
              </h2>
              {activities.length > 0 ? (
                <GitHubContributionGraph data={activities} />
              ) : (
                <GitHubContributionFallback />
              )}
            </div>
          </section>


          <Projects />
          <RecentPrs prs={prs} />
          <Leadership />
          <Connect />
        </main>
        <Footer />
      </div>
    </div>
  );
}
