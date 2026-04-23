
# ============================
# GLOBAL CRF VARIABLES (EDIT HERE)
# ============================

CRF_PARAMS_LUNG_CANCER = {
    "crf_name": "crf_lung_cancer",
    "study_id": "ONC‑2026‑004",
    "site_number": "012",
    "subject_id": "ONC‑012‑0789",
    "screening_number": "SCR‑2026‑221",
    "dob": "04‑SEP‑1968",
    "sex": "Male",
    "ethnicity": "Not Hispanic or Latino",
    "race": "White",
    "height": "178",
    "weight": "81.2",
    "bmi": "25.6",
    "consent_date": "18‑JAN‑2026",

    # Diagnosis
    "primary_site": "Right Lung (Upper Lobe)",
    "histology": "Adenocarcinoma (NSCLC)",
    "diagnosis_date": "22‑DEC‑2024",
    "tnm": "cT3N2M0",
    "stage": "IIIA",
    "metastatic": "NO",
    "biomarkers": "EGFR‑, ALK‑, PD‑L1 60%",
    "ki67": "12",
    "brca": "Not applicable",

    # Target lesions
    "tl1_loc": "Right upper‑lobe mass",
    "tl1_diam": "45",
    "tl2_loc": "Mediastinal lymph node",
    "tl2_diam": "22",
    "tl3_loc": "Right hilar node",
    "tl3_diam": "16",
    "baseline_imaging": "CT Chest + PET‑CT",

    # Non-target lesions
    "ntl1": "Small right pleural effusion",
    "ntl2": "Mild emphysema",
    "ntl3": "No liver lesions",
    "other_findings": "No bone metastasis",

    # ECOG
    "ecog": ["1", "1", "1", "0", "0"],

    # Vitals
    "vital_date": "22‑DEC‑2024",
    "sbp": "134",
    "dbp": "82",
    "hr": "88",
    "rr": "18",
    "temp": "37.1",

    # Concomitant meds
    "conmeds": [
        ("Losartan", "Hypertension", "12‑AUG‑2015", "Ongoing"),
        ("Atorvastatin", "Hyperlipidemia", "05‑MAY‑2017", "Ongoing"),
        ("Pantoprazole", "GERD", "10‑NOV‑2019", "Ongoing"),
        ("Vitamin B12", "Supplement", "01‑JAN‑2025", "Ongoing"),
        ("Ibuprofen", "Pain", "PRN", "Intermittent"),
    ],

    # Medical history
    "medical_history": [
        ("Hypertension", "01‑JUN‑2018", True, "Controlled with amlodipine"),
        ("Type‑2 Diabetes", "15‑JAN‑2020", True, "On metformin"),
        ("Hypothyroidism", "10‑SEP‑2015", True, "On levothyroxine"),
        ("Ischemic Heart Disease", "—", False, "No history"),
        ("Chronic Kidney Disease", "—", False, "No history"),
        ("Smoking History", "2000‑2010", False, "10 pack‑years, quit"),
        ("Alcohol Use", "—", False, "Occasional social use"),
        ("Family History of Cancer", "—", False, "Mother: breast cancer at 62"),
    ],

    # Treatment regimen
    "arm": "Arm B — Targeted Therapy",
    "regimen": "Pembrolizumab + Carboplatin + Pemetrexed",
    "cycle_length": "21",
    "planned_cycles": "4 induction + maintenance",
    "treatment_start": "10‑JAN‑2026",
    "treatment_end": "OCT‑2026",

    # Cycle visits
    "cycle1_date": "10‑JAN‑2026",
    "cycle2_date": "31‑JAN‑2026",
    "cycle3_date": "21‑FEB‑2026",

    # AEs
    "aes_page1": [
        ("Fatigue", "20‑FEB‑2026", "Ongoing", "Mild", "Related", "Ongoing"),
        ("Cough", "22‑FEB‑2026", "Ongoing", "Moderate", "Related", "Ongoing"),
    ],
    "aes_page2": [
        ("Rash", "05‑MAR‑2026", "12‑MAR‑2026", "Mild", "Possibly related", "Recovered"),
        ("Neutropenia", "10‑APR‑2026", "Ongoing", "Moderate", "Related", "Ongoing"),
    ],

    # Labs
    "hematology": [
        ("Hemoglobin", "12.4", "g/dL", "Normal"),
        ("WBC", "4.8", "x10⁹/L", "Normal"),
        ("Platelets", "240", "x10⁹/L", "Normal"),
        ("Neutrophils", "2.1", "x10⁹/L", "Normal"),
        ("Lymphocytes", "1.4", "x10⁹/L", "Normal"),
    ],
    "chemistry": [
        ("ALT", "18", "U/L", "Normal"),
        ("AST", "20", "U/L", "Normal"),
        ("Creatinine", "0.9", "mg/dL", "Normal"),
        ("BUN", "16", "mg/dL", "Normal"),
        ("Glucose", "118", "mg/dL", "High"),
        ("Sodium", "140", "mmol/L", "Normal"),
        ("Potassium", "4.3", "mmol/L", "Normal"),
    ],

    # Imaging
    "imaging": [
        ("CT Chest", "22‑DEC‑2024", "Large RUL mass; mediastinal nodes"),
        ("PET‑CT", "23‑DEC‑2024", "Hypermetabolic lesions; no distant mets"),
        ("MRI Brain", "05‑JAN‑2025", "No brain metastasis"),
    ],

    # RECIST
    "recist": [
        ("Baseline", "Measurable disease"),
        ("Cycle 2 Day 1", "Stable Disease (SD)"),
        ("Cycle 3 Day 1", "Partial Response (PR)"),
        ("Cycle 4 Day 1", "PR"),
    ],
    "best_response": "Partial Response (PR)",

    # Survival
    "last_alive": "10‑APR‑2026",
    "progression": "NO",
    "survival_status": "Alive",
    "investigator": "Dr. Markus Weber",
    "signature_date": "10‑APR‑2026",
}

