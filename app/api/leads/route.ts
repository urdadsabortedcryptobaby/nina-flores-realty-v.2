import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { getResend, NINA_EMAIL } from '@/lib/resend';
import { checkLeadsRateLimit } from '@/lib/ratelimit';
import xss from 'xss';

// Sanitize a value: strip ALL HTML tags, trim whitespace, enforce max length
// whiteList: {} means zero allowed tags — nothing gets through, not even <b> or <i>
function sanitize(value: unknown, maxLength = 500): string {
  if (typeof value !== 'string') return '';
  return xss(value.trim(), { whiteList: {} }).slice(0, maxLength);
}

// In Next.js 15+, req.ip was removed — read the client IP from x-forwarded-for.
// On Vercel the real visitor IP is the first entry in that comma-separated list.
function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}

export async function POST(req: NextRequest) {
  // Rate limit by IP before doing any work — blocks spam floods early.
  const ip = getClientIp(req);
  const { allowed } = await checkLeadsRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a little while.' },
      { status: 429 }
    );
  }

  const body = await req.json();

  // Sanitize all incoming fields before touching the database
  const name               = sanitize(body.name, 100);
  const email              = sanitize(body.email, 200);
  const phone              = sanitize(body.phone, 30);
  const preferred_language = sanitize(body.preferred_language, 10);
  const inquiry_type       = sanitize(body.inquiry_type, 50);
  const message            = sanitize(body.message, 2000);

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email required' }, { status: 400 });
  }

  try {
    const supabase = await createServiceClient();
    const { error: dbError } = await supabase.from('leads').insert({ name, email, phone, preferred_language, inquiry_type, message });
    if (dbError) console.error('Supabase insert error:', dbError);

    await getResend().emails.send({
      from: 'Nina Flores Realty <no-reply@ninafloresrealty.com>',
      to: NINA_EMAIL,
      subject: `New Lead: ${name} — ${inquiry_type ?? 'General Inquiry'}`,
      html: `
        <h2>New Lead from NinaFloresRealty.com</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone ?? 'Not provided'}</p>
        <p><strong>Language:</strong> ${preferred_language ?? 'en'}</p>
        <p><strong>Looking for:</strong> ${inquiry_type ?? 'Not specified'}</p>
        <p><strong>Message:</strong><br>${message ?? 'No message'}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
