import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Rate limiter for the contact form.
// Gracefully disabled until Upstash credentials are present in the environment,
// so the form keeps working even before Upstash is configured.
const isConfigured =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

const leadsRatelimit = isConfigured
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      // Allow 5 submissions per IP per hour — generous for real users, blocks spam floods
      limiter: Ratelimit.slidingWindow(5, '1 h'),
      prefix: 'ratelimit:leads',
      analytics: true,
    })
  : null;

/**
 * Returns { allowed: true } when the request may proceed.
 * When Upstash isn't configured, always allows (fail-open by design).
 */
export async function checkLeadsRateLimit(ip: string): Promise<{ allowed: boolean }> {
  if (!leadsRatelimit) return { allowed: true };
  const { success } = await leadsRatelimit.limit(ip);
  return { allowed: success };
}
