import { unstable_cache } from "next/cache";
import { SOCIAL_LINKS } from "@/constants/site";
import {
  FEATURED_GITHUB_REPOS,
  GITHUB_LANGUAGE_COLORS,
  GITHUB_LANGUAGE_GROUPS,
  GITHUB_REVALIDATE_SECONDS,
} from "@/constants/github";
import type {
  GitHubActivityItem,
  GitHubDashboard,
  GitHubLanguageStat,
  GitHubProfile,
  GitHubRepository,
  GitHubSummary,
} from "@/types/github";

interface GitHubApiUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
}

interface GitHubApiRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  pushed_at: string;
  html_url: string;
}

interface GitHubApiEvent {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload: {
    commits?: Array<{ message: string; sha: string }>;
    action?: string;
  };
}

function getGitHubUsername(): string {
  return (
    process.env.GITHUB_USERNAME ??
    SOCIAL_LINKS.github.replace(/\/$/, "").split("/").pop() ??
    "vivianeaguiarc"
  );
}

async function githubFetch<T>(path: string): Promise<T | null> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    const token = process.env.GITHUB_TOKEN;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`https://api.github.com${path}`, {
      headers,
      next: { revalidate: GITHUB_REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      console.error(`GitHub API error ${response.status} for ${path}`);
      return null;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("GitHub API request failed:", error);
    return null;
  }
}

function mapProfile(user: GitHubApiUser): GitHubProfile {
  return {
    login: user.login,
    name: user.name,
    avatarUrl: user.avatar_url,
    bio: user.bio,
    followers: user.followers,
    following: user.following,
    publicRepos: user.public_repos,
    htmlUrl: user.html_url,
  };
}

function mapRepository(repo: GitHubApiRepo): GitHubRepository {
  return {
    id: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updatedAt: repo.updated_at,
    pushedAt: repo.pushed_at,
    htmlUrl: repo.html_url,
  };
}

function aggregateLanguageBytes(
  languageMaps: Array<Record<string, number>>,
): Record<string, number> {
  const totals: Record<string, number> = {};

  for (const languageMap of languageMaps) {
    for (const [language, bytes] of Object.entries(languageMap)) {
      totals[language] = (totals[language] ?? 0) + bytes;
    }
  }

  return totals;
}

function mapToDisplayLanguages(
  totals: Record<string, number>,
): GitHubLanguageStat[] {
  const grouped: Record<string, number> = {};

  for (const [groupName, languages] of Object.entries(GITHUB_LANGUAGE_GROUPS)) {
    grouped[groupName] = languages.reduce(
      (sum, language) => sum + (totals[language] ?? 0),
      0,
    );
  }

  const totalBytes = Object.values(grouped).reduce(
    (sum, bytes) => sum + bytes,
    0,
  );

  if (totalBytes === 0) {
    return Object.keys(GITHUB_LANGUAGE_GROUPS).map((name) => ({
      name,
      bytes: 0,
      percentage: 0,
      color: GITHUB_LANGUAGE_COLORS[name] ?? "#6b7280",
    }));
  }

  return Object.entries(grouped)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: Math.round((bytes / totalBytes) * 100),
      color: GITHUB_LANGUAGE_COLORS[name] ?? "#6b7280",
    }))
    .filter((item) => item.bytes > 0)
    .sort((a, b) => b.bytes - a.bytes);
}

