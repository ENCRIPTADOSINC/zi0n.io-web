#!/usr/bin/env node

/**
 * Script de validación estricta para entradas de blog en Zi0n.io
 * Verifica:
 *  1. Estructura de carpetas y archivos obligatorios (un .md por idioma soportado).
 *  2. Frontmatter válido y completo en cada idioma (title, description, date, author, coverImage).
 *  3. Verificación de imagen de portada existente, resolución mínima y unicidad por hash SHA-256 (sin duplicados).
 *  4. Filtro anti-clichés de IA en los archivos Markdown, por idioma.
 *  5. Estructura mínima de contenido: longitud, encabezados H2, mención de marca, CTA a zi0n.io.
 *
 * Uso:
 *   node scripts/validate-blog-entry.mjs <slug>
 *   node scripts/validate-blog-entry.mjs --all
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Debe mantenerse en sync con `locales` en i18n/config.ts
const REQUIRED_LANGUAGES = ['ru', 'es', 'en', 'fr', 'it', 'pt-BR', 'zh', 'hi', 'de', 'nl'];

const REQUIRED_FRONTMATTER_FIELDS = ['title', 'description', 'date', 'author', 'coverImage'];

// Idiomas donde el conteo de palabras por espacios no aplica bien (CJK sin espacios).
const CHARACTER_COUNT_LANGUAGES = new Set(['zh']);
const MIN_WORDS = 300;
const MIN_CHARACTERS_CJK = 500;

// Patrones prohibidos de clichés generados por IA, por idioma.
const FORBIDDEN_AI_PATTERNS = [
  { pattern: /en el mundo digital actual/i, lang: 'es', desc: 'Cliché: "En el mundo digital actual"' },
  { pattern: /en la era digital en la que vivimos/i, lang: 'es', desc: 'Cliché: "En la era digital..."' },
  { pattern: /hoy en día, en un mundo/i, lang: 'es', desc: 'Cliché: "Hoy en día, en un mundo..."' },
  { pattern: /en este fascinante artículo/i, lang: 'es', desc: 'Cliché: "En este fascinante artículo..."' },
  { pattern: /^##?\s*En conclusión/im, lang: 'es', desc: 'Conclusión trillada: "En conclusión"' },
  { pattern: /^##?\s*En resumen/im, lang: 'es', desc: 'Conclusión trillada: "En resumen"' },
  { pattern: /^##?\s*Para concluir/im, lang: 'es', desc: 'Conclusión trillada: "Para concluir"' },
  { pattern: /un faro de (esperanza|luz)/i, lang: 'es', desc: 'Metáfora sobreusada: "Un faro de..."' },
  { pattern: /\bcaleidoscopio\b/i, lang: 'es', desc: 'Palabra cliché: "Caleidoscopio"' },
  { pattern: /\btapiz\b/i, lang: 'es', desc: 'Palabra cliché: "Tapiz"' },
  { pattern: /\bdesentrañar\b/i, lang: 'es', desc: 'Palabra cliché: "Desentrañar"' },

  { pattern: /in today'?s digital world/i, lang: 'en', desc: 'Cliché: "In today\'s digital world"' },
  { pattern: /in the digital age( we live in)?/i, lang: 'en', desc: 'Cliché: "In the digital age..."' },
  { pattern: /in this fascinating article/i, lang: 'en', desc: 'Cliché: "In this fascinating article..."' },
  { pattern: /^##?\s*In conclusion/im, lang: 'en', desc: 'Trite conclusion: "In conclusion"' },
  { pattern: /^##?\s*In summary/im, lang: 'en', desc: 'Trite conclusion: "In summary"' },
  { pattern: /a beacon of (hope|light)/i, lang: 'en', desc: 'Overused metaphor: "A beacon of..."' },
  { pattern: /\btapestry\b/i, lang: 'en', desc: 'Overused word: "Tapestry"' },
  { pattern: /\bkaleidoscope\b/i, lang: 'en', desc: 'Overused word: "Kaleidoscope"' },
  { pattern: /\bunravel\b/i, lang: 'en', desc: 'Overused word: "Unravel"' },

  { pattern: /dans le monde numérique d'aujourd'hui/i, lang: 'fr', desc: 'Cliché: "Dans le monde numérique..."' },
  { pattern: /à l'ère du numérique/i, lang: 'fr', desc: 'Cliché: "À l\'ère du numérique..."' },
  { pattern: /^##?\s*En conclusion/im, lang: 'fr', desc: 'Cliché: "En conclusion"' },
  { pattern: /^##?\s*En résumé/im, lang: 'fr', desc: 'Cliché: "En résumé"' },
  { pattern: /un phare d'espoir/i, lang: 'fr', desc: 'Métaphore surutilisée: "Un phare d\'espoir"' },
  { pattern: /\btapisserie\b/i, lang: 'fr', desc: 'Mot cliché: "Tapisserie"' },

  { pattern: /nel mondo digitale di oggi/i, lang: 'it', desc: 'Cliché: "Nel mondo digitale di oggi"' },
  { pattern: /nell'era digitale in cui viviamo/i, lang: 'it', desc: 'Cliché: "Nell\'era digitale..."' },
  { pattern: /^##?\s*In conclusione/im, lang: 'it', desc: 'Cliché: "In conclusione"' },
  { pattern: /^##?\s*In sintesi/im, lang: 'it', desc: 'Cliché: "In sintesi"' },
  { pattern: /un faro di speranza/i, lang: 'it', desc: 'Metafora abusata: "Un faro di speranza"' },
  { pattern: /\barazzo\b/i, lang: 'it', desc: 'Parola cliché: "Arazzo"' },

  { pattern: /no mundo digital atual/i, lang: 'pt-BR', desc: 'Cliché: "No mundo digital atual"' },
  { pattern: /na era digital em que vivemos/i, lang: 'pt-BR', desc: 'Cliché: "Na era digital..."' },
  { pattern: /^##?\s*Em conclusão/im, lang: 'pt-BR', desc: 'Cliché: "Em conclusão"' },
  { pattern: /^##?\s*Em resumo/im, lang: 'pt-BR', desc: 'Cliché: "Em resumo"' },
  { pattern: /um farol de esperança/i, lang: 'pt-BR', desc: 'Metáfora exagerada: "Um farol de esperança"' },
  { pattern: /\btapeçaria\b/i, lang: 'pt-BR', desc: 'Palavra clichê: "Tapeçaria"' },

  { pattern: /in der heutigen digitalen welt/i, lang: 'de', desc: 'Klischee: "In der heutigen digitalen Welt"' },
  { pattern: /im digitalen zeitalter, in dem wir leben/i, lang: 'de', desc: 'Klischee: "Im digitalen Zeitalter..."' },
  { pattern: /^##?\s*Zusammenfassend/im, lang: 'de', desc: 'Abgedroschener Schluss: "Zusammenfassend"' },
  { pattern: /^##?\s*Abschließend/im, lang: 'de', desc: 'Abgedroschener Schluss: "Abschließend"' },
  { pattern: /ein leuchtfeuer der hoffnung/i, lang: 'de', desc: 'Überstrapazierte Metapher: "Ein Leuchtfeuer der Hoffnung"' },
  { pattern: /\bwandteppich\b/i, lang: 'de', desc: 'Klischeewort: "Wandteppich"' },

  { pattern: /in de hedendaagse digitale wereld/i, lang: 'nl', desc: 'Cliché: "In de hedendaagse digitale wereld"' },
  { pattern: /in het digitale tijdperk waarin we leven/i, lang: 'nl', desc: 'Cliché: "In het digitale tijdperk..."' },
  { pattern: /^##?\s*Samenvattend/im, lang: 'nl', desc: 'Afgezaagd slot: "Samenvattend"' },
  { pattern: /^##?\s*Concluderend/im, lang: 'nl', desc: 'Afgezaagd slot: "Concluderend"' },
  { pattern: /een baken van hoop/i, lang: 'nl', desc: 'Overgebruikte metafoor: "Een baken van hoop"' },
  { pattern: /\bwandtapijt\b/i, lang: 'nl', desc: 'Cliché-woord: "Wandtapijt"' },

  { pattern: /в современном цифровом мире/i, lang: 'ru', desc: 'Клише: "В современном цифровом мире"' },
  { pattern: /в эпоху цифровых технологий/i, lang: 'ru', desc: 'Клише: "В эпоху цифровых технологий..."' },
  { pattern: /^##?\s*В заключение/im, lang: 'ru', desc: 'Избитая концовка: "В заключение"' },
  { pattern: /^##?\s*Подводя итог/im, lang: 'ru', desc: 'Избитая концовка: "Подводя итог"' },
  { pattern: /маяк надежды/i, lang: 'ru', desc: 'Затёртая метафора: "Маяк надежды"' },
  { pattern: /\bкалейдоскоп\b/i, lang: 'ru', desc: 'Клише-слово: "Калейдоскоп"' },

  { pattern: /在当今数字世界中/, lang: 'zh', desc: '陈词滥调："在当今数字世界中"' },
  { pattern: /在我们生活的数字时代/, lang: 'zh', desc: '陈词滥调："在我们生活的数字时代"' },
  { pattern: /^##?\s*总而言之/m, lang: 'zh', desc: '陈词滥调结尾："总而言之"' },
  { pattern: /^##?\s*总的来说/m, lang: 'zh', desc: '陈词滥调结尾："总的来说"' },
  { pattern: /希望的灯塔/, lang: 'zh', desc: '过度使用的比喻："希望的灯塔"' },
  { pattern: /万花筒/, lang: 'zh', desc: '陈词滥调词："万花筒"' },

  { pattern: /आज के डिजिटल युग में/, lang: 'hi', desc: 'क्लिशे: "आज के डिजिटल युग में"' },
  { pattern: /आज की डिजिटल दुनिया में/, lang: 'hi', desc: 'क्लिशे: "आज की डिजिटल दुनिया में"' },
  { pattern: /^##?\s*निष्कर्ष में/m, lang: 'hi', desc: 'घिसा-पिटा निष्कर्ष: "निष्कर्ष में"' },
  { pattern: /^##?\s*संक्षेप में/m, lang: 'hi', desc: 'घिसा-पिटा निष्कर्ष: "संक्षेप में"' },
  { pattern: /आशा की किरण/, lang: 'hi', desc: 'अति प्रयुक्त रूपक: "आशा की किरण"' },
  { pattern: /कैलिडोस्कोप/, lang: 'hi', desc: 'क्लिशे शब्द: "कैलिडोस्कोप"' },
];

// Resolución mínima para que el banner a ancho completo (100vw) no se vea borroso en monitores grandes.
const MIN_WIDTH_ERROR = 1280; // por debajo de esto, se rechaza.
const MIN_WIDTH_RECOMMENDED = 1920; // por debajo de esto (pero >= MIN_WIDTH_ERROR), solo advertencia.

function calculateFileHash(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const buffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

/** Lee ancho/alto de un WebP (lossy VP8, lossless VP8L o extendido VP8X) sin dependencias externas. */
function getWebpDimensions(filePath) {
  const buf = fs.readFileSync(filePath);
  if (buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WEBP') return null;

  const fourcc = buf.toString('ascii', 12, 16);
  if (fourcc === 'VP8X') {
    return {
      width: 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16)),
      height: 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16)),
    };
  }
  if (fourcc === 'VP8 ') {
    return {
      width: buf.readUInt16LE(26) & 0x3fff,
      height: buf.readUInt16LE(28) & 0x3fff,
    };
  }
  if (fourcc === 'VP8L') {
    const bits = buf.readUInt32LE(21);
    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >> 14) & 0x3fff) + 1,
    };
  }
  return null;
}

