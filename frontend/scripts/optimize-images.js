/**
 * Script para otimização de imagens
 * Converte PNG para WebP e redimensiona imagens grandes
 *
 * Uso: node scripts/optimize-images.js
 */

import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ASSETS_DIR = join(__dirname, '..', 'src', 'assets');
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg'];
const MAX_SIZE_MB = 0.5; // 500KB

async function getImageFiles(dir) {
  const files = await readdir(dir);
  const imageFiles = [];

  for (const file of files) {
    const filePath = join(dir, file);
    const fileStat = await stat(filePath);

    if (fileStat.isDirectory()) {
      continue;
    }

    const ext = extname(file).toLowerCase();
    if (IMAGE_EXTENSIONS.includes(ext)) {
      const sizeInMB = fileStat.size / (1024 * 1024);
      imageFiles.push({
        path: filePath,
        name: file,
        size: fileStat.size,
        sizeMB: sizeInMB.toFixed(2),
        needsOptimization: sizeInMB > MAX_SIZE_MB
      });
    }
  }

  return imageFiles;
}

async function analyzeImages() {
  console.log('🔍 Analisando imagens...\n');

  const images = await getImageFiles(ASSETS_DIR);

  if (images.length === 0) {
    console.log('❌ Nenhuma imagem encontrada em', ASSETS_DIR);
    return;
  }

  console.log(`📊 Encontradas ${images.length} imagens:\n`);

  let totalSize = 0;
  let needsOptimizationCount = 0;

  images.forEach(img => {
    totalSize += img.size;
    const status = img.needsOptimization ? '❌ PRECISA OTIMIZAR' : '✅ OK';
    console.log(`${status} - ${img.name} (${img.sizeMB} MB)`);

    if (img.needsOptimization) {
      needsOptimizationCount++;
    }
  });

  const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
  console.log(`\n📦 Tamanho total: ${totalSizeMB} MB`);
  console.log(`⚠️  Imagens que precisam otimização: ${needsOptimizationCount}`);

  if (needsOptimizationCount > 0) {
    console.log('\n💡 RECOMENDAÇÕES:\n');
    console.log('1. Instale o Sharp para otimização automática:');
    console.log('   npm install sharp');
    console.log('');
    console.log('2. Ou use ferramentas online:');
    console.log('   - https://squoosh.app (Google)');
    console.log('   - https://tinypng.com');
    console.log('   - https://imageoptim.com');
    console.log('');
    console.log('3. Converter para WebP com ImageMagick:');
    console.log('   magick <arquivo>.png -quality 85 -resize 800x <arquivo>.webp');
    console.log('');
    console.log('📋 Lista de arquivos problemáticos:');
    images
      .filter(img => img.needsOptimization)
      .forEach(img => {
        console.log(`   - ${img.name} (${img.sizeMB} MB)`);
      });
  } else {
    console.log('\n✅ Todas as imagens estão otimizadas!');
  }
}

// Executar análise
analyzeImages().catch(err => {
  console.error('❌ Erro ao analisar imagens:', err);
  process.exit(1);
});
