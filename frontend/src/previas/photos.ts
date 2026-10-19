/**
 * Photos for a preview, read at build time from public/previas/<slug>/.
 * Nothing is imported or bundled: replace the files (same names) and rebuild.
 * A missing file just leaves its spot out.
 *
 *   hero.(jpg|jpeg|png|webp)          portrait, the arch beside the name
 *   hero.(mp4|webm)                   optional video played in the arch over hero.*
 *                                     (hero.* is then its first frame, shown until it plays)
 *   hero-wide.(mp4|webm) + hero-wide.* optional landscape cut of the hero video and its
 *                                     first frame, used by the full-width hero on wide screens
 *   logo.(svg|png|webp)               optional logo, shown in place of the name in the hero
 *   hero-2.(jpg|jpeg|png|webp)        optional small round photo in the hero
 *                                     (without it, trabalho-1 is used)
 *   studio-1 … studio-N               the studio slider
 *   mural-1 … mural-N                 extra photos for the reviews mural (with the work photos)
 *   trabalho-1 … trabalho-N           the work gallery, in numeric order
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
	/** Small round photo in the hero (hero-2.*, else the first work photo). */
	hero2: PreviaPhoto | null;
	/** Public URL of the hero video (hero.mp4 / hero.webm), if any. */
	heroVideo: string | null;
	/** Landscape version of the hero video for wide screens, and its first frame. */
	heroWideVideo: string | null;
	heroWide: PreviaPhoto | null;
	/** The client's logo (logo.svg preferred). */
	logo: PreviaPhoto | null;
	studio: PreviaPhoto[];
	mural: PreviaPhoto[];
	work: PreviaPhoto[];
	posts: PreviaPhoto[];
}

const EXT = /\.(jpe?g|png|webp)$/i;
const VIDEO = /^hero\.(mp4|webm)$/i;
const WIDE_VIDEO = /^hero-wide\.(mp4|webm)$/i;
const LOGO = /^logo\.(svg|png|webp)$/i;

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
	if (!existsSync(dir)) return { hero: null, hero2: null, heroVideo: null, heroWideVideo: null, heroWide: null, logo: null, studio: [], mural: [], work: [], posts: [] };
	const all = readdirSync(dir);
	const files = all.filter((f) => EXT.test(f));
	const video = all.find((f) => VIDEO.test(f));
	const wideVideo = all.find((f) => WIDE_VIDEO.test(f));
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
	const work = await many('trabalho');
	return {
		hero: await one('hero'),
		hero2: (await one('hero-2')) ?? work[0] ?? null,
		heroVideo: video ? `/previas/${slug}/${video}` : null,
		heroWideVideo: wideVideo ? `/previas/${slug}/${wideVideo}` : null,
		heroWide: await one('hero-wide'),
		logo: await photo(
			dir,
			slug,
			all.find((f) => LOGO.test(f)),
		),
		studio: await many('studio'),
		mural: await many('mural'),
		work,
		posts: await many('servico'),
	};
}
