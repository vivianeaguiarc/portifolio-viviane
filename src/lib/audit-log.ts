import { logger } from "@/lib/logger";

export type AuditAction = "login" | "create" | "update" | "delete";

export interface AuditLogEntry {
  id: string;
  action: AuditAction;
  entity: string;
  entityId?: string;
  actorId?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface RecordAuditLogInput {
  action: AuditAction;
  entity: string;
  entityId?: string;
  actorId?: string;
  metadata?: Record<string, unknown>;
}

export async function recordAuditLog(
  input: RecordAuditLogInput,
): Promise<AuditLogEntry> {
  const entry: AuditLogEntry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...input,
  };

  logger.info("audit_log", {
    audit: entry,
  });

  return entry;
}
