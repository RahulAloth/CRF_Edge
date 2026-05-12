from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
import importlib.util
from annotation_engine import annotate_field, domain_legend # and ANN_COLORS, etc.
# from annotation_engine_ohne_arrow import annotate_field, domain_legend # and ANN_COLORS, etc.

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

CRF_PARAMS = crf_data.CRF_PARAMS_LUNG_CANCER

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
    # Domain legend just below header
    legend_y = PAGE_H - 22*mm - 2*mm
    domain_legend(c, MARGIN_L + 2*mm, legend_y, "DM", "Demographics")

    y = frame(c)
    xL = MARGIN_L + 6*mm
    xF = MARGIN_L + 60*mm
    gap = 11*mm

    # Study ID
    label(c, xL, y - 4*mm, "Study ID", bold=True)
    box(c, xF, y - 3*mm, 50*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["study_id"])
    annotate_field(c, xF, y - 3*mm, 50*mm, 6*mm, "STUDYID", "sdtm_var")
    y -= gap

    # Site Number
    label(c, xL, y - 4*mm, "Site Number")
    box(c, xF, y - 3*mm, 30*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["site_number"])
    annotate_field(c, xF, y - 3*mm, 30*mm, 6*mm, "SITEID", "sdtm_var")
    y -= gap

    # Subject Identifier
    label(c, xL, y - 4*mm, "Subject Identifier")
    box(c, xF, y - 3*mm, 50*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["subject_id"])
    annotate_field(c, xF, y - 3*mm, 50*mm, 6*mm, "SUBJID", "sdtm_var")
    y -= gap

    # Screening Number
    label(c, xL, y - 4*mm, "Screening Number")
    box(c, xF, y - 3*mm, 40*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["screening_number"])
    annotate_field(c, xF, y - 3*mm, 40*mm, 6*mm, "SCRNNO", "sdtm_var")
    y -= gap

    # Date of Birth
    label(c, xL, y - 4*mm, "Date of Birth (DD‑MMM‑YYYY)")
    box(c, xF, y - 3*mm, 35*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["dob"])
    annotate_field(c, xF, y - 3*mm, 35*mm, 6*mm, "BRTHDTC", "sdtm_var")
    y -= gap

    # Sex
    label(c, xL, y - 4*mm, "Sex")
    checkbox(c, xF, y - 1*mm, "Male",   checked=(CRF_PARAMS["sex"] == "Male"))
    checkbox(c, xF+25*mm, y - 1*mm, "Female", checked=(CRF_PARAMS["sex"] == "Female"))
    annotate_field(c, xF, y - 1*mm, 25*mm, 3.5*mm, "SEX", "sdtm_var")
    y -= gap

    # Ethnicity
    label(c, xL, y - 4*mm, "Ethnicity")
    checkbox(c, xF, y - 1*mm, "Hispanic or Latino",
             checked=(CRF_PARAMS["ethnicity"] == "Hispanic or Latino"))
    checkbox(c, xF+45*mm, y - 1*mm, "Not Hispanic or Latino",
             checked=(CRF_PARAMS["ethnicity"] == "Not Hispanic or Latino"))
    annotate_field(c, xF, y - 1*mm, 45*mm, 3.5*mm, "ETHNIC", "sdtm_var")
    y -= gap

    # Race
    label(c, xL, y - 4*mm, "Race")
    checkbox(c, xF, y - 1*mm, "White", checked=(CRF_PARAMS["race"] == "White"))
    checkbox(c, xF+30*mm, y - 1*mm, "Black or African American",
             checked=(CRF_PARAMS["race"] == "Black or African American"))
    checkbox(c, xF, y - 1*mm-8*mm, "Asian", checked=(CRF_PARAMS["race"] == "Asian"))
    checkbox(c, xF+30*mm, y - 1*mm-8*mm, "Other", checked=(CRF_PARAMS["race"] == "Other"))
    annotate_field(c, xF, y - 1*mm, 30*mm, 12*mm, "RACE", "sdtm_var")
    y -= gap + 6*mm

    # Height
    label(c, xL, y - 4*mm, "Height (cm)")
    box(c, xF, y - 3*mm, 25*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["height"])
    annotate_field(c, xF, y - 3*mm, 25*mm, 6*mm, "HEIGHT", "sdtm_var")
    y -= gap

    # Weight
    label(c, xL, y - 4*mm, "Weight (kg)")
    box(c, xF, y - 3*mm, 25*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["weight"])
    annotate_field(c, xF, y - 3*mm, 25*mm, 6*mm, "WEIGHT", "sdtm_var")
    y -= gap

    # BMI (derived)
    label(c, xL, y - 4*mm, "BMI (kg/m²)")
    box(c, xF, y - 3*mm, 25*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["bmi"])
    annotate_field(c, xF, y - 3*mm, 25*mm, 6*mm, "BMI", "derived")
    y -= gap

    # Consent Date
    label(c, xL, y - 4*mm, "Date of Informed Consent")
    box(c, xF, y - 3*mm, 35*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["consent_date"])
    annotate_field(c, xF, y - 3*mm, 35*mm, 6*mm, "ICFDTC", "sdtm_var")


