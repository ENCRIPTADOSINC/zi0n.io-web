---
name: blog-generator
description: Genera un artículo de blog estandarizado, robusto y de alta calidad para Zi0n.io. Incluye contenido Markdown multilenguaje (ru, es, en, fr, it, pt-BR, zh, hi, de, nl) sin marcas ni clichés de IA, generación de imagen temática con generate_image basada en la identidad visual de Zi0n con garantía de unicidad (sin duplicados), validación automatizada mediante script y publicación en Git creando rama y Pull Request.
---

# 📝 Generador de Blog Estandarizado y Robusto - Zi0n.io

Esta Skill define el procedimiento estricto y resiliente para crear artículos de blog profesionales para Zi0n.io. Todo artículo generado debe cumplir con estándares rigurosos de seguridad, redacción técnica, multilenguaje, unicidad visual absoluta y validación automatizada antes de su publicación.

## 🎯 Requisitos de Entrada

El usuario proporcionará:

- Tema o Título propuesto (Ej: "Cómo proteger tu wallet cripto de un cambio de SIM no autorizado").
- (Opcional) Palabras clave objetivo.
- (Opcional) Autor (Por defecto: "Equipo Zi0n").

## 📁 Estructura de Archivos a Crear

Para cada blog con el slug `{slug}` (en formato kebab-case limpio y único):

```
landing-page-structure/
├── content/blog/{slug}/
│   ├── ru.md           ← Contenido + frontmatter en Ruso (idioma por defecto del sitio)
│   ├── es.md           ← Contenido + frontmatter en Español (mínimo 300 palabras)
│   ├── en.md           ← Traducción adaptada al Inglés
│   ├── fr.md           ← Traducción adaptada al Francés
│   ├── it.md           ← Traducción adaptada al Italiano
│   ├── pt-BR.md        ← Traducción adaptada al Portugués (Brasil)
│   ├── zh.md           ← Traducción adaptada al Chino simplificado (mínimo 500 caracteres)
│   ├── hi.md           ← Traducción adaptada al Hindi
│   ├── de.md           ← Traducción adaptada al Alemán
│   └── nl.md           ← Traducción adaptada al Neerlandés
└── public/image/blog/
    └── {slug}.webp     ← Imagen temática ÚNICA generada con generate_image
```

A diferencia de otros proyectos del mismo generador, Zi0n **no usa un `meta.json` separado**: cada archivo `{locale}.md` lleva su propio frontmatter YAML con los campos de metadatos de ESE idioma (ver esquema abajo). Esto es lo que ya consume `lib/blog.ts` en el sitio.

## 🖼️ 1. Estándar Visual: Fotografía Hiperrealista y Protocolo de Unicidad

Cada publicación DEBE TENER SU PROPIA IMAGEN ORIGINAL Y ÚNICA.

### 🚫 Prohibición absoluta de vectores, iconos planos, 3D genérico y duplicados
- **QUEDA ESTRICTAMENTE PROHIBIDO:** Usar iconos simples, ilustraciones vectoriales planas, dibujos 2D, gráficos sintéticos tipo clipart o renders 3D caricaturescos.
- **QUEDA ESTRICTAMENTE PROHIBIDO:** Copiar, renombrar o reutilizar imágenes existentes de otros artículos. Cada slug debe contar con un archivo fotográfico único. Si dos posts comparten el mismo hash SHA-256, el validador bloqueará la publicación.

