/* ========================================================================
   GO TECHSTORE - MAIN CONTROLLER FINAL
   ======================================================================== */

/* --- ESTADO DE DATOS GLOBALES --- */
let carrito = JSON.parse(localStorage.getItem("techStoreCart")) || [];
let pcBuild = {
  cpu: null,
  cooler: null,
  motherboard: null,
  ram: null,
  gpu: null,
  storage: null,
  psu: null,
  case: null,
};
let selectedPlatform = null; // ESTADO: Plataforma elegida ('am5' o 'lga1700')

const builderSteps = {
  cpu: "Procesador",
  cooler: "Refrigeración",
  motherboard: "Placa Madre",
  ram: "Memoria RAM",
  gpu: "Tarjeta de Video",
  storage: "Almacenamiento",
  psu: "Fuente de Poder",
  case: "Gabinete",
};
const ordenPasos = ["cpu", "cooler", "motherboard", "ram", "gpu", "storage", "psu", "case"];

/* --- REFERENCIAS AL DOM (SIMPLIFICADAS) --- */
const shopContainer = document.getElementById("productsContainer");
const filterBtns = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("searchInput");
const builderSelection = document.getElementById("builderSelection");
const stepBtns = document.querySelectorAll(".step");
const buildList = document.getElementById("buildList");
const buildTotalEl = document.getElementById("buildTotal");
const addBuildBtn = document.getElementById("addBuildToCart");
const cartOverlay = document.getElementById("cartOverlay");
const checkoutOverlay = document.getElementById("checkoutOverlay");
const checkoutForm = document.getElementById("checkoutForm");
const closeCheckoutBtn = document.getElementById("closeCheckout");
const closeLogin = document.getElementById("closeLogin");
const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");
const cartCounter = document.getElementById("cartCounter");
const totalPriceEl = document.getElementById("totalPrice");
const clearCartBtn = document.getElementById("clearCart");
const goToCheckoutBtn = document.getElementById("goToCheckout");
const openCartBtn = document.getElementById("openCart");
const closeCartBtn = document.getElementById("closeCart");
const cartItemsContainer = document.getElementById("cartItems");
const loginOverlay = document.getElementById("loginOverlay"); // Añadido para consistencia

/* ========================================================================
   3. INICIALIZACIÓN
   ======================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderShop("all");
  renderBuilderOptions("cpu");
  updateCartUI();
  setupEventListeners();
});

/* ========================================================================
   4. SHOP LOGIC (CATÁLOGO Y BUSCADOR)
   ======================================================================== */

function renderShop(filtro) {
  const productosFiltrados = filtro === "all" ? productos : productos.filter((p) => p.categoria === filtro);
  renderProductList(productosFiltrados);
}

function renderProductList(lista) {
  shopContainer.innerHTML = "";
  if (lista.length === 0) {
    shopContainer.innerHTML = '<p class="empty-msg">No se encontraron productos.</p>';
    return;
  }
  lista.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("product-card"); // Se eliminaron estilos inline que ahora están en style.css
    card.innerHTML = `
            <img src="${producto.img}" alt="${producto.nombre}">
            <div class="card-info">
                <h3>${producto.nombre}</h3>
                <p class="price">$${producto.precio.toLocaleString()}</p>
                <button class="btn btn--primary" onclick="addToCart(${producto.id})">AGREGAR AL CARRITO</button>
            </div>
        `;
    shopContainer.appendChild(card);
  });
}

/* ========================================================================
   5. LÓGICA PC BUILDER
   ======================================================================== */

