import tseslint from 'typescript-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';

export default [
	{ ignores: ['dist/**', '.vercel/**', '.astro/**', 'node_modules/**', '*.config.*', 'src/env.d.ts'] },
	...tseslint.configs.recommended,
	...eslintPluginAstro.configs.recommended,
	{
		files: ['**/*.astro'],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser,
				extraFileExtensions: ['.astro'],
			},
		},
	},
	{
		rules: {
			'astro/no-set-html-directive': 'off',
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
		},
	},
];
