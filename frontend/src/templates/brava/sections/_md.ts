/**
 * Tiny inline markup for config strings, used with `set:html`:
 *   **text** → <strong>   (underlined in headings, see styles.css)
 *   ==text== → <span class='hl'> (accent colour)
 * Everything else is HTML-escaped.
 */
const ESC: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function md(str: string): string {
	return str
		.replace(/[&<>"']/g, (c) => ESC[c] ?? c)
		.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
		.replace(/==(.+?)==/g, "<span class='hl'>$1</span>");
}
