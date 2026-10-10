/**
 * The client's own photos for a preview, read at build time from
 * public/previas/<slug>/. Nothing is imported or bundled: drop the files in
 * the folder and rebuild. A preview with no photos renders without the photo
 * sections (never with stock pictures).
 *
 *   hero.(jpg|jpeg|png|webp)          optional, portrait, beside the name
 *   trabalho-1.jpg … trabalho-N.jpg   the work grid, in numeric order
 */
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

export interface PreviaPhoto {
	/** Public URL: /previas/<slug>/<file>. */
	src: string;
	width: number;
	height: number;
}

const EXT = /\.(jpe?g|png|webp)$/i;

async function photo(dir: string, slug: string, file: string): Promise<PreviaPhoto | null> {
	try {
		const { width, height } = await sharp(join(dir, file)).metadata();
		return width && height ? { src: `/previas/${slug}/${file}`, width, height } : null;
	} catch {
		return null;
	}
}

export async function previaPhotos(slug: string): Promise<{ hero: PreviaPhoto | null; work: PreviaPhoto[] }> {
	const dir = join(process.cwd(), 'public', 'previas', slug);
	if (!existsSync(dir)) return { hero: null, work: [] };
	const files = readdirSync(dir).filter((f) => EXT.test(f));
	const num = (f: string) => Number(f.match(/(\d+)/)?.[1] ?? 0);
	const heroFile = files.find((f) => /^hero\./i.test(f));
	const workFiles = files.filter((f) => /^trabalho-\d+\./i.test(f)).sort((a, b) => num(a) - num(b));
	const work = (await Promise.all(workFiles.map((f) => photo(dir, slug, f)))).filter((p): p is PreviaPhoto => p !== null);
	return { hero: heroFile ? await photo(dir, slug, heroFile) : null, work };
}
