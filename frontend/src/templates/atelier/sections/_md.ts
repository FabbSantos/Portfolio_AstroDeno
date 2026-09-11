/**
 * Mini inline-markdown for config strings (use with `set:html`):
 *   **text**  → <strong class='hl'>  accent colour
 *   ==text==  → <strong class='em'>  highlighter background
 *   newline   → <br>
 * Everything else is HTML-escaped, so config copy can never inject markup.
 */
const ESC: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function escapeHtml(s: string): string {
	return s.replace(/[&<>"']/g, (c) => ESC[c] ?? c);
}

export function md(s: string): string {
	return escapeHtml(s)
		.replace(/\*\*(.+?)\*\*/g, `<strong class='hl'>$1</strong>`)
		.replace(/==(.+?)==/g, `<strong class='em'>$1</strong>`)
		.replace(/\n/g, '<br>');
}
