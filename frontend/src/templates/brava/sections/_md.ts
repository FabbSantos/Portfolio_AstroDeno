/**
 * Tiny inline markup for config strings, used with `set:html`:
 *   **text** → <em class='hl'>  italic
 *   ==text== → <em class='em'>  italic, underlined in the accent
 * Everything else is HTML-escaped.
 */
const ESC: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function md(str: string): string {
	return str
		.replace(/[&<>"']/g, (c) => ESC[c] ?? c)
		.replace(/\*\*(.+?)\*\*/g, "<em class='hl'>$1</em>")
		.replace(/==(.+?)==/g, "<em class='em'>$1</em>");
}
