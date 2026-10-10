/**
 * Photos for a preview, read at build time from public/previas/<slug>/.
 * Nothing is imported or bundled: replace the files (same names) and rebuild.
 * A missing file just leaves its spot out.
 *
 *   hero.(jpg|jpeg|png|webp)          portrait, beside the name
 *   servicos.(jpg|…)                  portrait, beside the services list
 *   trabalho-1.jpg … trabalho-N.jpg   the work carousel, in numeric order
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

export interface PreviaPhotos {
	hero: PreviaPhoto | null;
	services: PreviaPhoto | null;
	work: PreviaPhoto[];
}

const EXT = /\.(jpe?g|png|webp)$/i;

async function photo(dir: string, slug: string, file: string | undefined): Promise<PreviaPhoto | null> {
	if (!file) return null;
	try {
		const { width, height } = await sharp(join(dir, file)).metadata();
		return width && height ? { src: `/previas/${slug}/${file}`, width, height } : null;
	} catch {
		return null;
	}
}

export async function previaPhotos(slug: string): Promise<PreviaPhotos> {
	const dir = join(process.cwd(), 'public', 'previas', slug);
	if (!existsSync(dir)) return { hero: null, services: null, work: [] };
	const files = readdirSync(dir).filter((f) => EXT.test(f));
	const num = (f: string) => Number(f.match(/(\d+)/)?.[1] ?? 0);
	const workFiles = files.filter((f) => /^trabalho-\d+\./i.test(f)).sort((a, b) => num(a) - num(b));
	const work = (await Promise.all(workFiles.map((f) => photo(dir, slug, f)))).filter((p): p is PreviaPhoto => p !== null);
	return {
		hero: await photo(
			dir,
			slug,
			files.find((f) => /^hero\./i.test(f)),
		),
		services: await photo(
			dir,
			slug,
			files.find((f) => /^servicos\./i.test(f)),
		),
		work,
	};
}
