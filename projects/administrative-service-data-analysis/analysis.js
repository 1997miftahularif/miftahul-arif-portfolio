/* Renders the dashboard from analysis-data.js (aggregated, fictional data). No external libraries. */
const A = window.ANALYSIS;
const $ = (sel) => document.querySelector(sel);
const fmt = (n) => Number(n).toLocaleString("en-US");
const esc = (v = "") => String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const sortBy = (arr, key) => [...arr].sort((a, b) => b[key] - a[key]);
const MONTH_FULL = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

$("#year").textContent = new Date().getFullYear();

const K = A.kpi, Q = A.quality;
const months = A.monthly;
const named = A.district.filter((d) => d.name !== "Unknown");

/* ---------- Headline numbers ---------- */
const kpis = [
  { value: fmt(K.total), label: "Unique records", basis: `${fmt(Q.rawRows)} raw rows − ${Q.duplicates} duplicates` },
  { value: K.completionRate + "%", label: "Completion rate", basis: `${fmt(K.completed)} completed ÷ ${fmt(K.total)} records` },
  { value: K.avgDays.toFixed(1), label: "Avg. processing days", basis: "Mean of Processing_Days, cleaned data" },
  { value: fmt(K.pending), label: "Pending applications", basis: `${fmt(K.inProgress)} in progress, ${K.rejected} rejected` },
];
$("#kpis").innerHTML = kpis
  .map((k) => `<article class="kpi"><strong>${esc(k.value)}</strong><h3>${esc(k.label)}</h3><p>${esc(k.basis)}</p></article>`)
  .join("");

/* ---------- Business questions & answers (computed) ---------- */
const mHigh = sortBy(months, "total")[0], mLow = sortBy(months, "total").slice(-1)[0];
const dTop = sortBy(named, "total");
const sTop = sortBy(A.service, "total");
const dSlow = sortBy(named, "avgDays");
const dFast = dSlow[dSlow.length - 1];
const spread = (dSlow[0].avgDays - dFast.avgDays).toFixed(1);

const qa = [
  ["How many applications were received each month?",
   `${mLow.total} (${MONTH_FULL[+mLow.m.slice(5) - 1]}) to ${mHigh.total} (${MONTH_FULL[+mHigh.m.slice(5) - 1]}), averaging ${Math.round(K.total / 12)} a month.`],
  ["What percentage of applications were completed?",
   `${K.completionRate}%: ${fmt(K.completed)} of ${fmt(K.total)}. The rest: ${K.inProgress} in progress, ${K.pending} pending, ${K.rejected} rejected.`],
  ["Which districts have the highest application volume?",
   `${dTop[0].name} (${dTop[0].total}), then ${dTop[1].name} (${dTop[1].total}) and ${dTop[2].name} (${dTop[2].total}).`],
  ["Which service types are most requested?",
   `${sTop[0].name} with ${sTop[0].total} (${(sTop[0].total / K.total * 100).toFixed(1)}%), then ${sTop[1].name} (${sTop[1].total}) and ${sTop[2].name} (${sTop[2].total}).`],
  ["Which districts have longer average processing times?",
   `${dSlow[0].name} (${dSlow[0].avgDays.toFixed(2)} days) and ${dSlow[1].name} (${dSlow[1].avgDays.toFixed(2)}); ${dFast.name} is shortest (${dFast.avgDays.toFixed(2)}). Only ${spread} days separate them.`],
  ["What data-quality problems exist in the raw dataset?",
   `${Q.duplicates} duplicate rows, ${Q.missingDistrictRaw} missing districts, ${Q.missingAgeRaw} missing ages, and ${Q.serviceLabelRaw + Q.statusLabelRaw} inconsistently written labels.`],
  ["What could improve administrative service operations?",
   "Monthly monitoring, status-ageing targets, stricter data entry, written KPI rules, and a review of missing data. Details below."],
];
$("#qa").innerHTML = qa.map(([q, a]) => `<div><dt>${esc(q)}</dt><dd>${esc(a)}</dd></div>`).join("");

