/**
 * Tiny inline markup for config strings, used with `set:html`:
 *   **text** → <strong>text</strong>   (accent-coloured inside h1/h2/h3, bold elsewhere)
 *   \n       → <br />
 * Everything else is HTML-escaped, so config copy can never inject markup.
 */
const ESC: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function md(text: string): string {
	return text
		.replace(/[&<>"']/g, (c) => ESC[c] ?? c)
		.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
		.replace(/\n/g, '<br />');
}