# ---------- PAGE 2: MEDICAL HISTORY ----------
def page2(c, page_no, total_pages):
    header(c, "MEDICAL HISTORY — GENERAL", page_no, total_pages)
    legend_y = PAGE_H - 22*mm - 2*mm
    domain_legend(c, MARGIN_L + 2*mm, legend_y, "MH", "Medical History")

    y = frame(c)
    xL = MARGIN_L + 6*mm
    xF = MARGIN_L + 60*mm
    gap = 10*mm

    def mh_row(condition, start, ongoing, notes):
        nonlocal y
        # Condition term
        label(c, xL, y - 4*mm, condition)
        box(c, xF, y - 3*mm, 30*mm)
        label(c, xF+2*mm, y - 7*mm, start)
        annotate_field(c, xF, y - 3*mm, 30*mm, 6*mm, "MHSTDTC", "sdtm_var")

        # Ongoing flag
        checkbox(c, xF+35*mm, y - 1*mm, "Ongoing", checked=ongoing)
        annotate_field(c, xF+35*mm, y - 1*mm, 15*mm, 3.5*mm, "MHENRF", "sdtm_var")

        # Notes
        box(c, xF+60*mm, y - 3*mm, 60*mm)
        label(c, xF+62*mm, y - 7*mm, notes)
        annotate_field(c, xF+60*mm, y - 3*mm, 60*mm, 6*mm, "MHCOMM", "not_submitted")
        y -= gap

    for condition, start, ongoing, notes in CRF_PARAMS["medical_history"]:
        mh_row(condition, start, ongoing, notes)


# ---------- PAGE 3: ONCOLOGY DIAGNOSIS ----------
def page3(c, page_no, total_pages):
    header(c, "ONCOLOGY DIAGNOSIS SUMMARY", page_no, total_pages)
    legend_y = PAGE_H - 22*mm - 2*mm
    domain_legend(c, MARGIN_L + 2*mm, legend_y, "TU", "Tumor Identification")

    y = frame(c)
    xL = MARGIN_L + 6*mm
    xF = MARGIN_L + 60*mm
    gap = 11*mm

    # Primary Tumor Site
    label(c, xL, y - 4*mm, "Primary Tumor Site")
    box(c, xF, y - 3*mm, 80*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["primary_site"])
    annotate_field(c, xF, y - 3*mm, 80*mm, 6*mm, "TUMLOC", "sdtm_var")
    y -= gap

    # Histology
    label(c, xL, y - 4*mm, "Histology / Histopathology")
    box(c, xF, y - 3*mm, 80*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["histology"])
    annotate_field(c, xF, y - 3*mm, 80*mm, 6*mm, "HISTO", "sdtm_var")
    y -= gap

    # Date of Initial Cancer Diagnosis
    label(c, xL, y - 4*mm, "Date of Initial Cancer Diagnosis")
    box(c, xF, y - 3*mm, 35*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["diagnosis_date"])
    annotate_field(c, xF, y - 3*mm, 35*mm, 6*mm, "DMDTC", "sdtm_var")
    y -= gap

    # TNM
    label(c, xL, y - 4*mm, "TNM Classification at Baseline")
    box(c, xF, y - 3*mm, 40*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["tnm"])
    annotate_field(c, xF, y - 3*mm, 40*mm, 6*mm, "TNM", "sdtm_var")
    y -= gap

    # Stage
    label(c, xL, y - 4*mm, "Overall Stage (AJCC)")
    checkbox(c, xF, y - 1*mm, "I",   checked=(CRF_PARAMS["stage"] == "I"))
    checkbox(c, xF+22*mm, y - 1*mm, "II",  checked=(CRF_PARAMS["stage"] == "II"))
    checkbox(c, xF+44*mm, y - 1*mm, "III", checked=("III" in CRF_PARAMS["stage"]))
    checkbox(c, xF+66*mm, y - 1*mm, "IV",  checked=(CRF_PARAMS["stage"] == "IV"))
    annotate_field(c, xF, y - 1*mm, 66*mm, 3.5*mm, "STAGE", "ct")
    y -= gap

    # Metastatic
    label(c, xL, y - 4*mm, "Metastatic Disease at Baseline")
    checkbox(c, xF, y - 1*mm, "YES", checked=(CRF_PARAMS["metastatic"] == "YES"))
    checkbox(c, xF+25*mm, y - 1*mm, "NO",  checked=(CRF_PARAMS["metastatic"] == "NO"))
    annotate_field(c, xF, y - 1*mm, 25*mm, 3.5*mm, "METAST", "ct")
    y -= gap

    # Biomarkers
    label(c, xL, y - 4*mm, "Biomarker Status")
    box(c, xF, y - 3*mm, 80*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["biomarkers"])
    annotate_field(c, xF, y - 3*mm, 80*mm, 6*mm, "BIOMARK", "value_level")
    y -= gap

    # Ki-67
    label(c, xL, y - 4*mm, "Ki‑67 Proliferation Index (%)")
    box(c, xF, y - 3*mm, 25*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["ki67"])
    annotate_field(c, xF, y - 3*mm, 25*mm, 6*mm, "KI67", "sdtm_var")
    y -= gap

    # BRCA
    label(c, xL, y - 4*mm, "BRCA1/2 Germline Mutation Status")
    checkbox(c, xF, y - 1*mm, "Positive", checked=(CRF_PARAMS["brca"] == "Positive"))
    checkbox(c, xF+30*mm, y - 1*mm, "Negative", checked=(CRF_PARAMS["brca"] == "Negative"))
    checkbox(c, xF+60*mm, y - 1*mm, "Unknown", checked=(CRF_PARAMS["brca"] == "Unknown"))
    annotate_field(c, xF, y - 1*mm, 60*mm, 3.5*mm, "BRCAMUT", "ct")


