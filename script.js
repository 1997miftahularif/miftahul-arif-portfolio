const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");

if (toggle) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => links.classList.remove("open"));
});

document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Projects (rendered from projects-data.js) ---------- */
const CATEGORY_LABELS = {
  automation: "AUTOMATION",
  design: "DESIGN",
  data: "DATA ANALYSIS",
};

const esc = (value = "") =>
  String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const slug = (t = "") => String(t).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const projectId = (p) => p.id || slug(p.title);

function projectCard(p) {
  const label = CATEGORY_LABELS[p.category] || String(p.category || "").toUpperCase();
  // Default: halaman detail otomatis. Isi `link` di projects-data.js untuk override.
  const href = p.link || `project.html?id=${encodeURIComponent(projectId(p))}`;
  const external = /^https?:\/\//.test(href);
  const media = p.image
    ? `<img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy">`
    : `<div class="project-card-fallback"><span>${esc(label)}</span></div>`;
  const badge = p.draft ? `<span class="sample-badge">SAMPLE</span>` : "";
  const tags = (p.tags || []).slice(0, 4).map((t) => `<span>${esc(t)}</span>`).join("");

  return `
    <article class="project-card" data-category="${esc(p.category)}">
      <div class="project-card-media">${media}${badge}</div>
      <div class="project-card-body">
        <div class="project-card-top"><span class="cat">${esc(label)}</span><span class="year">${esc(p.year || "")}</span></div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.summary)}</p>
        <div class="tags">${tags}</div>
        <a class="text-link card-link" href="${esc(href)}"${external ? ' target="_blank" rel="noopener"' : ""}>${esc(p.linkLabel || "View details →")}</a>
      </div>
    </article>`;
}

const grid = document.getElementById("project-grid");
const emptyMsg = document.getElementById("project-empty");
const filterButtons = document.querySelectorAll(".filter");
const projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];

if (grid) {
  grid.innerHTML = projects.map(projectCard).join("");

  const applyFilter = (value) => {
    let visible = 0;
    grid.querySelectorAll(".project-card").forEach((card) => {
      const show = value === "all" || card.dataset.category === value;
      card.hidden = !show;
      if (show) visible += 1;
    });
    emptyMsg.hidden = visible > 0;
  };

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => {
        b.classList.toggle("active", b === btn);
        b.setAttribute("aria-pressed", String(b === btn));
      });
      applyFilter(btn.dataset.filter);
    });
  });

  applyFilter("all");

  // Hitung project asli (bukan sample) + 1 project unggulan
  const counter = document.getElementById("project-count");
  if (counter) {
    const total = 1 + projects.filter((p) => !p.draft).length;
    counter.textContent = String(total).padStart(2, "0");
  }
}
