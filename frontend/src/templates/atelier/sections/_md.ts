/**
 * Mini inline-markdown for config strings (use with `set:html`):
 *   **text**  → <em class='hl'>   italic
 *   ==text==  → <em class='em'>   italic, underlined in the second colour
 *   newline   → <br>
 * Everything else is HTML-escaped, so config copy can never inject markup.
 */
const ESC: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function escapeHtml(s: string): string {
	return s.replace(/[&<>"']/g, (c) => ESC[c] ?? c);
}

export function md(s: string): string {
	return escapeHtml(s)
		.replace(/\*\*(.+?)\*\*/g, `<em class='hl'>$1</em>`)
		.replace(/==(.+?)==/g, `<em class='em'>$1</em>`)
		.replace(/\n/g, '<br>');
}