# ---------- PAGE 4: BASELINE TUMOR ASSESSMENT ----------
def page4(c, page_no, total_pages):
    header(c, "BASELINE TUMOR ASSESSMENT — TARGET LESIONS", page_no, total_pages)
    legend_y = PAGE_H - 22*mm - 2*mm
    domain_legend(c, MARGIN_L + 2*mm, legend_y, "TR", "Tumor Response")

    y = frame(c)
    xL = MARGIN_L + 6*mm
    xF = MARGIN_L + 60*mm
    gap = 11*mm

    # Assessment Date
    label(c, xL, y - 4*mm, "Assessment Date")
    box(c, xF, y - 3*mm, 35*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["diagnosis_date"])
    annotate_field(c, xF, y - 3*mm, 35*mm, 6*mm, "RADSTDTC", "sdtm_var")
    y -= gap

    def tl_row(idx, loc_key, diam_key):
        nonlocal y
        # Location
        label(c, xL, y - 4*mm, f"Target Lesion {idx} Location")
        box(c, xF, y - 3*mm, 80*mm)
        label(c, xF+2*mm, y - 7*mm, CRF_PARAMS[loc_key])
        annotate_field(c, xF, y - 3*mm, 80*mm, 6*mm, f"TRG{idx}LOC", "sdtm_var")
        y -= gap

        # Diameter
        label(c, xL+5*mm, y - 4*mm, "Longest Diameter (mm)")
        box(c, xF, y - 3*mm, 25*mm)
        label(c, xF+2*mm, y - 7*mm, CRF_PARAMS[diam_key])
        annotate_field(c, xF, y - 3*mm, 25*mm, 6*mm, f"TRG{idx}DIAM", "sdtm_var")
        y -= gap

    tl_row(1, "tl1_loc", "tl1_diam")
    tl_row(2, "tl2_loc", "tl2_diam")
    tl_row(3, "tl3_loc", "tl3_diam")

    # Imaging Modality
    label(c, xL, y - 4*mm, "Imaging Modality")
    box(c, xF, y - 3*mm, 60*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["baseline_imaging"])
    annotate_field(c, xF, y - 3*mm, 60*mm, 6*mm, "RADMOD", "ct")


# ---------- PAGE 5: NON-TARGET LESIONS ----------
def page5(c, page_no, total_pages):
    header(c, "NON‑TARGET LESIONS & OTHER FINDINGS", page_no, total_pages)
    legend_y = PAGE_H - 22*mm - 2*mm
    domain_legend(c, MARGIN_L + 2*mm, legend_y, "TR", "Tumor Response")

    y = frame(c)
    xL = MARGIN_L + 6*mm
    xF = MARGIN_L + 60*mm
    gap = 11*mm

    def ntl_row(idx, desc_key, status):
        nonlocal y
        # Description
        label(c, xL, y - 4*mm, f"Non‑Target Lesion {idx}")
        box(c, xF, y - 3*mm, 80*mm)
        label(c, xF+2*mm, y - 7*mm, CRF_PARAMS[desc_key])
        annotate_field(c, xF, y - 3*mm, 80*mm, 6*mm, f"NTL{idx}DESC", "sdtm_var")
        y -= gap

        # Status
        label(c, xL+5*mm, y - 4*mm, "Status")
        box(c, xF, y - 3*mm, 40*mm)
        label(c, xF+2*mm, y - 7*mm, status)
        annotate_field(c, xF, y - 3*mm, 40*mm, 6*mm, f"NTL{idx}STAT", "ct")
        y -= gap

    ntl_row(1, "ntl1", "Present")
    ntl_row(2, "ntl2", "Present")
    ntl_row(3, "ntl3", "Absent")

    # Other findings
    label(c, xL, y - 4*mm, "Other Radiologic Findings")
    box(c, xF, y - 3*mm, 100*mm)
    label(c, xF+2*mm, y - 7*mm, CRF_PARAMS["other_findings"])
    annotate_field(c, xF, y - 3*mm, 100*mm, 6*mm, "RADCOMM", "not_submitted")


