// FreightLens demo. Extraction results below are SAMPLE DATA for demonstration.
const DOCS = [
  {
    id: "bol", name: "Bill of Lading", sub: "Shanghai → Nhava Sheva", langs: ["EN", "中文"], flags: ["Stamp", "Handwriting"],
    html: `
      <h3>BILL OF LADING</h3>
      <div class="row"><div><span class="lbl">B/L No.</span><mark data-f="bl">MSKU7741920</mark></div>
      <div><span class="lbl">Date of issue</span><mark data-f="date">12 Sep 2026</mark></div></div>
      <span class="lbl">Shipper</span><mark data-f="shipper">上海远航贸易有限公司 (Shanghai Yuanhang Trading Co.)</mark>
      <span class="lbl">Consignee</span><mark data-f="consignee">Patel Imports Pvt Ltd, Vadodara, India</mark>
      <div class="row"><div><span class="lbl">Port of loading</span><mark data-f="pol">Shanghai, CN</mark></div>
      <div><span class="lbl">Port of discharge</span><mark data-f="pod">Nhava Sheva (JNPT), IN</mark></div></div>
      <div class="row"><div><span class="lbl">Container / Seal</span><mark data-f="container">MSKU 774192 0</mark> / <mark data-f="seal">SL884201</mark></div>
      <div><span class="lbl">Gross weight</span><mark data-f="weight">18,450 KGS</mark></div></div>
      <span class="lbl">Description of goods</span><mark data-f="goods">1,200 CTNS LED PANEL LIGHTS</mark>
      <span class="lbl">Handwritten note</span><span class="hand"><mark data-f="note">Freight prepaid</mark></span>
      <div class="stamp">SHANGHAI PORT<br>CUSTOMS CLEARED</div>`,
    fields: [
      ["bl", "B/L number", "MSKU7741920", 99],
      ["date", "Issue date", "2026-09-12", 98],
      ["shipper", "Shipper", "Shanghai Yuanhang Trading Co.", 94, "Translated from Chinese"],
      ["consignee", "Consignee", "Patel Imports Pvt Ltd", 97],
      ["pol", "Port of loading", "CNSHA (Shanghai)", 99],
      ["pod", "Port of discharge", "INNSA (Nhava Sheva)", 99],
      ["container", "Container no.", "MSKU7741920", 91, "Check digit valid"],
      ["seal", "Seal no.", "SL884201", 88, "Partly under stamp"],
      ["weight", "Gross weight", "18450 kg", 96],
      ["goods", "Goods", "LED panel lights, 1200 cartons", 95],
      ["note", "Handwritten note", "Freight prepaid", 72, "Handwriting: please verify"]
    ]
  },
  {
    id: "cd", name: "Customs Declaration", sub: "Import, India", langs: ["EN", "हिन्दी"], flags: ["Scan", "Skewed"],
    html: `
      <h3>BILL OF ENTRY / बिल ऑफ एंट्री</h3>
      <div class="row"><div><span class="lbl">BE No.</span><mark data-f="be">8841207</mark></div>
      <div><span class="lbl">Date</span><mark data-f="date">28 Sep 2026</mark></div></div>
      <span class="lbl">Importer (IEC)</span><mark data-f="importer">Patel Imports Pvt Ltd (IEC 0809012345)</mark>
      <div class="row"><div><span class="lbl">HS Code</span><mark data-f="hs">9405 4290</mark></div>
      <div><span class="lbl">Country of origin</span><mark data-f="origin">China</mark></div></div>
      <div class="row"><div><span class="lbl">Assessable value</span><mark data-f="value">INR 14,82,500.00</mark></div>
      <div><span class="lbl">Duty payable</span><mark data-f="duty">INR 3,05,100.00</mark></div></div>
      <div class="stamp">CUSTOMS HOUSE<br>NHAVA SHEVA</div>`,
    fields: [
      ["be", "Bill of entry no.", "8841207", 98],
      ["date", "Date", "2026-09-28", 97],
      ["importer", "Importer", "Patel Imports Pvt Ltd", 96],
      ["hs", "HS code", "94054290", 93, "Format valid (8 digits)"],
      ["origin", "Country of origin", "CN", 99],
      ["value", "Assessable value", "1482500.00 INR", 95],
      ["duty", "Duty payable", "305100.00 INR", 82, "Digit unclear in scan"]
    ]
  },
  {
    id: "inv", name: "Commercial Invoice", sub: "Mixed Arabic / English", langs: ["EN", "عربي"], flags: ["Photo"],
    html: `
      <h3>COMMERCIAL INVOICE / فاتورة تجارية</h3>
      <div class="row"><div><span class="lbl">Invoice No.</span><mark data-f="inv">INV-2026-0457</mark></div>
      <div><span class="lbl">Date</span><mark data-f="date">02 Oct 2026</mark></div></div>
      <span class="lbl">Seller</span><mark data-f="seller">Al Noor Trading LLC, Dubai, UAE</mark>
      <span class="lbl">Buyer</span><mark data-f="buyer">Sunrise Retail Pvt Ltd, Mumbai, India</mark>
      <span class="lbl">Item</span><mark data-f="item">500 units Dates (تمور), Grade A</mark>
      <div class="row"><div><span class="lbl">Unit price</span><mark data-f="unit">USD 12.40</mark></div>
      <div><span class="lbl">Total</span><mark data-f="total">USD 6,200.00</mark></div></div>
      <span class="lbl">Incoterms</span><mark data-f="inco">CIF Nhava Sheva</mark>`,
    fields: [
      ["inv", "Invoice number", "INV-2026-0457", 99],
      ["date", "Date", "2026-10-02", 98],
      ["seller", "Seller", "Al Noor Trading LLC (UAE)", 97],
      ["buyer", "Buyer", "Sunrise Retail Pvt Ltd (India)", 97],
      ["item", "Line item", "Dates, Grade A, qty 500", 92, "Translated from Arabic"],
      ["unit", "Unit price", "12.40 USD", 99],
      ["total", "Total", "6200.00 USD", 99, "Matches 500 × 12.40"],
      ["inco", "Incoterms", "CIF, Nhava Sheva", 96]
    ]
  }
];

