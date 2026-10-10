/**
 * Registry of client previews: every data file in this folder (except this one
 * and types.ts) becomes /previas/<slug>.
 */
import type { PreviaData } from './types';

const files = import.meta.glob<{ default: PreviaData }>(['./*.ts', '!./index.ts', '!./types.ts'], { eager: true });

export const previas: PreviaData[] = Object.values(files).map((m) => m.default);