# ---------- PAGE 6: ECOG OVER TIME ----------
def page6(c, page_no, total_pages):
    header(c, "ECOG PERFORMANCE STATUS OVER TIME", page_no, total_pages)
    legend_y = PAGE_H - 22*mm - 2*mm
    domain_legend(c, MARGIN_L + 2*mm, legend_y, "QS", "Questionnaires (ECOG)")

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

    for idx, (visit, score) in enumerate(zip(visits, CRF_PARAMS["ecog"]), start=1):
        label(c, xL, y - 4*mm, f"Visit: {visit}")
        xF = MARGIN_L + 60*mm
        for s in ["0", "1", "2", "3", "4"]:
            checkbox(c, xF, y - 1*mm, s, checked=(s == score))
            xF += 18*mm
        # annotate ECOG per visit
        annotate_field(c, MARGIN_L + 60*mm, y - 1*mm, 18*mm*5, 3.5*mm, f"ECOG{idx}", "ct")
        y -= gap


# ---------- PAGE 7: VITAL SIGNS ----------
def page7(c, page_no, total_pages):
    header(c, "VITAL SIGNS — BASELINE", page_no, total_pages)
    legend_y = PAGE_H - 22*mm - 2*mm
    domain_legend(c, MARGIN_L + 2*mm, legend_y, "VS", "Vital Signs")

    y = frame(c)
    xL = MARGIN_L + 6*mm
    xF = MARGIN_L + 60*mm
    gap = 11*mm

    def row(label_text, value, var_name):
        nonlocal y
        label(c, xL, y - 4*mm, label_text)
        box(c, xF, y - 3*mm, 35*mm)
        label(c, xF+2*mm, y - 7*mm, value)
        annotate_field(c, xF, y - 3*mm, 35*mm, 6*mm, var_name, "sdtm_var")
        y -= gap

    row("Assessment Date", CRF_PARAMS["vital_date"], "VSDTC")
    row("Systolic Blood Pressure (mmHg)", CRF_PARAMS["sbp"], "VSSYS")
    row("Diastolic Blood Pressure (mmHg)", CRF_PARAMS["dbp"], "VSDIA")
    row("Heart Rate (bpm)", CRF_PARAMS["hr"], "VSPULSE")
    row("Respiratory Rate (breaths/min)", CRF_PARAMS["rr"], "VSRESP")
    row("Temperature (°C)", CRF_PARAMS["temp"], "VSTEMP")


# ---------- PAGE 8: CONCOMITANT MEDICATIONS ----------
def page8(c, page_no, total_pages):
    header(c, "CONCOMITANT MEDICATIONS", page_no, total_pages)
    legend_y = PAGE_H - 22*mm - 2*mm
    domain_legend(c, MARGIN_L + 2*mm, legend_y, "CM", "Concomitant Medications")

    y = frame(c)
    xL = MARGIN_L + 6*mm
    gap = 10*mm

    for idx, (name, indic, start, status) in enumerate(CRF_PARAMS["conmeds"], start=1):
        label(c, xL, y - 4*mm, f"Medication: {name}")
        xF = MARGIN_L + 60*mm
        # Indication
        box(c, xF, y - 3*mm, 60*mm)
        label(c, xF+2*mm, y - 7*mm, indic)
        annotate_field(c, xF, y - 3*mm, 60*mm, 6*mm, f"CMINDC{idx}", "sdtm_var")
        y -= gap

        # Start Date
        label(c, xL+5*mm, y - 4*mm, "Start Date")
        box(c, xF, y - 3*mm, 35*mm)
        label(c, xF+2*mm, y - 7*mm, start)
        annotate_field(c, xF, y - 3*mm, 35*mm, 6*mm, f"CMSTDTC{idx}", "sdtm_var")

        # Status
        label(c, xL+80*mm, y - 4*mm, "Status")
        box(c, xL+100*mm, y - 3*mm, 30*mm)
        label(c, xL+102*mm, y - 7*mm, status)
        annotate_field(c, xL+100*mm, y - 3*mm, 30*mm, 6*mm, f"CMSTAT{idx}", "ct")
        y -= gap


# ---------- PAGE 9: PRIOR CANCER TREATMENTS ----------
def page9(c, page_no, total_pages):
    header(c, "PRIOR CANCER TREATMENTS", page_no, total_pages)
    legend_y = PAGE_H - 22*mm - 2*mm
    domain_legend(c, MARGIN_L + 2*mm, legend_y, "PR", "Procedures")

    y = frame(c)
    xL = MARGIN_L + 6*mm
    xF = MARGIN_L + 60*mm
    gap = 11*mm

    # Prior Surgery
    label(c, xL, y - 4*mm, "Prior Surgery for Primary Tumor")
    checkbox(c, xF, y - 1*mm, "YES", checked=False)
    checkbox(c, xF+25*mm, y - 1*mm, "NO", checked=True)
    annotate_field(c, xF, y - 1*mm, 25*mm, 3.5*mm, "PRSURG", "ct")
    y -= gap

    label(c, xL+5*mm, y - 4*mm, "Type of Surgery")
    box(c, xF, y - 3*mm, 80*mm)
    label(c, xF+2*mm, y - 7*mm, "None")
    annotate_field(c, xF, y - 3*mm, 80*mm, 6*mm, "PRSURGTP", "not_submitted")
    y -= gap

    # Radiation
    label(c, xL, y - 4*mm, "Prior Radiation Therapy")
    checkbox(c, xF, y - 1*mm, "YES", checked=False)
    checkbox(c, xF+25*mm, y - 1*mm, "NO", checked=True)
    annotate_field(c, xF, y - 1*mm, 25*mm, 3.5*mm, "PRRAD", "ct")
    y -= gap

    # Systemic therapy
    label(c, xL, y - 4*mm, "Prior Systemic Therapy (Chemo/Hormonal)")
    checkbox(c, xF, y - 1*mm, "YES", checked=False)
    checkbox(c, xF+25*mm, y - 1*mm, "NO", checked=True)
    annotate_field(c, xF, y - 1*mm, 25*mm, 3.5*mm, "PRSYS", "ct")
    y -= gap

    # Other prior treatments
    label(c, xL, y - 4*mm, "Other Prior Cancer Treatments")
    box(c, xF, y - 3*mm, 100*mm)
    label(c, xF+2*mm, y - 7*mm, "None")
    annotate_field(c, xF, y - 3*mm, 100*mm, 6*mm, "PRTRTOTH", "not_submitted")