CRF_PARAMS_COLATORAL_CANCER = {
    "crf_name": "crf_colatoral_cancer",
    "study_id": "CRC‑2026‑113",
    "site_number": "027",
    "subject_id": "CRC‑027‑3342",
    "screening_number": "SCR‑2026‑882",
    "dob": "19‑NOV‑1972",
    "sex": "Female",
    "ethnicity": "Hispanic or Latino",
    "race": "Other",
    "height": "165",
    "weight": "69.4",
    "bmi": "25.5",
    "consent_date": "05‑JAN‑2026",

    # Diagnosis
    "primary_site": "Sigmoid Colon",
    "histology": "Adenocarcinoma (Colorectal)",
    "diagnosis_date": "14‑DEC‑2025",
    "tnm": "cT3N1M1",
    "stage": "IV",
    "metastatic": "YES",
    "biomarkers": "KRAS‑mutant, NRAS‑WT, BRAF‑WT, MSI‑Stable",
    "ki67": "35",
    "brca": "Not applicable",

    # Target lesions
    "tl1_loc": "Liver segment IV lesion",
    "tl1_diam": "38",
    "tl2_loc": "Liver segment VII lesion",
    "tl2_diam": "24",
    "tl3_loc": "Peritoneal nodule (LLQ)",
    "tl3_diam": "14",
    "baseline_imaging": "CT Abdomen/Pelvis + PET‑CT",

    # Non-target lesions
    "ntl1": "Small ascites",
    "ntl2": "Mild peritoneal thickening",
    "ntl3": "No lung metastasis",
    "other_findings": "No bone metastasis",

    # ECOG
    "ecog": ["1", "1", "1", "1", "2"],

    # Vitals
    "vital_date": "14‑DEC‑2025",
    "sbp": "142",
    "dbp": "88",
    "hr": "92",
    "rr": "20",
    "temp": "37.4",

    # Concomitant meds
    "conmeds": [
        ("Metformin", "Diabetes", "10‑JAN‑2020", "Ongoing"),
        ("Lisinopril", "Hypertension", "01‑JUL‑2018", "Ongoing"),
        ("Omeprazole", "GERD", "05‑MAR‑2021", "Ongoing"),
        ("Vitamin D3", "Supplement", "01‑JAN‑2025", "Ongoing"),
        ("Tramadol", "Cancer pain", "PRN", "Intermittent"),
    ],

    # Medical history
    "medical_history": [
        ("Hypertension", "01‑JUL‑2018", True, "Controlled with lisinopril"),
        ("Type‑2 Diabetes", "10‑JAN‑2020", True, "On metformin"),
        ("GERD", "05‑MAR‑2021", True, "On omeprazole"),
        ("Anemia", "—", False, "Mild, resolved"),
        ("Smoking History", "1995‑2010", False, "15 pack‑years, quit"),
        ("Alcohol Use", "—", False, "Occasional"),
        ("Family History of Cancer", "—", False, "Father: colon cancer at 68"),
    ],

    # Treatment regimen
    "arm": "Arm C — FOLFOX + Bevacizumab",
    "regimen": "Oxaliplatin + 5‑FU + Leucovorin + Bevacizumab",
    "cycle_length": "14",
    "planned_cycles": "12 cycles",
    "treatment_start": "10‑JAN‑2026",
    "treatment_end": "SEP‑2026",

    # Cycle visits
    "cycle1_date": "10‑JAN‑2026",
    "cycle2_date": "24‑JAN‑2026",
    "cycle3_date": "07‑FEB‑2026",

    # AEs
    "aes_page1": [
        ("Nausea", "10‑JAN‑2026", "12‑JAN‑2026", "Mild", "Related", "Recovered"),
        ("Peripheral neuropathy", "20‑JAN‑2026", "Ongoing", "Mild", "Related", "Ongoing"),
    ],
    "aes_page2": [
        ("Diarrhea", "25‑JAN‑2026", "28‑JAN‑2026", "Moderate", "Possibly related", "Recovered"),
        ("Hypertension", "05‑FEB‑2026", "Ongoing", "Moderate", "Related", "Ongoing"),
    ],

    # Labs
    "hematology": [
        ("Hemoglobin", "10.8", "g/dL", "Low"),
        ("WBC", "5.2", "x10⁹/L", "Normal"),
        ("Platelets", "310", "x10⁹/L", "Normal"),
        ("Neutrophils", "3.4", "x10⁹/L", "Normal"),
        ("Lymphocytes", "1.1", "x10⁹/L", "Low"),
    ],
    "chemistry": [
        ("ALT", "32", "U/L", "High"),
        ("AST", "28", "U/L", "Normal"),
        ("Creatinine", "1.0", "mg/dL", "Normal"),
        ("BUN", "18", "mg/dL", "Normal"),
        ("Glucose", "156", "mg/dL", "High"),
        ("Sodium", "138", "mmol/L", "Normal"),
        ("Potassium", "4.0", "mmol/L", "Normal"),
    ],

    # Imaging
    "imaging": [
        ("CT Abdomen/Pelvis", "14‑DEC‑2025", "Multiple liver metastases; peritoneal nodules"),
        ("PET‑CT", "16‑DEC‑2025", "FDG‑avid liver lesions; no thoracic disease"),
        ("MRI Liver", "05‑JAN‑2026", "Confirms segment IV and VII lesions"),
    ],

    # RECIST
    "recist": [
        ("Baseline", "Measurable metastatic disease"),
        ("Cycle 2 Day 1", "Stable Disease (SD)"),
        ("Cycle 3 Day 1", "Stable Disease (SD)"),
        ("Cycle 4 Day 1", "Partial Response (PR)"),
    ],
    "best_response": "Partial Response (PR)",

    # Survival
    "last_alive": "15‑APR‑2026",
    "progression": "NO",
    "survival_status": "Alive",
    "investigator": "Dr. Helena Ortiz",
    "signature_date": "15‑APR‑2026",
}

