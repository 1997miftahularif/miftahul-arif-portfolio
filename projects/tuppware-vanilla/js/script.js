/**
 * Tuppware Website
 * File: js/script.js
 * Interaksi katalog, pencarian, navigasi, keranjang, dan newsletter.
 */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const elements = {
    toast: document.getElementById("toast"),
    cartCount: document.getElementById("cartCount"),
    cartButton: document.getElementById("cartButton"),
    accountButton: document.getElementById("accountButton"),
    menuButton: document.getElementById("menuButton"),
    navigation: document.getElementById("navigation"),
    searchForm: document.getElementById("searchForm"),
    searchInput: document.getElementById("searchInput"),
    productGrid: document.getElementById("productGrid"),
    emptyState: document.getElementById("emptyState"),
    filterButtons: [...document.querySelectorAll(".filter-button")],
    productCards: [...document.querySelectorAll(".product-card")],
    showAllButton: document.getElementById("showAllButton"),
    newsletterForm: document.getElementById("newsletterForm"),
  };

  const state = {
    cartCount: 0,
    activeFilter: "Semua",
    toastTimer: null,
  };

  /**
   * Tampilkan pesan singkat yang dapat dibaca screen reader.
   * @param {string} message Pesan notifikasi.
   */
  function showToast(message) {
    elements.toast.textContent = message;
    elements.toast.classList.add("is-visible");

    window.clearTimeout(state.toastTimer);
    state.toastTimer = window.setTimeout(() => {
      elements.toast.classList.remove("is-visible");
    }, 2400);
  }

  /**
   * Perbarui kartu produk berdasarkan kategori dan kata kunci pencarian.
   */
  function updateProducts() {
    const query = elements.searchInput.value.trim().toLocaleLowerCase("id-ID");
    let visibleCount = 0;

    elements.productCards.forEach((card) => {
      const categoryMatches =
        state.activeFilter === "Semua" ||
        card.dataset.category === state.activeFilter;

      const searchableText = [
        card.dataset.name,
        card.dataset.category,
        card.textContent,
      ]
        .join(" ")
        .toLocaleLowerCase("id-ID");

      const queryMatches = searchableText.includes(query);
      const shouldShow = categoryMatches && queryMatches;

      card.hidden = !shouldShow;

      if (shouldShow) {
        visibleCount += 1;
      }
    });

    elements.emptyState.hidden = visibleCount > 0;
  }

  /**
   * Aktifkan satu filter kategori dan sinkronkan tombol filter.
   * @param {string} category Nama kategori.
   */
  function setActiveFilter(category) {
    state.activeFilter = category;

    elements.filterButtons.forEach((button) => {
      const isActive = button.dataset.filter === category;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    updateProducts();
  }

  // Tambahkan produk ke keranjang demo.
  document.querySelectorAll(".add-button").forEach((button) => {
    button.addEventListener("click", () => {
      state.cartCount += 1;
      elements.cartCount.textContent = String(state.cartCount);
      showToast(`${button.dataset.product} ditambahkan ke keranjang (demo).`);
    });
  });

  // Tandai produk sebagai favorit.
  document.querySelectorAll(".favorite-button").forEach((button) => {
    button.addEventListener("click", () => {
      const isFavorite = button.getAttribute("aria-pressed") !== "true";

      button.setAttribute("aria-pressed", String(isFavorite));
      button.textContent = isFavorite ? "♥" : "♡";

      const productName = button
        .closest(".product-card")
        .querySelector("h3").textContent;

      showToast(
        isFavorite
          ? `${productName} ditambahkan ke favorit.`
          : `${productName} dihapus dari favorit.`
      );
    });
  });

  // Filter produk berdasarkan kategori.
  elements.filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveFilter(button.dataset.filter);
    });
  });

  // Klik kartu kategori akan menerapkan filter yang sesuai.
  document.querySelectorAll(".category-card").forEach((categoryLink) => {
    categoryLink.addEventListener("click", () => {
      setActiveFilter(categoryLink.dataset.category);
    });
  });

  // Pencarian dilakukan saat form disubmit.
  elements.searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    setActiveFilter("Semua");
    document.getElementById("produk").scrollIntoView({ behavior: "smooth" });
  });

  // Reset pencarian dan filter.
  elements.showAllButton.addEventListener("click", () => {
    elements.searchInput.value = "";
    setActiveFilter("Semua");
  });

  // Menu navigasi mobile.
  elements.menuButton.addEventListener("click", () => {
    const isOpen = elements.navigation.classList.toggle("is-open");

    elements.menuButton.setAttribute("aria-expanded", String(isOpen));
    elements.menuButton.setAttribute(
      "aria-label",
      isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
    );
  });

  // Tutup menu mobile setelah tautan dipilih.
  elements.navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      elements.navigation.classList.remove("is-open");
      elements.menuButton.setAttribute("aria-expanded", "false");
    });
  });

  // Tombol akun dan keranjang masih berupa demo front-end.
  elements.accountButton.addEventListener("click", () => {
    showToast("Fitur akun belum terhubung.");
  });

  elements.cartButton.addEventListener("click", () => {
    showToast(`Jumlah produk di keranjang: ${state.cartCount} (demo).`);
  });

  // Newsletter hanya memberi umpan balik lokal, belum mengirim data ke server.
  elements.newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    showToast("Terima kasih! Form ini masih berupa demo.");
    elements.newsletterForm.reset();
  });

  // Inisialisasi aria-pressed untuk tombol filter.
  elements.filterButtons.forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.filter === state.activeFilter)
    );
  });

  updateProducts();
});

// Jika file foto produk belum ada, sembunyikan ikon gambar rusak
document.querySelectorAll('img').forEach((img) => {
  const markMissing = () => img.classList.add('is-missing');
  img.addEventListener('error', markMissing);
  if (img.complete && img.naturalWidth === 0) markMissing();
});