# ---------- PAGE 10: TREATMENT REGIMEN ----------
def page10(c, page_no, total_pages):
    header(c, "TREATMENT REGIMEN (STUDY DRUG)", page_no, total_pages)
    legend_y = PAGE_H - 22*mm - 2*mm
    domain_legend(c, MARGIN_L + 2*mm, legend_y, "EX", "Exposure")

    y = frame(c)
    xL = MARGIN_L + 6*mm
    xF = MARGIN_L + 60*mm
    gap = 11*mm

    def row(label_text, value, var_name, width=60*mm, kind="sdtm_var"):
        nonlocal y
        label(c, xL, y - 4*mm, label_text)
        box(c, xF, y - 3*mm, width)
        label(c, xF+2*mm, y - 7*mm, value)
        annotate_field(c, xF, y - 3*mm, width, 6*mm, var_name, kind)
        y -= gap

    row("Randomization Arm", CRF_PARAMS["arm"], "ARMCD", 60*mm, "ct")
    row("Planned Regimen", CRF_PARAMS["regimen"], "TRTREG", 100*mm, "not_submitted")
    row("Cycle Length (days)", CRF_PARAMS["cycle_length"], "CYCLEDUR", 25*mm)
    row("Planned Number of Cycles", CRF_PARAMS["planned_cycles"], "PLANCYC", 40*mm)
    row("Start Date of Study Treatment", CRF_PARAMS["treatment_start"], "TRTSTDTC", 35*mm)
    row("Planned End of Treatment Date", CRF_PARAMS["treatment_end"], "TRTENDTC", 35*mm)


# ---------- PAGE 11: CYCLE 1 DAY 1 ----------
def page11(c, page_no, total_pages):
    header(c, "CYCLE 1 DAY 1 — ADMINISTRATION", page_no, total_pages)
    legend_y = PAGE_H - 22*mm - 2*mm
    domain_legend(c, MARGIN_L + 2*mm, legend_y, "EX", "Exposure")

    y = frame(c)
    xL = MARGIN_L+6*mm
    xF = MARGIN_L+60*mm
    g = 11*mm

    def row(label_text, value, var_name, width=35*mm, kind="sdtm_var"):
        nonlocal y
        label(c, xL, y-4*mm, label_text)
        box(c, xF, y-3*mm, width)
        label(c, xF+2*mm, y-7*mm, value)
        annotate_field(c, xF, y - 3*mm, width, 6*mm, var_name, kind)
        y -= g

    row("Visit Date", CRF_PARAMS["cycle1_date"], "VISIT1DTC", 35*mm)
    row("Pembrolizumab Dose (mg)", "200", "TRT1DOSE", 35*mm, "value_level")
    row("Carboplatin Dose (AUC)", "5", "TRT2DOSE", 35*mm, "value_level")
    row("Pemetrexed Dose (mg/m²)", "500", "TRT3DOSE", 35*mm, "value_level")
    row("Route of Administration", "IV infusion", "ROUTE", 40*mm, "ct")
    row("Premedications", "Folic acid, dexamethasone", "PREMED", 100*mm, "not_submitted")


# ---------- PAGE 12: CYCLE 2 DAY 1 ----------
def page12(c, page_no, total_pages):
    header(c, "CYCLE 2 DAY 1 — ADMINISTRATION", page_no, total_pages)
    legend_y = PAGE_H - 22*mm - 2*mm
    domain_legend(c, MARGIN_L + 2*mm, legend_y, "EX", "Exposure")

    y = frame(c)
    xL = MARGIN_L+6*mm
    xF = MARGIN_L+60*mm
    g = 11*mm

    def row(label_text, value, var_name, width=35*mm, kind="sdtm_var"):
        nonlocal y
        label(c, xL, y-4*mm, label_text)
        box(c, xF, y-3*mm, width)
        label(c, xF+2*mm, y-7*mm, value)
        annotate_field(c, xF, y - 3*mm, width, 6*mm, var_name, kind)
        y -= g

    row("Visit Date", CRF_PARAMS["cycle2_date"], "VISIT2DTC", 35*mm)
    row("Pembrolizumab Dose (mg)", "200", "TRT1DOSE2", 35*mm, "value_level")
    row("Carboplatin Dose (AUC)", "5", "TRT2DOSE2", 35*mm, "value_level")
    row("Pemetrexed Dose (mg/m²)", "500", "TRT3DOSE2", 35*mm, "value_level")
    row("Dose Modifications", "None", "TRTMOD2", 100*mm, "not_submitted")


