import { logger } from '@/lib/logger';

const ATTIO_API_BASE = 'https://api.attio.com/v2';

export class AttioApiError extends Error {
  status: number;
  body: string;
  path: string;
  method: string;
  code: string | null;
  type: string | null;

  constructor(
    message: string,
    status: number,
    body: string,
    path: string,
    method: string,
  ) {
    super(message);
    this.name = 'AttioApiError';
    this.status = status;
    this.body = body;
    this.path = path;
    this.method = method;

    try {
      const parsed = JSON.parse(body) as { code?: string; type?: string; message?: string };
      this.code = typeof parsed.code === 'string' ? parsed.code : null;
      this.type = typeof parsed.type === 'string' ? parsed.type : null;
      if (typeof parsed.message === 'string' && parsed.message.trim()) {
        this.message = parsed.message;
      }
    } catch {
      this.code = null;
      this.type = null;
    }
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      code: this.code,
      type: this.type,
      path: this.path,
      method: this.method,
      body: this.body,
    };
  }
}

function getAttioApiKey(): string {
  const apiKey = process.env.ATTIO_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('ATTIO_API_KEY is not configured');
  }
  return apiKey;
}

export async function attioRequest<T>(
  path: string,
  init: {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: unknown;
    step?: string;
  },
): Promise<T> {
  const step = init.step ?? 'attio_request';
  const startedAt = Date.now();

  logger.info('attio', 'request_start', {
    step,
    method: init.method,
    path,
    hasBody: init.body !== undefined,
  });

  let response: Response;
  try {
    response = await fetch(`${ATTIO_API_BASE}${path}`, {
      method: init.method,
      headers: {
        Authorization: `Bearer ${getAttioApiKey()}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: init.body === undefined ? undefined : JSON.stringify(init.body),
      cache: 'no-store',
    });
  } catch (error) {
    logger.error('attio', 'request_network_failure', {
      step,
      method: init.method,
      path,
      durationMs: Date.now() - startedAt,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }

  const text = await response.text();
  const durationMs = Date.now() - startedAt;

  if (!response.ok) {
    const apiError = new AttioApiError(
      `Attio API request failed (${response.status})`,
      response.status,
      text,
      path,
      init.method,
    );

    logger.error('attio', 'request_failed', {
      step,
      method: init.method,
      path,
      status: response.status,
      durationMs,
      code: apiError.code,
      type: apiError.type,
      message: apiError.message,
      body: text,
    });

    throw apiError;
  }

  logger.info('attio', 'request_ok', {
    step,
    method: init.method,
    path,
    status: response.status,
    durationMs,
    bodyPreview: text.slice(0, 500),
  });

  if (!text) {
    return {} as T;
  }

  try {
    return JSON.parse(text) as T;
  } catch (error) {
    logger.error('attio', 'response_json_parse_failed', {
      step,
      method: init.method,
      path,
      status: response.status,
      body: text,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

export type AttioRecordResponse = {
  data: {
    id: {
      workspace_id: string;
      object_id: string;
      record_id: string;
    };
    values?: Record<string, unknown>;
  };
};
