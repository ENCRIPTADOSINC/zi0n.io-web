import os
import math
from PIL import Image, ImageDraw, ImageFilter

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'image', 'blog')
os.makedirs(OUTPUT_DIR, exist_ok=True)

WIDTH = 1280
HEIGHT = 720

# Zi0n Brand Colors
BG_DARK = (7, 28, 89)        # Midnight blue #071C59
BG_DEEP = (4, 14, 46)        # Deep navy #040E2E
ACCENT_BLUE = (0, 63, 255)   # Electric blue #003FFF
ACCENT_CYAN = (58, 166, 255) # Cyan #3AA6FF
ACCENT_MINT = (94, 236, 125) # Mint green #5EEC7D
ACCENT_TEAL = (0, 195, 208)  # Teal #00C3D0

def create_base_gradient(theme_color):
    img = Image.new("RGBA", (WIDTH, HEIGHT), BG_DEEP)
    draw = ImageDraw.Draw(img)
    
    # Linear background gradient
    for y in range(HEIGHT):
        ratio = y / HEIGHT
        r = int(BG_DEEP[0] * (1 - ratio) + BG_DARK[0] * ratio)
        g = int(BG_DEEP[1] * (1 - ratio) + BG_DARK[1] * ratio)
        b = int(BG_DEEP[2] * (1 - ratio) + BG_DARK[2] * ratio)
        draw.line([(0, y), (WIDTH, y)], fill=(r, g, b, 255))
        
    # Glow layer
    glow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    
    cx, cy = WIDTH // 2, HEIGHT // 2
    for radius in range(350, 50, -10):
        alpha = int(25 * (1 - radius / 350))
        glow_draw.ellipse(
            [cx - radius * 1.6, cy - radius, cx + radius * 1.6, cy + radius],
            fill=(theme_color[0], theme_color[1], theme_color[2], alpha)
        )
    
    glow = glow.filter(ImageFilter.GaussianBlur(30))
    img = Image.alpha_composite(img, glow)
    return img

def draw_cyber_grid(draw, theme_color):
    grid_color = (theme_color[0], theme_color[1], theme_color[2], 18)
    for x in range(0, WIDTH, 64):
        draw.line([(x, 0), (x, HEIGHT)], fill=grid_color, width=1)
    for y in range(0, HEIGHT, 64):
        draw.line([(0, y), (WIDTH, y)], fill=grid_color, width=1)

def draw_shield_icon(draw, cx, cy, size, color):
    # Shield points
    w = size
    h = size * 1.25
    points = [
        (cx, cy - h/2),
        (cx + w/2, cy - h/4),
        (cx + w/2, cy + h/6),
        (cx, cy + h/2),
        (cx - w/2, cy + h/6),
        (cx - w/2, cy - h/4),
    ]
    draw.polygon(points, outline=color, width=6)
    # Inner accent
    inner_points = [
        (cx, cy - h/2 + 20),
        (cx + w/2 - 16, cy - h/4 + 14),
        (cx + w/2 - 16, cy + h/6 - 4),
        (cx, cy + h/2 - 20),
        (cx - w/2 + 16, cy + h/6 - 4),
        (cx - w/2 + 16, cy - h/4 + 14),
    ]
    draw.polygon(inner_points, outline=(color[0], color[1], color[2], 120), width=3)

def draw_lock_icon(draw, cx, cy, size, color):
    w, h = size, size * 0.8
    # Shackle
    shackle_r = w * 0.3
    draw.arc([cx - shackle_r, cy - h/2 - shackle_r, cx + shackle_r, cy - h/2 + shackle_r], 180, 0, fill=color, width=6)
    # Body
    draw.rounded_rectangle([cx - w/2, cy - h/4, cx + w/2, cy + h/2], radius=16, outline=color, width=6)
    # Keyhole
    draw.ellipse([cx - 10, cy - 5, cx + 10, cy + 15], fill=color)
    draw.polygon([(cx - 6, cy + 10), (cx + 6, cy + 10), (cx + 10, cy + 32), (cx - 10, cy + 32)], fill=color)

