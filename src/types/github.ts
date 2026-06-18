export interface GitHubProfile {
  login: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  followers: number;
  following: number;
  publicRepos: number;
  htmlUrl: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
  pushedAt: string;
  htmlUrl: string;
}

export interface GitHubLanguageStat {
  name: string;
  bytes: number;
  percentage: number;
  color: string;
}

export interface GitHubActivityItem {
  id: string;
  type: "commit" | "repo_update" | "contribution";
  title: string;
  repository: string;
  url: string;
  occurredAt: string;
}

export interface GitHubSummary {
  publicRepos: number;
  topLanguage: string;
  mostRecentProject: string;
}

export interface GitHubDashboard {
  profile: GitHubProfile | null;
  featuredRepos: GitHubRepository[];
  languageStats: GitHubLanguageStat[];
  recentActivity: GitHubActivityItem[];
  recentlyUpdatedRepos: GitHubRepository[];
  summary: GitHubSummary;
  fetchedAt: string;
  error: boolean;
}