function renderBuilderOptions(categoria) {
  builderSelection.innerHTML = "";
  builderSelection.scrollTop = 0; // --- PASO 0: SELECTOR DE PLATAFORMA ---

  if (categoria === "cpu" && !selectedPlatform) {
    builderSelection.innerHTML = `
            <div class="platform-grid">
                <div class="platform-card intel" onclick="selectPlatform('lga1700')"><h3>INTEL</h3><p>Potencia y rendimiento puro.</p></div>
                <div class="platform-card amd" onclick="selectPlatform('am5')"><h3>AMD</h3><p>Multitasking y eficiencia.</p></div>
            </div>`;
    return;
  } // --- BOTÓN VOLVER & CAMBIAR PLATAFORMA ---

  const indiceActual = ordenPasos.indexOf(categoria);

  if (indiceActual > 0) {
    createBackButton(ordenPasos[indiceActual - 1]);
  } else if (categoria === "cpu" && selectedPlatform) {
    // Botón "Cambiar Plataforma" (Solo en paso CPU)
    const backBtn = document.createElement("button");
    backBtn.className = "btn-back-step";
    backBtn.innerHTML = `<i class="fas fa-undo"></i> CAMBIAR PLATAFORMA`;
    backBtn.onclick = () => {
      selectedPlatform = null;
      pcBuild.cpu = null;
      renderBuilderOptions("cpu");
      showToast("Plataforma reseteada. Elige de nuevo.", "error");
    };
    builderSelection.appendChild(backBtn);
  } // --- FILTRADO DE PRODUCTOS (COMPATIBILIDAD SOCKET) ---

  let opciones = productos.filter((p) => p.categoria === categoria);

  if ((categoria === "motherboard" || categoria === "cooler") && pcBuild.cpu) {
    opciones = opciones.filter((item) => item.socket === pcBuild.cpu.socket);
  } else if (categoria === "cpu" && selectedPlatform) {
    opciones = opciones.filter((cpu) => cpu.socket === selectedPlatform);
  }

  if (opciones.length === 0) {
    builderSelection.innerHTML += `<p style="color:#fff; padding:1rem;">No hay componentes compatibles disponibles.</p>`;
    return;
  } // Renderizado de Tarjetas

  opciones.forEach((producto) => {
    const isSelected = pcBuild[categoria] && pcBuild[categoria].id === producto.id;
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.style.border = isSelected ? "2px solid var(--primary)" : "1px solid var(--border-color)"; // Se eliminaron estilos inline en img, card-info y h4

    card.innerHTML = `
            <img src="${producto.img}">
            <div class="card-info">
                <h4>${producto.nombre}</h4>
                ${
      producto.socket
        ? `<small style="color:#888; display:block; margin-bottom:5px;">Socket: ${producto.socket.toUpperCase()}</small>`
        : ""
    }
                <p class="price">$${producto.precio.toLocaleString()}</p>
                <button class="btn ${
      isSelected ? "btn--danger" : "btn--primary"
    }" onclick="selectComponent('${categoria}', ${producto.id})">
                    ${isSelected ? "QUITAR" : "SELECCIONAR"}
                </button>
            </div>
        `;
    builderSelection.appendChild(card);
  });
}

// --- BUILDER UTIL FUNCTIONS ---
window.selectPlatform = (socket) => {
  selectedPlatform = socket;
  showToast(`Plataforma ${socket === "am5" ? "AMD" : "INTEL"} seleccionada`, "success");
  renderBuilderOptions("cpu");
};

window.selectComponent = (categoria, id) => {
  if (pcBuild[categoria] && pcBuild[categoria].id === id) {
    pcBuild[categoria] = null;
  } else {
    pcBuild[categoria] = productos.find((p) => p.id === id);
    const indiceActual = ordenPasos.indexOf(categoria);
    if (indiceActual < ordenPasos.length - 1) {
      const siguienteCategoria = ordenPasos[indiceActual + 1];
      const siguientePasoBtn = document.querySelector(`.step[data-category="${siguienteCategoria}"]`);
      setTimeout(() => {
        if (siguientePasoBtn) {
          siguientePasoBtn.click();
          showToast(`Avanzando a: ${builderSteps[siguienteCategoria]}`, "success");
        }
      }, 500);
    }
  }
  updateBuildSummary();
  renderBuilderOptions(categoria);
};

window.removeComponent = (categoria) => {
  pcBuild[categoria] = null;
  updateBuildSummary();
  const pestañaActiva = document.querySelector(".step.active");
  if (pestañaActiva && pestañaActiva.dataset.category === categoria) renderBuilderOptions(categoria);
  showToast("Componente eliminado", "error");
};

