/**
 * Tiny inline markup for body-text config strings, used with `set:html`:
 *   **text** → <strong>text</strong>   (plain bold)
 *   \n       → <br />
 * Everything else is HTML-escaped, so config copy can never inject markup.
 * Never used on headings: titles render as plain text in one style.
 */
const ESC: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function md(text: string): string {
	return text
		.replace(/[&<>"']/g, (c) => ESC[c] ?? c)
		.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
		.replace(/\n/g, '<br />');
}
