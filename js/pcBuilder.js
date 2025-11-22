// pcBuilder.js - lógica simple del PC Builder
(function () {
  const builderSelection = document.getElementById("builderSelection");
  const stepBtns = document.querySelectorAll(".step");
  const buildList = document.getElementById("buildList");
  const buildTotalEl = document.getElementById("buildTotal");
  const addBuildBtn = document.getElementById("addBuildToCart");

  const ordenPasos = ["cpu", "motherboard", "cooler", "ram", "gpu", "storage", "psu", "case"];
  const builderSteps = {
    cpu: "Procesador",
    motherboard: "Motherboard",
    cooler: "Refrigeración",
    ram: "Memoria RAM",
    gpu: "Tarjeta de Video",
    storage: "Almacenamiento",
    psu: "Fuente de Poder",
    case: "Gabinete",
  };

  let pcBuild = {
    cpu: null,
    motherboard: null,
    cooler: null,
    ram: null,
    gpu: null,
    storage: null,
    psu: null,
    case: null,
  };
  let selectedCategory = "cpu";

  function renderBuilderOptions(category) {
    selectedCategory = category;
    if (!builderSelection) return;
    builderSelection.innerHTML = "";

    // platform selector only for cpu step (simple)
    if (category === "cpu") {
      const cpus = window.__PRODUCTS.filter((p) => p.categoria === "cpu");
      cpus.forEach((cpu) => builderSelection.appendChild(window.productUI.createCard(cpu)));
      attachSelectionListeners();
      return;
    }

    const options = window.__PRODUCTS.filter((p) => p.categoria === category);
    if (options.length === 0) {
      builderSelection.innerHTML = `<p class="empty-msg">No hay componentes en ${category}.</p>`;
      return;
    }
    options.forEach((o) => builderSelection.appendChild(window.productUI.createCard(o)));
    attachSelectionListeners();
  }

  function attachSelectionListeners() {
    builderSelection.querySelectorAll(".btn.btn--primary[data-id]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = Number(btn.dataset.id);
        const prod = window.__PRODUCTS.find((x) => x.id === id);
        if (!prod) return;
        // toggle
        if (pcBuild[selectedCategory] && pcBuild[selectedCategory].id === id) pcBuild[selectedCategory] = null;
        else pcBuild[selectedCategory] = prod;
        updateBuildSummary();
        // if next step exists, activate it
        const idx = ordenPasos.indexOf(selectedCategory);
        if (idx >= 0 && idx < ordenPasos.length - 1) {
          const next = ordenPasos[idx + 1];
          const nextBtn = document.querySelector(`.step[data-category="${next}"]`);
          if (nextBtn) {
            nextBtn.click();
          }
        }
      });
    });
  }

  function updateBuildSummary() {
    if (!buildList || !buildTotalEl || !addBuildBtn) return;
    buildList.innerHTML = "";
    let total = 0;
    let count = 0;
    Object.keys(pcBuild).forEach((key) => {
      const comp = pcBuild[key];
      if (comp) {
        count++;
        total += comp.precio;
        const li = document.createElement("li");
        li.innerHTML = `<span><strong style="color:var(--primary)">${builderSteps[key]}:</strong> ${comp.nombre}</span>
                        <div class="build-item-price-actions"><span>${window.utils.formatPrice(comp.precio)}</span>
                        <button class="btn-mini-delete" data-key="${key}">X</button></div>`;
        buildList.appendChild(li);
      }
    });
    buildTotalEl.textContent = window.utils.formatPrice(total);
    addBuildBtn.disabled = count === 0;

    // attach remove buttons
    buildList.querySelectorAll(".btn-mini-delete").forEach((b) => {
      b.addEventListener("click", () => {
        const k = b.dataset.key;
        pcBuild[k] = null;
        updateBuildSummary();
        renderBuilderOptions(k);
      });
    });
  }

  // steps event listeners
  stepBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      stepBtns.forEach((b) => b.classList.remove("active"));
      e.currentTarget.classList.add("active");
      renderBuilderOptions(e.currentTarget.dataset.category);
    });
  });

  // add build to cart
  if (addBuildBtn) {
    addBuildBtn.addEventListener("click", () => {
      const detalles = [];
      let totalPrecio = 0;
      for (const k of ordenPasos) {
        if (pcBuild[k]) {
          detalles.push({ categoria: builderSteps[k], nombre: pcBuild[k].nombre });
          totalPrecio += pcBuild[k].precio;
        }
      }
      if (detalles.length === 0) return alert("Selecciona al menos un componente.");
      const buildItem = {
        id: Date.now(),
        nombre: `PC Personalizada (${detalles.length}/${ordenPasos.length})`,
        precio: totalPrecio,
        img: "assets/img/build-default.png",
        cantidad: 1,
        detalles,
      };
      window.cartAdd(buildItem);
      // reset build
      pcBuild = {
        cpu: null,
        motherboard: null,
        cooler: null,
        ram: null,
        gpu: null,
        storage: null,
        psu: null,
        case: null,
      };
      updateBuildSummary();
      const firstStep = document.querySelector('.step[data-category="cpu"]');
      if (firstStep) firstStep.click();
    });
  }

  // init
  document.addEventListener("DOMContentLoaded", () => {
    const first = document.querySelector('.step[data-category="cpu"]');
    if (first) first.click();
    updateBuildSummary();
  });

  window.pcBuilderAPI = {
    renderBuilderOptions,
    getBuild: () => pcBuild,
  };
})();
