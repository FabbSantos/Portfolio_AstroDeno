#!/usr/bin/env node
/**
 * new-client.mjs — scaffold a client site from one of the portfolio templates.
 *
 *   node scripts/new-client.mjs --template stratus --name padaria-do-ze --domain padariadoze.com.br --form whatsapp --install
 *
 * What it does (each step is a function below, in order):
 *   1. validates the arguments and that frontend/src/templates/<slug> exists
 *   2. copies client-starter/ → <out>/<name>, replacing __CLIENT__ / __DOMAIN__ /
 *      __SLUG__ / __SLUG_PASCAL__ in every text file
 *   3. vendors templates/core → src/templates/core and templates/<slug> →
 *      src/templates/<slug> (no demo assets, no demo.config.ts, no _smoke.ts)
 *   4. --with-demo-assets: copies <slug>/assets/demo/* into src/assets/
 *   5. --form resend|webhook: copies core/api/lead.ts → src/pages/api/lead.ts,
 *      adds @astrojs/vercel and enables the adapter in astro.config.mjs
 *   6. generates src/site.config.ts from the template's demo.config.ts, with
 *      the client-specific fields replaced by TODO_ markers (the build refuses
 *      to run while any TODO_ is left — that is the checklist)
 *   7. writes src/assets/README.md (image names + sizes) and TODO.md
 *   8. --install: npm install; then, if node_modules exists, runs `astro check`
 *      and a build so the TODO_ checklist is printed right away
 *   9. --git: git init + first commit
 *
 * Zero dependencies. Paths are resolved from this file's location, not cwd.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

/* ----------------------------------------------------------------------------
 * Constants
 * -------------------------------------------------------------------------- */
const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TEMPLATES_DIR = path.join(REPO, 'frontend', 'src', 'templates');
const STARTER_DIR = path.join(REPO, 'client-starter');
const DEFAULT_OUT = path.join(REPO, 'clients');

const FORMS = ['none', 'whatsapp', 'formspree', 'web3forms', 'resend', 'webhook'];
const LANGS = ['pt-BR', 'en'];
const SSR_FORMS = new Set(['resend', 'webhook']);
const ENDPOINT_FORMS = new Set(['formspree', 'web3forms']);
/**
 * Templates whose lead form is an OPTIONAL config block that the portfolio demo
 * leaves out (the demo shows buttons only). When --form is not `none` and the
 * block is missing from the generated site.config.ts, it is inserted so the
 * chosen provider actually has a form on the page. Text is inserted verbatim
 * (3-tab body, 2-tab closing brace = the block's indentation).
 */
const FORM_HOOKS = {
	stratus: {
		block: 'finalCta',
		key: 'form',
		value: {
			'pt-BR': `{
			fields: [{ name: 'email', label: 'E-mail corporativo', type: 'email', required: true, placeholder: 'voce@empresa.com' }],
			cta: 'Começar grátis',
			foot: 'Sem cartão de crédito. Cancele quando quiser.',
		}`,
			en: `{
			fields: [{ name: 'email', label: 'Work email', type: 'email', required: true, placeholder: 'you@company.com' }],
			cta: 'Start free trial',
			foot: 'No credit card. Cancel anytime.',
		}`,
		},
	},
	atelier: {
		block: 'contact',
		key: 'inquiry',
		value: {
			'pt-BR': `{
			fields: [
				{ name: 'name', label: 'Nome', type: 'text', required: true, autocomplete: 'name' },
				{ name: 'email', label: 'E-mail', type: 'email', required: true },
				{ name: 'message', label: 'Conte sobre o projeto', type: 'textarea', required: true },
			],
			cta: 'Enviar',
			foot: 'Respondemos em até 2 dias úteis.',
		}`,
			en: `{
			fields: [
				{ name: 'name', label: 'Name', type: 'text', required: true, autocomplete: 'name' },
				{ name: 'email', label: 'Email', type: 'email', required: true },
				{ name: 'message', label: 'Tell us about the project', type: 'textarea', required: true },
			],
			cta: 'Send',
			foot: 'We reply within two business days.',
		}`,
		},
	},
};

/** Packages a template imports beyond the starter's (usually its own fonts). */
const TEMPLATE_DEPS = {
	salvia: { '@fontsource-variable/hanken-grotesk': '^5.3.0', '@fontsource-variable/newsreader': '^5.3.0' },
};

const VERCEL_ADAPTER_VERSION = '^11.0.10';
const ADAPTER_MARKER = '// __ADAPTER__ ';

/** Files copied verbatim (no placeholder replacement). Everything else is text. */
const BINARY_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif', '.ico', '.woff', '.woff2', '.ttf', '.otf', '.pdf', '.mp4']);

