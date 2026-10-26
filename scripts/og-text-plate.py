"""Generates the typographic plate assets/og/og-text.png (1200x630, RGBA).

The plate holds the scrim and title text of the social-preview image. It is a
committed design master, rendered once with Georgia to match the site's serif
type — sharp/librsvg cannot render text deterministically across Windows and
Linux (font availability differs), so the build only composites pixels
(see scripts/prepare-og.mjs).

This script is only needed when the OG title text changes. Run it with any
Python that has Pillow:

    python scripts/og-text-plate.py
"""

from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

ROOT = r"E:\MrManny.github.io"
OUT = rf"{ROOT}\assets\og\og-text.png"
W, H = 1200, 630

Path(OUT).parent.mkdir(parents=True, exist_ok=True)
plate = Image.new("RGBA", (W, H), (0, 0, 0, 0))

# Bottom scrim: transparent above ~52% height, near-black at the base, so the
# title stays legible over bright art.
scrim = Image.new("RGBA", (W, H), (12, 12, 16, 0))
alpha = Image.new("L", (W, H), 0)
adraw = ImageDraw.Draw(alpha)
for y in range(H):
    t = max(0.0, (y - H * 0.52) / (H * 0.48))
    adraw.line([(0, y), (W, y)], fill=int(215 * (t ** 1.6)))
scrim.putalpha(alpha)
plate = Image.alpha_composite(plate, scrim)


def load_font(size):
    for name in ("georgiab.ttf", "georgia.ttf", "segoeuib.ttf", "arialbd.ttf"):
        try:
            return ImageFont.truetype(rf"C:\Windows\Fonts\{name}", size)
        except OSError:
            continue
    return ImageFont.load_default()


draw = ImageDraw.Draw(plate)
name_font = load_font(74)
role_font = load_font(36)

name = "Manuel Warum"
role = "AI Software Engineer — AIDLC"
cream = (242, 237, 223)
gold = (201, 188, 155)

x = 64
y_name = H - 172
y_role = H - 84
# Soft drop shadow so the text survives bright art spots.
draw.text((x + 2, y_name + 2), name, font=name_font, fill=(0, 0, 0))
draw.text((x + 2, y_role + 2), role, font=role_font, fill=(0, 0, 0))
draw.text((x, y_name), name, font=name_font, fill=cream)
draw.text((x, y_role), role, font=role_font, fill=gold)

plate.save(OUT, "PNG", optimize=True)
print(f"wrote {OUT}")
