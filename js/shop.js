// shop.js - render de catálogo, filtros y buscador
(function () {
  const container =
    document.getElementById("productsContainer") ||
    document.getElementById("product-grid") ||
    document.getElementById("destacados-list");
  const filters = document.querySelectorAll(".filter-btn");
  const searchInput = document.getElementById("searchInput");

  function renderList(list) {
    if (!container) return;
    container.innerHTML = "";
    if (!list || list.length === 0) {
      container.innerHTML = '<p class="empty-msg">No se encontraron productos.</p>';
      return;
    }
    list.forEach((p) => container.appendChild(window.productUI.createCard(p)));
    attachAddListeners();
  }

  function attachAddListeners() {
    document.querySelectorAll(".btn.btn--primary[data-id]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = Number(btn.dataset.id);
        const prod = window.__PRODUCTS.find((x) => x.id === id);
        if (prod) {
          window.cartAdd(prod);
        }
      });
    });
    // quick view (placeholder)
    document.querySelectorAll(".btn-quick[data-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = Number(btn.dataset.id);
        const p = window.__PRODUCTS.find((x) => x.id === id);
        if (p) window.utils ? alert(`${p.nombre}\n${window.utils.formatPrice(p.precio)}`) : alert(p.nombre);
      });
    });
  }

  // initial render (all)
  document.addEventListener("DOMContentLoaded", () => {
    renderList(window.__PRODUCTS);

    // filters
    filters.forEach((b) => {
      b.addEventListener("click", (e) => {
        filters.forEach((x) => x.classList.remove("active"));
        e.currentTarget.classList.add("active");
        const f = e.currentTarget.dataset.filter;
        if (!f || f === "all") renderList(window.__PRODUCTS);
        else renderList(window.__PRODUCTS.filter((p) => p.categoria === f));
      });
    });

    // search (if exists)
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const q = e.target.value.trim().toLowerCase();
        if (!q) renderList(window.__PRODUCTS);
        else renderList(window.__PRODUCTS.filter((p) => p.nombre.toLowerCase().includes(q)));
      });
    }
  });

  // expose for debugging
  window.shopRender = renderList;
})();