/** Recommended image sizes, matched against the file name (first match wins). */
const IMAGE_SIZES = [
	[/logo/i, 'SVG (ou PNG 512px, fundo transparente)'],
	[/\bog\b|^og[-_.]|[-_]og\./i, '1200×630 (JPG/PNG, ≤ 300 KB)'],
	[/planta/i, '1200px de largura (PNG ou JPG, fundo branco)'],
	[/mapa/i, '1200×800 (PNG ou JPG)'],
	[/case|product|produto|lookbook/i, '1200×900 (JPG, ≤ 300 KB)'],
	[/larga|paisagem/i, '2000×900 paisagem (JPG, ≤ 400 KB)'],
	[/servico/i, '800×1000 retrato (JPG, ≤ 250 KB)'],
	[/recepcao|sala|consultorio|espaco/i, '1200×1500 retrato (JPG, ≤ 400 KB)'],
	[/fachada|vista|decorado|lazer|hero/i, '1600×1000 (JPG, ≤ 400 KB)'],
];
const IMAGE_SIZE_DEFAULT = '1600×1000 (JPG, ≤ 400 KB)';

const HELP = `
new-client.mjs — scaffold a client site from a portfolio template

Usage:
  node scripts/new-client.mjs --template <slug> --name <kebab> --domain <host> [options]

Required:
  --template <slug>      folder under frontend/src/templates (stratus, atelier, brava, mirante…)
  --name <kebab-case>    project folder + package name (e.g. padaria-do-ze)
  --domain <host>        final domain, no protocol (e.g. padariadoze.com.br)

Options:
  --form <provider>      none | whatsapp | formspree | web3forms | resend | webhook   (default: none)
                         resend/webhook enable the Vercel adapter + src/pages/api/lead.ts
  --lang <locale>        pt-BR | en                                                   (default: pt-BR)
  --out <dir>            where to create the project                                 (default: ${DEFAULT_OUT})
  --with-demo-assets     copy the template's demo images into src/assets/ (same file names)
  --install              run npm install, then astro check + build (prints the TODO_ checklist)
  --git                  git init + first commit
  -h, --help             this text
`;

/* ----------------------------------------------------------------------------
 * Small helpers
 * -------------------------------------------------------------------------- */
const log = (msg = '') => console.log(msg);
const step = (msg) => console.log(`\n▸ ${msg}`);
const fail = (msg) => {
	console.error(`\n✖ ${msg}\n`);
	process.exit(1);
};

const pascal = (slug) => slug.split('-').map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('');
const isBinary = (file) => BINARY_EXT.has(path.extname(file).toLowerCase());
const rel = (p) => path.relative(process.cwd(), p) || '.';

/** Runs a command in `cwd`, streaming output. Returns the exit status. */
function run(cmd, args, cwd, { capture = false } = {}) {
	const res = spawnSync(cmd, args, {
		cwd,
		stdio: capture ? ['ignore', 'pipe', 'pipe'] : 'inherit',
		encoding: 'utf8',
		// Node ≥ 22 refuses to spawn .cmd shims (npm, npx) without a shell on Windows.
		shell: process.platform === 'win32',
	});
	return { status: res.status ?? 1, out: `${res.stdout ?? ''}${res.stderr ?? ''}` };
}

/** Recursively copies `from` → `to`. `visit(srcPath, relPath)` returns false to skip; `transform(text, relPath)` edits text files. */
function copyTree(from, to, { visit = () => true, transform = null } = {}) {
	const copied = [];
	const walk = (src, dst, relDir) => {
		for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
			const s = path.join(src, entry.name);
			const d = path.join(dst, entry.name);
			const r = path.posix.join(relDir, entry.name);
			if (visit(s, r) === false) continue;
			if (entry.isDirectory()) {
				fs.mkdirSync(d, { recursive: true });
				walk(s, d, r);
			} else {
				fs.mkdirSync(path.dirname(d), { recursive: true });
				if (transform && !isBinary(s)) {
					fs.writeFileSync(d, transform(fs.readFileSync(s, 'utf8'), r));
				} else {
					fs.copyFileSync(s, d);
				}
				copied.push(r);
			}
		}
	};
	walk(from, to, '');
	return copied;
}

/* ----------------------------------------------------------------------------
 * 1. Arguments
 * -------------------------------------------------------------------------- */