def generate_covers():
    blogs = [
        {
            'slug': 'como-proteger-wallet-cripto-sim-swapping',
            'theme': ACCENT_CYAN,
            'type': 'sim'
        },
        {
            'slug': 'extraccion-forense-movil-cable-wipe-proteccion',
            'theme': ACCENT_BLUE,
            'type': 'cable'
        },
        {
            'slug': 'hot-wallets-seguridad-smartphone-vs-hardware-wallets',
            'theme': ACCENT_MINT,
            'type': 'wallet'
        },
        {
            'slug': 'proteger-crypto-wallet-malware-android-spyware',
            'theme': ACCENT_CYAN,
            'type': 'shield'
        },
        {
            'slug': 'pin-coaccion-duress-pin-seguridad-movil-cripto',
            'theme': ACCENT_BLUE,
            'type': 'pin'
        },
        {
            'slug': 'vpn-descentralizada-rotacion-ip-trading-cripto',
            'theme': ACCENT_TEAL,
            'type': 'network'
        },
        {
            'slug': 'esim-internacional-segura-viajeros-cripto',
            'theme': ACCENT_CYAN,
            'type': 'esim'
        },
        {
            'slug': 'bloqueo-camara-microfono-capturas-anti-espionaje',
            'theme': ACCENT_MINT,
            'type': 'sensor'
        },
        {
            'slug': 'autodestruccion-por-inactividad-sin-senal-auto-wipe',
            'theme': ACCENT_BLUE,
            'type': 'timer'
        },
        {
            'slug': 'como-guardar-seed-phrase-claves-privadas-movil',
            'theme': ACCENT_MINT,
            'type': 'vault'
        }
    ]

    for item in blogs:
        slug = item['slug']
        theme = item['theme']
        btype = item['type']
        
        img = create_base_gradient(theme)
        overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
        draw = ImageDraw.Draw(overlay)
        
        draw_cyber_grid(draw, theme)
        
        cx, cy = WIDTH // 2, HEIGHT // 2
        
        # Draw central motif according to type
        if btype == 'sim':
            # SIM Card outline
            sim_w, sim_h = 220, 300
            sim_points = [
                (cx - sim_w/2, cy - sim_h/2),
                (cx + sim_w/2 - 40, cy - sim_h/2),
                (cx + sim_w/2, cy - sim_h/2 + 40),
                (cx + sim_w/2, cy + sim_h/2),
                (cx - sim_w/2, cy + sim_h/2)
            ]
            draw.polygon(sim_points, outline=theme, width=6)
            # Chip pads
            draw.rectangle([cx - 50, cy - 60, cx + 50, cy + 60], outline=ACCENT_MINT, width=4)
            draw.line([(cx - 50, cy), (cx + 50, cy)], fill=ACCENT_MINT, width=3)
            draw.line([(cx, cy - 60), (cx, cy + 60)], fill=ACCENT_MINT, width=3)
            # Shield overlay
            draw_shield_icon(draw, cx, cy, 140, theme)

        elif btype == 'cable':
            # Cable / USB Data flow
            draw.ellipse([cx - 160, cy - 160, cx + 160, cy + 160], outline=theme, width=5)
            draw.ellipse([cx - 120, cy - 120, cx + 120, cy + 120], outline=ACCENT_CYAN, width=3)
            # Data purge lightning lines
            for angle in range(0, 360, 45):
                rad = math.radians(angle)
                x1 = cx + math.cos(rad) * 170
                y1 = cy + math.sin(rad) * 170
                x2 = cx + math.cos(rad) * 230
                y2 = cy + math.sin(rad) * 230
                draw.line([(x1, y1), (x2, y2)], fill=ACCENT_MINT, width=4)
            draw_shield_icon(draw, cx, cy, 130, theme)

        elif btype == 'wallet':
            # Dual isolation ring + Lock
            draw.ellipse([cx - 180, cy - 180, cx + 180, cy + 180], outline=theme, width=5)
            draw.ellipse([cx - 140, cy - 140, cx + 140, cy + 140], outline=ACCENT_CYAN, width=3)
            draw_lock_icon(draw, cx, cy, 140, ACCENT_MINT)

        elif btype == 'shield':
            # Defense matrix
            for r in [200, 150, 100]:
                draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(theme[0], theme[1], theme[2], 100), width=2)
            draw_shield_icon(draw, cx, cy, 180, theme)
            draw_lock_icon(draw, cx, cy + 10, 80, ACCENT_MINT)

        elif btype == 'pin':
            # Numeric Pin Pad Matrix
            for row in range(3):
                for col in range(3):
                    px = cx - 80 + col * 80
                    py = cy - 80 + row * 80
                    draw.ellipse([px - 22, py - 22, px + 22, py + 22], outline=theme, width=4)
                    draw.ellipse([px - 8, py - 8, px + 8, py + 8], fill=ACCENT_CYAN)
            draw.ellipse([cx - 170, cy - 170, cx + 170, cy + 170], outline=ACCENT_MINT, width=4)

        elif btype == 'network':
            # Decentralized Mesh
            nodes = [
                (cx, cy - 140), (cx + 140, cy - 60), (cx + 100, cy + 120),
                (cx - 100, cy + 120), (cx - 140, cy - 60), (cx, cy)
            ]
            for i in range(len(nodes)):
                for j in range(i + 1, len(nodes)):
                    draw.line([nodes[i], nodes[j]], fill=(theme[0], theme[1], theme[2], 120), width=3)
            for nx, ny in nodes:
                draw.ellipse([nx - 16, ny - 16, nx + 16, ny + 16], fill=ACCENT_DEEP if 'ACCENT_DEEP' in globals() else BG_DEEP, outline=ACCENT_MINT, width=4)
                draw.ellipse([nx - 6, ny - 6, nx + 6, ny + 6], fill=ACCENT_CYAN)

        elif btype == 'esim':
            # Global Globe Constellation
            draw.ellipse([cx - 160, cy - 160, cx + 160, cy + 160], outline=theme, width=5)
            draw.ellipse([cx - 160, cy - 60, cx + 160, cy + 60], outline=(theme[0], theme[1], theme[2], 130), width=3)
            draw.ellipse([cx - 60, cy - 160, cx + 60, cy + 160], outline=(theme[0], theme[1], theme[2], 130), width=3)
            draw_shield_icon(draw, cx, cy, 120, ACCENT_MINT)

        elif btype == 'sensor':
            # Camera Aperture / Privacy Lens
            draw.ellipse([cx - 160, cy - 160, cx + 160, cy + 160], outline=theme, width=6)
            draw.ellipse([cx - 110, cy - 110, cx + 110, cy + 110], outline=ACCENT_MINT, width=4)
            # Crossed privacy diagonal
            draw.line([(cx - 150, cy - 150), (cx + 150, cy + 150)], fill=ACCENT_CYAN, width=8)
            draw_shield_icon(draw, cx, cy, 100, ACCENT_MINT)

        elif btype == 'timer':
            # Countdown Dial / Dead-man switch
            draw.ellipse([cx - 160, cy - 160, cx + 160, cy + 160], outline=theme, width=6)
            draw.arc([cx - 140, cy - 140, cx + 140, cy + 140], 270, 90, fill=ACCENT_MINT, width=8)
            draw.line([(cx, cy), (cx, cy - 100)], fill=ACCENT_CYAN, width=6)
            draw.line([(cx, cy), (cx + 70, cy)], fill=ACCENT_CYAN, width=6)
            draw.ellipse([cx - 14, cy - 14, cx + 14, cy + 14], fill=ACCENT_MINT)

        elif btype == 'vault':
            # Encrypted Key Vault
            draw.rounded_rectangle([cx - 160, cy - 120, cx + 160, cy + 120], radius=24, outline=theme, width=6)
            draw_lock_icon(draw, cx, cy, 130, ACCENT_MINT)
            # Binary streams
            for offset in [-110, 110]:
                draw.line([(cx + offset, cy - 70), (cx + offset, cy + 70)], fill=(ACCENT_CYAN[0], ACCENT_CYAN[1], ACCENT_CYAN[2], 140), width=3)

        # Composite and save as WebP
        final_img = Image.alpha_composite(img, overlay).convert("RGB")
        out_path = os.path.join(OUTPUT_DIR, f"{slug}.webp")
        final_img.save(out_path, "WEBP", quality=92)
        print(f"Generated {out_path} ({os.path.getsize(out_path)} bytes)")

if __name__ == "__main__":
    generate_covers()
