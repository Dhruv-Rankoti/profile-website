
const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

export type GitHubContributionCalendar = {
  totalContributions: number;
  weeks: {
    contributionDays: {
      contributionCount: number;
      date: string;
      color: string;
    }[];
  }[];
};

export type GitHubPR = {
  title: string;
  url: string;
  state: "MERGED" | "OPEN" | "CLOSED";
  createdAt: string;
  repository: {
    name: string;
  };
};

export type GitHubData = {
  contributions: GitHubContributionCalendar;
  recentPrs: GitHubPR[];
};

import { cache } from "react";

export const getGitHubData = cache(async (username: string): Promise<GitHubData> => {
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
              }
            }
          }
        }
        pullRequests(first: 10, orderBy: {field: CREATED_AT, direction: DESC}) {
          nodes {
            title
            url
            state
            createdAt
            repository {
              name
            }
          }
        }
      }
    }
  `;

  const variables = { username };

  const res = await fetch(GITHUB_GRAPHQL_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch GitHub data: ${res.statusText}`);
  }

  const json = (await res.json()) as {
    data: {
      user: {
        contributionsCollection: {
          contributionCalendar: GitHubContributionCalendar;
        };
        pullRequests: {
          nodes: GitHubPR[];
        };
      };
    };
    errors?: unknown[];
  };

  if (json.errors) {
    console.error("GitHub GraphQL errors:", json.errors);
    throw new Error("Failed to fetch GitHub data");
  }

  const userData = json.data?.user;

  if (!userData) {
    console.error("GitHub User not found or token invalid");
    return {
      contributions: { totalContributions: 0, weeks: [] },
      recentPrs: [],
    };
  }

  return {
    contributions: userData.contributionsCollection.contributionCalendar,
    recentPrs: userData.pullRequests.nodes,
  };
});