function parseArgs(argv) {
	const opts = { form: 'none', lang: 'pt-BR', out: DEFAULT_OUT, withDemoAssets: false, install: false, git: false };
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i];
		const next = () => {
			const v = argv[++i];
			if (v === undefined || v.startsWith('--')) fail(`${a} needs a value`);
			return v;
		};
		switch (a) {
			case '-h':
			case '--help':
				log(HELP);
				process.exit(0);
			// eslint-disable-next-line no-fallthrough
			case '--template':
				opts.template = next();
				break;
			case '--name':
				opts.name = next();
				break;
			case '--domain':
				opts.domain = next();
				break;
			case '--form':
				opts.form = next();
				break;
			case '--lang':
				opts.lang = next();
				break;
			case '--out':
				opts.out = path.resolve(next());
				break;
			case '--with-demo-assets':
				opts.withDemoAssets = true;
				break;
			case '--install':
				opts.install = true;
				break;
			case '--git':
				opts.git = true;
				break;
			default:
				fail(`unknown argument: ${a}\n${HELP}`);
		}
	}
	return opts;
}

function validate(opts) {
	if (!opts.template || !opts.name || !opts.domain) fail(`--template, --name and --domain are required\n${HELP}`);
	if (!/^[a-z][a-z0-9-]*$/.test(opts.template)) fail(`--template must be a lowercase slug, got "${opts.template}"`);
	if (!/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(opts.name)) fail(`--name must be kebab-case (letters, digits, dashes), got "${opts.name}"`);

	// Accept "https://www.x.com/" and normalise to the bare host.
	opts.domain = opts.domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '').toLowerCase();
	if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/.test(opts.domain)) fail(`--domain must be a host like cliente.com.br, got "${opts.domain}"`);

	if (!FORMS.includes(opts.form)) fail(`--form must be one of ${FORMS.join(' | ')}`);
	if (!LANGS.includes(opts.lang)) fail(`--lang must be one of ${LANGS.join(' | ')}`);

	if (!fs.existsSync(STARTER_DIR)) fail(`starter not found: ${STARTER_DIR}`);

	const templateDir = path.join(TEMPLATES_DIR, opts.template);
	if (!fs.existsSync(templateDir)) {
		const available = fs
			.readdirSync(TEMPLATES_DIR, { withFileTypes: true })
			.filter((d) => d.isDirectory() && d.name !== 'core')
			.map((d) => d.name);
		fail(`template "${opts.template}" not found in ${TEMPLATES_DIR}\navailable: ${available.join(', ')}`);
	}
	const pas = pascal(opts.template);
	for (const f of ['schema.ts', 'demo.config.ts', `${pas}Page.astro`]) {
		if (!fs.existsSync(path.join(templateDir, f))) fail(`template "${opts.template}" is missing ${f} — not a finished template`);
	}

	const dest = path.join(opts.out, opts.name);
	if (fs.existsSync(dest)) fail(`${dest} already exists — pick another --name or delete it first`);

	return { ...opts, pascal: pas, templateDir, dest };
}

/* ----------------------------------------------------------------------------
 * 2. Starter → project (with placeholders)
 * -------------------------------------------------------------------------- */
function copyStarter(ctx) {
	step(`Copying client-starter → ${rel(ctx.dest)}`);
	const replacements = {
		__CLIENT__: ctx.name,
		__DOMAIN__: ctx.domain,
		__SLUG_PASCAL__: ctx.pascal, // before __SLUG__ so the longer token wins
		__SLUG__: ctx.template,
	};
	const files = copyTree(STARTER_DIR, ctx.dest, {
		visit: (_s, r) => !/^(node_modules|dist|\.astro|\.vercel)(\/|$)/.test(r),
		transform: (text) => {
			for (const [token, value] of Object.entries(replacements)) text = text.split(token).join(value);
			return text;
		},
	});
	log(`  ${files.length} files`);
}

/* ----------------------------------------------------------------------------
 * 3–4. Vendor core + template (+ demo assets)
 * -------------------------------------------------------------------------- */
