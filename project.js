/* Halaman detail project: project.html?id=<id>  (data dari projects-data.js) */
const root = document.getElementById("project-root");
const list = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];

const KICKER = {
  automation: "AUTOMATION CASE STUDY",
  design: "DESIGN CASE STUDY",
  data: "DATA ANALYSIS CASE STUDY",
};

const esc = (value = "") =>
  String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const slug = (t = "") => String(t).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const projectId = (p) => p.id || slug(p.title);
const isHex = (v) => /^#[0-9a-fA-F]{3,8}$/.test(v);

document.getElementById("year") && (document.getElementById("year").textContent = new Date().getFullYear());

const id = new URLSearchParams(location.search).get("id");
const index = list.findIndex((p) => projectId(p) === id);

if (index === -1) {
  document.title = "Project not found — Miftahul Arif";
  root.innerHTML = `
    <div class="not-found">
      <a class="back" href="index.html#more-projects">← Back to projects</a>
      <h1>Project not found.</h1>
      <p class="hero-copy">This project link may be outdated. Please pick a project from the list.</p>
    </div>`;
} else {
  render(list[index]);
}

function render(p) {
  const d = p.detail || {};
  document.title = `${p.title} — Miftahul Arif`;

  const meta = (d.meta || [])
    .map((m) => `<article class="case-card"><span class="card-label">${esc(String(m.label).toUpperCase())}</span><p>${esc(m.value)}</p></article>`)
    .join("");

  const stats = (d.stats || [])
    .map((s) => `<article class="case-card stat-card"><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></article>`)
    .join("");

  const sections = (d.sections || [])
    .map((s, i) => {
      const num = String(i + 1).padStart(2, "0");
      const text = s.text ? `<p>${esc(s.text)}</p>` : "";
      const bullets = s.bullets && s.bullets.length ? `<ul>${s.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : "";
      return `<article class="case-card"><span class="card-label">${num}</span><h3>${esc(s.title)}</h3>${text}${bullets}</article>`;
    })
    .join("");

  const palette = (d.palette || [])
    .filter((c) => isHex(c.hex))
    .map((c) => `<div><i style="background:${c.hex}"></i><span><strong>${esc(c.name)}</strong><span>${esc(c.hex.toUpperCase())}</span></span></div>`)
    .join("");

  const gallery = (d.gallery || [])
    .map((g) => {
      const visual = g.src
        ? `<button class="zoom" type="button" data-src="${esc(g.src)}" data-caption="${esc(g.caption || "")}" aria-label="Enlarge image: ${esc(g.caption || p.title)}"><img src="${esc(g.src)}" alt="${esc(g.caption || p.title)}" loading="lazy"></button>`
        : `<div class="ph">IMAGE PLACEHOLDER</div>`;
      return `<figure class="screenshot-card">${visual}<figcaption><strong>${esc(g.caption || "")}</strong></figcaption></figure>`;
    })
    .join("");

  const links = (d.links || [])
    .map((l, i) => {
      const external = /^https?:\/\//.test(l.url);
      return `<a class="button ${i === 0 ? "primary" : "secondary"}" href="${esc(l.url)}"${external ? ' target="_blank" rel="noopener"' : ""}>${esc(l.label)}</a>`;
    })
    .join("");

  const next = list.length > 1 ? list[(index + 1) % list.length] : null;
  const nextHtml = next
    ? `<a class="next-project" href="project.html?id=${encodeURIComponent(projectId(next))}"><span><small>NEXT PROJECT</small><strong>${esc(next.title)}</strong></span><b>→</b></a>`
    : "";

  root.innerHTML = `
    <a class="back" href="index.html#more-projects">← Back to projects</a>
    ${p.draft ? '<div class="template-note">SAMPLE — this is placeholder content. Replace it with your real project in projects-data.js.</div>' : ""}
    <div class="case-header">
      <p class="section-kicker">${esc(KICKER[p.category] || "CASE STUDY")}${p.year ? " · " + esc(p.year) : ""}</p>
      <h1>${esc(p.title)}</h1>
      <p class="hero-copy">${esc(d.overview || p.summary)}</p>
      <div class="tags">${(p.tags || []).map((t) => `<span>${esc(t)}</span>`).join("")}</div>
    </div>
    ${meta ? `<section class="meta-grid">${meta}</section>` : ""}
    ${stats ? `<section class="case-section"><p class="section-kicker">KEY NUMBERS</p><div class="case-grid three">${stats}</div></section>` : ""}
    ${sections ? `<section class="case-section"><p class="section-kicker">THE STORY</p><div class="case-grid two">${sections}</div></section>` : ""}
    ${palette ? `<section class="case-section"><p class="section-kicker">COLOR PALETTE</p><div class="palette">${palette}</div></section>` : ""}
    ${gallery ? `<section class="case-section"><p class="section-kicker">GALLERY</p><div class="screenshot-grid gallery-grid">${gallery}</div></section>` : ""}
    <section class="case-section final-case">
      <div class="hero-actions">${links}<a class="button secondary" href="index.html#contact">Contact Miftahul</a></div>
      ${nextHtml}
    </section>`;

  setupLightbox();
}

function setupLightbox() {
  const box = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  const cap = document.getElementById("lightbox-caption");
  const close = () => box.classList.remove("open");

  root.querySelectorAll(".zoom").forEach((btn) => {
    btn.addEventListener("click", () => {
      img.src = btn.dataset.src;
      img.alt = btn.dataset.caption;
      cap.textContent = btn.dataset.caption;
      box.classList.add("open");
    });
  });
  box.addEventListener("click", close);
  document.addEventListener("keydown", (e) => e.key === "Escape" && close());
}
