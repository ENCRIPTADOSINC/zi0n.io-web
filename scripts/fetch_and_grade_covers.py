import os
import io
import sys
import urllib.request
from PIL import Image, ImageEnhance, ImageFilter, ImageDraw

if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'image', 'blog')
os.makedirs(OUTPUT_DIR, exist_ok=True)

TARGET_W = 1920
TARGET_H = 1080

# 10 Curated Hyper-Realistic Photography Assets
COVERS = [
    {
        'slug': 'como-proteger-wallet-cripto-sim-swapping',
        'url': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&q=90',
        'contrast': 1.15,
        'brightness': 0.95
    },
    {
        'slug': 'extraccion-forense-movil-cable-wipe-proteccion',
        'url': 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=1600&q=90',
        'contrast': 1.18,
        'brightness': 0.92
    },
    {
        'slug': 'hot-wallets-seguridad-smartphone-vs-hardware-wallets',
        'url': 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=1600&q=90',
        'contrast': 1.15,
        'brightness': 0.94
    },
    {
        'slug': 'proteger-crypto-wallet-malware-android-spyware',
        'url': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=90',
        'contrast': 1.2,
        'brightness': 0.90
    },
    {
        'slug': 'pin-coaccion-duress-pin-seguridad-movil-cripto',
        'url': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1600&q=90',
        'contrast': 1.15,
        'brightness': 0.95
    },
    {
        'slug': 'vpn-descentralizada-rotacion-ip-trading-cripto',
        'url': 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1600&q=90',
        'contrast': 1.18,
        'brightness': 0.92
    },
    {
        'slug': 'esim-internacional-segura-viajeros-cripto',
        'url': 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=1600&q=90',
        'contrast': 1.15,
        'brightness': 0.96
    },
    {
        'slug': 'bloqueo-camara-microfono-capturas-anti-espionaje',
        'url': 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=1600&q=90',
        'contrast': 1.2,
        'brightness': 0.92
    },
    {
        'slug': 'autodestruccion-por-inactividad-sin-senal-auto-wipe',
        'url': 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=1600&q=90',
        'contrast': 1.18,
        'brightness': 0.90
    },
    {
        'slug': 'como-guardar-seed-phrase-claves-privadas-movil',
        'url': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&q=90',
        'contrast': 1.2,
        'brightness': 0.92
    }
]

def process_and_save(cover_info):
    slug = cover_info['slug']
    url = cover_info['url']
    
    print(f"Downloading photo for {slug}...")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=20) as resp:
        img_bytes = resp.read()
    
    raw_img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
    
    # 1. Exact 16:9 crop & resize (1280x720)
    w, h = raw_img.size
    target_ratio = TARGET_W / TARGET_H
    current_ratio = w / h
    
    if current_ratio > target_ratio:
        new_w = int(h * target_ratio)
        offset = (w - new_w) // 2
        crop_box = (offset, 0, offset + new_w, h)
    else:
        new_h = int(w / target_ratio)
        offset = (h - new_h) // 2
        crop_box = (0, offset, w, offset + new_h)
        
    cropped = raw_img.crop(crop_box).resize((TARGET_W, TARGET_H), Image.Resampling.LANCZOS)
    
    # 2. Subtle, natural color grading
    enh_contrast = ImageEnhance.Contrast(cropped)
    contrasted = enh_contrast.enhance(cover_info['contrast'])
    enh_brightness = ImageEnhance.Brightness(contrasted)
    graded = enh_brightness.enhance(cover_info['brightness'])
    
    # Filtro azul tenue (solo un leve tinte frío del 6% para preservar colores y piel naturales)
    subtle_blue_tint = Image.new("RGB", (TARGET_W, TARGET_H), (0, 45, 140))
    blended = Image.blend(graded, subtle_blue_tint, alpha=0.06)
    
    # 3. Gradiente de sombra oscura ubicado al lado izquierdo
    # Creamos una máscara donde el lado izquierdo (x=0 a x=600) se oscurece hacia el azul noche profundo
    shadow_mask = Image.new("L", (TARGET_W, TARGET_H), 255)
    mask_draw = ImageDraw.Draw(shadow_mask)
    
    # Gradiente suave con el núcleo oscuro en la esquina superior izquierda (top-left)
    dark_center_x = int(TARGET_W * 0.18)
    dark_center_y = int(TARGET_H * 0.16)
    
    for r in range(1100, 0, -20):
        # 0 = totalmente oscuro (dark_frame), 255 = foto original
        factor = r / 1100.0
        alpha = int(255 * (factor ** 1.35))
        mask_draw.ellipse(
            [dark_center_x - r * 1.3, dark_center_y - r * 1.1, dark_center_x + r * 1.3, dark_center_y + r * 1.1],
            fill=alpha
        )
        
    shadow_mask = shadow_mask.filter(ImageFilter.GaussianBlur(40))
    
    # Capa oscura profunda de fondo (Zi0n midnight blue / navy)
    dark_frame = Image.new("RGB", (TARGET_W, TARGET_H), (4, 14, 46))
    final = Image.composite(blended, dark_frame, shadow_mask)
    
    # 4. Save as high-quality WebP
    out_path = os.path.join(OUTPUT_DIR, f"{slug}.webp")
    final.save(out_path, "WEBP", quality=93)
    size_kb = os.path.getsize(out_path) / 1024
    print(f"✅ Guardada portada hiperrealista (sombra superior-izquierda): {slug}.webp ({size_kb:.1f} KB)")

def main():
    for item in COVERS:
        process_and_save(item)
    print("\n🎉 Todas las 10 portadas fueron actualizadas con el nuevo estilo.")

if __name__ == '__main__':
    main()
