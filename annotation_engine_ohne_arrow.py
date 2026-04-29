# ==============================================================================
# MODULE 1 — GLOBAL CONSTANTS + CDISC OPTION‑A ANNOTATION ENGINE (NO ARROWS)
# ==============================================================================

from reportlab.lib.colors import HexColor, white
from reportlab.lib.units import mm

# ------------------------------------------------------------------------------
# Global toggle
# ------------------------------------------------------------------------------
ANNOTATED = True  # Set to False for clean CRF (no annotations)

# ------------------------------------------------------------------------------
# CDISC Option‑A Color Palette (Sample aCRF style)
# ------------------------------------------------------------------------------

ANN_COLORS = {
    "sdtm_var":      HexColor("#C8E6C9"),  # pastel green
    "value_level":   HexColor("#FFF9C4"),  # pastel yellow
    "ct":            HexColor("#F8BBD0"),  # pastel pink
    "derived":       HexColor("#BBDEFB"),  # pastel blue
    "not_submitted": HexColor("#CFD8DC"),  # light gray
    "domain":        HexColor("#D1C4E9"),  # soft purple
}

ANN_TEXT_COLOR   = HexColor("#263238")   # dark text
ANN_BOX_COLOR    = HexColor("#607D8B")   # bounding box
ANN_BORDER_WIDTH = 0.5
ANN_LABEL_FONT   = "Helvetica-Bold"
ANN_LABEL_SIZE   = 6

# ------------------------------------------------------------------------------
# Low‑level annotation primitives
# ------------------------------------------------------------------------------

def ann_label(c, x, y, text, kind="sdtm_var",
              padding_x=1.5*mm, padding_y=0.8*mm):
    """
    Draw a small CDISC‑style annotation label box at (x, y) (top‑left anchor).
    """
    if not ANNOTATED:
        return

    bg = ANN_COLORS.get(kind, ANN_COLORS["sdtm_var"])
    c.setFont(ANN_LABEL_FONT, ANN_LABEL_SIZE)
    text_width = c.stringWidth(text, ANN_LABEL_FONT, ANN_LABEL_SIZE)

    w = text_width + 2 * padding_x
    h = 4.0 * mm

    # Background
    c.setFillColor(bg)
    c.setStrokeColor(bg)
    c.rect(x, y - h, w, h, fill=1, stroke=0)

    # Text
    c.setFillColor(ANN_TEXT_COLOR)
    c.drawString(x + padding_x, y - h + padding_y, text)


def ann_box(c, x, y, w, h):
    """
    Draw a thin bounding box around a field.
    (x, y) is top‑left; h is positive height.
    """
    if not ANNOTATED:
        return

    c.setStrokeColor(ANN_BOX_COLOR)
    c.setLineWidth(ANN_BORDER_WIDTH)
    c.rect(x, y - h, w, h, stroke=1, fill=0)

# ------------------------------------------------------------------------------
# Convenience helpers for field annotation (NO ARROWS)
# ------------------------------------------------------------------------------

def annotate_field(
    c,
    box_x,
    box_y,
    box_w,
    box_h,
    label_text,
    kind="sdtm_var",
    label_dx=3*mm,
    label_dy=2*mm,
):
    """
    High‑level helper to annotate a single field:

    - Draws a label near the field
    - Draws a bounding box around the field (for SDTM/derived/etc.)
    - NO ARROWS (modern CDISC style)
    """
    if not ANNOTATED:
        return

    # Place label near the top‑right corner by default
    label_x = box_x + box_w + label_dx
    label_y = box_y + label_dy

    # Label
    ann_label(c, label_x, label_y, label_text, kind=kind)

    # Bounding box (optional but recommended)
    if kind in {"sdtm_var", "derived", "value_level", "ct"}:
        ann_box(c, box_x, box_y, box_w, box_h)


def annotate_domain_tag(c, domain, x, y):
    """
    Draw a domain‑level tag (e.g., "DM", "AE", "VS") using the 'domain' color.
    """
    if not ANNOTATED:
        return
    ann_label(c, x, y, domain, kind="domain")


def domain_legend(c, x, y, domain, description):
    """
    Small CDISC-style legend box: e.g. DM = Demographics
    Bigger, bold domain letters.
    """
    text = f"{domain} = {description}"
    font_name = "Helvetica-Bold"
    font_size = 11
    padding_x = 1.5*mm
    padding_y = 1.0*mm

    c.setFont(font_name, font_size)
    text_width = c.stringWidth(text, font_name, font_size)

    box_w = text_width + 2*padding_x
    box_h = font_size*0.35*mm + 2*padding_y

    # Background box
    c.setFillColor(HexColor("#BBDEFB"))
    c.setStrokeColor(HexColor("#64B5F6"))
    c.rect(x, y - box_h, box_w, box_h, fill=1, stroke=1)

    # Text
    c.setFillColor(HexColor("#0D47A1"))
    c.drawString(x + padding_x, y - box_h + padding_y, text)
