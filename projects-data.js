/*
  ============================================================
  DAFTAR PROJECT TAMBAHAN  (edit file ini untuk menambah project)
  ============================================================
  Setiap kartu di "More Work" otomatis bisa diklik dan membuka
  halaman detail:  project.html?id=<id>

  Field kartu
    id        : unik, huruf kecil + tanda minus (dipakai di URL)
    category  : "automation" | "design" | "data"
    title, year, summary, tags[]
    image     : cover kartu ("" = placeholder)
    link      : OPSIONAL. Isi hanya jika ingin kartu membuka halaman lain
                (case study buatan sendiri / link eksternal). Kosong = halaman detail otomatis.
    draft     : true -> badge "SAMPLE" (contoh). Hapus jika sudah project asli.

  Field detail  (detail: { ... })  — semuanya opsional
    overview  : paragraf pembuka
    meta      : [{ label, value }]            info singkat (Role, Duration, Tools, ...)
    stats     : [{ value, label }]            angka hasil / insight
    sections  : [{ title, text, bullets[] }]  bagian cerita (masalah, proses, hasil, ...)
    palette   : [{ name, hex }]               palet warna
    gallery   : [{ src, caption }]            gambar (klik untuk memperbesar); src "" = placeholder
    links     : [{ label, url }]              tombol di bagian bawah
*/
const PDF_PORTFOLIO = {
  label: "Open full Creative & Marketing Portfolio (PDF) ↗",
  url: "assets/files/Creative_and_Marketing_Portfolio_Miftahul_Arif.pdf",
};
const IMG = "assets/images/projects/design/";