# ---------- PAGE 13: CYCLE 3 DAY 1 ----------
def page13(c, page_no, total_pages):
    header(c, "CYCLE 3 DAY 1 — ADMINISTRATION", page_no, total_pages)
    legend_y = PAGE_H - 22*mm - 2*mm
    domain_legend(c, MARGIN_L + 2*mm, legend_y, "EX", "Exposure")

    y = frame(c)
    xL = MARGIN_L+6*mm
    xF = MARGIN_L+60*mm
    g = 11*mm

    def row(label_text, value, var_name, width=35*mm, kind="sdtm_var"):
        nonlocal y
        label(c, xL, y-4*mm, label_text)
        box(c, xF, y-3*mm, width)
        label(c, xF+2*mm, y-7*mm, value)
        annotate_field(c, xF, y - 3*mm, width, 6*mm, var_name, kind)
        y -= g

    row("Visit Date", CRF_PARAMS["cycle3_date"], "VISIT3DTC", 35*mm)
    row("Pembrolizumab Dose (mg)", "200", "TRT1DOSE3", 35*mm, "value_level")
    row("Carboplatin Dose (AUC)", "5", "TRT2DOSE3", 35*mm, "value_level")
    row("Pemetrexed Dose (mg/m²)", "500", "TRT3DOSE3", 35*mm, "value_level")
    row("Premedications", "Steroids, H1/H2 blockers", "PREMED3", 100*mm, "not_submitted")


# ---------- PAGE 14: ADVERSE EVENTS — PAGE 1 ----------
def page14(c, page_no, total_pages):
    header(c, "ADVERSE EVENTS — PAGE 1", page_no, total_pages)
    legend_y = PAGE_H - 22*mm - 2*mm
    domain_legend(c, MARGIN_L + 2*mm, legend_y, "AE", "Adverse Events")

    y = frame(c)
    xL = MARGIN_L+6*mm
    xF = MARGIN_L+60*mm
    g = 10*mm

    def ae_row(term, start, end, sev, rel, outcome, idx):
        nonlocal y
        # Term
        label(c, xL, y-4*mm, f"AE Term: {term}")
        box(c, xF, y-3*mm, 60*mm)
        label(c, xF+2*mm, y-7*mm, term)
        annotate_field(c, xF, y - 3*mm, 60*mm, 6*mm, f"AETERM{idx}", "sdtm_var")
        y -= g

        # Start / End
        label(c, xL+5*mm, y-4*mm, "Start Date")
        box(c, xF, y-3*mm, 35*mm)
        label(c, xF+2*mm, y-7*mm, start)
        annotate_field(c, xF, y - 3*mm, 35*mm, 6*mm, f"AESTDTC{idx}", "sdtm_var")

        label(c, xL+80*mm, y-4*mm, "End Date")
        box(c, xL+100*mm, y-3*mm, 35*mm)
        label(c, xL+102*mm, y-7*mm, end)
        annotate_field(c, xL+100*mm, y - 3*mm, 35*mm, 6*mm, f"AEENDTC{idx}", "sdtm_var")
        y -= g

        # Severity / Relationship
        label(c, xL+5*mm, y-4*mm, "Severity")
        box(c, xF, y-3*mm, 35*mm)
        label(c, xF+2*mm, y-7*mm, sev)
        annotate_field(c, xF, y - 3*mm, 35*mm, 6*mm, f"AESEV{idx}", "ct")

        label(c, xL+80*mm, y-4*mm, "Relationship")
        box(c, xL+100*mm, y-3*mm, 35*mm)
        label(c, xL+102*mm, y-7*mm, rel)
        annotate_field(c, xL+100*mm, y - 3*mm, 35*mm, 6*mm, f"AEREL{idx}", "ct")
        y -= g

        # Outcome
        label(c, xL+5*mm, y-4*mm, "Outcome")
        box(c, xF, y-3*mm, 60*mm)
        label(c, xF+2*mm, y-7*mm, outcome)
        annotate_field(c, xF, y - 3*mm, 60*mm, 6*mm, f"AEOUT{idx}", "ct")
        y -= g

    for i, ae in enumerate(CRF_PARAMS["aes_page1"], start=1):
        ae_row(*ae, i)


