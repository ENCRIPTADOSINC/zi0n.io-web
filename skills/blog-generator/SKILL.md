---
name: blog-generator
description: Genera un artículo de blog estandarizado, robusto y de alta calidad para Zi0n.io. Incluye contenido Markdown multilenguaje (ru, es, en, fr, it, pt-BR, zh, hi, de, nl) sin marcas ni clichés de IA, generación de imagen temática con generate_image basada en la identidad visual de Zi0n con garantía de unicidad (sin duplicados), validación automatizada mediante script y publicación en Git creando rama y Pull Request.
---

# 📝 Generador de Blog Estandarizado y Robusto - Zi0n.io

> [!IMPORTANT]
> ### 🚨 REGLAS OBLIGATORIAS Y PRIORITARIAS:
> 
> 1. **MIRA LA SKILL SI SE PIDE QUE SE TOME EL CONTEXTO:** SIEMPRE QUE SE PIDA GENERAR O REVISAR ARTÍCULOS, O TOMAR EL CONTEXTO DEL BLOG, CONSULTA Y RESPETA OBLIGATORIAMENTE CADA DIRECTRIZ, REGLA TIPOGRÁFICA Y RESTRICCIÓN DE ESTA SKILL, ASÍ COMO LAS GUÍAS OFICIALES DE REFERENCIA DE ENCRIPTADOS.
> 2. **SIEMPRE QUE SE CREE EL BLOG HAGA UN RESUMEN DE LOS MD E IMÁGENES PARA PODER MIRAR:** UNA VEZ CREADO O MODIFICADO EL CONTENIDO, PRESENTA EN EL CHAT UN RESUMEN DETALLADO CON LOS ARCHIVOS `.md` GENERADOS/ACTUALIZADOS (TÍTULOS, DESCRIPCIONES, ENFOQUE) Y LAS IMÁGENES PARA QUE EL USUARIO PUEDA REVISARLOS CÓMODAMENTE.
> 3. **FECHA CORRECTA DE CREACIÓN Y PUBLICACIÓN AL SUBIR A PRODUCCIÓN:** EL CAMPO `date` DEL FRONTMATTER EN TODOS LOS ARCHIVOS `.md` DEBE REFLEJAR OBLIGATORIAMENTE LA FECHA EXACTA Y ACTUAL (`YYYY-MM-DD`) DEL DÍA EN QUE EL BLOG SE SUBE A PRODUCCIÓN / SE PUBLICA EN EL REPOSITORIO. SI UN ARTÍCULO FUE REDACTADO DÍAS ANTES DURANTE LA FASE DE BORRADOR O AJUSTES, ANTES DE SUBIRLO AL REPO SE DEBE ACTUALIZAR EL CAMPO `date` A LA FECHA EXACTA DEL DÍA DE SUBIDA.
> 4. **NO SE HACE PR A MENOS QUE SE PIDA LITERALMENTE EN EL CHAT / NO SE HACE PUSH A MAIN A MENOS QUE SE PIDA ESPECÍFICAMENTE:** ESTÁ ESTRICTAMENTE PROHIBIDO ABRIR PULL REQUESTS O HACER PUSH A LA RAMA `main` (O A CUALQUIER RAMA REMOTA) DE FORMA AUTOMÁTICA. SOLO SE HARÁ PUSH O PR SI EL USUARIO LO PIDE DE MANERA EXPRESA Y LITERAL EN EL CHAT.
> 5. **MIENTRAS NO SE PIDA SUBIR AL REPO ESTAMOS EN FASE DE AJUSTES EN EL CONTENT:** MIENTRAS NO SE ORDENE EXPLÍCITAMENTE SUBIR AL REPOSITORIO, EL TRABAJO SE MANTIENE LOCALMENTE Y SE ASUME QUE ESTAMOS EN FASE DE ITERACIÓN, AJUSTES Y REVISIÓN DEL CONTENIDO Y DE LAS IMÁGENES.
> 6. **PROHIBIDO REUTILIZAR UNA MISMA IMAGEN PARA VARIOS BLOGS (UNA IMAGEN NUEVA Y ÚNICA POR CADA BLOG):** CADA ARTÍCULO DE BLOG DEBE TENER OBLIGATORIAMENTE SU PROPIA IMAGEN ORIGINAL GENERADA EXCLUSIVAMENTE PARA ÉL. ESTÁ TOTALMENTE PROHIBIDO REUTILIZAR, DUPLICAR, RE-CODIFICAR, RECORTAR O COMPARTIR UNA MISMA IMAGEN BASE EN MÁS DE UN BLOG. EL VALIDADOR AUTOMATIZADO BLOQUEARÁ CUALQUIER IMAGEN QUE SEA VISUALMENTE IDÉNTICA O SIMILAR MEDIANTE HASH PERCEPTUAL (dHash) Y ANÁLISIS DE DIFERENCIA DE PÍXELES. CADA POST DEBE CONTAR CON UNA IMAGEN FOTOGRÁFICA INDIVIDUAL, ÚNICA Y CREADA ESPECÍFICAMENTE PARA SU TEMÁTICA.
> 7. **MINÚSCULA OBLIGATORIA TRAS LOS DOS PUNTOS EN FRANCÉS (`fr.md`):** EN TODO EL CONTENIDO EN FRANCÉS, TRAS LOS DOS PUNTOS (`:` O `:**`) ESTÁ ESTRICTAMENTE PROHIBIDO PONER MAYÚSCULA INICIAL (VA SIEMPRE EN MINÚSCULA). EN LISTAS O EN EL CUERPO DEL TEXTO TRAS UN CONCEPTO EN NEGRITA (`• **Concept :** minúscula...` O `**Concept :** minúscula...`), EL TEXTO EXPLICATIVO SIEMPRE INICIA EN MINÚSCULA (`des...`, `conserver...`, `copier...`, `afficher...`, `lorsqu'un...`). ÚNICAS EXCEPCIONES: NOMBRES PROPIOS (`Zi0n`, `Android`) O CITAS ENTRE COMILLAS FRANCESAS `« »`.
> 8. **PROSA EDITORIAL FLUIDA Y PROHIBICIÓN DEL ABUSO DE LISTAS, NÚMEROS Y PUNTOS ("CERO LISTITIS"):** QUEDA ESTRICTAMENTE PROHIBIDO CONVERTIR CADA SECCIÓN DEL ARTÍCULO EN UNA LISTA CON VIÑETAS (`•`, `-`) O NUMERADA (`1.`, `2.`, `3.`). NO ES NECESARIO NI ACEPTABLE QUE LAS IDEAS, AMENAZAS O RECOMENDACIONES COMIENCEN CON NÚMEROS O PUNTOS. EL ARTÍCULO DEBE LEERSE COMO UNA PIEZA DE ANÁLISIS EDITORIAL TÉCNICO Y PERIODISMO ESPECIALIZADO, CON PÁRRAFOS BIEN ARTICULADOS Y SUBTÍTULOS TEMÁTICOS H3 DESCRIPTIVOS (SIN ENUMERAR CON NÚMEROS). EN TODO EL ARTÍCULO SE PERMITE COMO MÁXIMO UNA SOLA LISTA BREVE (DE 3 A 4 ELEMENTOS) SI ES REALMENTE NECESARIA (POR EJEMPLO EN RECOMENDACIONES FINALES). TODAS LAS DEMÁS SECCIONES (DESAFÍO, ANÁLISIS DE ARQUITECTURA, INTEGRACIÓN CON ZI0N) DEBEN REDACTARSE OBLIGATORIAMENTE EN PROSA CONTINUA Y PÁRRAFOS NARRATIVOS.

