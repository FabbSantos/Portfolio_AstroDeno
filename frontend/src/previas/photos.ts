/**
 * Photos for a preview, read at build time from public/previas/<slug>/.
 * Nothing is imported or bundled: replace the files (same names) and rebuild.
 * A missing file just leaves its spot out.
 *
 *   hero.(jpg|jpeg|png|webp)          portrait, the arch beside the name
 *   cuidado.(…)                       the photo beside the "how I work" steps
 *   mural-1 … mural-N                 extra photos for the reviews mural (with the work photos)
 *   trabalho-1 … trabalho-N           the work carousel, in numeric order
 *                                     (trabalho-1 is also the round photo in the hero)
 *   servico-1 … servico-N             square service posts, the services carousel
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
	care: PreviaPhoto | null;
	mural: PreviaPhoto[];
	work: PreviaPhoto[];
	posts: PreviaPhoto[];
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
	if (!existsSync(dir)) return { hero: null, care: null, mural: [], work: [], posts: [] };
	const files = readdirSync(dir).filter((f) => EXT.test(f));
	const num = (f: string) => Number(f.match(/(\d+)/)?.[1] ?? 0);
	const one = (name: string) =>
		photo(
			dir,
			slug,
			files.find((f) => f.toLowerCase().startsWith(`${name}.`)),
		);
	const many = async (prefix: string) => {
		const list = files.filter((f) => new RegExp(`^${prefix}-\\d+\\.`, 'i').test(f)).sort((a, b) => num(a) - num(b));
		return (await Promise.all(list.map((f) => photo(dir, slug, f)))).filter((p): p is PreviaPhoto => p !== null);
	};
	return {
		hero: await one('hero'),
		care: await one('cuidado'),
		mural: await many('mural'),
		work: await many('trabalho'),
		posts: await many('servico'),
	};
}