### 🎨 Especificaciones obligatorias de estilo y composición (Identidad Zi0n)
- **Estilo Fotográfico:** Fotografía cinematográfica hiperrealista (cinematic realistic photography) en calidad 8K, con profundidad de campo óptica real (bokeh), iluminación ambiental dramática de noche, reflejos realistas sobre superficies de carbono/vidrio/metal, y texturas hiperdetalladas de dispositivos y hardware.
- **Tratamiento de Color y Gradiente de Sombra:**
  - **Filtro Azul Tenue:** El tinte azul debe ser sutil y liviano (sin saturar ni quemar la imagen en azul artificial), preservando los colores naturales de la piel, reflejos de pantalla y texturas de los materiales.
  - **Gradiente Oscuro en la Zona Superior Izquierda (Top-Left):** El centro focal de sombra más oscura debe ubicarse en la **esquina superior izquierda** de la composición (degradado suave hacia el azul noche profundo `#040E2E`), permitiendo que el resto del encuadre muestre la escena fotográfica con nitidez y luminosidad natural.
- **Sujetos Reales y Escenarios:**
  - Manos de profesionales sosteniendo smartphones Android modernos con acabados mate/oscuros.
  - Primeros planos (macro photography) de módulos de cámaras, lentes, puertos USB blindados y hardware de seguridad.
  - Escenarios reales: oficinas de noche, terminales de aeropuertos internacionales, salas de servidores con cableado de fibra óptica azul, escritorios de trading minimalistas con iluminación tenue.
- **Paleta Cromática Estricta:** Tonos fríos corporativos de Zi0n — Azul medianoche `#071C59`, Azul marino profundo `#040E2E`, Azul eléctrico `#003FFF` — con acentos lumínicos en Cian `#3AA6FF` / `#00C3D0` o Verde Menta `#5EEC7D`. Quedan prohibidos los tonos cálidos (rojos, naranjas o amarillos).
- **Relación de aspecto:** 16:9 exacta, **mínimo `1920x1080` px** (recomendado `2560x1440` o superior). El banner del post se muestra a ancho completo de pantalla (100vw): por debajo de 1920px de ancho la imagen se ve borrosa en monitores grandes al tener que escalarse. `1280x720` ya NO es suficiente y será rechazado por el validador.
- **Formato y ruta:** `landing-page-structure/public/image/blog/{slug}.webp`.
- **Reglas anti-IA en la imagen:**
  - Cero texto, tipografías flotantes ilegibles o números generados.
  - Cero marcas de agua, logos falsos o marcas comerciales de terceros.
  - Cero hackers cliché con sudadera encapuchada en habitaciones verdes tipo "Matrix".

### 💡 Estructura de Prompts Fotográficos Hiperrealistas
Los prompts deben describir una escena fotográfica tangible y realista:
- **SIM Swapping / Seguridad Móvil:** *"Cinematic realistic photograph of a professional holding a sleek matte-black Android smartphone in a dimly lit modern executive lounge at night. Moody ambient lighting with dark midnight-blue and electric-cyan accents, shallow depth of field, 8k resolution, ultra-detailed glass and metal textures, no text, no watermarks, no logos."*
- **Cable Wipe / Extracción Forense:** *"Cinematic close-up macro photograph of a disconnected USB security cable on a dark brushed-metal desk next to a premium smartphone, soft electric-blue and mint-green specular lighting, atmospheric shadows, 8k resolution, no text, no logos."*
- **Hot vs Hardware Wallets:** *"Cinematic high-end product photography of a modern Android smartphone resting on a dark carbon fiber surface, subtle blue and cyan lighting reflections on the screen glass, shallow depth of field, 8k resolution, no text, no icons."*
- **eSIM Internacional / Viajes:** *"Cinematic photograph of an international traveler at a sleek airport terminal lounge at night looking at a smartphone, panoramic glass windows overlooking the runway with dark blue night lighting, 8k resolution, no text, no watermarks."*

### ⏳ Manejo de límites de cuota (Error 429) y resiliencia
- Si `generate_image` devuelve error `429 Too Many Requests` de forma persistente, se deben utilizar activos fotográficos hiperrealistas de alta resolución procesados con gradación de color cinemática Zi0n (`scripts/fetch_and_grade_covers.py`).
- Bajo ninguna circunstancia se debe recurrir a ilustraciones planas o iconos simples para sortear problemas de cuota.

