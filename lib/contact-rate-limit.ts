const COOLDOWN_MS = 20_000;

const recentSubmissions = new Map<string, number>();

export function isContactSubmissionDebounced(email: string): boolean {
  const key = email.trim().toLowerCase();
  const now = Date.now();
  const lastSubmittedAt = recentSubmissions.get(key);

  if (lastSubmittedAt !== undefined && now - lastSubmittedAt < COOLDOWN_MS) {
    return true;
  }

  recentSubmissions.set(key, now);

  for (const [storedEmail, timestamp] of recentSubmissions) {
    if (now - timestamp > COOLDOWN_MS * 3) {
      recentSubmissions.delete(storedEmail);
    }
  }

  return false;
}