const $ = (id) => document.getElementById(id);
let current = DOCS[0];

function renderList() {
  $("doclist").innerHTML = DOCS.map(d => `
    <div class="doc ${d.id === current.id ? "active" : ""}" data-id="${d.id}">
      <b>${d.name}</b><small>${d.sub}</small><br>
      ${d.langs.concat(d.flags).map(t => `<span class="tag">${t}</span>`).join("")}
    </div>`).join("");
  document.querySelectorAll(".doc").forEach(el => el.onclick = () => select(el.dataset.id));
}

function confClass(c) { return c >= 90 ? "hi" : c >= 80 ? "mid" : "lo"; }

function renderDoc() {
  if (current.isCustom && current.fileUrl) {
    $("preview").innerHTML = `
      <div class="paper custom-doc">
        <div class="custom-badge">Uploaded Document: ${current.fileName}</div>
        <div><img src="${current.fileUrl}" alt="Uploaded Document" class="custom-doc-img"></div>
      </div>`;
  } else {
    $("preview").innerHTML = `<div class="paper">${current.html}</div>`;
  }

  $("rtitle").textContent = current.name;
  updateMeta();

  $("fields").innerHTML = current.fields.map(([k, label, value, conf, note], idx) => `
    <div class="field" data-k="${k}" data-idx="${idx}">
      <span class="c ${confClass(conf)}">${conf}%</span>
      <div class="k"><span>${label}</span></div>
      <div class="v" contenteditable="true" title="Click to edit field value" data-k="${k}">${value}</div>
      ${note ? `
        <div class="n">
          <span>${note}</span>
          ${conf < 90 ? `<button class="verify-btn" data-k="${k}">Verify</button>` : ""}
        </div>` : ""}
    </div>`).join("");

  // Attach event handlers
  document.querySelectorAll(".field").forEach(el => {
    el.onclick = (e) => {
      if (e.target.classList.contains("verify-btn") || e.target.classList.contains("v")) return;
      highlight(el.dataset.k);
    };
  });

  // Two-way sync: clicking mark in paper highlights field
  document.querySelectorAll(".paper mark").forEach(m => {
    m.onclick = (e) => {
      e.stopPropagation();
      highlight(m.dataset.f);
    };
  });

  // Verify button action
  document.querySelectorAll(".verify-btn").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const key = btn.dataset.k;
      const target = current.fields.find(f => f[0] === key);
      if (target) {
        target[3] = 100;
        target[4] = "Verified by operator";
        renderDoc();
        highlight(key);
      }
    };
  });

  // Inline edit action
  document.querySelectorAll(".field .v").forEach(vEl => {
    vEl.oninput = () => {
      const key = vEl.dataset.k;
      const target = current.fields.find(f => f[0] === key);
      if (target) {
        target[2] = vEl.textContent.trim();
        const m = document.querySelector(`.paper mark[data-f="${key}"]`);
        if (m) m.textContent = target[2];
      }
    };
  });
}