## ✍️ 2. Estándar de Redacción y Filtro Anti-Clichés de IA

### 🚫 Patrones prohibidos (cero "marcas de agua" en texto)

El validador automático bloqueará cualquier artículo que contenga estas frases (lista base — ampliable en `scripts/validate-blog-entry.mjs`):

| Idioma | Expresiones prohibidas |
|---|---|
| Español (es) | "En el mundo digital actual...", "En la era digital en la que vivimos...", "Hoy en día, en un mundo...", "En este fascinante artículo...", "En resumen,", "En conclusión,", "Para concluir,", "Un faro de esperanza/luz", "Caleidoscopio", "Tapiz", "Desentrañar". |
| Inglés (en) | "In today's digital world...", "In the digital age we live in...", "In this fascinating article...", "In conclusion,", "In summary,", "A beacon of hope/light", "Kaleidoscope", "Tapestry", "Unravel". |
| Francés (fr) | "Dans le monde numérique d'aujourd'hui...", "À l'ère du numérique...", "En conclusion,", "En résumé,", "Un phare d'espoir", "Tapisserie". |
| Italiano (it) | "Nel mondo digitale di oggi...", "Nell'era digitale in cui viviamo...", "In conclusione,", "In sintesi,", "Un faro di speranza", "Arazzo". |
| Portugués (pt-BR) | "No mundo digital atual...", "Na era digital em que vivemos...", "Em conclusão,", "Em resumo,", "Um farol de esperança", "Tapeçaria". |
| Alemán (de) | "In der heutigen digitalen Welt...", "Im digitalen Zeitalter, in dem wir leben...", "Zusammenfassend,", "Abschließend,", "Ein Leuchtfeuer der Hoffnung", "Wandteppich". |
| Neerlandés (nl) | "In de hedendaagse digitale wereld...", "In het digitale tijdperk waarin we leven...", "Samenvattend,", "Concluderend,", "Een baken van hoop", "Wandtapijt". |
| Ruso (ru) | "В современном цифровом мире...", "В эпоху цифровых технологий...", "В заключение,", "Подводя итог,", "Маяк надежды", "Калейдоскоп". |
| Chino (zh) | "在当今数字世界中...", "在我们生活的数字时代...", "总而言之,", "总的来说,", "希望的灯塔", "万花筒". |
| Hindi (hi) | "आज के डिजिटल युग में...", "आज की डिजिटल दुनिया में...", "निष्कर्ष में,", "संक्षेप में,", "आशा की किरण", "कैलिडोस्कोप". |

### 📐 Estructura obligatoria del Markdown (para cada uno de los 10 idiomas)

1. **Entrada directa (2-3 líneas):** Plantea el problema o amenaza técnica sin rodeos ni saludos introductorios.
2. **El Desafío / Amenaza Real (`## `):** Explicación técnica de vectores de ataque reales y relevantes para el dominio de Zi0n — SIM swapping, apps de mensajería/wallet no verificadas, malware/spyware en Android, extracción forense por cable (Cellebrite/GrayKey), captura de pantalla/grabación no autorizada, pérdida o incautación del dispositivo.
3. **Análisis Técnico y Solución (`## ` y `### `):** Mecanismos reales que usa Zi0n — cifrado de extremo a extremo, verificación de integridad de apps, aislamiento del entorno, VPN dinámica sobre red descentralizada con rotación de IP, eSIM internacional, notas de seguridad encriptadas, restauración segura con credenciales importadas.
4. **Recomendaciones Prácticas:** Puntos de acción concretos y aplicables, referenciando las funciones reales de Zi0n cuando aplique (auto-wipe por cable, PIN de seguridad, Extra PIN, protección SIM/eSIM, bloqueo de cámara/mic, bloqueo de capturas, autodestrucción por inactividad, botón de pánico).
5. **Sección de Integración:** Encabezado equivalente a `## ¿Cómo puede ayudarte Zi0n?` (traducido a cada idioma) con enlaces contextuales a `https://zi0n.io`.
6. **Preguntas Frecuentes:** Encabezado equivalente a `## Preguntas frecuentes` con 4-5 preguntas y respuestas concisas.
7. **Llamado a la Acción (CTA):** Enlace directo a `https://zi0n.io` (o `https://zi0n.io/{locale}` si aplica).