function createBackButton(categoriaAnterior) {
  const nombreAnterior = builderSteps[categoriaAnterior];
  const backBtn = document.createElement("button");
  backBtn.className = "btn-back-step";
  backBtn.innerHTML = `<i class="fas fa-arrow-left"></i> VOLVER A ${nombreAnterior}`;
  backBtn.onclick = () => {
    document.querySelector(`.step[data-category="${categoriaAnterior}"]`).click();
  };
  builderSelection.appendChild(backBtn);
}

function updateBuildSummary() {
  buildList.innerHTML = "";
  let totalBuild = 0;
  let itemsCount = 0;

  for (const [key, component] of Object.entries(pcBuild)) {
    if (component) {
      itemsCount++;
      totalBuild += component.precio;
      const li = document.createElement("li");
      li.innerHTML = `
                <div class="build-item-row">
                    <span><strong style="color:var(--primary)">${builderSteps[key]}:</strong><br>${
        component.nombre
      }</span>
                    <div class="build-item-price-actions">
                        <span>$${component.precio.toLocaleString()}</span>
                        <button class="btn-mini-delete" onclick="removeComponent('${key}')"><i class="fas fa-times"></i></button>
                    </div>
                </div>`;
      buildList.appendChild(li);
    }
  }
  buildTotalEl.textContent = `$${totalBuild.toLocaleString()}`;

  if (itemsCount === 0) {
    buildList.innerHTML = '<li class="empty-build">Selecciona componentes.</li>';
    addBuildBtn.disabled = true;
    addBuildBtn.textContent = "AGREGAR BUILD AL CARRITO";
  } else {
    addBuildBtn.disabled = false;
    const isComplete = itemsCount === ordenPasos.length;
    addBuildBtn.textContent = isComplete
      ? "¡BUILD COMPLETA! AGREGAR AL CARRITO"
      : `AGREGAR (${itemsCount}/${ordenPasos.length}) AL CARRITO`;
    addBuildBtn.style.boxShadow = isComplete ? "0 0 20px var(--primary)" : "none";
  }
}

function addCurrentBuildToCart() {
  let count = 0;
  for (const key in pcBuild) {
    if (pcBuild[key]) {
      addToCart(pcBuild[key].id, false);
      count++;
    }
  }
  showToast(`¡${count} componentes agregados!`, "success");
  pcBuild = { cpu: null, cooler: null, motherboard: null, ram: null, gpu: null, storage: null, psu: null, case: null };
  updateBuildSummary();
  document.querySelector(`.step[data-category="cpu"]`).click();
  setTimeout(() => cartOverlay.classList.add("active"), 500);
}

/* ========================================================================
   6. CART & CHECKOUT LOGIC
   ======================================================================== */

window.addToCart = (id, openModal = true) => {
  const producto = productos.find((p) => p.id === id);
  const existe = carrito.find((item) => item.id === id);
  if (existe) {
    existe.cantidad++;
    showToast(`Cantidad actualizada: ${producto.nombre}`, "success");
  } else {
    carrito.push({ ...producto, cantidad: 1 });
    showToast(`${producto.nombre} agregado`, "success");
  }
  updateCartUI();
  saveLocal(); // Aseguramos que solo el carrito esté abierto
  if (openModal) {
    checkoutOverlay.classList.remove("active");
    loginOverlay.classList.remove("active");
    cartOverlay.classList.add("active");
  }
};

window.removeFromCart = (id) => {
  carrito = carrito.filter((item) => item.id !== id);
  updateCartUI();
  saveLocal();
  showToast("Producto eliminado", "error");
};

function clearCart() {
  carrito = [];
  updateCartUI();
  saveLocal();
  showToast("Carrito vaciado", "error");
}

function updateCartUI() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  let count = 0;
  carrito.forEach((item) => {
    total += item.precio * item.cantidad;
    count += item.cantidad;
    const itemEl = document.createElement("div");
    itemEl.classList.add("cart-item");
    itemEl.innerHTML = `
            <img src="${item.img}" alt="${item.nombre}"><div class="cart-item-info"><h4>${
      item.nombre
    }</h4><p>$${item.precio.toLocaleString()} x ${item.cantidad}</p></div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>`;
    cartItemsContainer.appendChild(itemEl);
  });
  cartCounter.textContent = count;
  totalPriceEl.textContent = `$${total.toLocaleString()}`;
  if (carrito.length === 0) cartItemsContainer.innerHTML = '<p class="empty-msg">Tu carrito está vacío.</p>';
}