function vendorTemplates(ctx) {
	step('Vendoring templates/core and templates/' + ctx.template);
	const coreFiles = copyTree(path.join(TEMPLATES_DIR, 'core'), path.join(ctx.dest, 'src', 'templates', 'core'), {
		visit: (_s, r) => r !== '_smoke.ts',
	});
	const tplFiles = copyTree(ctx.templateDir, path.join(ctx.dest, 'src', 'templates', ctx.template), {
		// demo.config.ts becomes site.config.ts (step 6); demo images live in src/assets.
		visit: (_s, r) => r !== 'demo.config.ts' && r !== 'assets' && !r.startsWith('assets/'),
	});
	log(`  core: ${coreFiles.length} files · ${ctx.template}: ${tplFiles.length} files`);

	const extraDeps = TEMPLATE_DEPS[ctx.template];
	if (extraDeps) {
		const pkgPath = path.join(ctx.dest, 'package.json');
		const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
		pkg.dependencies = Object.fromEntries(Object.entries({ ...pkg.dependencies, ...extraDeps }).sort(([a], [b]) => a.localeCompare(b)));
		fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, '\t') + '\n');
		log(`  template deps: ${Object.keys(extraDeps).join(', ')}`);
	}

	const demoAssets = path.join(ctx.templateDir, 'assets', 'demo');
	if (ctx.withDemoAssets && fs.existsSync(demoAssets)) {
		const assets = copyTree(demoAssets, path.join(ctx.dest, 'src', 'assets'), {
			visit: (_s, r) => !r.startsWith('.'),
		});
		log(`  demo assets → src/assets: ${assets.length ? assets.join(', ') : 'none in this template'}`);
	}
}

/* ----------------------------------------------------------------------------
 * 5. Form provider: SSR endpoint + Vercel adapter
 * -------------------------------------------------------------------------- */
function configureForm(ctx) {
	const configPath = path.join(ctx.dest, 'astro.config.mjs');
	let config = fs.readFileSync(configPath, 'utf8');

	if (!SSR_FORMS.has(ctx.form)) {
		// Keep the lines as a hint, plainly commented.
		fs.writeFileSync(configPath, config.split(ADAPTER_MARKER).join('// '));
		return;
	}

	step(`Form provider "${ctx.form}": enabling /api/lead + Vercel adapter`);
	fs.mkdirSync(path.join(ctx.dest, 'src', 'pages', 'api'), { recursive: true });
	fs.copyFileSync(path.join(TEMPLATES_DIR, 'core', 'api', 'lead.ts'), path.join(ctx.dest, 'src', 'pages', 'api', 'lead.ts'));

	config = config.split(ADAPTER_MARKER).join('');
	fs.writeFileSync(configPath, config);

	const pkgPath = path.join(ctx.dest, 'package.json');
	const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
	pkg.dependencies = Object.fromEntries(Object.entries({ ...pkg.dependencies, '@astrojs/vercel': VERCEL_ADAPTER_VERSION }).sort(([a], [b]) => a.localeCompare(b)));
	fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, '\t') + '\n');
	log('  src/pages/api/lead.ts · @astrojs/vercel added · adapter enabled');
}

/* ----------------------------------------------------------------------------
 * 6. site.config.ts from demo.config.ts
 *
 * The demo config is treated as text. We locate top-level blocks (brand, seo,
 * contact, legal) by matching braces — skipping strings and comments — and
 * then replace or insert `key: 'value'` pairs inside them.
 * -------------------------------------------------------------------------- */

/** Index of the `}` matching the `{` at `open`, ignoring braces in strings/comments. */
function matchBrace(src, open) {
	let depth = 0;
	for (let i = open; i < src.length; i++) {
		const c = src[i];
		const n = src[i + 1];
		if (c === '/' && n === '/') {
			i = src.indexOf('\n', i);
			if (i < 0) break;
			continue;
		}
		if (c === '/' && n === '*') {
			i = src.indexOf('*/', i + 2) + 1;
			if (i < 1) break;
			continue;
		}
		if (c === "'" || c === '"' || c === '`') {
			for (i++; i < src.length && src[i] !== c; i++) if (src[i] === '\\') i++;
			continue;
		}
		if (c === '{') depth++;
		else if (c === '}' && --depth === 0) return i;
	}
	throw new Error('unbalanced braces in demo.config.ts');
}

/**
 * Finds `key: {` at the given indentation (number of tabs) inside `src`
 * between `from` and `to`. Returns { start, open, close } or null.
 */
function findBlock(src, key, indent, from = 0, to = src.length) {
	const re = new RegExp(`\\n(\\t{${indent}})${key}: \\{`, 'g');
	re.lastIndex = from;
	const m = re.exec(src);
	if (!m || m.index >= to) return null;
	const open = m.index + m[0].length - 1;
	return { start: m.index + 1, open, close: matchBrace(src, open) };
}

const STRING_LITERAL = String.raw`'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|` + '`(?:[^`\\\\]|\\\\.)*`';

/**
 * Inside block [open, close] of `src`, sets `key` to `literal` (a TS
 * expression as text). Replaces an existing string value or inserts the key
 * right after the opening brace. Returns the new source.
 */
