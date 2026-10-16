# FreightLens

> **Turn messy freight paperwork into clean, structured, validated data.**

FreightLens is an enterprise document intelligence platform engineered specifically for global logistics, freight forwarders, and customs brokers. It automates the extraction of mission-critical data from shipping and customs paperwork—even across multilingual text, degraded scans, low-resolution phone photos, official rubber stamps, and handwritten annotations.

---

## Overview & Problem Solved

Every international shipment generates a stack of 15+ complex documents. In traditional supply chain operations, operators manually re-type container numbers, HS codes, declared values, and consignee details into ERPs and Transportation Management Systems (TMS).

* **Hours of Manual Data Entry:** Logistics teams lose valuable time transcribing multi-page paperwork across inconsistent layouts.
* **Costly Errors & Delays:** A single mistyped digit can cause port container holds, customs penalties, and expensive demurrage charges.
* **Messy Real-World Scans:** Real-world documents arrive as skewed faxes, mobile snapshots, and stamped forms that standard OCR tools fail to parse accurately.

---

## Product Features

### 1. Robust Real-World Document Parsing
* **Multilingual Extraction:** Seamlessly reads English, Chinese, Arabic, Hindi, Spanish, and multi-language mixed documents.
* **Low-Quality Scan Resilience:** Handles low-resolution, rotated, skewed, faded, or photographed paperwork without manual pre-processing.
* **Stamp & Overlay Separation:** Extracts underlying fields accurately even when official port stamps, customs seals, or signatures overlap the text.
* **Handwriting Recognition:** Detects handwritten notations, amendments, and shipping marks, automatically flagging them for operator verification.

### 2. Intelligent Data Validation
* **Field Confidence Scoring:** Every extracted field receives a calibrated confidence score (High, Medium, Low) for transparent data quality.
* **Automated Format Validation:** Built-in validation rules verify ISO container numbers (check-digit calculation), HS tariff code structures, and math checks on commercial invoice line items.
* **Two-Way Source Highlighting:** Interactive visual audit trail—clicking any extracted field in the data panel instantly highlights and scrolls to the exact source text on the document paper, and vice versa.

### 3. Human-in-the-Loop Review & Export
* **Inline Operator Verification:** Low-confidence or flagged fields can be reviewed and edited inline with immediate status updates.
* **Instant Structured Export:** Export validated data with a single click as clean JSON or CSV for direct ingestion into modern ERPs, WMS, and TMS platforms.
* **Custom Document Upload & Testing:** Test your own paperwork with interactive visual scanning animation and instant layout analysis.

---

## Supported Document Types

* **Ocean & Air Bills of Lading (B/L):** B/L numbers, shipper, consignee, port of loading (POL), port of discharge (POD), container/seal numbers, gross weight, and freight terms.
* **Customs Declarations & Bills of Entry:** Bill of entry numbers, importer IEC, HS tariff codes, country of origin, assessable values, and duty calculations.
* **Commercial Invoices & Packing Lists:** Invoice numbers, dates, buyer/seller entities, itemized product tables, unit prices, totals, and Incoterms (CIF, FOB, etc.).

---

## Interactive Demo

Experience the interactive prototype live:  
👉 **[Open FreightLens Interactive Demo](https://freightdoclens.com/demo.html)**