Esta Skill define el procedimiento estricto y resiliente para crear artículos de blog profesionales para Zi0n.io. Todo artículo generado debe cumplir con estándares rigurosos de seguridad, redacción técnica, multilenguaje, unicidad visual absoluta y validación automatizada antes de su publicación.

## 📚 Fuentes Oficiales de Referencia y Contexto Técnico

Para garantizar la máxima fidelidad técnica, precisión en las características y alineación con las capacidades reales de la plataforma Zi0n, consultar y utilizar como contexto las siguientes referencias oficiales:

- 📱 **Visión general de Zi0n App:** [https://encriptados.io/es/apps/zi0n](https://encriptados.io/es/apps/zi0n)
- 📖 **Guía completa de usuario Zi0n:** [https://encriptados.io/es/zi0n-guide](https://encriptados.io/es/zi0n-guide)
- 💻 **Guía de uso en PC Zi0n:** [https://encriptados.io/es/zi0n-guide-pc](https://encriptados.io/es/zi0n-guide-pc)
- ⚙️ **Guía técnica y configuración ADB Zi0n:** [https://encriptados.io/es/zi0n-guide-adb](https://encriptados.io/es/zi0n-guide-adb)

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
- **QUEDA ESTRICTAMENTE PROHIBIDO:** Copiar, renombrar, re-codificar con diferente compresión, recortar ligeramente o reutilizar imágenes existentes de otros artículos. Cada slug debe contar con una fotografía completamente nueva e independiente generada por IA. El validador bloquea tanto duplicados exactos por SHA-256 como similitudes visuales por hash perceptual (dHash) y diferencia de píxeles.

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

### ✍️ Prosa editorial fluida y eliminación del exceso de enumeraciones y viñetas ("Cero Listitis")

Uno de los patrones más recurrentes y delatores del texto generado por IA es la saturación de listas: convertir cada apartado del artículo en una sucesión mecánica de viñetas (`• **Concepto :** texto...`) o listas numeradas (`1. **Concepto :** texto...`). El resultado son artículos que parecen checklists de laboratorio o manuales esquemáticos, perdiendo el tono periodístico, analítico y envolvente que caracteriza a Zi0n.

> [!CAUTION]
> #### 🚨 NO ES NECESARIO NI ACEPTABLE EMPEZAR CADA IDEA CON NÚMEROS O PUNTOS
> No estructures el blog como una concatenación de listas. El lector busca un artículo técnico de fondo bien redactado, no una presentación de diapositivas en texto. Se debe priorizar la **prosa corrida, párrafos con desarrollo temático y subtítulos conceptuales**.

#### 📌 Directrices de redacción editorial:

1. **No forzar listas numeradas ni viñetas en cada sección:**
   - Queda terminantemente prohibido encadenar secciones consecutivas donde cada una sea una lista (`•` o `1., 2., 3.`).
   - Si una sección presenta un desafío, vector de ataque o solución, desarróllalo en **párrafos narrativos continuos** (de 2 a 4 oraciones bien hiladas con causa, impacto y análisis técnico).

2. **Subtítulos H3 temáticos y limpios en lugar de subtítulos numerados:**
   - ❌ **Prohibido:** `### 1. Sauvegarde non sécurisée...`, `### 2. Malwares résidents...`, `### 3. Détournement SIM...`
   - ✅ **Forma correcta:** `### Exposición y fuga de memoria en frases de recuperación`, `### Infección por malware residente y suplantadores de portapapeles`, `### Vulnerabilidad del canal celular y usurpación de SIM`
   - Debajo de cada `###`, redacta prosa explicativa sin insertar una lista de viñetas adentro.

3. **Límite estricto de listas en todo el post (Máximo UNA sola lista breve):**
   - En todo el artículo se permite **como máximo UNA sola lista con viñetas** (de no más de 3 a 4 puntos sintéticos), idealmente en las recomendaciones prácticas finales si se requiere resumir acciones puntuales.
   - Si no es estrictamente imprescindible, incluso las recomendaciones prácticas deben redactarse en párrafos narrativos.
   - Si una sección ya contiene una lista, ninguna otra sección del artículo puede contener listas.

4. **Integración de Zi0n redactada en prosa arquitectónica:**
   - ❌ **Evitar la lista mecánica de funciones:**
     ```markdown
     Zi0n neutralise les menaces grâce à :
     • **Cable Wipe :** purge instantanée...
     • **Duress PIN :** faux profil...
     • **VPN décentralisé :** rotation d'IP...
     ```
   - ✅ **Redacción editorial integrada en párrafos:**
     ```markdown
     Frente a estos vectores de compromiso físico y lógico, la arquitectura de Zi0n plantea un enfoque de defensa en profundidad donde el hardware y el sistema operativo colaboran estrechamente. Al detectarse cualquier desconexión forzada o intento de acceso por cable, el protocolo de Cable Wipe interrumpe las líneas de datos USB y ejecuta la purga de claves en memoria volátil de forma instantánea.

     De forma paralela, el entorno mitiga los escenarios de coacción física mediante el Duress PIN, que despliega una sesión de señuelo funcional preservando las áreas blindadas del dispositivo. Todo el tráfico hacia el ecosistema Web3 transita por una red descentralizada con rotación dinámica de direcciones IP, eliminando la correlación de metadatos celulares y blindando la identidad operativa del usuario.
     ```

5. **Eliminar el patrón repetitivo de IA `• **Palabra clave :** explicación extensa`:**
   - Las ideas deben fluir con sintaxis natural mediante oraciones coordinadas, subordinadas y conectores argumentativos, en vez de fragmentar el pensamiento en etiquetas artificiales en negrita seguidas de dos puntos.

### 🔠 Regla global de mayúsculas en títulos — los 10 idiomas

El campo `title` del frontmatter (y cualquier encabezado `##`/`###` dentro del cuerpo) DEBE usar **minúscula sostenida ("sentence case")** en TODOS los idiomas latinos/germánicos del set (`es`, `en`, `fr`, `it`, `nl`, `pt-BR`, `de`): se capitaliza únicamente la primera letra de la primera palabra del título, nunca cada palabra al estilo "Title Case" en inglés.

- **Queda prohibido:** `Cómo Proteger tu Wallet Cripto de un Ataque de SIM Swapping`
- **Correcto:** `Cómo proteger tu wallet cripto de un ataque de SIM swapping`

**Excepciones que SÍ conservan mayúscula** en cualquier posición del título, porque son nombres propios, marca o siglas (no por ser la primera palabra):
- La marca `Zi0n`.
- Siglas y acrónimos: `SIM`, `PIN`, `VPN`, `IP`, `eSIM`, `USB`, `ESN`/`IMEI` si aplica.
- Nombres propios de terceros citados en el contexto técnico: `Android`, `Faraday`, `Cellebrite`, `GrayKey`.
- Nombres de funciones reales de Zi0n usados como término fijo: `Extra PIN`, `Duress PIN`, `Cable Wipe`.

Todo lo demás —incluyendo términos genéricos como *wallet*, *hardware wallet*, *hot wallet*, *malware*, *spyware*, *trojan(s)*, *smartphone*— va en minúscula salvo que sea la primera palabra del título.

**Regla tras los dos puntos (`:`) en el título:** si el segmento después de los dos puntos NO forma una frase independiente completa (no tiene sujeto + verbo conjugado propio, p. ej. es un complemento nominal o un infinitivo tipo "cómo proteger..."), empieza en minúscula. Solo se capitaliza si es una frase autónoma completa o si la primera palabra es, de por sí, un nombre propio/sigla de la lista de excepciones.

**Caso especial `de.md` (alemán):** el alemán capitaliza SIEMPRE todos los sustantivos (sea cual sea su posición en la frase) y el pronombre/posesivo formal `Sie`/`Ihre`; eso NO es "Title Case" sino ortografía obligatoria y no debe tocarse. La regla de minúscula tras los dos puntos aplica solo a la primera palabra cuando esta NO es un sustantivo (p. ej. adjetivos, adverbios o artículos que introducen un complemento no autónomo).
  - Ejemplo correcto: `So schützen Sie Ihre Krypto-Wallet vor SIM-Swapping-Angriffen` (nada que cambiar: sustantivos y "Sie/Ihre" formal en mayúscula, el resto en minúscula).
  - Ejemplo con corrección: `Sichere internationale eSIM: Private Konnektivität...` → `Sichere internationale eSIM: private Konnektivität...` (tras los dos puntos, "privat-" es adjetivo, no sustantivo, y el complemento no es una frase autónoma → minúscula).

**Idiomas no afectados por este cambio de caja:** `ru`, `zh`, `hi` ya usan de forma nativa minúscula sostenida en sus títulos (no tienen distinción tipo Title Case) — no requieren ajuste adicional por esta regla.

### 🇫🇷 Reglas tipográficas obligatorias para el francés (`fr.md`)

Al redactar o traducir el contenido de `fr.md`, se debe respetar estrictamente la regla tipográfica francesa para el signo deux-points (`:`): **DESPUÉS DE LOS DOS PUNTOS NUNCA SE ESCRIBE EN MAYÚSCULA (SIEMPRE VA EN MINÚSCULA)**.

> [!CAUTION]
> #### 🚨 REGLA ESTRICTA: MINÚSCULA OBLIGATORIA TRAS LOS DOS PUNTOS (`:`)
> En francés, el signo de dos puntos (`:`) indica continuidad sintáctica y lógica (explicación, causa, desarrollo o predicado del término introducido). Por tanto, la palabra inmediatamente posterior a `:` o a `:**` **DEBE INICIAR SIEMPRE EN MINÚSCULA**.
>
> Está **ESTRICTAMENTE PROHIBIDO** iniciar con mayúscula la explicación después de los dos puntos.

#### 1. Listas con viñetas o numeradas con encabezado en negrita (`• **Término :** texto`)
Este es el caso donde más errores se cometen por inercia del inglés o español. Cuando un punto de una lista lleva un concepto en negrita seguido de dos puntos, el texto explicativo **DEBE EMPEZAR SIEMPRE EN MINÚSCULA**, sin importar si es un artículo (`des`, `le`, `la`, `un`), un verbo en infinitivo (`conserver`, `copier`, `afficher`), un conector (`lorsqu'un`, `puisque`) o una frase completa con sujeto y verbo.

❌ **TOTALMENTE PROHIBIDO (errores de mayúscula tras `:`):**
```markdown
• Autorisations applicatives permanentes et excessives : Des dizaines d'applications...
• Connexions sans fil maintenues actives en continu : Conserver le Bluetooth...
• Utilisation non sécurisée du presse-papiers système : Copier-coller des mots de passe...
• Notifications détaillées sur l'écran verrouillé : Afficher l'expéditeur et le contenu...
```

✅ **FORMA OBLIGATORIA Y CORRECTA (siempre en minúscula):**
```markdown
• **Autorisations applicatives permanentes et excessives :** des dizaines d'applications continuent d'accéder au microphone...
• **Connexions sans fil maintenues actives en continu :** conserver le Bluetooth, le Wi-Fi ou le NFC allumés...
• **Utilisation non sécurisée du presse-papiers système :** copier-coller des mots de passe, des identifiants bancaires...
• **Notifications détaillées sur l'écran verrouillé :** afficher l'expéditeur et le contenu des messages reçus...
• **Vulnérabilité du presse-papiers :** lorsqu'un utilisateur copie un mot de passe complexe...
```

#### 2. Únicas DOS excepciones donde se admite mayúscula tras los dos puntos
Solo existen dos casos puntuales donde se permite mayúscula después de los dos puntos en francés:
1. **Nombres propios y marcas comerciales:** Palabras que son intrínsecamente nombres propios o marcas registradas (ej. `Zi0n`, `Android`, `Apple`, `Linux`, `Cellebrite`, `GrayKey`) o siglas que van en mayúsculas (`SIM`, `VPN`, `2FA`, `USB`).
   - Ejemplo correcto: `• **Protection matérielle :** Zi0n neutralise les tentatives d'extraction...`
   - Ejemplo correcto: `• **Authentification :** 2FA physique obligatoire...`
2. **Citas textuales directas entre comillas francesas (`« »`):**
   - Ejemplo correcto: `L'analyste de sécurité confirme : « Le chiffrement logiciel seul ne protège pas contre un accès physique. »`

**Fuera de estas dos excepciones, NO HAY NINGUNA OTRA.** Ni oraciones completas, ni verbos, ni adverbios: todo va en minúscula.

#### 3. Deux-points en el cuerpo del texto y explicaciones
Cuando los dos puntos introducen una aclaración, relación causal o resultado dentro de un párrafo:
- La palabra siguiente se escribe en **minúscula**.
  - Ejemplo: `Le constat est unanime : la sécurité d'un terminal dépend d'abord de son isolation matérielle.`
  - Ejemplo: `Le secret d'un système résilient : une surface d'attaque réduite au minimum.`

#### 4. Deux-points en títulos y subtítulos (H1, H2, H3)
- En títulos y subtítulos, el segmento que va tras los dos puntos sigue la regla de minúscula ("sentence case"), salvo nombres propios:
  - ✅ `Sécurité mobile : comment protéger vos portefeuilles crypto`
  - ❌ `Sécurité mobile : Comment Protéger Vos Portefeuilles Crypto` (Title Case prohibido)
  - ❌ `Sécurité mobile : Comment protéger vos portefeuilles crypto` (Mayúscula tras colon prohibida)

#### 5. Espaciado tipográfico web para los deux-points
- En francés existe una regla de espaciado: un espacio fino/insecable antes de los dos puntos y un espacio normal después (` : `).
- Al formatear listas Markdown con negrita:
  - Formato estándar recomendado: `• **Terme de sécurité :** texte en minuscules...` (el espacio antes de `:` va dentro de la negrita `**... :** `).

### ⏱️ Calibración de tiempo de lectura y accesibilidad (~3 minutos de lectura)

- **Tiempo de lectura objetivo:** Todo artículo generado debe tener una duración estimada de **aproximadamente 3 minutos de lectura** (~500 - 620 palabras en idiomas latinos, germánicos y eslavos; ~1000 - 1200 caracteres en chino simplificado).
- **Redacción clara, didáctica y accesible:** Explicar las amenazas y soluciones técnicas con analogías cotidianas y comprensibles (ej. perfiles aislados como cajas fuertes independientes, llaves físicas, aislamiento de arena), evitando sobrecargar el texto con jerga técnica compleja o intimidante.
- **Estructura ágil en prosa:** Párrafos concisos y fluidos (2 a 4 oraciones), transiciones lógicas entre ideas y preguntas frecuentes directas. Cero acumulación de listas con viñetas o números.

### 📐 Estructura obligatoria del Markdown (para cada uno de los 10 idiomas)

1. **Entrada directa (1-2 párrafos, 2-3 líneas cada uno):** Plantea el problema o vector de ataque real sin rodeos ni saludos introductorios.
2. **El Desafío / Amenaza Real (`## `):** Explicación en **prosa continua** (sin viñetas) de vectores de ataque reales y relevantes para el dominio de Zi0n — SIM swapping, apps no verificadas, malware/spyware en Android, extracción forense por cable (Cellebrite/GrayKey), captura de pantalla no autorizada, pérdida o incautación física.
3. **Análisis Técnico y Solución (`## ` y `### ` temáticos):** Desarrollado mediante subtítulos temáticos H3 descriptivos (sin números `1.`, `2.`, `3.`) y **párrafos analíticos en prosa**, explicando mecanismos criptográficos, sandboxing, VPN dinámica sobre red descentralizada con rotación de IP, eSIM internacional o notas de seguridad.
4. **Recomendaciones Prácticas (`## `):** Consejos y pautas de acción. Preferiblemente redactadas en prosa narrativa articulada. Si se decide utilizar una lista con viñetas, esta será la **ÚNICA lista en todo el post** y contendrá un **máximo de 3 a 4 puntos concisos**.
5. **Sección de Integración (`## `):** Encabezado equivalente a `## ¿Cómo puede ayudarte Zi0n?` redactado en **párrafos fluidos** (sin listas de viñetas), explicando la convergencia de hardware blindado y software en la plataforma, con enlaces contextuales a `https://zi0n.io`.
6. **Preguntas Frecuentes (`## `):** Encabezado equivalente a `## Preguntas frecuentes` con 4-5 preguntas (`### `) y respuestas directas en prosa breve.
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
- ✅ Unicidad estricta de la imagen (SHA-256 + Hash Perceptual dHash y Diferencia de Píxeles contra todas las demás portadas de `public/image/blog/`, bloqueando re-compresiones, recortes o imágenes base repetidas).

Si el validador arroja algún error, DEBE corregirse antes de proceder. Las advertencias no bloquean la publicación pero deben revisarse.

### 🖼️ Verificación visual final en `/blog` (imagen + título + subtítulo)

El validador automatizado solo revisa texto y archivos; NO comprueba cómo se ve la publicación ya renderizada. Antes de dar por terminado un post (nuevo o corregido), se debe abrir la página `/blog` (listado) y `/blog/{slug}` (detalle) en el navegador y confirmar visualmente, para cada idioma relevante, que:

- La **imagen de portada** (`coverImage`) carga correctamente en la tarjeta del listado y en la cabecera del artículo — no solo que el archivo exista en disco.
- El **título** (frontmatter `title`) se muestra en minúscula sostenida ("sentence case"), sin Title Case, según la regla global de mayúsculas de la sección 2.
- Los **subtítulos** (`##`/`###` del cuerpo, incluidos los bloques numerados tipo "1. …") también respetan esa misma regla de mayúsculas — no solo el `title` del frontmatter.
- La **descripción/resumen** (`description`) que aparece bajo el título en la tarjeta del listado es coherente y no está cortada de forma extraña.

Revisar imagen, título y subtítulos como un conjunto (no solo el texto de forma aislada) es lo que confirma que la publicación se ve bien en el resumen del blog, no solo que pasa la validación de archivos.

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
5. **Resumen y fase de ajustes en el content:**
   - Presentar al usuario un resumen detallado de los archivos Markdown generados/editados y de la imagen creada.
   - Permanecer en fase local de iteración y ajustes de contenido hasta que el usuario dé su conformidad y solicite explícitamente subir los cambios.
6. **Flujo de Git & Pull Request (ÚNICAMENTE SI SE SOLICITA LITERALMENTE EN EL CHAT):**
   - **NO** hacer push a `main` a menos que se pida específicamente.
   - **NO** crear PR a menos que se pida literalmente en el chat.
   - Si el usuario pide explícitamente subir o abrir PR:
     - **Actualizar fecha de publicación:** Verificar y actualizar el campo `date` en los 10 archivos `.md` de `content/blog/{slug}/` para que tenga la fecha exacta del día en que se sube/publica (`YYYY-MM-DD`).
     - Crear rama local: `git checkout -b blog/{slug}`
     - Agregar cambios: `git add content/blog/{slug} public/image/blog/{slug}.webp`
     - Realizar commit: `git commit -m "feat(blog): add article {slug} in 10 languages"`
     - Subir rama: `git push -u origin blog/{slug}`
     - Crear PR: `gh pr create --title "📝 Blog: {Título en Español}" --body "..."` (o enlace si `gh` no está disponible).