function setKey(src, block, key, literal) {
	const inner = src.slice(block.open + 1, block.close);
	const re = new RegExp(`(^|[\\s{,])(${key}): (${STRING_LITERAL}|null|true|false|\\d+)`, 'm');
	const m = re.exec(inner);
	let newInner;
	if (m) {
		newInner = inner.slice(0, m.index) + m[1] + key + ': ' + literal + inner.slice(m.index + m[0].length);
	} else if (inner.includes('\n')) {
		// multi-line block: new line at the block's inner indentation
		const indent = (/\n(\t+)\S/.exec(inner) ?? [, '\t'])[1];
		newInner = `\n${indent}${key}: ${literal},` + inner;
	} else {
		// inline block: `{ a: 1 }` → `{ key: value, a: 1 }`
		newInner = ` ${key}: ${literal},` + inner.replace(/^\s*/, ' ').replace(/^ (?=\})/, '');
		if (/^\s*$/.test(inner)) newInner = ` ${key}: ${literal} `;
	}
	return src.slice(0, block.open + 1) + newInner + src.slice(block.close);
}

/** Ensures `key: {` exists as a child of `parent` (or top-level when parent is null); returns the block. */
function ensureBlock(src, key, parent, topIndent) {
	const indent = parent ? topIndent + 1 : topIndent;
	const from = parent ? parent.open : 0;
	const to = parent ? parent.close : src.length;
	const found = findBlock(src, key, indent, from, to);
	if (found) return { src, block: found };

	const tabs = '\t'.repeat(indent);
	let insertAt;
	if (parent) {
		insertAt = parent.open + 1;
	} else {
		// top-level: right after the `seo` block (always present) so the order reads naturally
		const seo = findBlock(src, 'seo', topIndent);
		if (!seo) throw new Error('demo.config.ts has no top-level `seo` block');
		insertAt = src.indexOf('\n', seo.close) + 1;
	}
	const text = parent ? `\n${tabs}${key}: {},` : `${tabs}${key}: {},\n`;
	src = src.slice(0, insertAt) + text + src.slice(insertAt);
	return { src, block: findBlock(src, key, indent, from, to + text.length) };
}

