/**
 * /previas/<slug>/og.jpg: the link preview image of a client preview, built
 * once at build time (see src/previas/og.ts). Only previews with photos get one.
 */
import type { APIRoute } from 'astro';
import { previas } from '../../../data/previas';
import type { PreviaData } from '../../../data/previas/types';
import { previaPhotos } from '../../../previas/photos';
import { ogPanels, renderOg } from '../../../previas/og';

export async function getStaticPaths() {
	const paths = await Promise.all(
		previas.map(async (data) => {
			const panels = ogPanels(await previaPhotos(data.slug));
			return panels.length ? { params: { slug: data.slug }, props: { data, panels } } : null;
		}),
	);
	return paths.filter((p) => p !== null);
}

export const GET: APIRoute = async ({ props }) => {
	const { data, panels } = props as { data: PreviaData; panels: Awaited<ReturnType<typeof ogPanels>> };
	const jpg = await renderOg(panels, data.theme.bg);
	return new Response(new Uint8Array(jpg), { headers: { 'content-type': 'image/jpeg' } });
};
