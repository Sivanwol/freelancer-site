const ATTIO_API_BASE = 'https://api.attio.com/v2';

export class AttioApiError extends Error {
  status: number;
  body: string;

  constructor(message: string, status: number, body: string) {
    super(message);
    this.name = 'AttioApiError';
    this.status = status;
    this.body = body;
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
  },
): Promise<T> {
  const response = await fetch(`${ATTIO_API_BASE}${path}`, {
    method: init.method,
    headers: {
      Authorization: `Bearer ${getAttioApiKey()}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
    cache: 'no-store',
  });

  const text = await response.text();
  if (!response.ok) {
    throw new AttioApiError(`Attio API request failed (${response.status})`, response.status, text);
  }

  if (!text) {
    return {} as T;
  }

  return JSON.parse(text) as T;
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
