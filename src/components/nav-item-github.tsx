import { unstable_cache } from "next/cache";
import { GitHubStars } from "@/components/github-stars";

// Navbar-specific GitHub repo (different from SOURCE_CODE_GITHUB_REPO)
const NAVBAR_GITHUB_REPO = "dhruvrankoti/profile-website";

const getStargazerCount = unstable_cache(
  async () => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${NAVBAR_GITHUB_REPO}`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
          },
          next: {
            revalidate: 3600, // Revalidate every hour
          },
        }
      );

      if (!response.ok) {
        return 0;
      }

      const json = (await response.json()) as { stargazers_count?: number };
      return Number(json?.stargazers_count) || 0;
    } catch {
      return 0;
    }
  },
  ["github-stargazer-count-navbar"],
  { revalidate: 3600 }
);

export async function NavItemGitHub() {
  const stargazersCount = await getStargazerCount();

  return (
    <GitHubStars repo={NAVBAR_GITHUB_REPO} stargazersCount={stargazersCount} />
  );
}
