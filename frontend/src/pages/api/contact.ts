import type { APIRoute } from 'astro';
import { Resend } from 'resend';

/**
 * Contact form endpoint — receives a small JSON payload from /home Contact.astro,
 * validates it and forwards via Resend to the inbox.
 *
 * Required env vars (set in Vercel project settings AND a local `.env`):
 *   RESEND_API_KEY     — from https://resend.com/api-keys
 *
 * `from` requires a verified domain on Resend. Until fabbahiense.dev is
 * verified there, change `FROM` to "onboarding@resend.dev" so test sends work.
 */

export const prerender = false;

const TO = 'contato@fabbahiense.dev';
const FROM = 'Portfolio · fabbahiense.dev <noreply@send.fabbahiense.dev>';

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

const json = (status: number, body: Record<string, unknown>) =>
	new Response(JSON.stringify(body), {
		status,
		headers: { 'content-type': 'application/json' },
	});

export const POST: APIRoute = async ({ request }) => {
	const apiKey = import.meta.env.RESEND_API_KEY;
	if (!apiKey) {
		return json(500, { ok: false, error: 'Email service not configured.' });
	}

	let body: { name?: string; email?: string; subject?: string; message?: string };
	try {
		body = await request.json();
	} catch {
		return json(400, { ok: false, error: 'Invalid JSON.' });
	}

	const name = String(body.name ?? '').trim();
	const email = String(body.email ?? '').trim();
	const subject = String(body.subject ?? '').trim() || 'Contato';
	const message = String(body.message ?? '').trim();

	if (!name || !email || !message) {
		return json(400, { ok: false, error: 'Preencha nome, email e mensagem.' });
	}
	if (!isEmail(email)) {
		return json(400, { ok: false, error: 'Email inválido.' });
	}
	if (message.length > 5000) {
		return json(400, { ok: false, error: 'Mensagem muito longa.' });
	}

	const text = `${message}\n\n— ${name}\n${email}`;
	const html = `<div style="font-family:system-ui,sans-serif;line-height:1.5;color:#1a1a1c">
		<p style="margin:0 0 12px 0;font-family:ui-monospace,monospace;font-size:12px;color:#8e8e93">// ${subject}</p>
		<p style="white-space:pre-wrap;margin:0 0 24px 0">${escapeHtml(message)}</p>
		<hr style="border:none;border-top:1px solid #eee;margin:24px 0" />
		<p style="margin:0;color:#5c5c61">
			<b style="color:#1a1a1c">${escapeHtml(name)}</b><br />
			<a href="mailto:${escapeHtml(email)}" style="color:#FF5964">${escapeHtml(email)}</a>
		</p>
	</div>`;

	try {
		const resend = new Resend(apiKey);
		const { error } = await resend.emails.send({
			from: FROM,
			to: TO,
			replyTo: email,
			subject: `[Portfolio] ${subject}`,
			text,
			html,
		});
		if (error) {
			return json(502, { ok: false, error: 'Falha ao enviar (Resend).' });
		}
		return json(200, { ok: true });
	} catch {
		return json(500, { ok: false, error: 'Erro inesperado.' });
	}
};

function escapeHtml(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}
