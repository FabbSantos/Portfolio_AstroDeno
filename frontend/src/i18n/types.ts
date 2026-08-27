/**
 * `Shape<T>` mirrors the structure of the PT dictionary so the EN one must
 * declare exactly the same keys (astro check fails otherwise).
 */
export type Shape<T> = {
	[K in keyof T]: T[K] extends string
		? string
		: T[K] extends readonly string[]
			? readonly string[]
			: T[K] extends readonly (infer U)[]
				? readonly Shape<U>[]
				: Shape<T[K]>;
};
