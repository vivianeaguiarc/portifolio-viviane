"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { logger } from "@/lib/logger";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const t = useTranslations("error");

  useEffect(() => {
    logger.error("ui_error_boundary", error, { digest: error.digest });
  }, [error]);

  return (
    <div className="section-container flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <AlertTriangle className="mb-4 h-12 w-12 text-destructive" aria-hidden />
      <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-4 max-w-md text-muted-foreground">{t("description")}</p>
      <Button className="mt-8" onClick={reset}>
        <RefreshCw className="mr-2 h-4 w-4" aria-hidden />
        {t("retry")}
      </Button>
    </div>
  );
}
