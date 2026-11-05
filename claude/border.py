# -*- coding: utf-8 -*-
"""Sinh khung hoa van SVG cho hoa don KTECH."""
import math

def khung(W, H, m=9.0, band=13.0, col="#2E74B5"):
    o, i = m, m + band
    mid = m + band / 2.0
    amp, lam = band / 2.0 - 1.6, 15.0

    def song_ngang(y, x1, x2):
        p, x, n = [], x1, 0
        p.append(f"M {x1:.1f} {y:.1f}")
        while x < x2:
            x2n = min(x + lam, x2)
            d = amp if n % 2 == 0 else -amp
            p.append(f"Q {(x + x2n)/2:.1f} {y + d:.1f} {x2n:.1f} {y:.1f}")
            x = x2n; n += 1
        return " ".join(p)

    def song_doc(x, y1, y2):
        p, y, n = [], y1, 0
        p.append(f"M {x:.1f} {y1:.1f}")
        while y < y2:
            y2n = min(y + lam, y2)
            d = amp if n % 2 == 0 else -amp
            p.append(f"Q {x + d:.1f} {(y + y2n)/2:.1f} {x:.1f} {y2n:.1f}")
            y = y2n; n += 1
        return " ".join(p)

    paths = [song_ngang(mid, i, W - i), song_ngang(H - mid, i, W - i),
             song_doc(mid, i, H - i), song_doc(W - mid, i, H - i)]
    wave = "".join(f'<path d="{d}" fill="none" stroke="{col}" stroke-width="0.9"/>' for d in paths)

    goc = ""
    for cx, cy in [(mid, mid), (W - mid, mid), (mid, H - mid), (W - mid, H - mid)]:
        r = band / 2.0 - 0.8
        goc += (f'<path d="M {cx:.1f} {cy-r:.1f} L {cx+r:.1f} {cy:.1f} L {cx:.1f} {cy+r:.1f} '
                f'L {cx-r:.1f} {cy:.1f} Z" fill="none" stroke="{col}" stroke-width="0.9"/>'
                f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="1.5" fill="{col}"/>')

    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">'
            f'<rect x="{o}" y="{o}" width="{W-2*o}" height="{H-2*o}" fill="none" stroke="{col}" stroke-width="1.6"/>'
            f'<rect x="{i}" y="{i}" width="{W-2*i}" height="{H-2*i}" fill="none" stroke="{col}" stroke-width="0.8"/>'
            f'{wave}{goc}</svg>')