function generateSiteConfig(ctx) {
	step('Generating src/site.config.ts from demo.config.ts');
	let src = fs.readFileSync(path.join(ctx.templateDir, 'demo.config.ts'), 'utf8');

	// Header comment → client-facing header.
	src = src.replace(/^\/\*\*[\s\S]*?\*\/\s*/, '');
	src =
		`/**
 * ${ctx.name} — site config. Everything the site shows lives here.
 *
 * Template: ${ctx.template} (src/templates/${ctx.template}). Every value that starts
 * with TODO_ must be replaced — \`npm run build\` refuses to run while one is left.
 * Images: import them from ./assets/ (see src/assets/README.md).
 */
` + src;

	// Imports: schema now lives in src/templates/<slug>; images in src/assets.
	src = src.replace(/from '\.\/schema'/, `from './templates/${ctx.template}/schema'`);
	src = src.replace(/from '\.\/assets\/demo\//g, "from './assets/");

	// Remember the demo brand name so TODO.md can point at leftovers in section copy.
	const demoBrand = (/\n\tbrand: \{[\s\S]*?name: '((?:[^'\\]|\\.)*)'/.exec(src) ?? [])[1] ?? '';

	// Indentation of top-level keys inside define<Slug>({ … }) — one tab.
	const TOP = 1;
	const q = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
	const en = ctx.lang === 'en';

	// brand
	let r = ensureBlock(src, 'brand', null, TOP);
	src = setKey(r.src, r.block, 'name', q('TODO_brand_name'));
	r = ensureBlock(src, 'brand', null, TOP);
	src = setKey(r.src, r.block, 'tagline', q('TODO_brand_tagline'));
	r = ensureBlock(src, 'brand', null, TOP);
	src = setKey(r.src, r.block, 'locale', q(ctx.lang));

	// seo
	r = ensureBlock(src, 'seo', null, TOP);
	src = setKey(r.src, r.block, 'title', q('TODO_seo_title'));
	r = ensureBlock(src, 'seo', null, TOP);
	src = setKey(r.src, r.block, 'description', q('TODO_seo_description'));
	r = ensureBlock(src, 'seo', null, TOP);
	src = setKey(r.src, r.block, 'canonical', q(`https://${ctx.domain}`));

	// legal (+ privacyUrl so the LGPD notice and footer link work out of the box)
	r = ensureBlock(src, 'legal', null, TOP);
	src = setKey(r.src, r.block, 'cnpj', q('TODO_legal_cnpj'));
	r = ensureBlock(src, 'legal', null, TOP);
	src = setKey(r.src, r.block, 'company', q('TODO_legal_company'));
	r = ensureBlock(src, 'legal', null, TOP);
	src = setKey(r.src, r.block, 'privacyUrl', q('/privacidade'));

	// contact
	r = ensureBlock(src, 'contact', null, TOP);
	src = setKey(r.src, r.block, 'phone', q('TODO_contact_phone'));
	r = ensureBlock(src, 'contact', null, TOP);
	src = setKey(r.src, r.block, 'email', q('TODO_contact_email'));

	// contact.whatsapp
	r = ensureBlock(src, 'contact', null, TOP);
	let w = ensureBlock(src, 'whatsapp', r.block, TOP);
	src = w.src;
	r = ensureBlock(src, 'contact', null, TOP);
	w = ensureBlock(src, 'whatsapp', r.block, TOP);
	if (!/\bmessage: /.test(src.slice(w.block.open, w.block.close))) {
		src = setKey(w.src, w.block, 'message', q(en ? 'Hi! I came from the website and would like more information.' : 'Olá! Vim pelo site e quero mais informações.'));
		r = ensureBlock(src, 'contact', null, TOP);
		w = ensureBlock(src, 'whatsapp', r.block, TOP);
	}
	src = setKey(w.src, w.block, 'number', q('TODO_whatsapp_number'));

	// contact.form
	r = ensureBlock(src, 'contact', null, TOP);
	let f = ensureBlock(src, 'form', r.block, TOP);
	src = setKey(f.src, f.block, 'provider', q(ctx.form));
	if (ENDPOINT_FORMS.has(ctx.form)) {
		r = ensureBlock(src, 'contact', null, TOP);
		f = ensureBlock(src, 'form', r.block, TOP);
		src = setKey(f.src, f.block, 'endpoint', q('TODO_form_endpoint'));
	}

	// Optional form block the demo leaves out (see FORM_HOOKS).
	let formHook = null;
	const hook = FORM_HOOKS[ctx.template];
	if (ctx.form !== 'none' && hook) {
		r = ensureBlock(src, hook.block, null, TOP);
		if (!new RegExp(`\\b${hook.key}: `).test(src.slice(r.block.open, r.block.close))) {
			src = setKey(r.src, r.block, hook.key, hook.value[ctx.lang]);
			formHook = `${hook.block}.${hook.key}`;
		}
	}

	const out = path.join(ctx.dest, 'src', 'site.config.ts');
	fs.writeFileSync(out, src);

	const todos = [...src.matchAll(/\b([a-zA-Z]+): '(TODO_[A-Za-z0-9_]+)'/g)].map((m) => ({
		key: m[1],
		marker: m[2],
		line: src.slice(0, m.index).split('\n').length,
	}));
	const images = [...src.matchAll(/^import\s+\w+\s+from\s+'\.\/assets\/([^']+)';?$/gm)].map((m) => m[1]);
	// Only the config body counts (not the header comment / imports / `defineStratus(`).
	const bodyStart = src.indexOf('export default');
	const bodyLine = src.slice(0, bodyStart).split('\n').length;
	const brandLeftovers = demoBrand
		? src
				.split('\n')
				.map((l, i) => ({ line: i + 1, text: l }))
				.filter(({ line, text }) => line > bodyLine && !/^\s*(\/\/|\*|\/\*)/.test(text))
				.filter(({ text }) => text.toLowerCase().includes(demoBrand.toLowerCase()) && !text.includes('TODO_'))
		: [];

	log(`  ${todos.length} TODO_ fields · ${images.length} image imports${formHook ? ` · form block added at ${formHook}` : ''}`);
	return { todos, images, demoBrand, brandLeftovers, formHook };
}

/* ----------------------------------------------------------------------------
 * 7. src/assets/README.md + TODO.md
 * -------------------------------------------------------------------------- */
function sizeFor(file) {
	for (const [re, size] of IMAGE_SIZES) if (re.test(file)) return size;
	return IMAGE_SIZE_DEFAULT;
}