## 📄 3. Esquema exacto del frontmatter (por archivo `{locale}.md`)

Cada uno de los 10 archivos lleva su propio frontmatter YAML, con el `title` y `description` traducidos a ese idioma, y los campos no-textuales (`date`, `author`, `coverImage`) **idénticos** entre todos los idiomas del mismo post:

```md
---
title: "Título traducido a este idioma"
description: "Descripción SEO en este idioma (140-160 caracteres)."
date: "2026-08-24"
author: "Equipo Zi0n"
category: "Categoría del post"
tags: ["etiqueta-1", "etiqueta-2", "etiqueta-3"]
coverImage: "/image/blog/{slug}.webp"
draft: false
---

Contenido en Markdown siguiendo la estructura obligatoria de la sección 2.
```

## 🛡️ 4. Validación Automatizada Obligatoria

Antes de realizar el commit o crear la rama, ES OBLIGATORIO ejecutar el script de validación desde la raíz del repo (`landing-page-structure`):

```bash
node scripts/validate-blog-entry.mjs {slug}
```

El script verificará automáticamente:

- ✅ Existencia de los 10 archivos `{locale}.md` requeridos.
- ✅ Frontmatter válido con `title`, `description`, `date`, `author` y `coverImage` en cada idioma.
- ✅ Longitud mínima de contenido (300 palabras; 500 caracteres para `zh`).
- ✅ Detección y bloqueo de clichés de IA por idioma.
- ✅ Mención de "Zi0n" y de un enlace a `zi0n.io` en cada archivo.
- ✅ Existencia de `public/image/blog/{slug}.webp`.
- ✅ Unicidad de la imagen por hash SHA-256 contra todas las demás portadas de `public/image/blog/`, para evitar duplicados.

Si el validador arroja algún error, DEBE corregirse antes de proceder. Las advertencias no bloquean la publicación pero deben revisarse.

## 🔄 5. Flujo de Ejecución Paso a Paso

1. **Pre-flight & slug:** Verificar si el slug `{slug}` ya existe en `content/blog/`. Si existe, elegir un slug específico que diferencie el enfoque del nuevo artículo.
2. **Generar la imagen temática única:**
   - Invocar `generate_image` con un prompt personalizado para el tema, siguiendo la identidad visual Zi0n (`AspectRatio: "16:9"`).
   - En caso de rate limit (429), aplicar espera y reintento. Nunca copiar imágenes existentes.
   - Guardar la imagen en `public/image/blog/{slug}.webp`.
3. **Crear carpeta y escribir contenido:**
   - Crear `content/blog/{slug}/`.
   - Escribir `ru.md`, `es.md`, `en.md`, `fr.md`, `it.md`, `pt-BR.md`, `zh.md`, `hi.md`, `de.md`, `nl.md`, cada uno con su frontmatter completo y contenido cumpliendo los estándares de calidad y estructura.
4. **Ejecutar validación automatizada:**
   - Correr `node scripts/validate-blog-entry.mjs {slug}`.
   - Asegurar 0 errores.
5. **Flujo de Git & Pull Request:**
   - Crear rama: `git checkout -b blog/{slug}`
   - Agregar cambios: `git add content/blog/{slug} public/image/blog/{slug}.webp`
   - Realizar commit: `git commit -m "feat: add blog post about {slug}"`
   - Subir rama: `git push -u origin blog/{slug}`
   - Crear PR: `gh pr create --title "📝 Blog: {Título en Español}" --body "..."`

Si `gh` no está autenticado, proporcionar al usuario el enlace directo de GitHub para abrir el PR.
