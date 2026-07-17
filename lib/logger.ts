type LogLevel = 'info' | 'warn' | 'error';

function write(level: LogLevel, scope: string, message: string, data?: Record<string, unknown>) {
  const payload = {
    ts: new Date().toISOString(),
    level,
    scope,
    message,
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

  console.info(line);
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