/* ---------- Segmented toggle helper ---------- */
function wireToggle(id, onChange) {
  const box = $(id);
  box.querySelectorAll("button").forEach((btn) =>
    btn.addEventListener("click", () => {
      box.querySelectorAll("button").forEach((b) => {
        b.classList.toggle("active", b === btn);
        b.setAttribute("aria-pressed", String(b === btn));
      });
      onChange(btn.dataset.metric);
    })
  );
}

/* ---------- Monthly column chart ---------- */
const PLOT_H = 210;
function renderMonthly(metric) {
  const isRate = metric === "rate";
  const key = isRate ? "rate" : "total";
  const max = isRate ? 100 : Math.max(...months.map((m) => m.total));
  const hi = sortBy(months, key)[0], lo = sortBy(months, key).slice(-1)[0];
  const val = (m) => (isRate ? m.rate.toFixed(1) + "%" : m.total);

  $("#monthly").innerHTML = `<div class="cols" role="img" aria-label="${isRate ? "Completion rate" : "Applications"} by month, January to December 2025">` +
    months.map((m) => {
      const h = Math.max(4, Math.round((m[key] / max) * PLOT_H));
      const cls = m === hi ? " is-max" : m === lo ? " is-min" : "";
      return `<div class="col${cls}" title="${MONTH_FULL[+m.m.slice(5) - 1]}: ${val(m)}${isRate ? "" : " applications"}">
        <span class="col-val">${isRate ? m.rate.toFixed(0) : m.total}</span>
        <div class="col-bar" style="height:${h}px"></div>
        <span class="col-lab">${m.label}</span></div>`;
    }).join("") + "</div>";

  $("#monthly-sub").textContent = isRate
    ? "Completed ÷ total applications in each month, out of 100%."
    : "Number of applications received in each month of 2025.";
  $("#monthly-note").innerHTML = `Highest: <strong>${hi.label}</strong> (${val(hi)}) · Lowest: <strong>${lo.label}</strong> (${val(lo)})` +
    (isRate ? ` · Monthly completion rate stays between ${lo.rate.toFixed(1)}% and ${hi.rate.toFixed(1)}%.` : "");
}
renderMonthly("total");
wireToggle("#monthly-toggle", renderMonthly);

/* ---------- Status stacked bar ---------- */
const STATUS_CLASS = { Completed: "st-completed", "In Progress": "st-progress", Pending: "st-pending", Rejected: "st-rejected" };
$("#status").innerHTML = `
  <div class="stack" role="img" aria-label="Status mix: ${A.status.map((s) => `${s.name} ${s.count}`).join(", ")}">
    ${A.status.map((s) => `<div class="${STATUS_CLASS[s.name]}" style="width:${(s.count / K.total * 100).toFixed(2)}%" title="${s.name}: ${s.count}"></div>`).join("")}
  </div>
  <ul class="legend">
    ${A.status.map((s) => `<li><i class="${STATUS_CLASS[s.name]}"></i><span>${s.name}</span><strong>${fmt(s.count)}</strong><small>${(s.count / K.total * 100).toFixed(1)}%</small></li>`).join("")}
  </ul>`;

/* ---------- Horizontal breakdown (district / service) ---------- */
const METRICS = {
  total: { get: (r) => r.total, fmt: (v) => fmt(v), unit: "applications" },
  avgDays: { get: (r) => r.avgDays, fmt: (v) => v.toFixed(2), unit: "avg. processing days" },
  rate: { get: (r) => r.rate, fmt: (v) => v.toFixed(1) + "%", unit: "completion rate" },
};
function renderBreakdown(sel, rows, metric, labelWidth = 112) {
  const m = METRICS[metric];
  const sorted = [...rows].sort((a, b) => m.get(b) - m.get(a));
  const max = Math.max(...sorted.map(m.get));
  $(sel).innerHTML = `<div class="hbars" style="--lab:${labelWidth}px" role="img" aria-label="${m.unit} by group">` +
    sorted.map((r, i) => `<div class="hrow${r.name === "Unknown" ? " is-unknown" : ""}${i < 3 && r.name !== "Unknown" ? " is-top" : ""}">
      <span class="hname">${esc(r.name)}</span>
      <div class="htrack"><div class="hbar" style="width:${(m.get(r) / max * 100).toFixed(1)}%"></div></div>
      <span class="hval">${m.fmt(m.get(r))}</span></div>`).join("") + "</div>";
}
renderBreakdown("#district", A.district, "total");
renderBreakdown("#service", A.service, "total", 160);
wireToggle("#district-toggle", (mt) => renderBreakdown("#district", A.district, mt));
wireToggle("#service-toggle", (mt) => renderBreakdown("#service", A.service, mt, 160));

