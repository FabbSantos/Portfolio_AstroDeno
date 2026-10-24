/**
 * Tiny inline markup for body copy, used with `set:html`:
 *   **text** → <strong>text</strong>   (plain bold in ink)
 *   \n       → <br />
 * Everything else is HTML-escaped, so config copy can never inject markup.
 * Never used on titles: h1/h2/h3 render their config string as plain text,
 * in one style.
 */
const ESC: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function md(text: string): string {
	return text
		.replace(/[&<>"']/g, (c) => ESC[c] ?? c)
		.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
		.replace(/\n/g, '<br />');
}
