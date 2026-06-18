import { APP_VERSION } from "@/constants/version";
import { getBlogPosts } from "@/data/blog";
import type { Locale } from "@/i18n/routing";
import { getGitHubDashboard } from "@/services/github.service";

export type ServiceStatus = "operational" | "degraded" | "not_configured";

export interface StatusCheck {
  id: string;
  status: ServiceStatus;
  detail?: string;
}

export interface SystemStatus {
  environment: string;
  version: string;
  lastDeploy: string | null;
  lastDeployAt: string | null;
  checks: StatusCheck[];
  overall: ServiceStatus;
}

function resolveOverall(checks: StatusCheck[]): ServiceStatus {
  if (checks.some((check) => check.status === "degraded")) {
    return "degraded";
  }

  if (checks.every((check) => check.status === "operational")) {
    return "operational";
  }

  return "operational";
}

export async function getSystemStatus(locale: Locale): Promise<SystemStatus> {
  const [githubDashboard, blogPosts] = await Promise.all([
    getGitHubDashboard(),
    Promise.resolve(getBlogPosts(locale)),
  ]);

  const checks: StatusCheck[] = [
    {
      id: "github",
      status: githubDashboard.error ? "degraded" : "operational",
      detail: githubDashboard.error
        ? "GitHub API unavailable"
        : `@${githubDashboard.profile?.login ?? "github"}`,
    },
    {
      id: "blog",
      status: blogPosts.length > 0 ? "operational" : "degraded",
      detail: `${blogPosts.length} posts`,
    },
    {
      id: "database",
      status: process.env.DATABASE_URL ? "operational" : "not_configured",
      detail: process.env.DATABASE_URL ? "PostgreSQL configured" : undefined,
    },
    {
      id: "analytics",
      status: "operational",
      detail: "Vercel Analytics + Speed Insights",
    },
  ];

  return {
    environment:
      process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "development",
    version: APP_VERSION,
    lastDeploy: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
    lastDeployAt: process.env.VERCEL_GIT_COMMIT_REF
      ? new Date().toISOString()
      : null,
    checks,
    overall: resolveOverall(checks),
  };
}