/* ---------- Tables ---------- */
const table = (cols, rows) =>
  `<div class="table-wrap"><table class="data-table"><thead><tr>${cols.map((c) => `<th${c.num ? ' class="num"' : ""}>${c.h}</th>`).join("")}</tr></thead>
   <tbody>${rows.map((r) => `<tr>${cols.map((c) => `<td${c.num ? ' class="num"' : ""}>${c.v(r)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;

const groupCols = (first) => [
  { h: first, v: (r) => esc(r.name) },
  { h: "Applications", num: 1, v: (r) => fmt(r.total) },
  { h: "Completed", num: 1, v: (r) => fmt(r.completed) },
  { h: "Completion rate", num: 1, v: (r) => r.rate.toFixed(1) + "%" },
  { h: "Avg. days", num: 1, v: (r) => r.avgDays.toFixed(2) },
];
$("#tables").innerHTML =
  "<h3>Monthly</h3>" + table([
    { h: "Month", v: (r) => r.m },
    { h: "Applications", num: 1, v: (r) => r.total },
    { h: "Completed", num: 1, v: (r) => r.completed },
    { h: "In progress", num: 1, v: (r) => r.inProgress },
    { h: "Pending", num: 1, v: (r) => r.pending },
    { h: "Rejected", num: 1, v: (r) => r.rejected },
    { h: "Completion rate", num: 1, v: (r) => r.rate.toFixed(1) + "%" },
  ], months) +
  "<h3>By district</h3>" + table(groupCols("District"), [...A.district].sort((a, b) => b.total - a.total)) +
  "<h3>By service type</h3>" + table(groupCols("Service type"), [...A.service].sort((a, b) => b.total - a.total));

/* ---------- Data quality table ---------- */
$("#rows-line").textContent = `The raw file had ${fmt(Q.rawRows)} rows; ${fmt(Q.uniqueRecords)} unique records remained after cleaning.`;
const dq = [
  ["Duplicate Record_ID", `${Q.duplicates} rows`, "Removed duplicate rows; kept one row per Record_ID.", `${fmt(Q.uniqueRecords)} unique records`],
  ["Missing District", `${Q.missingDistrictRaw} rows`, "Filled blanks with “Unknown” so the record stays and the gap stays visible.", `${Q.missingDistrictAfterDedup} records flagged Unknown`],
  ["Missing Age", `${Q.missingAgeRaw} rows`, `Filled with the dataset median (${Q.ageMedian}) and stored as an integer.`, "0 missing"],
  ["Inconsistent Service_Type", `${Q.serviceLabelRaw} rows`, "Standardized “social assistance” to “Social Assistance”.", "5 consistent categories"],
  ["Inconsistent Status", `${Q.statusLabelRaw} rows`, "Standardized capitalization, e.g. “completed” to “Completed”.", "4 consistent statuses"],
];
$("#quality").innerHTML =
  "<thead><tr><th>Issue</th><th class=\"num\">Found in raw file</th><th>Treatment</th><th>After cleaning</th></tr></thead><tbody>" +
  dq.map((r) => `<tr><td>${esc(r[0])}</td><td class="num">${esc(r[1])}</td><td>${esc(r[2])}</td><td>${esc(r[3])}</td></tr>`).join("") + "</tbody>";