function writeAssetsReadme(ctx, info) {
	const rows = info.images.map((f) => `| \`${f}\` | ${sizeFor(f)} | ${fs.existsSync(path.join(ctx.dest, 'src', 'assets', f)) ? 'demo' : '**faltando**'} |`);
	const md = `# src/assets

Imagens importadas por \`src/site.config.ts\`. Coloque os arquivos aqui com **exatamente** estes nomes (ou mude o \`import\` no topo do \`site.config.ts\`). Formatos: JPG para foto, PNG para planta/mapa/fundo transparente, SVG para logo. O Astro redimensiona e gera WebP no build — mande o original em boa resolução, mas abaixo de ~500 KB.

| Arquivo | Tamanho recomendado | Status |
| --- | --- | --- |
${rows.length ? rows.join('\n') : '| _(o template não importa imagens)_ | | |'}

## Opcionais (todo template aceita)

| Uso | Onde | Tamanho |
| --- | --- | --- |
| Logo → favicon + topo | \`brand.logo\` | ${sizeFor('logo')} |
| Imagem ao compartilhar (WhatsApp, redes) | \`seo.ogImage\` | ${sizeFor('og')} |

\`\`\`ts
import logo from './assets/logo.svg';
import og from './assets/og.jpg';
// … brand: { logo }, seo: { ogImage: og }
\`\`\`
`;
	fs.writeFileSync(path.join(ctx.dest, 'src', 'assets', 'README.md'), md);
}

function writeTodo(ctx, info) {
	const todoRows = info.todos.map((t) => `- [ ] \`${t.marker}\` → \`${t.key}\` (site.config.ts:${t.line})`);
	const imgRows = info.images.map((f) => `- [ ] \`src/assets/${f}\` — ${sizeFor(f)}`);
	const leftovers = info.brandLeftovers.map((l) => `- site.config.ts:${l.line} — \`${l.text.trim().slice(0, 90)}\``);

	const formNotes = {
		none: '`provider: none` — o formulário só mostra um aviso de demo. Troque antes de entregar.',
		whatsapp: 'Preencha `contact.whatsapp.number` (dígitos com DDI, ex.: 5511999998888). Cada envio abre o wa.me com os campos.',
		formspree: 'Crie o form em https://formspree.io, cole a URL (https://formspree.io/f/xxxx) em `contact.form.endpoint`.',
		web3forms: 'Pegue a access key em https://web3forms.com e cole em `contact.form.endpoint`.',
		resend: 'Cadastre no Vercel: RESEND_API_KEY, LEAD_TO, LEAD_FROM (remetente verificado no Resend), SITE_NAME. Ver .env.example.',
		webhook: 'Cadastre no Vercel: LEAD_WEBHOOK_URL (Make / n8n / Zapier / Apps Script) e SITE_NAME. Ver .env.example.',
	};

	const md = `# TODO — ${ctx.name}

Gerado por \`scripts/new-client.mjs\` (template **${ctx.template}**, form **${ctx.form}**, idioma **${ctx.lang}**, domínio **${ctx.domain}**).
O build (\`npm run build\`) falha enquanto qualquer valor \`TODO_\` existir em \`src/site.config.ts\` — a lista de erros é este checklist.

## 1. Campos obrigatórios em src/site.config.ts

${todoRows.join('\n')}

Linhas que não se aplicam ao cliente (ex.: sem telefone fixo, sem WhatsApp) podem ser apagadas — os campos são opcionais no schema; só o \`TODO_\` é proibido. Sem o bloco \`contact.whatsapp\` o botão flutuante some.

## 2. Imagens (src/assets/)

${imgRows.length ? imgRows.join('\n') : '- _(o template não importa imagens; opcionalmente adicione logo e og — ver src/assets/README.md)_'}
- [ ] opcional: \`logo.svg\` → \`brand.logo\` · \`og.jpg\` (1200×630) → \`seo.ogImage\`

## 3. Formulário (\`${ctx.form}\`)

${formNotes[ctx.form]}
${SSR_FORMS.has(ctx.form) ? '\nO adapter Vercel está ativo e `src/pages/api/lead.ts` responde em `/api/lead`. Teste com `npm run dev` + `.env` local antes do deploy.\n' : ''}${
		info.formHook
			? `\nA demo deste template não mostra formulário; o scaffold adicionou o bloco \`${info.formHook}\` (campos + CTA) no site.config.ts — revise o texto e os campos.\n`
			: ctx.form !== 'none'
				? '\nConfira que a página renderiza o formulário (procure `data-lead-form` em `dist/index.html` após o build). Se o template tem o formulário como bloco opcional, veja `src/templates/' + ctx.template + '/schema.ts`.\n'
				: ''
	}
## 4. Revisar o texto das seções

O conteúdo das seções veio da demo (\`${info.demoBrand || 'demo'}\`) como ponto de partida. Reescreva com os dados do cliente.${
		leftovers.length ? `\n\nO nome da demo ainda aparece em:\n\n${leftovers.join('\n')}` : ''
	}

Também: \`theme\` (cores), \`nav\` (links), \`legal.lines\` (endereço), \`analytics\` (GA4 / Pixel / Plausible — só ids preenchidos são carregados).

## 5. Deploy

- [ ] \`npm run build\` limpo
- [ ] \`vercel link\` + \`vercel --prod\` (ou importar o repo no painel)
- [ ] domínio no Vercel + DNS no registrador
- [ ] testar o formulário no domínio final
- [ ] conferir /privacidade, /obrigado, 404
- [ ] handover (acesso ao Vercel + repo)
`;
	fs.writeFileSync(path.join(ctx.dest, 'TODO.md'), md);
}

