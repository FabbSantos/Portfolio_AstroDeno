// oak is pretty much similar to express in nodejs
import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

// Configuração de CORS whitelist (segurança melhorada)
const ALLOWED_ORIGINS = [
  'https://fabsantos.dev',
  'https://www.fabsantos.dev',
  'http://localhost:4321', // Desenvolvimento
  'http://localhost:5173', // Desenvolvimento alternativo
];

// Cache em memória para work.json
let cachedWorks: any = null;
let cacheTime: number = 0;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hora

// Função para carregar works com cache
async function getWorks() {
  const now = Date.now();

  if (!cachedWorks || (now - cacheTime) > CACHE_DURATION) {
    try {
      const data = await Deno.readTextFile("./models/work.json");
      cachedWorks = JSON.parse(data);
      cacheTime = now;
      console.log('✅ Works carregados e cacheados');
    } catch (error) {
      console.error('❌ Erro ao carregar work.json:', error);
      throw error;
    }
  }

  return cachedWorks;
}

const router = new Router();

// Error handling middleware
router
  .get("/works", async (context) => {
    try {
      console.log('📥 Processando requisição /works');
      const works = await getWorks();
      context.response.body = works;
      context.response.headers.set("Cache-Control", "public, max-age=3600");
      context.response.headers.set("Content-Type", "application/json");
    } catch (error) {
      console.error('❌ Erro em /works:', error);
      context.response.status = 500;
      context.response.body = {
        error: "Internal Server Error",
        message: "Failed to load works data"
      };
    }
  })
  .get("/", (context) => {
    console.log('📥 Processando requisição /');
    context.response.body = {
      message: "Portfolio API - Fabrício Bahiense",
      version: "1.0.0",
      endpoints: ["/works"]
    };
    context.response.headers.set("Content-Type", "application/json");
  })
  .get("/health", (context) => {
    context.response.body = {
      status: "healthy",
      timestamp: new Date().toISOString()
    };
    context.response.headers.set("Content-Type", "application/json");
  });

// Create Application Like Express
const app = new Application();

// Global error handler
app.use(async (context, next) => {
  try {
    await next();
  } catch (err) {
    console.error('❌ Erro não tratado:', err);
    context.response.status = 500;
    context.response.body = {
      error: "Internal Server Error"
    };
  }
});

// Apply CORS middleware com whitelist
app.use(oakCors({
  origin: (origin) => {
    // Permitir requests sem origin (como curl, Postman)
    if (!origin) return ALLOWED_ORIGINS[0];

    // Verificar se origin está na whitelist
    const isAllowed = ALLOWED_ORIGINS.includes(origin);

    if (!isAllowed) {
      console.warn(`⚠️ Origem não permitida: ${origin}`);
    }

    return isAllowed ? origin : ALLOWED_ORIGINS[0];
  },
  credentials: false,
}));

// Logging middleware
app.use(async (context, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${context.request.method} ${context.request.url} - ${ms}ms - ${context.response.status}`);
});

app.use(router.routes());
app.use(router.allowedMethods());

const opt = { hostname: "0.0.0.0", port: 5000 };

console.log(`
🚀 Servidor iniciado!
📍 Endereço: http://${opt.hostname}:${opt.port}
🔒 CORS whitelist: ${ALLOWED_ORIGINS.join(', ')}
⚡ Cache habilitado: ${CACHE_DURATION / 1000 / 60} minutos
`);

await app.listen(opt);