window.PROJECTS = [
  // ---------- DESIGN (dari Creative & Marketing Portfolio PDF) ----------
  {
    id: "sisi-kreatif",
    category: "design",
    title: "Sisi Kreatif — Brand Identity & Website Design",
    year: "",
    summary: "A complete brand system for a creative agency: logo, visual identity, brand guidelines, collateral, social media and UI direction.",
    tags: ["Branding", "Logo Design", "Visual Identity", "Figma", "Illustrator", "Photoshop"],
    image: IMG + "sisi-kreatif-01-overview.jpg",
    detail: {
      overview: "Sisi Kreatif is a creative agency focused on helping brands grow through strategic design, visual identity, and digital experiences. The goal was a professional, trustworthy identity that reflects creativity, modernity, and strategic thinking.",
      meta: [
        { label: "Project type", value: "Branding" },
        { label: "Duration", value: "4 weeks" },
        { label: "My role", value: "Brand Strategist, Designer, Art Director" },
        { label: "Tools", value: "Figma, Illustrator, Photoshop" },
      ],
      sections: [
        {
          title: "The problem",
          bullets: [
            "Lack of a distinct brand identity in a competitive creative industry.",
            "Unclear positioning, making it harder to build trust with potential clients.",
            "An outdated digital presence that did not reflect professionalism.",
          ],
        },
        {
          title: "The goal",
          bullets: [
            "Build a modern, memorable, and professional identity.",
            "Clarify positioning and communicate expertise and unique value.",
            "Establish a modern presence with a professional website and digital assets.",
          ],
        },
        {
          title: "Research & direction",
          text: "Moodboard, typography and color exploration, plus a competitor analysis of Ramotion, Clay, and Halo Lab. The analysis showed that competitors focus on enterprise and funded startups, leaving room for more accessible creative services for SMEs. Visual direction keywords: modern, minimal, professional, creative, human. Typeface: General Sans.",
        },
        {
          title: "Sketch exploration",
          text: "More than 40 early sketches were explored. Concept B was selected because it combined perspective, an open frame, and a dynamic 45° angle into one strong, modern identity that is easy to apply across media.",
        },
        {
          title: "Logo development & system",
          text: "The selected concept was refined from sketch to vector and built with geometric precision. The final system includes primary logo and variations, responsive scaling, safe area, minimum size, background compatibility, and color specifications.",
        },
        {
          title: "Application",
          text: "The identity was applied to stationery, merchandise, signage, and digital mockups, then extended into Instagram content (grid, story, carousel) and UI key screens with a style guide.",
        },
        {
          title: "Outcome",
          text: "A cohesive brand presence that strengthens credibility and communicates the value of the agency's creative solutions. Services delivered: Brand Strategy, Logo Design, Visual Identity, Website Design, Brand Guidelines, and Collateral Design.",
        },
      ],
      palette: [
        { name: "Navy", hex: "#0A1A2F" },
        { name: "Blue", hex: "#2563EB" },
        { name: "Gold", hex: "#F59E0B" },
        { name: "Gray", hex: "#E5E7EB" },
        { name: "White", hex: "#FFFFFF" },
      ],
      gallery: [
        { src: IMG + "sisi-kreatif-01-overview.jpg", caption: "Project overview" },
        { src: IMG + "sisi-kreatif-02-problem-goal.jpg", caption: "Problem & goal" },
        { src: IMG + "sisi-kreatif-03-research.jpg", caption: "Research: moodboard, competitors, typography, color" },
        { src: IMG + "sisi-kreatif-04-sketch.jpg", caption: "Sketch exploration" },
        { src: IMG + "sisi-kreatif-05-logo-development.jpg", caption: "Logo development" },
        { src: IMG + "sisi-kreatif-06-logo-system.jpg", caption: "Final logo system" },
        { src: IMG + "sisi-kreatif-07-brand-application.jpg", caption: "Brand application" },
        { src: IMG + "sisi-kreatif-08-social-media.jpg", caption: "Social media" },
        { src: IMG + "sisi-kreatif-09-ui-design.jpg", caption: "UI design" },
      ],
      links: [PDF_PORTFOLIO],
    },
  },
  {
    id: "sedulur-tunggal-kopi",
    category: "design",
    title: "Sedulur Tunggal Kopi — Landing Page",
    year: "",
    summary: "A mobile-friendly landing page that modernizes the digital presence of a traditional Surabaya coffee shop (warkop) while keeping its local warmth.",
    tags: ["Landing Page", "UI Design", "HTML", "CSS", "Brand Colors"],
    image: IMG + "stk-landing-page.jpg",
    detail: {
      overview: "This project modernizes the digital presence of a traditional Surabaya coffee shop without losing the authentic warmth of its gathering culture (\"Srawung & Cangkrukan\"). The layout is mobile-friendly, lightweight, and built to deliver key business information directly to visitors.",
      meta: [
        { label: "Project type", value: "Landing page / UI design" },
        { label: "Focus", value: "Mobile-first, lightweight, local brand continuity" },
        { label: "Built with", value: "HTML, CSS (custom properties)" },
      ],
      sections: [
        {
          title: "Design decision: color",
          text: "The red and yellow palette was taken directly from the venue's physical banner signage, creating brand continuity between the real-world venue and the digital space.",
        },
        {
          title: "Implementation",
          bullets: [
            "Semantic HTML structure for SEO indexability and fast page loads.",
            "Colors managed with CSS custom properties, so future updates and theme changes stay simple.",
            "Interaction highlights designed for quick access to business information.",
          ],
        },
      ],
      palette: [
        { name: "Yellow STK", hex: "#FFCC00" },
        { name: "Red STK", hex: "#D9230F" },
        { name: "Dark base", hex: "#1A1A1A" },
      ],
      gallery: [{ src: IMG + "stk-landing-page.jpg", caption: "Landing page structure, CSS variables, palette, and interactions" }],
      links: [PDF_PORTFOLIO],
    },
  },
  {
    id: "poutcare-social-media",
    category: "design",
    title: "PoutCare — Social Media Design",
    year: "",
    summary: "Engaging social media visuals that make product information easier to understand and strengthen the brand's visual presence.",
    tags: ["Social Media", "Instagram", "Carousel", "Story"],
    image: IMG + "poutcare-social-media.jpg",
    detail: {
      overview: "Visuals created to make product information easier to understand while strengthening PoutCare's visual presence across social media.",
      meta: [
        { label: "Project type", value: "Social media design" },
        { label: "Deliverables", value: "Before/after redesign, Instagram grid, stories, carousel" },
      ],
      sections: [
        {
          title: "What I designed",
          bullets: [
            "A before/after redesign of the feed's look.",
            "A consistent Instagram grid.",
            "Story and carousel formats for product information.",
          ],
        },
      ],
      gallery: [{ src: IMG + "poutcare-social-media.jpg", caption: "Before/after, Instagram grid, story, and carousel" }],
      links: [PDF_PORTFOLIO],
    },
  },
  {
    id: "zoya-social-media",
    category: "design",
    title: "Zoya — Social Media Design",
    year: "",
    summary: "Instagram feed and story designs for a modern modest fashion brand built on elegance, comfort, and confidence.",
    tags: ["Social Media", "Fashion", "Instagram", "Story"],
    image: IMG + "zoya-social-media.jpg",
    detail: {
      overview: "ZOYA is a modern modest fashion brand that combines elegance, comfort, and confidence. With timeless designs and graceful silhouettes, it celebrates femininity and self-expression through simple, refined, and versatile fashion. The social media design reflects that refined tone.",
      meta: [
        { label: "Project type", value: "Social media design" },
        { label: "Deliverables", value: "Instagram feed, grid, and stories" },
      ],
      gallery: [{ src: IMG + "zoya-social-media.jpg", caption: "Instagram, grid, and story designs" }],
      links: [PDF_PORTFOLIO],
    },
  },
  {
    id: "social-media-content-series",
    category: "design",
    title: "Social Media Content Series",
    year: "",
    summary: "Feed designs for Apotek Pahala, Nice for Kids, and Larazeta Restaurant, adapted to each business and audience.",
    tags: ["Social Media", "Content Design", "Layout"],
    image: IMG + "social-media-series.jpg",
    detail: {
      overview: "A series of social media content designs for three different businesses: a pharmacy (Apotek Pahala), a kids' brand (Nice for Kids), and a restaurant (Larazeta Restaurant). Each feed uses its own visual tone for its audience.",
      meta: [
        { label: "Clients", value: "Apotek Pahala, Nice for Kids, Larazeta Restaurant" },
        { label: "Project type", value: "Social media content design" },
      ],
      gallery: [{ src: IMG + "social-media-series.jpg", caption: "Apotek Pahala, Nice for Kids, Larazeta Restaurant" }],
      links: [PDF_PORTFOLIO],
    },
  },

  {
    id: "tuppware-catalog-ui",
    category: "design",
    title: "Tuppware — Catalog Website UI (Vanilla vs Tailwind)",
    year: "2026",
    summary: "One brand, two builds: a product catalog in plain HTML/CSS/JS and a landing page in Tailwind CSS, to compare workflow and maintainability.",
    tags: ["UI Design", "Responsive", "HTML/CSS", "JavaScript", "Tailwind CSS"],
    image: IMG + "tuppware-01-hero.jpg",
    detail: {
      overview: "A concept website for a household-products brand, built twice on purpose. Version 1 is a catalog with search, category filters, a demo cart and a newsletter form, written in plain HTML, CSS and JavaScript. Version 2 is a landing page built only with Tailwind CSS utility classes. The goal was to practice the same visual language with two different approaches.",
      meta: [
        { label: "Project type", value: "UI design & front-end build" },
        { label: "Version 1", value: "HTML5, CSS3, vanilla JavaScript (no framework)" },
        { label: "Version 2", value: "Tailwind CSS (utility classes)" },
        { label: "Status", value: "Concept demo — prices and contacts are sample data" },
      ],
      sections: [
        {
          title: "Version 1 — No framework",
          bullets: [
            "Separated structure: index.html, css/style.css, js/script.js.",
            "CSS custom properties for the purple and pink brand palette.",
            "Product search, category filter, demo cart counter, favorites and newsletter form.",
            "Mobile navigation, semantic HTML and basic accessibility labels.",
          ],
        },
        {
          title: "Version 2 — Tailwind CSS",
          bullets: [
            "Layout and spacing written directly as utility classes in the markup.",
            "Responsive behavior handled with breakpoint prefixes (sm, md, lg).",
            "Collection filter, favorites toggle and mobile menu in a small script.",
            "Custom CSS only for the illustrated bottles; no image files needed.",
          ],
        },
        {
          title: "What I learned from comparing both",
          bullets: [
            "Plain CSS gives full control and clean naming, but needs more files and more discipline as the page grows.",
            "Tailwind is faster for building and adjusting layouts, but markup gets longer and needs consistent patterns.",
            "In both versions the design decisions (spacing, color, hierarchy) mattered more than the tool.",
          ],
        },
      ],
      palette: [
        { name: "Deep purple", hex: "#51258B" },
        { name: "Violet", hex: "#7B4BD1" },
        { name: "Pink", hex: "#ED4CAA" },
        { name: "Soft lilac", hex: "#F4F0F8" },
      ],
      gallery: [
        { src: IMG + "tuppware-01-hero.jpg", caption: "Version 1 — hero and category cards" },
        { src: IMG + "tuppware-03-products.jpg", caption: "Version 1 — product grid with filters" },
        { src: IMG + "tuppware-02-promo.jpg", caption: "Version 1 — promo banner and service highlights" },
        { src: IMG + "tuppware-04-footer.jpg", caption: "Version 1 — newsletter and footer" },
      ],
      links: [
        { label: "Open Version 1 — No framework ↗", url: "projects/tuppware-vanilla/index.html" },
        { label: "Open Version 2 — Tailwind CSS ↗", url: "projects/tuppware-tailwind/index.html" },
      ],
    },
  },

  // ---------- DATA ANALYSIS ----------
  {
    id: "administrative-service-data-analysis",
    category: "data",
    title: "Administrative Service Data Analysis",
    year: "Practice project",
    summary: "Cleaned and analyzed 1,200 fictional service records: duplicates, missing values, KPIs, and an Excel dashboard now readable on the web.",
    tags: ["Excel", "Data Cleaning", "Data Validation", "KPI Reporting", "Dashboard"],
    image: "assets/images/projects/data/administrative-service-dashboard.jpg",
    // Halaman kustom (dashboard interaktif), bukan project.html otomatis:
    link: "projects/administrative-service-data-analysis/index.html",
    linkLabel: "Open the dashboard →",
  },

  // ---------- AUTOMATION (tambahan) ----------
  // { id: "...", category: "automation", title: "...", year: "2026", summary: "...", tags: ["..."], image: "", detail: { ... } },
];
