from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
import importlib.util

spec = importlib.util.spec_from_file_location("crf_data", "secure_data/dummy_data.pyc")
crf_data = importlib.util.module_from_spec(spec)
spec.loader.exec_module(crf_data)

# ------------------------------------------------------------------------------
# Configuration Parameter
# ------------------------------------------------------------------------------
# Select the active CRF schema for generating the 20‑page CRF.
#
# Available CRF parameter dictionaries:
#   - CRF_PARAMS_LUNG_CANCER
#   - CRF_PARAMS_COLON_CANCER
#   - CRF_PARAMS_SKIN_CANCER
#   - CRF_PARAMS_CARDIOVASCULAR
#
# Change the value below to switch between different CRF datasets.
# ------------------------------------------------------------------------------
CRF_PARAMS = crf_data.CRF_PARAMS_CARDIOVASCULAR

import os

PAGE_W, PAGE_H = A4
MARGIN_L = 20*mm
MARGIN_R = PAGE_W - 20*mm
MARGIN_T = PAGE_H - 20*mm

C_HEADER_BG = HexColor("#1D3557")
C_BORDER    = HexColor("#90A4AE")
C_LABEL     = HexColor("#263238")


# ---------- DRAWING HELPERS ----------

def box(c, x, y, w, h=6*mm):
    c.setStrokeColor(C_BORDER)
    c.setLineWidth(0.6)
    c.rect(x, y - h, w, h, stroke=1, fill=0)

def checkbox(c, x, y, label_text, checked=False):
    size = 3.5*mm
    c.setStrokeColor(C_BORDER)
    c.rect(x, y - size, size, size, stroke=1, fill=0)
    if checked:
        c.setLineWidth(1)
        c.line(x+1, y-size+1, x+size-1, y-1)
        c.line(x+1, y-1, x+size-1, y-size+1)
    c.setFillColor(C_LABEL)
    c.setFont("Helvetica", 7.5)
    c.drawString(x + size + 1.5*mm, y - size + 1.5*mm, label_text)

def label(c, x, y, text, bold=False, size=8):
    c.setFillColor(C_LABEL)
    c.setFont("Helvetica-Bold" if bold else "Helvetica", size)
    c.drawString(x, y, text)