function validateBlog(slug) {
  const errors = [];
  const warnings = [];
  const blogDir = path.join(rootDir, 'content', 'blog', slug);

  console.log(`\n🔍 Validando blog: "${slug}"...`);

  if (!fs.existsSync(blogDir)) {
    errors.push(`El directorio del blog no existe: ${blogDir}`);
    return { slug, errors, warnings };
  }

  let coverImage = null;

  for (const lang of REQUIRED_LANGUAGES) {
    const mdPath = path.join(blogDir, `${lang}.md`);
    if (!fs.existsSync(mdPath)) {
      errors.push(`Falta archivo de idioma: ${lang}.md`);
      continue;
    }

    const raw = fs.readFileSync(mdPath, 'utf8');
    let parsed;
    try {
      parsed = matter(raw);
    } catch (e) {
      errors.push(`${lang}.md: frontmatter YAML inválido (${e.message}).`);
      continue;
    }

    const { data: frontmatter, content } = parsed;

    for (const field of REQUIRED_FRONTMATTER_FIELDS) {
      if (!frontmatter[field] || typeof frontmatter[field] !== 'string' || !frontmatter[field].trim()) {
        errors.push(`${lang}.md: falta el campo de frontmatter "${field}" o está vacío.`);
      }
    }

    if (frontmatter.coverImage) {
      if (coverImage && coverImage !== frontmatter.coverImage) {
        warnings.push(`${lang}.md: "coverImage" (${frontmatter.coverImage}) no coincide con el de otros idiomas (${coverImage}).`);
      }
      coverImage = coverImage ?? frontmatter.coverImage;
    }

    const trimmed = content.trim();
    if (CHARACTER_COUNT_LANGUAGES.has(lang)) {
      const charCount = trimmed.replace(/\s+/g, '').length;
      if (charCount < MIN_CHARACTERS_CJK) {
        errors.push(`${lang}.md: contenido demasiado corto (${charCount} caracteres). Mínimo recomendado: ${MIN_CHARACTERS_CJK}.`);
      }
    } else {
      const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
      if (wordCount < MIN_WORDS) {
        errors.push(`${lang}.md: contenido demasiado corto (${wordCount} palabras). Mínimo recomendado: ${MIN_WORDS}.`);
      }
    }

    const h2Count = (content.match(/^##\s+.+$/gm) || []).length;
    if (h2Count < 4) {
      warnings.push(`${lang}.md: tiene pocos encabezados H2 (${h2Count}). Se recomiendan al menos 4 secciones (amenaza, análisis, recomendaciones, integración con Zi0n, FAQ).`);
    }

    if (!/zi0n/i.test(content)) {
      warnings.push(`${lang}.md: no menciona a Zi0n en el texto.`);
    }

    if (!/zi0n\.io/i.test(content)) {
      warnings.push(`${lang}.md: no incluye un enlace/CTA hacia zi0n.io.`);
    }

    for (const item of FORBIDDEN_AI_PATTERNS) {
      if (item.lang === lang && item.pattern.test(content)) {
        errors.push(`${lang}.md contiene un cliché de IA prohibido: [${item.desc}]`);
      }
    }
  }

  // Validar imagen y unicidad estricta (SHA-256)
  const imagesDir = path.join(rootDir, 'public', 'image', 'blog');
  const imageRelPath = path.join('public', 'image', 'blog', `${slug}.webp`);
  const imageFullPath = path.join(rootDir, imageRelPath);

  if (!fs.existsSync(imageFullPath)) {
    errors.push(`No se encontró la imagen de portada en: ${imageRelPath}`);
  } else {
    const targetHash = calculateFileHash(imageFullPath);
    const targetStats = fs.statSync(imageFullPath);

    if (targetStats.size < 1000) {
      errors.push(`La imagen ${imageRelPath} parece estar corrupta o vacía (${targetStats.size} bytes).`);
    }

    const dimensions = getWebpDimensions(imageFullPath);
    if (!dimensions) {
      errors.push(`No se pudo leer la resolución de ${imageRelPath}. ¿Es un WebP válido?`);
    } else if (dimensions.width < MIN_WIDTH_ERROR) {
      errors.push(
        `${imageRelPath}: resolución insuficiente (${dimensions.width}x${dimensions.height}). El banner se muestra a ancho completo (100vw); se requiere un mínimo de ${MIN_WIDTH_ERROR}px de ancho.`
      );
    } else if (dimensions.width < MIN_WIDTH_RECOMMENDED) {
      warnings.push(
        `${imageRelPath}: resolución de ${dimensions.width}x${dimensions.height} por debajo de lo recomendado (${MIN_WIDTH_RECOMMENDED}px de ancho). Se verá algo suave en monitores grandes.`
      );
    }

    if (fs.existsSync(imagesDir)) {
      const allImages = fs.readdirSync(imagesDir);
      for (const otherImg of allImages) {
        if (otherImg === `${slug}.webp`) continue;
        const otherImgPath = path.join(imagesDir, otherImg);
        if (fs.statSync(otherImgPath).isFile()) {
          const otherHash = calculateFileHash(otherImgPath);
          if (targetHash && otherHash && targetHash === otherHash) {
            errors.push(
              `❌ IMAGEN DUPLICADA DETECTADA: "${slug}.webp" tiene exactamente el mismo hash SHA-256 que "${otherImg}". Cada blog DEBE tener una imagen original y única.`
            );
          }
        }
      }
    }
  }

  return { slug, errors, warnings };
}

// Ejecución CLI
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log(`Uso: node scripts/validate-blog-entry.mjs <slug> | --all`);
  process.exit(1);
}

let slugsToValidate = [];
const blogBaseDir = path.join(rootDir, 'content', 'blog');

if (args[0] === '--all') {
  if (fs.existsSync(blogBaseDir)) {
    slugsToValidate = fs.readdirSync(blogBaseDir).filter((f) => {
      const full = path.join(blogBaseDir, f);
      return fs.statSync(full).isDirectory();
    });
  }
} else {
  slugsToValidate = [args[0]];
}

let totalErrors = 0;
let totalWarnings = 0;

for (const slug of slugsToValidate) {
  const result = validateBlog(slug);

  if (result.errors.length > 0) {
    console.log(`  ❌ ERRORES (${result.errors.length}):`);
    result.errors.forEach((e) => console.log(`     - ${e}`));
    totalErrors += result.errors.length;
  }

  if (result.warnings.length > 0) {
    console.log(`  ⚠️  ADVERTENCIAS (${result.warnings.length}):`);
    result.warnings.forEach((w) => console.log(`     - ${w}`));
    totalWarnings += result.warnings.length;
  }

  if (result.errors.length === 0 && result.warnings.length === 0) {
    console.log(`  ✅ ¡Validación exitosa! Todos los estándares se cumplen.`);
  }
}

console.log(`\n========================================`);
console.log(`Resumen de validación: ${totalErrors} error(es), ${totalWarnings} advertencia(s).`);

if (totalErrors > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