# ---------- PAGE 15: ADVERSE EVENTS — PAGE 2 ----------
def page15(c, page_no, total_pages):
    header(c, "ADVERSE EVENTS — PAGE 2", page_no, total_pages)
    legend_y = PAGE_H - 22*mm - 2*mm
    domain_legend(c, MARGIN_L + 2*mm, legend_y, "AE", "Adverse Events")

    y = frame(c)
    xL = MARGIN_L+6*mm
    xF = MARGIN_L+60*mm
    g = 10*mm

    def ae_row(term, start, end, sev, rel, outcome, idx):
        nonlocal y
        label(c, xL, y-4*mm, f"AE Term: {term}")
        box(c, xF, y-3*mm, 60*mm)
        label(c, xF+2*mm, y-7*mm, term)
        annotate_field(c, xF, y - 3*mm, 60*mm, 6*mm, f"AETERM2_{idx}", "sdtm_var")
        y -= g

        label(c, xL+5*mm, y-4*mm, "Start Date")
        box(c, xF, y-3*mm, 35*mm)
        label(c, xF+2*mm, y-7*mm, start)
        annotate_field(c, xF, y - 3*mm, 35*mm, 6*mm, f"AESTDTC2_{idx}", "sdtm_var")

        label(c, xL+80*mm, y-4*mm, "End Date")
        box(c, xL+100*mm, y-3*mm, 35*mm)
        label(c, xL+102*mm, y-7*mm, end)
        annotate_field(c, xL+100*mm, y - 3*mm, 35*mm, 6*mm, f"AEENDTC2_{idx}", "sdtm_var")
        y -= g

        label(c, xL+5*mm, y-4*mm, "Severity")
        box(c, xF, y-3*mm, 35*mm)
        label(c, xF+2*mm, y-7*mm, sev)
        annotate_field(c, xF, y - 3*mm, 35*mm, 6*mm, f"AESEV2_{idx}", "ct")

        label(c, xL+80*mm, y-4*mm, "Relationship")
        box(c, xL+100*mm, y-3*mm, 35*mm)
        label(c, xL+102*mm, y-7*mm, rel)
        annotate_field(c, xL+100*mm, y - 3*mm, 35*mm, 6*mm, f"AEREL2_{idx}", "ct")
        y -= g

        label(c, xL+5*mm, y-4*mm, "Outcome")
        box(c, xF, y-3*mm, 60*mm)
        label(c, xF+2*mm, y-7*mm, outcome)
        annotate_field(c, xF, y - 3*mm, 60*mm, 6*mm, f"AEOUT2_{idx}", "ct")
        y -= g

    for i, ae in enumerate(CRF_PARAMS["aes_page2"], start=1):
        ae_row(*ae, i)


# ---------- PAGE 16: LABORATORY RESULTS — HEMATOLOGY ----------
def page16(c, page_no, total_pages):
    header(c, "LABORATORY RESULTS — HEMATOLOGY", page_no, total_pages)
    legend_y = PAGE_H - 22*mm - 2*mm
    domain_legend(c, MARGIN_L + 2*mm, legend_y, "LB", "Laboratory")

    y = frame(c)
    xL = MARGIN_L+6*mm
    xF = MARGIN_L+70*mm
    g = 9*mm

    for idx, (name, val, unit, flag) in enumerate(CRF_PARAMS["hematology"], start=1):
        label(c, xL, y-4*mm, name)
        # Value
        box(c, xF, y-3*mm, 25*mm)
        label(c, xF+2*mm, y-7*mm, val)
        annotate_field(c, xF, y - 3*mm, 25*mm, 6*mm, f"LBHEMVAL{idx}", "sdtm_var")
        # Unit
        box(c, xF+30*mm, y-3*mm, 20*mm)
        label(c, xF+32*mm, y-7*mm, unit)
        annotate_field(c, xF+30*mm, y - 3*mm, 20*mm, 6*mm, f"LBHEMUNIT{idx}", "ct")
        # Flag
        box(c, xF+55*mm, y-3*mm, 20*mm)
        label(c, xF+57*mm, y-7*mm, flag)
        annotate_field(c, xF+55*mm, y - 3*mm, 20*mm, 6*mm, f"LBHEMFL{idx}", "ct")
        y -= g


# ---------- PAGE 17: LABORATORY RESULTS — CHEMISTRY ----------
def page17(c, page_no, total_pages):
    header(c, "LABORATORY RESULTS — CHEMISTRY", page_no, total_pages)
    legend_y = PAGE_H - 22*mm - 2*mm
    domain_legend(c, MARGIN_L + 2*mm, legend_y, "LB", "Laboratory")

    y = frame(c)
    xL = MARGIN_L+6*mm
    xF = MARGIN_L+70*mm
    g = 9*mm

    for idx, (name, val, unit, flag) in enumerate(CRF_PARAMS["chemistry"], start=1):
        label(c, xL, y-4*mm, name)
        # Value
        box(c, xF, y-3*mm, 25*mm)
        label(c, xF+2*mm, y-7*mm, val)
        annotate_field(c, xF, y - 3*mm, 25*mm, 6*mm, f"LBCHEMVAL{idx}", "sdtm_var")
        # Unit
        box(c, xF+30*mm, y-3*mm, 20*mm)
        label(c, xF+32*mm, y-7*mm, unit)
        annotate_field(c, xF+30*mm, y - 3*mm, 20*mm, 6*mm, f"LBCHEMUNIT{idx}", "ct")
        # Flag
        box(c, xF+55*mm, y-3*mm, 20*mm)
        label(c, xF+57*mm, y-7*mm, flag)
        annotate_field(c, xF+55*mm, y - 3*mm, 20*mm, 6*mm, f"LBCHEMFL{idx}", "ct")
        y -= g