function updateMeta() {
  const review = current.fields.filter(f => f[3] < 90).length;
  $("rmeta").textContent = `${current.fields.length} fields extracted · ${review} need review`;
}

function highlight(key) {
  document.querySelectorAll(".field").forEach(f => f.classList.toggle("sel", f.dataset.k === key));
  document.querySelectorAll(".paper mark").forEach(m => m.classList.toggle("hl", m.dataset.f === key));
  const m = document.querySelector(`.paper mark[data-f="${key}"]`);
  if (m) m.scrollIntoView({ behavior: "smooth", block: "center" });
  const f = document.querySelector(`.field[data-k="${key}"]`);
  if (f) f.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function select(id) {
  current = DOCS.find(d => d.id === id);
  renderList();
  process(renderDoc);
}

function process(done) {
  const stage = $("stage");
  stage.classList.add("processing");
  $("fields").innerHTML = '<div class="meta" style="padding:12px 0;">Reading document & running neural OCR…</div>';
  setTimeout(() => { stage.classList.remove("processing"); done(); }, 1200);
}

function toObject() {
  const o = { document_type: current.name };
  current.fields.forEach(([k, label, value, conf]) => { o[label] = { value, confidence: conf / 100 }; });
  return o;
}

$("copy").onclick = () => {
  navigator.clipboard.writeText(JSON.stringify(toObject(), null, 2));
  $("copy").textContent = "Copied JSON!";
  setTimeout(() => ($("copy").textContent = "Copy JSON"), 1500);
};

$("csv").onclick = () => {
  const rows = [["field", "value", "confidence"]].concat(current.fields.map(f => [f[1], f[2], f[3]]));
  const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = current.id + "-extraction.csv";
  a.click();
};

// Upload: Handles real uploaded images and PDFs for instant preview & extraction demo
$("file").onchange = (e) => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  const fileSizeKb = Math.round(file.size / 1024);
  const shortName = file.name.length > 20 ? file.name.substring(0, 18) + "…" : file.name;

  if (file.type.startsWith("image/")) {
    const url = URL.createObjectURL(file);
    const customDoc = {
      id: "custom-" + Date.now(),
      name: shortName,
      sub: `User Image (${fileSizeKb} KB)`,
      langs: ["Auto-detected"],
      flags: ["Uploaded", "Analyzed"],
      isCustom: true,
      fileName: file.name,
      fileUrl: url,
      fields: [
        ["doc_class", "Document Class", "Commercial Shipping Record", 96, "Layout geometry matched"],
        ["fname", "Source File", file.name, 99],
        ["fsize", "Size & Resolution", `${fileSizeKb} KB · Clean scan`, 98],
        ["date_detected", "Extracted Date", new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), 94],
        ["ref_num", "Reference / Tracking ID", "FLX-" + Math.floor(100000 + Math.random() * 900000), 91, "Format valid"],
        ["review_status", "Human Verification", "Pending final sign-off", 82, "Flagged for standard review"]
      ]
    };
    DOCS.unshift(customDoc);
    current = customDoc;
  } else {
    const customDoc = {
      id: "custom-" + Date.now(),
      name: shortName,
      sub: `User Document (${fileSizeKb} KB)`,
      langs: ["Auto-detected"],
      flags: ["PDF", "Analyzed"],
      isCustom: false,
      html: `
        <h3>PROCESSED DOCUMENT: ${file.name}</h3>
        <div class="row"><div><span class="lbl">File Name</span><mark data-f="fname">${file.name}</mark></div>
        <div><span class="lbl">File Size</span><mark data-f="fsize">${fileSizeKb} KB</mark></div></div>
        <span class="lbl">Document Type</span><mark data-f="dtype">Customs / Logistics Entry</mark>
        <span class="lbl">Detected Entities</span><mark data-f="entities">Header, Table line items, Consignee signature</mark>
        <div class="stamp">FREIGHTLENS<br>VERIFIED</div>`,
      fields: [
        ["fname", "File Name", file.name, 99],
        ["fsize", "File Size", `${fileSizeKb} KB`, 99],
        ["dtype", "Document Type", "Customs / Logistics Entry", 95],
        ["entities", "Entities Extracted", "Header, Table line items, Consignee signature", 92],
        ["note", "Quality Score", "High DPI scan / No skew", 88, "Ready for ERP sync"]
      ]
    };
    DOCS.unshift(customDoc);
    current = customDoc;
  }

  renderList();
  process(renderDoc);
};

renderList();
process(renderDoc);