CRF_PARAMS_SKIN_CANCER = {
    "crf_name": "crf_skin_cancer",
    "study_id": "MEL‑2026‑019",
    "site_number": "045",
    "subject_id": "MEL‑045‑2219",
    "screening_number": "SCR‑2026‑559",
    "dob": "28‑JUL‑1981",
    "sex": "Male",
    "ethnicity": "Not Hispanic or Latino",
    "race": "White",
    "height": "182",
    "weight": "79.8",
    "bmi": "24.1",
    "consent_date": "12‑JAN‑2026",

    # Diagnosis
    "primary_site": "Left Upper Back (Cutaneous Melanoma)",
    "histology": "Malignant Melanoma — Superficial Spreading Type",
    "diagnosis_date": "03‑DEC‑2025",
    "tnm": "cT4bN2M1a",
    "stage": "IV",
    "metastatic": "YES",
    "biomarkers": "BRAF V600E Positive, NRAS‑WT, PD‑L1 45%",
    "ki67": "55",
    "brca": "Not applicable",

    # Target lesions
    "tl1_loc": "Left axillary lymph node",
    "tl1_diam": "28",
    "tl2_loc": "Right lung nodule (upper lobe)",
    "tl2_diam": "16",
    "tl3_loc": "Subcutaneous nodule (left flank)",
    "tl3_diam": "12",
    "baseline_imaging": "CT Chest + CT Abdomen/Pelvis",

    # Non-target lesions
    "ntl1": "Multiple subcutaneous nodules",
    "ntl2": "Mild left axillary soft‑tissue thickening",
    "ntl3": "No liver metastasis",
    "other_findings": "No brain metastasis on MRI",

    # ECOG
    "ecog": ["1", "1", "1", "1", "2"],

    # Vitals
    "vital_date": "03‑DEC‑2025",
    "sbp": "128",
    "dbp": "84",
    "hr": "86",
    "rr": "17",
    "temp": "36.9",

    # Concomitant meds
    "conmeds": [
        ("Ibuprofen", "Pain", "PRN", "Intermittent"),
        ("Pantoprazole", "GERD", "01‑FEB‑2024", "Ongoing"),
        ("Vitamin C", "Supplement", "01‑JAN‑2025", "Ongoing"),
        ("Cetirizine", "Allergies", "PRN", "Intermittent"),
    ],

    # Medical history
    "medical_history": [
        ("Seasonal Allergies", "—", False, "Mild"),
        ("GERD", "01‑FEB‑2024", True, "On pantoprazole"),
        ("Smoking History", "2000‑2015", False, "5 pack‑years, quit"),
        ("Alcohol Use", "—", False, "Occasional"),
        ("Family History of Cancer", "—", False, "Mother: melanoma at 58"),
    ],

    # Treatment regimen
    "arm": "Arm D — Immunotherapy Combination",
    "regimen": "Nivolumab + Ipilimumab",
    "cycle_length": "21",
    "planned_cycles": "4 induction + maintenance nivolumab",
    "treatment_start": "20‑JAN‑2026",
    "treatment_end": "NOV‑2026",

    # Cycle visits
    "cycle1_date": "20‑JAN‑2026",
    "cycle2_date": "10‑FEB‑2026",
    "cycle3_date": "03‑MAR‑2026",

    # AEs
    "aes_page1": [
        ("Fatigue", "21‑JAN‑2026", "Ongoing", "Mild", "Related", "Ongoing"),
        ("Rash (immune‑related)", "25‑JAN‑2026", "Ongoing", "Moderate", "Related", "Ongoing"),
    ],
    "aes_page2": [
        ("Diarrhea (immune‑related colitis)", "05‑FEB‑2026", "12‑FEB‑2026", "Moderate", "Related", "Recovered"),
        ("Hypothyroidism", "15‑FEB‑2026", "Ongoing", "Mild", "Related", "Ongoing"),
    ],

    # Labs
    "hematology": [
        ("Hemoglobin", "13.1", "g/dL", "Normal"),
        ("WBC", "6.2", "x10⁹/L", "Normal"),
        ("Platelets", "298", "x10⁹/L", "Normal"),
        ("Neutrophils", "3.8", "x10⁹/L", "Normal"),
        ("Lymphocytes", "1.0", "x10⁹/L", "Low"),
    ],
    "chemistry": [
        ("ALT", "41", "U/L", "High"),
        ("AST", "33", "U/L", "Normal"),
        ("Creatinine", "0.9", "mg/dL", "Normal"),
        ("BUN", "15", "mg/dL", "Normal"),
        ("Glucose", "112", "mg/dL", "High"),
        ("Sodium", "139", "mmol/L", "Normal"),
        ("Potassium", "4.2", "mmol/L", "Normal"),
    ],

    # Imaging
    "imaging": [
        ("CT Chest", "03‑DEC‑2025", "Right lung nodule; left axillary adenopathy"),
        ("CT Abdomen/Pelvis", "03‑DEC‑2025", "Subcutaneous nodules; no visceral metastasis"),
        ("MRI Brain", "10‑DEC‑2025", "No intracranial metastasis"),
    ],

    # RECIST
    "recist": [
        ("Baseline", "Measurable metastatic disease"),
        ("Cycle 2 Day 1", "Stable Disease (SD)"),
        ("Cycle 3 Day 1", "Partial Response (PR)"),
        ("Cycle 4 Day 1", "PR"),
    ],
    "best_response": "Partial Response (PR)",

    # Survival
    "last_alive": "18‑APR‑2026",
    "progression": "NO",
    "survival_status": "Alive",
    "investigator": "Dr. Samuel Richter",
    "signature_date": "18‑APR‑2026",
}