function parseRecentActivity(events: GitHubApiEvent[]): GitHubActivityItem[] {
  const activity: GitHubActivityItem[] = [];

  for (const event of events) {
    const [owner, repoName] = event.repo.name.split("/");
    const repoUrl = `https://github.com/${owner}/${repoName}`;

    if (event.type === "PushEvent" && event.payload.commits?.length) {
      for (const commit of event.payload.commits.slice(0, 3)) {
        activity.push({
          id: `${event.id}-${commit.sha}`,
          type: "commit",
          title: commit.message.split("\n")[0] ?? "Commit",
          repository: event.repo.name,
          url: `${repoUrl}/commit/${commit.sha}`,
          occurredAt: event.created_at,
        });
      }
      continue;
    }

    if (
      event.type === "CreateEvent" ||
      event.type === "WatchEvent" ||
      event.type === "ForkEvent"
    ) {
      activity.push({
        id: event.id,
        type: "contribution",
        title: event.type.replace("Event", ""),
        repository: event.repo.name,
        url: repoUrl,
        occurredAt: event.created_at,
      });
    }
  }

  return activity.slice(0, 12);
}

function buildSummary(
  profile: GitHubProfile | null,
  featuredRepos: GitHubRepository[],
  languageStats: GitHubLanguageStat[],
): GitHubSummary {
  const sortedFeatured = [...featuredRepos].sort(
    (a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime(),
  );

  return {
    publicRepos: profile?.publicRepos ?? 0,
    topLanguage: languageStats[0]?.name ?? "TypeScript",
    mostRecentProject: sortedFeatured[0]?.name ?? featuredRepos[0]?.name ?? "—",
  };
}

function emptyDashboard(): GitHubDashboard {
  return {
    profile: null,
    featuredRepos: [],
    languageStats: [],
    recentActivity: [],
    recentlyUpdatedRepos: [],
    summary: {
      publicRepos: 0,
      topLanguage: "—",
      mostRecentProject: "—",
    },
    fetchedAt: new Date().toISOString(),
    error: true,
  };
}

async function fetchGitHubDashboard(): Promise<GitHubDashboard> {
  const username = getGitHubUsername();

  const [user, repos, events] = await Promise.all([
    githubFetch<GitHubApiUser>(`/users/${username}`),
    githubFetch<GitHubApiRepo[]>(
      `/users/${username}/repos?sort=updated&per_page=100&type=owner`,
    ),
    githubFetch<GitHubApiEvent[]>(
      `/users/${username}/events/public?per_page=30`,
    ),
  ]);

  if (!user) {
    return emptyDashboard();
  }

  const allRepos = repos ?? [];
  const featuredApiRepos = FEATURED_GITHUB_REPOS.map((repoName) =>
    allRepos.find((repo) => repo.name.toLowerCase() === repoName.toLowerCase()),
  ).filter((repo): repo is GitHubApiRepo => Boolean(repo));

  const featuredRepos = featuredApiRepos.map(mapRepository);

  const languageMaps = await Promise.all(
    featuredApiRepos.map((repo) =>
      githubFetch<Record<string, number>>(
        `/repos/${username}/${repo.name}/languages`,
      ),
    ),
  );

  const primaryLanguageTotals = allRepos.reduce<Record<string, number>>(
    (acc, repo) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] ?? 0) + 1;
      }
      return acc;
    },
    {},
  );

  const aggregatedFromApi = aggregateLanguageBytes(
    languageMaps.filter((map): map is Record<string, number> => map !== null),
  );

  const aggregatedLanguages =
    Object.keys(aggregatedFromApi).length > 0
      ? aggregatedFromApi
      : primaryLanguageTotals;

  const languageStats = mapToDisplayLanguages(aggregatedLanguages);

  const recentlyUpdatedRepos = [...allRepos]
    .sort(
      (a, b) =>
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
    )
    .slice(0, 6)
    .map(mapRepository);

  const recentActivity = parseRecentActivity(events ?? []);
  const profile = mapProfile(user);

  return {
    profile,
    featuredRepos,
    languageStats,
    recentActivity,
    recentlyUpdatedRepos,
    summary: buildSummary(profile, featuredRepos, languageStats),
    fetchedAt: new Date().toISOString(),
    error: false,
  };
}

export const getGitHubDashboard = unstable_cache(
  fetchGitHubDashboard,
  ["github-dashboard"],
  { revalidate: GITHUB_REVALIDATE_SECONDS },
);
