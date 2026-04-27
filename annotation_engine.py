# ==============================================================================
# MODULE 1 — GLOBAL CONSTANTS + CDISC OPTION‑A ANNOTATION ENGINE
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
    # SDTM variable names (e.g., STUDYID, SUBJID, BRTHDTC)
    "sdtm_var":      HexColor("#C8E6C9"),  # pastel green

    # Value‑level metadata (e.g., SEX = "Male", VSTESTCD = "SYSBP")
    "value_level":   HexColor("#FFF9C4"),  # pastel yellow

    # Controlled terminology notes (e.g., ISO8601, CDISC CT)
    "ct":            HexColor("#F8BBD0"),  # pastel pink

    # Derived variables (e.g., BMI, AGE)
    "derived":       HexColor("#BBDEFB"),  # pastel blue

    # Not submitted / local fields
    "not_submitted": HexColor("#CFD8DC"),  # light gray

    # Domain‑level tags (e.g., DM, AE, VS, LB)
    "domain":        HexColor("#D1C4E9"),  # soft purple
}

ANN_TEXT_COLOR   = HexColor("#263238")   # dark text
ANN_ARROW_COLOR  = HexColor("#455A64")   # arrow + outline
ANN_BOX_COLOR    = HexColor("#607D8B")   # bounding box
ANN_BORDER_WIDTH = 0.5
ANN_LABEL_FONT   = "Helvetica-Bold"
ANN_LABEL_SIZE   = 6

# ------------------------------------------------------------------------------
# Low‑level annotation primitives
# ------------------------------------------------------------------------------

def ann_label(c, x, y, text, kind="sdtm_var", padding_x=1.5*mm, padding_y=0.8*mm):
    """
    Draw a small CDISC‑style annotation label box at (x, y) (top‑left anchor).

    kind ∈ {"sdtm_var", "value_level", "ct", "derived", "not_submitted", "domain"}
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


def ann_arrow(c, x1, y1, x2, y2):
    """
    Draw a simple arrow from (x1, y1) → (x2, y2).
    (x1, y1) is typically the label edge; (x2, y2) is the field box edge.
    """
    if not ANNOTATED:
        return

    c.setStrokeColor(ANN_ARROW_COLOR)
    c.setLineWidth(0.6)
    c.line(x1, y1, x2, y2)

    # Simple arrow head
    dx = x2 - x1
    dy = y2 - y1
    length = max((dx**2 + dy**2) ** 0.5, 0.01)
    ux, uy = dx / length, dy / length

    # Perpendicular vector for arrow head
    px, py = -uy, ux
    size = 2.0  # points

    xh1 = x2 - ux * size + px * size
    yh1 = y2 - uy * size + py * size
    xh2 = x2 - ux * size - px * size
    yh2 = y2 - uy * size - py * size

    c.line(x2, y2, xh1, yh1)
    c.line(x2, y2, xh2, yh2)


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
# Convenience helpers for field annotation
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
    arrow_to="center",
):
    """
    High‑level helper to annotate a single field:

    - Draws a label near the field
    - Draws an arrow from label to field
    - Draws a bounding box around the field (for SDTM/derived/etc.)

    Parameters
    ----------
    c : canvas
        ReportLab canvas.
    box_x, box_y : float
        Top‑left corner of the field box (same coordinates used for your 'box' helper).
    box_w, box_h : float
        Width and height of the field box.
    label_text : str
        Annotation text (e.g., "STUDYID", "BRTHDTC", "AESEV").
    kind : str
        One of {"sdtm_var", "value_level", "ct", "derived", "not_submitted", "domain"}.
    label_dx, label_dy : float
        Offset of the label relative to the field box (from top‑right or top‑left, depending on usage).
    arrow_to : str
        Where the arrow should point on the field box:
        - "center"  → center of the box
        - "top"     → middle of top edge
        - "bottom"  → middle of bottom edge
        - "left"    → middle of left edge
        - "right"   → middle of right edge
    """
    if not ANNOTATED:
        return

    # Place label near the top‑right corner by default
    label_x = box_x + box_w + label_dx
    label_y = box_y + label_dy

    ann_label(c, label_x, label_y, label_text, kind=kind)

    # Compute arrow target on the field box
    if arrow_to == "center":
        target_x = box_x + box_w / 2.0
        target_y = box_y - box_h / 2.0
    elif arrow_to == "top":
        target_x = box_x + box_w / 2.0
        target_y = box_y
    elif arrow_to == "bottom":
        target_x = box_x + box_w / 2.0
        target_y = box_y - box_h
    elif arrow_to == "left":
        target_x = box_x
        target_y = box_y - box_h / 2.0
    elif arrow_to == "right":
        target_x = box_x + box_w
        target_y = box_y - box_h / 2.0
    else:
        target_x = box_x + box_w / 2.0
        target_y = box_y - box_h / 2.0

    # Arrow from label edge to field
    arrow_start_x = label_x
    arrow_start_y = label_y - 2.0  # small vertical adjustment
    ann_arrow(c, arrow_start_x, arrow_start_y, target_x, target_y)

    # Bounding box (for SDTM / derived / etc.)
    if kind in {"sdtm_var", "derived", "value_level", "ct"}:
        ann_box(c, box_x, box_y, box_w, box_h)


def annotate_domain_tag(c, domain, x, y):
    """
    Draw a domain‑level tag (e.g., "DM", "AE", "VS") at the top of the page
    or near a section, using the 'domain' color style.
    """
    if not ANNOTATED:
        return
    ann_label(c, x, y, domain, kind="domain")

def domain_legend(c, x, y, domain, description):
    """
    Small CDISC-style legend box: e.g. DM = Demographics
    Slightly bigger, bold domain letters.
    """
    text = f"{domain} = {description}"
    font_name = "Helvetica-Bold"
    font_size = 11  # bigger and bold
    padding_x = 1.5*mm
    padding_y = 1.0*mm

    c.setFont(font_name, font_size)
    text_width = c.stringWidth(text, font_name, font_size)

    box_w = text_width + 2*padding_x
    box_h = font_size*0.35*mm + 2*padding_y  # approx height

    # Background box (light blue, similar to your style)
    c.setFillColor(HexColor("#BBDEFB"))
    c.setStrokeColor(HexColor("#64B5F6"))
    c.rect(x, y - box_h, box_w, box_h, fill=1, stroke=1)

    # Text (dark)
    c.setFillColor(HexColor("#0D47A1"))
    c.drawString(x + padding_x, y - box_h + padding_y, text)