function saveLocal() {
  localStorage.setItem("techStoreCart", JSON.stringify(carrito));
}

/* ========================================================================
   7. UTILS & EVENT LISTENERS
   ======================================================================== */

function showToast(mensaje, tipo = "success") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = `toast ${tipo}`;
  const icon = tipo === "success" ? "fa-check-circle" : "fa-trash-alt";
  toast.innerHTML = `<i class="fas ${icon}"></i><span>${mensaje}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = "slideOut 0.3s ease forwards";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function setupEventListeners() {
  // Filtros & Search
  document.querySelectorAll(".filter-btn").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      renderShop(e.target.dataset.filter);
    })
  );

  // ✅ CORRECCIÓN: Lógica del Buscador/Search para desactivar filtros
  searchInput.addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase().trim(); // 1. Desactiva todos los botones de filtro al empezar a escribir

    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));

    if (texto === "") {
      // 2. Si el campo está vacío, activa el filtro "Todo" y renderiza
      document.querySelector('.filter-btn[data-filter="all"]').classList.add("active");
      renderShop("all");
      return;
    } // 3. Filtra por el texto introducido

    const filtrados = productos.filter((p) => p.nombre.toLowerCase().includes(texto));
    renderProductList(filtrados);
  }); // Builder

  stepBtns.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      stepBtns.forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      renderBuilderOptions(e.target.dataset.category);
    })
  );
  addBuildBtn.addEventListener("click", addCurrentBuildToCart); // Cart Modal Events

  openCartBtn.addEventListener("click", () => {
    checkoutOverlay.classList.remove("active");
    loginOverlay.classList.remove("active");
    cartOverlay.classList.add("active");
  });
  closeCartBtn.addEventListener("click", () => cartOverlay.classList.remove("active"));
  clearCartBtn.addEventListener("click", clearCart);
  document.getElementById("cartOverlay").addEventListener("click", (e) => {
    if (e.target === document.getElementById("cartOverlay")) cartOverlay.classList.remove("active");
  }); // Checkout Modal Events

  goToCheckoutBtn.addEventListener("click", () => {
    if (carrito.length === 0) {
      showToast("El carrito está vacío", "error");
      return;
    }
    cartOverlay.classList.remove("active");
    loginOverlay.classList.remove("active");
    checkoutOverlay.classList.add("active");
    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    document.getElementById("checkoutTotal").textContent = `$${total.toLocaleString()}`;
  });
  closeCheckoutBtn.addEventListener("click", () => checkoutOverlay.classList.remove("active"));
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const submitBtn = checkoutForm.querySelector("button");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "PROCESANDO...";
    submitBtn.disabled = true;
    setTimeout(() => {
      checkoutOverlay.classList.remove("active");
      clearCart();
      showToast("¡PAGO EXITOSO! Gracias por tu compra.", "success");
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      checkoutForm.reset();
    }, 2000);
  }); // Login Modal Events

  loginBtn.addEventListener("click", () => {
    cartOverlay.classList.remove("active");
    checkoutOverlay.classList.remove("active");
    document.getElementById("loginOverlay").classList.add("active");
  });
  closeLogin.addEventListener("click", () => document.getElementById("loginOverlay").classList.remove("active"));
  document.getElementById("loginOverlay").addEventListener("click", (e) => {
    if (e.target === document.getElementById("loginOverlay"))
      document.getElementById("loginOverlay").classList.remove("active");
  });
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const nombreUsuario = email.split("@")[0];
    document.getElementById("loginOverlay").classList.remove("active");
    showToast(`¡Bienvenido de nuevo, ${nombreUsuario}!`, "success");
    loginBtn.innerHTML = `<i class="fas fa-user-circle"></i> <span>${nombreUsuario}</span>`;
    loginBtn.style.borderColor = "var(--primary)";
    loginBtn.style.color = "var(--primary)";
  }); // ✅ Lógica SCROLL TO TOP (Completa)

  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      // Si el usuario ha bajado más de 400px, añade la clase 'visible'
      if (window.scrollY > 400) scrollTopBtn.classList.add("visible");
      else scrollTopBtn.classList.remove("visible");
    });
    scrollTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}