def header(c, title, page_no, total_pages):
    c.setFillColor(C_HEADER_BG)
    c.rect(0, PAGE_H - 22*mm, PAGE_W, 22*mm, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(MARGIN_L, PAGE_H - 10*mm, title)
    c.setFont("Helvetica", 8)
    # c.drawString(MARGIN_L, PAGE_H - 15*mm, "Protocol: ONC‑2026‑001  |  Dummy Oncology CRF (Rich)")
    c.drawString(MARGIN_L, PAGE_H - 15 * mm, f"Protocol: {CRF_PARAMS["crf_name"]}  | {CRF_PARAMS["study_id"]}|  "
                                             f"Dummy {CRF_PARAMS["crf_name"]} CRF (Rich)")
    c.drawRightString(MARGIN_R, PAGE_H - 15*mm, f"Page {page_no} of {total_pages}")

def frame(c):
    top = MARGIN_T - 25*mm
    bottom = 20*mm
    c.setStrokeColor(C_BORDER)
    c.setLineWidth(0.8)
    c.rect(MARGIN_L, bottom, MARGIN_R - MARGIN_L, top - bottom, stroke=1, fill=0)
    return top

# ---------- PAGE 1: PATIENT IDENTIFICATION & DEMOGRAPHICS ----------
def page1(c, page_no, total_pages):
    header(c, "PATIENT IDENTIFICATION & DEMOGRAPHICS", page_no, total_pages)
    y = frame(c)
    xL = MARGIN_L + 6*mm
    xF = MARGIN_L + 60*mm
    gap = 11*mm

    # Study ID
    label(c, xL, y - 4*mm, "Study ID", bold=True)
    box(c, xF, y - 3*mm, 50*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["study_id"])
    y -= gap

    # Site Number
    label(c, xL, y - 4*mm, "Site Number")
    box(c, xF, y - 3*mm, 30*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["site_number"])
    y -= gap

    # Subject Identifier
    label(c, xL, y - 4*mm, "Subject Identifier")
    box(c, xF, y - 3*mm, 50*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["subject_id"])
    y -= gap

    # Screening Number
    label(c, xL, y - 4*mm, "Screening Number")
    box(c, xF, y - 3*mm, 40*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["screening_number"])
    y -= gap

    # Date of Birth
    label(c, xL, y - 4*mm, "Date of Birth (DD‑MMM‑YYYY)")
    box(c, xF, y - 3*mm, 35*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["dob"])
    y -= gap

    # Sex
    label(c, xL, y - 4*mm, "Sex")
    checkbox(c, xF, y - 1*mm, "Male",   checked=(CRF_PARAMS["sex"] == "Male"))
    checkbox(c, xF+25*mm, y - 1*mm, "Female", checked=(CRF_PARAMS["sex"] == "Female"))
    y -= gap

    # Ethnicity
    label(c, xL, y - 4*mm, "Ethnicity")
    checkbox(c, xF, y - 1*mm, "Hispanic or Latino", checked=(CRF_PARAMS["ethnicity"] == "Hispanic or Latino"))
    checkbox(c, xF+45*mm, y - 1*mm, "Not Hispanic or Latino", checked=(CRF_PARAMS["ethnicity"] == "Not Hispanic or Latino"))
    y -= gap

    # Race
    label(c, xL, y - 4*mm, "Race")
    checkbox(c, xF, y - 1*mm, "White", checked=(CRF_PARAMS["race"] == "White"))
    checkbox(c, xF+30*mm, y - 1*mm, "Black or African American", checked=(CRF_PARAMS["race"] == "Black or African American"))
    checkbox(c, xF, y - 1*mm-8*mm, "Asian", checked=(CRF_PARAMS["race"] == "Asian"))
    checkbox(c, xF+30*mm, y - 1*mm-8*mm, "Other", checked=(CRF_PARAMS["race"] == "Other"))
    y -= gap + 6*mm

    # Height
    label(c, xL, y - 4*mm, "Height (cm)")
    box(c, xF, y - 3*mm, 25*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["height"])
    y -= gap

    # Weight
    label(c, xL, y - 4*mm, "Weight (kg)")
    box(c, xF, y - 3*mm, 25*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["weight"])
    y -= gap

    # BMI
    label(c, xL, y - 4*mm, "BMI (kg/m²)")
    box(c, xF, y - 3*mm, 25*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["bmi"])
    y -= gap

    # Consent Date
    label(c, xL, y - 4*mm, "Date of Informed Consent")
    box(c, xF, y - 3*mm, 35*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["consent_date"])

# ---------- PAGE 2: MEDICAL HISTORY ----------
def page2(c, page_no, total_pages):
    header(c, "MEDICAL HISTORY — GENERAL", page_no, total_pages)
    y = frame(c)
    xL = MARGIN_L + 6*mm
    xF = MARGIN_L + 60*mm
    gap = 10*mm

    def mh_row(condition, start, ongoing, notes):
        nonlocal y
        label(c, xL, y - 4*mm, condition)
        box(c, xF, y - 3*mm, 30*mm)
        label(c, xF+2*mm, y - 7*mm, start)
        checkbox(c, xF+35*mm, y - 1*mm, "Ongoing", checked=ongoing)
        box(c, xF+60*mm, y - 3*mm, 60*mm)
        label(c, xF+62*mm, y - 7*mm, notes)
        y -= gap

    for condition, start, ongoing, notes in CRF_PARAMS["medical_history"]:
        mh_row(condition, start, ongoing, notes)

# ---------- PAGE 3: ONCOLOGY DIAGNOSIS ----------
def page3(c, page_no, total_pages):
    header(c, "ONCOLOGY DIAGNOSIS SUMMARY", page_no, total_pages)
    y = frame(c)
    xL = MARGIN_L + 6*mm
    xF = MARGIN_L + 60*mm
    gap = 11*mm

    label(c, xL, y - 4*mm, "Primary Tumor Site")
    box(c, xF, y - 3*mm, 80*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["primary_site"])
    y -= gap

    label(c, xL, y - 4*mm, "Histology / Histopathology")
    box(c, xF, y - 3*mm, 80*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["histology"])
    y -= gap

    label(c, xL, y - 4*mm, "Date of Initial Cancer Diagnosis")
    box(c, xF, y - 3*mm, 35*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["diagnosis_date"])
    y -= gap

    label(c, xL, y - 4*mm, "TNM Classification at Baseline")
    box(c, xF, y - 3*mm, 40*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["tnm"])
    y -= gap

    label(c, xL, y - 4*mm, "Overall Stage (AJCC)")
    checkbox(c, xF, y - 1*mm, "I",   checked=(CRF_PARAMS["stage"] == "I"))
    checkbox(c, xF+22*mm, y - 1*mm, "II",  checked=(CRF_PARAMS["stage"] == "II"))
    checkbox(c, xF+44*mm, y - 1*mm, "III", checked=("III" in CRF_PARAMS["stage"]))
    checkbox(c, xF+66*mm, y - 1*mm, "IV",  checked=(CRF_PARAMS["stage"] == "IV"))
    y -= gap

    label(c, xL, y - 4*mm, "Metastatic Disease at Baseline")
    checkbox(c, xF, y - 1*mm, "YES", checked=(CRF_PARAMS["metastatic"] == "YES"))
    checkbox(c, xF+25*mm, y - 1*mm, "NO",  checked=(CRF_PARAMS["metastatic"] == "NO"))
    y -= gap

    label(c, xL, y - 4*mm, "Biomarker Status")
    box(c, xF, y - 3*mm, 80*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["biomarkers"])
    y -= gap

    label(c, xL, y - 4*mm, "Ki‑67 Proliferation Index (%)")
    box(c, xF, y - 3*mm, 25*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["ki67"])
    y -= gap

    label(c, xL, y - 4*mm, "BRCA1/2 Germline Mutation Status")
    checkbox(c, xF, y - 1*mm, "Positive", checked=(CRF_PARAMS["brca"] == "Positive"))
    checkbox(c, xF+30*mm, y - 1*mm, "Negative", checked=(CRF_PARAMS["brca"] == "Negative"))
    checkbox(c, xF+60*mm, y - 1*mm, "Unknown", checked=(CRF_PARAMS["brca"] == "Unknown"))

# ---------- PAGE 4: BASELINE TUMOR ASSESSMENT ----------
def page4(c, page_no, total_pages):
    header(c, "BASELINE TUMOR ASSESSMENT — TARGET LESIONS", page_no, total_pages)
    y = frame(c)
    xL = MARGIN_L + 6*mm
    xF = MARGIN_L + 60*mm
    gap = 11*mm

    label(c, xL, y - 4*mm, "Assessment Date")
    box(c, xF, y - 3*mm, 35*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["diagnosis_date"])
    y -= gap

    def tl_row(idx, loc_key, diam_key):
        nonlocal y
        label(c, xL, y - 4*mm, f"Target Lesion {idx} Location")
        box(c, xF, y - 3*mm, 80*mm)
        label(c, xF+2*mm, y - 7*mm, CRF_PARAMS[loc_key])
        y -= gap
        label(c, xL+5*mm, y - 4*mm, "Longest Diameter (mm)")
        box(c, xF, y - 3*mm, 25*mm)
        label(c, xF+2*mm, y - 7*mm, CRF_PARAMS[diam_key])
        y -= gap

    tl_row(1, "tl1_loc", "tl1_diam")
    tl_row(2, "tl2_loc", "tl2_diam")
    tl_row(3, "tl3_loc", "tl3_diam")

    label(c, xL, y - 4*mm, "Imaging Modality")
    box(c, xF, y - 3*mm, 60*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["baseline_imaging"])

# ---------- PAGE 5: NON-TARGET LESIONS ----------
def page5(c, page_no, total_pages):
    header(c, "NON‑TARGET LESIONS & OTHER FINDINGS", page_no, total_pages)
    y = frame(c)
    xL = MARGIN_L + 6*mm
    xF = MARGIN_L + 60*mm
    gap = 11*mm

    def ntl_row(idx, desc_key, status):
        nonlocal y
        label(c, xL, y - 4*mm, f"Non‑Target Lesion {idx}")
        box(c, xF, y - 3*mm, 80*mm)
        label(c, xF+2*mm, y - 7*mm, CRF_PARAMS[desc_key])
        y -= gap
        label(c, xL+5*mm, y - 4*mm, "Status")
        box(c, xF, y - 3*mm, 40*mm)
        label(c, xF+2*mm, y - 7*mm, status)
        y -= gap

    ntl_row(1, "ntl1", "Present")
    ntl_row(2, "ntl2", "Present")
    ntl_row(3, "ntl3", "Absent")

    label(c, xL, y - 4*mm, "Other Radiologic Findings")
    box(c, xF, y - 3*mm, 100*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["other_findings"])

# ---------- PAGE 6: ECOG OVER TIME ----------
def page6(c, page_no, total_pages):
    header(c, "ECOG PERFORMANCE STATUS OVER TIME", page_no, total_pages)
    y = frame(c)
    xL = MARGIN_L + 6*mm
    gap = 12*mm

    visits = [
        "Screening",
        "Cycle 1 Day 1",
        "Cycle 2 Day 1",
        "Cycle 3 Day 1",
        "Cycle 4 Day 1",
    ]

    for visit, score in zip(visits, CRF_PARAMS["ecog"]):
        label(c, xL, y - 4*mm, f"Visit: {visit}")
        xF = MARGIN_L + 60*mm
        for s in ["0", "1", "2", "3", "4"]:
            checkbox(c, xF, y - 1*mm, s, checked=(s == score))
            xF += 18*mm
        y -= gap

# ---------- PAGE 7: VITAL SIGNS ----------
def page7(c, page_no, total_pages):
    header(c, "VITAL SIGNS — BASELINE", page_no, total_pages)
    y = frame(c)
    xL = MARGIN_L + 6*mm
    xF = MARGIN_L + 60*mm
    gap = 11*mm

    def row(label_text, value):
        nonlocal y
        label(c, xL, y - 4*mm, label_text)
        box(c, xF, y - 3*mm, 35*mm)
        label(c, xF+2*mm, y - 7*mm, value)
        y -= gap

    row("Assessment Date", CRF_PARAMS["vital_date"])
    row("Systolic Blood Pressure (mmHg)", CRF_PARAMS["sbp"])
    row("Diastolic Blood Pressure (mmHg)", CRF_PARAMS["dbp"])
    row("Heart Rate (bpm)", CRF_PARAMS["hr"])
    row("Respiratory Rate (breaths/min)", CRF_PARAMS["rr"])
    row("Temperature (°C)", CRF_PARAMS["temp"])

# ---------- PAGE 8: CONCOMITANT MEDICATIONS ----------
def page8(c, page_no, total_pages):
    header(c, "CONCOMITANT MEDICATIONS", page_no, total_pages)
    y = frame(c)
    xL = MARGIN_L + 6*mm
    gap = 10*mm

    for name, indic, start, status in CRF_PARAMS["conmeds"]:
        label(c, xL, y - 4*mm, f"Medication: {name}")
        xF = MARGIN_L + 60*mm
        box(c, xF, y - 3*mm, 60*mm)
        label(c, xF+2*mm, y - 7*mm, indic)
        y -= gap

        label(c, xL+5*mm, y - 4*mm, "Start Date")
        box(c, xF, y - 3*mm, 35*mm)
        label(c, xF+2*mm, y - 7*mm, start)

        label(c, xL+80*mm, y - 4*mm, "Status")
        box(c, xL+100*mm, y - 3*mm, 30*mm)
        label(c, xL+102*mm, y - 7*mm, status)
        y -= gap

# ---------- PAGE 9: PRIOR CANCER TREATMENTS ----------
def page9(c, page_no, total_pages):
    header(c, "PRIOR CANCER TREATMENTS", page_no, total_pages)
    y = frame(c)
    xL = MARGIN_L + 6*mm
    xF = MARGIN_L + 60*mm
    gap = 11*mm

    label(c, xL, y - 4*mm, "Prior Surgery for Primary Tumor")
    checkbox(c, xF, y - 1*mm, "YES", checked=False)
    checkbox(c, xF+25*mm, y - 1*mm, "NO", checked=True)
    y -= gap

    label(c, xL+5*mm, y - 4*mm, "Type of Surgery")
    box(c, xF, y - 3*mm, 80*mm)
    label(c, xF+2*mm, y - 7*mm, "None")
    y -= gap

    label(c, xL, y - 4*mm, "Prior Radiation Therapy")
    checkbox(c, xF, y - 1*mm, "YES", checked=False)
    checkbox(c, xF+25*mm, y - 1*mm, "NO", checked=True)
    y -= gap

    label(c, xL, y - 4*mm, "Prior Systemic Therapy (Chemo/Hormonal)")
    checkbox(c, xF, y - 1*mm, "YES", checked=False)
    checkbox(c, xF+25*mm, y - 1*mm, "NO", checked=True)
    y -= gap

    label(c, xL, y - 4*mm, "Other Prior Cancer Treatments")
    box(c, xF, y - 3*mm, 100*mm)
    label(c, xF+2*mm, y - 7*mm, "None")

# ---------- PAGE 10: TREATMENT REGIMEN ----------
def page10(c, page_no, total_pages):
    header(c, "TREATMENT REGIMEN (STUDY DRUG)", page_no, total_pages)
    y = frame(c)
    xL = MARGIN_L + 6*mm
    xF = MARGIN_L + 60*mm
    gap = 11*mm

    def row(label_text, value, width=60*mm):
        nonlocal y
        label(c, xL, y - 4*mm, label_text)
        box(c, xF, y - 3*mm, width)
        label(c, xF+2*mm, y - 7*mm, value)
        y -= gap

    row("Randomization Arm", CRF_PARAMS["arm"])
    row("Planned Regimen", CRF_PARAMS["regimen"], width=100*mm)
    row("Cycle Length (days)", CRF_PARAMS["cycle_length"], width=25*mm)
    row("Planned Number of Cycles", CRF_PARAMS["planned_cycles"], width=40*mm)
    row("Start Date of Study Treatment", CRF_PARAMS["treatment_start"], width=35*mm)
    row("Planned End of Treatment Date", CRF_PARAMS["treatment_end"], width=35*mm)

# ---------- PAGE 11: CYCLE 1 DAY 1 ----------
def page11(c, page_no, total_pages):
    header(c, "CYCLE 1 DAY 1 — ADMINISTRATION", page_no, total_pages)
    y = frame(c)
    xL = MARGIN_L+6*mm
    xF = MARGIN_L+60*mm
    g = 11*mm

    def row(label_text, value, width=35*mm):
        nonlocal y
        label(c, xL, y-4*mm, label_text)
        box(c, xF, y-3*mm, width)
        label(c, xF+2*mm, y-7*mm, value)
        y -= g

    row("Visit Date", CRF_PARAMS["cycle1_date"])
    row("Pembrolizumab Dose (mg)", "200")
    row("Carboplatin Dose (AUC)", "5")
    row("Pemetrexed Dose (mg/m²)", "500")
    row("Route of Administration", "IV infusion", width=40*mm)
    row("Premedications", "Folic acid, dexamethasone", width=100*mm)

# ---------- PAGE 12: CYCLE 2 DAY 1 ----------
def page12(c, page_no, total_pages):
    header(c, "CYCLE 2 DAY 1 — ADMINISTRATION", page_no, total_pages)
    y = frame(c)
    xL = MARGIN_L+6*mm
    xF = MARGIN_L+60*mm
    g = 11*mm

    def row(label_text, value, width=35*mm):
        nonlocal y
        label(c, xL, y-4*mm, label_text)
        box(c, xF, y-3*mm, width)
        label(c, xF+2*mm, y-7*mm, value)
        y -= g

    row("Visit Date", CRF_PARAMS["cycle2_date"])
    row("Pembrolizumab Dose (mg)", "200")
    row("Carboplatin Dose (AUC)", "5")
    row("Pemetrexed Dose (mg/m²)", "500")
    row("Dose Modifications", "None", width=100*mm)

# ---------- PAGE 13: CYCLE 3 DAY 1 ----------
def page13(c, page_no, total_pages):
    header(c, "CYCLE 3 DAY 1 — ADMINISTRATION", page_no, total_pages)
    y = frame(c)
    xL = MARGIN_L+6*mm
    xF = MARGIN_L+60*mm
    g = 11*mm

    def row(label_text, value, width=35*mm):
        nonlocal y
        label(c, xL, y-4*mm, label_text)
        box(c, xF, y-3*mm, width)
        label(c, xF+2*mm, y-7*mm, value)
        y -= g

    row("Visit Date", CRF_PARAMS["cycle3_date"])
    row("Pembrolizumab Dose (mg)", "200")
    row("Carboplatin Dose (AUC)", "5")
    row("Pemetrexed Dose (mg/m²)", "500")
    row("Premedications", "Steroids, H1/H2 blockers", width=100*mm)

# ---------- PAGE 14: ADVERSE EVENTS — PAGE 1 ----------
def page14(c, page_no, total_pages):
    header(c, "ADVERSE EVENTS — PAGE 1", page_no, total_pages)
    y = frame(c)
    xL = MARGIN_L+6*mm
    xF = MARGIN_L+60*mm
    g = 10*mm

    def ae_row(term, start, end, sev, rel, outcome):
        nonlocal y
        label(c, xL, y-4*mm, f"AE Term: {term}")
        box(c, xF, y-3*mm, 60*mm)
        label(c, xF+2*mm, y-7*mm, term)
        y -= g

        label(c, xL+5*mm, y-4*mm, "Start Date")
        box(c, xF, y-3*mm, 35*mm)
        label(c, xF+2*mm, y-7*mm, start)

        label(c, xL+80*mm, y-4*mm, "End Date")
        box(c, xL+100*mm, y-3*mm, 35*mm)
        label(c, xL+102*mm, y-7*mm, end)
        y -= g

        label(c, xL+5*mm, y-4*mm, "Severity")
        box(c, xF, y-3*mm, 35*mm)
        label(c, xF+2*mm, y-7*mm, sev)

        label(c, xL+80*mm, y-4*mm, "Relationship")
        box(c, xL+100*mm, y-3*mm, 35*mm)
        label(c, xL+102*mm, y-7*mm, rel)
        y -= g

        label(c, xL+5*mm, y-4*mm, "Outcome")
        box(c, xF, y-3*mm, 60*mm)
        label(c, xF+2*mm, y-7*mm, outcome)
        y -= g

    for ae in CRF_PARAMS["aes_page1"]:
        ae_row(*ae)

# ---------- PAGE 15: ADVERSE EVENTS — PAGE 2 ----------
def page15(c, page_no, total_pages):
    header(c, "ADVERSE EVENTS — PAGE 2", page_no, total_pages)
    y = frame(c)
    xL = MARGIN_L+6*mm
    xF = MARGIN_L+60*mm
    g = 10*mm

    def ae_row(term, start, end, sev, rel, outcome):
        nonlocal y
        label(c, xL, y-4*mm, f"AE Term: {term}")
        box(c, xF, y-3*mm, 60*mm)
        label(c, xF+2*mm, y-7*mm, term)
        y -= g

        label(c, xL+5*mm, y-4*mm, "Start Date")
        box(c, xF, y-3*mm, 35*mm)
        label(c, xF+2*mm, y-7*mm, start)

        label(c, xL+80*mm, y-4*mm, "End Date")
        box(c, xL+100*mm, y-3*mm, 35*mm)
        label(c, xL+102*mm, y-7*mm, end)
        y -= g

        label(c, xL+5*mm, y-4*mm, "Severity")
        box(c, xF, y-3*mm, 35*mm)
        label(c, xF+2*mm, y-7*mm, sev)

        label(c, xL+80*mm, y-4*mm, "Relationship")
        box(c, xL+100*mm, y-3*mm, 35*mm)
        label(c, xL+102*mm, y-7*mm, rel)
        y -= g

        label(c, xL+5*mm, y-4*mm, "Outcome")
        box(c, xF, y-3*mm, 60*mm)
        label(c, xF+2*mm, y-7*mm, outcome)
        y -= g

    for ae in CRF_PARAMS["aes_page2"]:
        ae_row(*ae)

# ---------- PAGE 16: LABORATORY RESULTS — HEMATOLOGY ----------
def page16(c, page_no, total_pages):
    header(c, "LABORATORY RESULTS — HEMATOLOGY", page_no, total_pages)
    y = frame(c)
    xL = MARGIN_L+6*mm
    xF = MARGIN_L+70*mm
    g = 9*mm

    for name, val, unit, flag in CRF_PARAMS["hematology"]:
        label(c, xL, y-4*mm, name)
        box(c, xF, y-3*mm, 25*mm)
        label(c, xF+2*mm, y-7*mm, val)
        box(c, xF+30*mm, y-3*mm, 20*mm)
        label(c, xF+32*mm, y-7*mm, unit)
        box(c, xF+55*mm, y-3*mm, 20*mm)
        label(c, xF+57*mm, y-7*mm, flag)
        y -= g

# ---------- PAGE 17: LABORATORY RESULTS — CHEMISTRY ----------
def page17(c, page_no, total_pages):
    header(c, "LABORATORY RESULTS — CHEMISTRY", page_no, total_pages)
    y = frame(c)
    xL = MARGIN_L+6*mm
    xF = MARGIN_L+70*mm
    g = 9*mm

    for name, val, unit, flag in CRF_PARAMS["chemistry"]:
        label(c, xL, y-4*mm, name)
        box(c, xF, y-3*mm, 25*mm)
        label(c, xF+2*mm, y-7*mm, val)
        box(c, xF+30*mm, y-3*mm, 20*mm)
        label(c, xF+32*mm, y-7*mm, unit)
        box(c, xF+55*mm, y-3*mm, 20*mm)
        label(c, xF+57*mm, y-7*mm, flag)
        y -= g

# ---------- PAGE 18: IMAGING RESULTS ----------
def page18(c, page_no, total_pages):
    header(c, "IMAGING RESULTS", page_no, total_pages)
    y = frame(c)
    xL = MARGIN_L+6*mm
    xF = MARGIN_L+60*mm
    g = 11*mm

    for modality, date, result in CRF_PARAMS["imaging"]:
        label(c, xL, y-4*mm, f"{modality} Date")
        box(c, xF, y-3*mm, 35*mm)
        label(c, xF+2*mm, y-7*mm, date)
        y -= g
        label(c, xL+5*mm, y-4*mm, "Result")
        box(c, xF, y-3*mm, 100*mm)
        label(c, xF+2*mm, y-7*mm, result)
        y -= g

# ---------- PAGE 19: RECIST RESPONSE ASSESSMENT ----------
def page19(c, page_no, total_pages):
    header(c, "RECIST RESPONSE ASSESSMENT", page_no, total_pages)
    y = frame(c)
    xL = MARGIN_L+6*mm
    xF = MARGIN_L+60*mm
    g = 11*mm

    for visit, resp in CRF_PARAMS["recist"]:
        label(c, xL, y-4*mm, f"Visit: {visit}")
        box(c, xF, y-3*mm, 80*mm)
        label(c, xF+2*mm, y-7*mm, resp)
        y -= g

    label(c, xL, y-4*mm, "Best Overall Response")
    box(c, xF, y-3*mm, 60*mm)
    label(c, xF+2*mm, y-7*mm, CRF_PARAMS["best_response"])

# ---------- PAGE 20: SURVIVAL FOLLOW‑UP & SIGNATURES ----------
def page20(c, page_no, total_pages):
    header(c, "SURVIVAL FOLLOW‑UP & SIGNATURES", page_no, total_pages)
    y = frame(c)
    xL = MARGIN_L+6*mm
    xF = MARGIN_L+60*mm
    g = 11*mm

    def row(label_text, value, width=35*mm):
        nonlocal y
        label(c, xL, y-4*mm, label_text)
        box(c, xF, y-3*mm, width)
        label(c, xF+2*mm, y-7*mm, value)
        y -= g

    row("Last Known Alive Date", CRF_PARAMS["last_alive"])

    label(c, xL, y-4*mm, "Disease Progression")
    checkbox(c, xF, y-1*mm, "YES", checked=(CRF_PARAMS["progression"] == "YES"))
    checkbox(c, xF+25*mm, y-1*mm, "NO", checked=(CRF_PARAMS["progression"] == "NO"))
    y -= g

    label(c, xL, y-4*mm, "Survival Status")
    checkbox(c, xF, y-1*mm, "Alive", checked=(CRF_PARAMS["survival_status"] == "Alive"))
    checkbox(c, xF+25*mm, y-1*mm, "Dead", checked=(CRF_PARAMS["survival_status"] == "Dead"))
    y -= g

    row("Investigator Name", CRF_PARAMS["investigator"], width=80*mm)
    row("Investigator Signature", "", width=80*mm)
    row("Signature Date", CRF_PARAMS["signature_date"])

# ---------- MAIN GENERATOR ----------
def generate_oncology_crf_20pages(output="Oncology_CRF_20pages.pdf"):
    base_path = "CRF"  # relative folder
    os.makedirs(base_path, exist_ok=True)
    output = os.path.join(base_path, CRF_PARAMS["crf_name"] + ".pdf")
    total_pages = 20
    c = canvas.Canvas(output, pagesize=A4)

    pages = [
        page1, page2, page3, page4, page5,
        page6, page7, page8, page9, page10,
        page11, page12, page13, page14, page15,
        page16, page17, page18, page19, page20,
    ]

    for i, fn in enumerate(pages, start=1):
        fn(c, i, total_pages)
        c.showPage()

    c.save()
    print("Generated:", output)

if __name__ == "__main__":
    generate_oncology_crf_20pages()