CRF_PARAMS_CARDIOVASCULAR = {
    "crf_name": "crf_cardiovascular",
    "study_id": "CARD‑2026‑101",
    "site_number": "021",
    "subject_id": "CARD‑021‑5541",
    "screening_number": "SCR‑2026‑774",
    "dob": "15‑FEB‑1960",
    "sex": "Male",
    "ethnicity": "Not Hispanic or Latino",
    "race": "White",
    "height": "175",
    "weight": "84.7",
    "bmi": "27.6",
    "consent_date": "10‑JAN‑2026",

    # Diagnosis
    "primary_site": "Cardiovascular — Acute Coronary Syndrome (NSTEMI)",
    "histology": "Not applicable",
    "diagnosis_date": "05‑JAN‑2026",
    "tnm": "Not applicable",
    "stage": "III",  # You can map CV severity to stages if needed
    "metastatic": "NO",
    "biomarkers": "Troponin‑I: 2.8 ng/mL (elevated), BNP: 420 pg/mL",
    "ki67": "Not applicable",
    "brca": "Not applicable",

    # Target lesions (re‑purposed for CV imaging findings)
    "tl1_loc": "Proximal LAD — 90% stenosis",
    "tl1_diam": "90",  # % stenosis
    "tl2_loc": "Mid RCA — 70% stenosis",
    "tl2_diam": "70",
    "tl3_loc": "Circumflex — 40% stenosis",
    "tl3_diam": "40",
    "baseline_imaging": "Coronary Angiography + Echocardiogram",

    # Non-target lesions
    "ntl1": "Mild left ventricular hypertrophy",
    "ntl2": "Grade I diastolic dysfunction",
    "ntl3": "No pericardial effusion",
    "other_findings": "LVEF 45% (mildly reduced)",

    # ECOG (re‑purposed for functional class)
    "ecog": ["1", "1", "2", "2", "1"],

    # Vitals
    "vital_date": "05‑JAN‑2026",
    "sbp": "152",
    "dbp": "94",
    "hr": "102",
    "rr": "20",
    "temp": "36.8",

    # Concomitant meds
    "conmeds": [
        ("Aspirin", "ACS management", "05‑JAN‑2026", "Ongoing"),
        ("Ticagrelor", "Dual antiplatelet therapy", "05‑JAN‑2026", "Ongoing"),
        ("Atorvastatin 80 mg", "Hyperlipidemia", "05‑JAN‑2026", "Ongoing"),
        ("Metoprolol", "Rate control", "06‑JAN‑2026", "Ongoing"),
        ("Pantoprazole", "Gastroprotection", "06‑JAN‑2026", "Ongoing"),
    ],

    # Medical history
    "medical_history": [
        ("Hypertension", "01‑JUN‑2012", True, "Controlled with medication"),
        ("Hyperlipidemia", "10‑JAN‑2015", True, "On statin therapy"),
        ("Type‑2 Diabetes", "01‑FEB‑2018", True, "On metformin"),
        ("Smoking History", "1980‑2010", False, "30 pack‑years, quit"),
        ("Family History of Heart Disease", "—", False, "Father: MI at 54"),
    ],

    # Treatment regimen (PCI + medical therapy)
    "arm": "Arm A — PCI + Optimal Medical Therapy",
    "regimen": "Percutaneous Coronary Intervention + DAPT + High‑intensity statin",
    "cycle_length": "30",
    "planned_cycles": "12‑month follow‑up",
    "treatment_start": "06‑JAN‑2026",
    "treatment_end": "JAN‑2027",

    # Cycle visits (mapped to follow‑up visits)
    "cycle1_date": "06‑JAN‑2026",  # PCI day
    "cycle2_date": "20‑JAN‑2026",  # 2‑week follow‑up
    "cycle3_date": "20‑FEB‑2026",  # 6‑week follow‑up

    # AEs
    "aes_page1": [
        ("Chest pain (post‑PCI)", "06‑JAN‑2026", "07‑JAN‑2026", "Mild", "Related", "Recovered"),
        ("Hypotension", "06‑JAN‑2026", "06‑JAN‑2026", "Moderate", "Related", "Recovered"),
    ],
    "aes_page2": [
        ("Bruising at access site", "07‑JAN‑2026", "10‑JAN‑2026", "Mild", "Possibly related", "Recovered"),
        ("Dyspnea (ticagrelor‑related)", "15‑JAN‑2026", "Ongoing", "Mild", "Related", "Ongoing"),
    ],

    # Labs
    "hematology": [
        ("Hemoglobin", "13.8", "g/dL", "Normal"),
        ("WBC", "7.1", "x10⁹/L", "Normal"),
        ("Platelets", "250", "x10⁹/L", "Normal"),
        ("Neutrophils", "4.5", "x10⁹/L", "Normal"),
        ("Lymphocytes", "1.8", "x10⁹/L", "Normal"),
    ],
    "chemistry": [
        ("ALT", "28", "U/L", "Normal"),
        ("AST", "32", "U/L", "Normal"),
        ("Creatinine", "1.0", "mg/dL", "Normal"),
        ("BUN", "19", "mg/dL", "Normal"),
        ("Glucose", "162", "mg/dL", "High"),
        ("Sodium", "138", "mmol/L", "Normal"),
        ("Potassium", "4.5", "mmol/L", "Normal"),
    ],

    # Imaging
    "imaging": [
        ("Coronary Angiography", "05‑JAN‑2026", "Severe LAD stenosis; moderate RCA stenosis"),
        ("Echocardiogram", "06‑JAN‑2026", "LVEF 45%; mild LVH"),
        ("CT Chest", "10‑JAN‑2026", "No pulmonary embolism"),
    ],

    # RECIST (re‑purposed for CV clinical response)
    "recist": [
        ("Baseline", "Severe coronary artery disease"),
        ("Cycle 2 Day 1", "Improved symptoms"),
        ("Cycle 3 Day 1", "Stable condition"),
        ("Cycle 4 Day 1", "Improved exercise tolerance"),
    ],
    "best_response": "Clinically Improved",

    # Survival
    "last_alive": "15‑APR‑2026",
    "progression": "NO",
    "survival_status": "Alive",
    "investigator": "Dr. Laura Stein",
    "signature_date": "15‑APR‑2026",
}