# ---------- PAGE 18: IMAGING RESULTS ----------
def page18(c, page_no, total_pages):
    header(c, "IMAGING RESULTS", page_no, total_pages)
    legend_y = PAGE_H - 22*mm - 2*mm
    domain_legend(c, MARGIN_L + 2*mm, legend_y, "PR", "Procedures (Imaging)")

    y = frame(c)
    xL = MARGIN_L+6*mm
    xF = MARGIN_L+60*mm
    g = 11*mm

    for idx, (modality, date, result) in enumerate(CRF_PARAMS["imaging"], start=1):
        label(c, xL, y-4*mm, f"{modality} Date")
        box(c, xF, y-3*mm, 35*mm)
        label(c, xF+2*mm, y-7*mm, date)
        annotate_field(c, xF, y - 3*mm, 35*mm, 6*mm, f"IM{idx}DTC", "sdtm_var")
        y -= g

        label(c, xL+5*mm, y-4*mm, "Result")
        box(c, xF, y-3*mm, 100*mm)
        label(c, xF+2*mm, y-7*mm, result)
        annotate_field(c, xF, y - 3*mm, 100*mm, 6*mm, f"IM{idx}RES", "sdtm_var")
        y -= g


# ---------- PAGE 19: RECIST RESPONSE ASSESSMENT ----------
def page19(c, page_no, total_pages):
    header(c, "RECIST RESPONSE ASSESSMENT", page_no, total_pages)
    legend_y = PAGE_H - 22*mm - 2*mm
    domain_legend(c, MARGIN_L + 2*mm, legend_y, "RS", "Response")

    y = frame(c)
    xL = MARGIN_L+6*mm
    xF = MARGIN_L+60*mm
    g = 11*mm

    for idx, (visit, resp) in enumerate(CRF_PARAMS["recist"], start=1):
        label(c, xL, y-4*mm, f"Visit: {visit}")
        box(c, xF, y-3*mm, 80*mm)
        label(c, xF+2*mm, y-7*mm, resp)
        annotate_field(c, xF, y - 3*mm, 80*mm, 6*mm, f"RECIST{idx}", "ct")
        y -= g

    label(c, xL, y-4*mm, "Best Overall Response")
    box(c, xF, y-3*mm, 60*mm)
    label(c, xF+2*mm, y-7*mm, CRF_PARAMS["best_response"])
    annotate_field(c, xF, y - 3*mm, 60*mm, 6*mm, "BESTRESP", "ct")


# ---------- PAGE 20: SURVIVAL FOLLOW‑UP & SIGNATURES ----------
def page20(c, page_no, total_pages):
    header(c, "SURVIVAL FOLLOW‑UP & SIGNATURES", page_no, total_pages)
    legend_y = PAGE_H - 22*mm - 2*mm
    domain_legend(c, MARGIN_L + 2*mm, legend_y, "DS", "Disposition")

    y = frame(c)
    xL = MARGIN_L+6*mm
    xF = MARGIN_L+60*mm
    g = 11*mm

    def row(label_text, value, var_name, width=35*mm, kind="sdtm_var"):
        nonlocal y
        label(c, xL, y-4*mm, label_text)
        box(c, xF, y-3*mm, width)
        label(c, xF+2*mm, y-7*mm, value)
        annotate_field(c, xF, y - 3*mm, width, 6*mm, var_name, kind)
        y -= g

    row("Last Known Alive Date", CRF_PARAMS["last_alive"], "LSTALVDTC", 35*mm)

    label(c, xL, y-4*mm, "Disease Progression")
    checkbox(c, xF, y-1*mm, "YES", checked=(CRF_PARAMS["progression"] == "YES"))
    checkbox(c, xF+25*mm, y-1*mm, "NO", checked=(CRF_PARAMS["progression"] == "NO"))
    annotate_field(c, xF, y - 1*mm, 25*mm, 3.5*mm, "PROGFL", "ct")
    y -= g

    label(c, xL, y-4*mm, "Survival Status")
    checkbox(c, xF, y-1*mm, "Alive", checked=(CRF_PARAMS["survival_status"] == "Alive"))
    checkbox(c, xF+25*mm, y-1*mm, "Dead", checked=(CRF_PARAMS["survival_status"] == "Dead"))
    annotate_field(c, xF, y - 1*mm, 25*mm, 3.5*mm, "SURVSTAT", "ct")
    y -= g

    row("Investigator Name", CRF_PARAMS["investigator"], "INVNAME", 80*mm, "not_submitted")
    row("Investigator Signature", "", "INVSIGN", 80*mm, "not_submitted")
    row("Signature Date", CRF_PARAMS["signature_date"], "INVDTC", 35*mm)


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