/* ----------------------------------------------------------------------------
 * 8. npm install + astro check + checklist build
 * -------------------------------------------------------------------------- */
function installAndCheck(ctx) {
	const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
	const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
	const result = { installed: false, check: null, build: null };

	if (ctx.install) {
		step('npm install');
		const { status } = run(npm, ['install', '--no-fund', '--no-audit'], ctx.dest);
		if (status !== 0) fail('npm install failed');
		result.installed = true;
	}

	if (!fs.existsSync(path.join(ctx.dest, 'node_modules'))) {
		log('\n  (node_modules missing — skipping astro check; run with --install or `npm install` later)');
		return result;
	}

	step('astro check (types)');
	const check = run(npx, ['astro', 'check'], ctx.dest, { capture: true });
	log(check.out.trim().split('\n').slice(-12).join('\n'));
	result.check = check.status;

	// `astro check` only type-checks — the TODO_ checklist comes from defineSite()
	// at build time. Run the build once so the list is printed right here.
	step('astro build (expected to FAIL with the TODO_ checklist)');
	const build = run(npx, ['astro', 'build'], ctx.dest, { capture: true });
	result.build = build.status;
	const idx = build.out.indexOf('site.config.ts:');
	if (idx >= 0) {
		const excerpt = build.out.slice(idx).split('\n');
		const end = excerpt.findIndex((l, i) => i > 0 && !/^\s*-\s/.test(l) && l.trim() !== '');
		log(excerpt.slice(0, end > 0 ? end : 40).join('\n'));
	} else {
		log(build.out.trim().split('\n').slice(-25).join('\n'));
	}
	return result;
}

/* ----------------------------------------------------------------------------
 * 9. git
 * -------------------------------------------------------------------------- */
function initGit(ctx) {
	step('git init');
	if (run('git', ['init', '-q'], ctx.dest).status !== 0) fail('git init failed');
	run('git', ['add', '-A'], ctx.dest);
	const { status } = run('git', ['commit', '-q', '-m', `chore: scaffold ${ctx.name} from template ${ctx.template}`], ctx.dest);
	if (status !== 0) fail('git commit failed (is user.name / user.email configured?)');
	log('  first commit done');
}

/* ----------------------------------------------------------------------------
 * main
 * -------------------------------------------------------------------------- */
function main() {
	const t0 = Date.now();
	const ctx = validate(parseArgs(process.argv.slice(2)));

	log(`\nnew-client: ${ctx.name}  (template ${ctx.template} · form ${ctx.form} · ${ctx.lang} · https://${ctx.domain})`);

	copyStarter(ctx);
	vendorTemplates(ctx);
	configureForm(ctx);
	const info = generateSiteConfig(ctx);
	writeAssetsReadme(ctx, info);
	writeTodo(ctx, info);
	const checks = installAndCheck(ctx);
	if (ctx.git) initGit(ctx);

	const secs = ((Date.now() - t0) / 1000).toFixed(1);
	log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✔ ${rel(ctx.dest)} ready in ${secs}s

  ${info.todos.length} TODO_ fields   → src/site.config.ts (list in TODO.md)
  ${info.images.length} images        → src/assets/ (names + sizes in src/assets/README.md)
  form: ${ctx.form}${SSR_FORMS.has(ctx.form) ? '   → env vars in .env.example (set them on Vercel)' : ENDPOINT_FORMS.has(ctx.form) ? '   → paste the endpoint in contact.form.endpoint' : ''}${info.formHook ? `\n  form block added → ${info.formHook} (review the copy)` : ''}
  ${checks.installed ? 'npm install done' : 'dependencies NOT installed'}${checks.check === null ? '' : ` · astro check ${checks.check === 0 ? 'ok' : 'FAILED'}`}${checks.build === null ? '' : ` · build ${checks.build === 0 ? 'ok' : 'blocked by TODO_ (expected)'}`}

Next:
  cd ${JSON.stringify(rel(ctx.dest))}${checks.installed ? '' : '\n  npm install'}
  # 1. replace every TODO_ in src/site.config.ts   2. drop images in src/assets/
  npm run build        # astro check + astro build — must pass clean
  npm run preview      # http://localhost:4321
  vercel link && vercel --prod
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
}

main();
