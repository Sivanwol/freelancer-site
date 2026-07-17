type LogLevel = 'info' | 'warn' | 'error';

function write(level: LogLevel, scope: string, message: string, data?: Record<string, unknown>) {
  // Railway requires a single-line JSON object with `message` (+ optional `level`).
  // Any other top-level keys become searchable Attributes (@key:value).
  // Docs: https://docs.railway.com/observability/logs
  const payload: Record<string, unknown> = {
    level,
    message,
    scope,
    ts: new Date().toISOString(),
    ...data,
  };

  const line = JSON.stringify(payload);

  if (level === 'error') {
    console.error(line);
    return;
  }

  if (level === 'warn') {
    console.warn(line);
    return;
  }

  console.log(line);
}

export const logger = {
  info(scope: string, message: string, data?: Record<string, unknown>) {
    write('info', scope, message, data);
  },
  warn(scope: string, message: string, data?: Record<string, unknown>) {
    write('warn', scope, message, data);
  },
  error(scope: string, message: string, data?: Record<string, unknown>) {
    write('error', scope, message, data);
  },
};
