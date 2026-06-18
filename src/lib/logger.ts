type LogLevel = "info" | "warn" | "error";

interface LogPayload {
  message: string;
  context?: Record<string, unknown>;
  error?: unknown;
}

function serializeError(error: unknown) {
  if (error instanceof Error) {
    return { name: error.name, message: error.message, stack: error.stack };
  }

  return error;
}

function write(level: LogLevel, payload: LogPayload) {
  const entry = {
    level,
    message: payload.message,
    timestamp: new Date().toISOString(),
    ...(payload.context ? { context: payload.context } : {}),
    ...(payload.error ? { error: serializeError(payload.error) } : {}),
  };

  const line = JSON.stringify(entry);

  switch (level) {
    case "error":
      console.error(line);
      break;
    case "warn":
      console.warn(line);
      break;
    default:
      console.info(line);
  }
}

export const logger = {
  info(message: string, context?: Record<string, unknown>) {
    write("info", { message, context });
  },
  warn(message: string, context?: Record<string, unknown>) {
    write("warn", { message, context });
  },
  error(message: string, error?: unknown, context?: Record<string, unknown>) {
    write("error", { message, error, context });
  },
};
