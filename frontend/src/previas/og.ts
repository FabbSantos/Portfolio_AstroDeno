/**
 * Link preview image for a client preview (og:image), rendered at build time:
 * a 1200×630 JPEG with up to three of the client's photos side by side
 * (a work result, the hero portrait in the middle, the studio), separated by
 * thin gaps in the page's paper colour. No text: WhatsApp and the others print
 * the title and description under the image themselves.
 * Served by src/pages/previas/[slug]/og.jpg.ts.
 */
import { join } from 'node:path';
import sharp, { type OverlayOptions } from 'sharp';
import type { PreviaPhoto, PreviaPhotos } from './photos';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;
const GAP = 10;

/** The photos that go into the card, left to right. Empty = no preview image. */
export function ogPanels(photos: PreviaPhotos): PreviaPhoto[] {
	return [photos.work[0], photos.hero, photos.studio[0]].filter((p): p is PreviaPhoto => !!p);
}

export async function renderOg(panels: PreviaPhoto[], background: string): Promise<Buffer> {
	const n = panels.length;
	const width = Math.floor((OG_WIDTH - GAP * (n - 1)) / n);
	const layers: OverlayOptions[] = [];
	let left = 0;
	for (const [i, p] of panels.entries()) {
		// The last panel takes the rounding leftover so the card has no stray edge.
		const w = i === n - 1 ? OG_WIDTH - left : width;
		const file = join(process.cwd(), 'public', p.src);
		const input = await sharp(file).resize({ width: w, height: OG_HEIGHT, fit: 'cover', position: sharp.strategy.attention }).toBuffer();
		layers.push({ input, left, top: 0 });
		left += w + GAP;
	}
	return sharp({ create: { width: OG_WIDTH, height: OG_HEIGHT, channels: 3, background } })
		.composite(layers)
		.jpeg({ quality: 80, mozjpeg: true })
		.toBuffer();
}
