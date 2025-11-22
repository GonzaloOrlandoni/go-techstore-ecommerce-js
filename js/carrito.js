// carrito.js - manejo simple de carrito con localStorage
(function () {
  const KEY = "gotech_cart_v1";
  let carrito = JSON.parse(localStorage.getItem(KEY)) || [];

  const cartCounter = document.getElementById("cartCounter");
  const cartOverlay = null; // puedes implementar overlay/modal si querés

  function save() {
    localStorage.setItem(KEY, JSON.stringify(carrito));
    updateUI();
  }

  function updateUI() {
    const count = carrito.reduce((acc, it) => acc + (it.cantidad || 1), 0);
    if (cartCounter) cartCounter.textContent = count;
    // (opcional) actualizar mini-cart DOM si lo implementás
  }

  function add(item) {
    // si item tiene 'detalles' lo tratamos como build único (no merge)
    if (item.detalles) {
      carrito.push(item);
    } else {
      const exist = carrito.find((i) => i.id === item.id && !i.detalles);
      if (exist) exist.cantidad = (exist.cantidad || 1) + 1;
      else carrito.push({ ...item, cantidad: 1 });
    }
    save();
    toast(`${item.nombre} agregado al carrito`, "success");
  }

  function remove(id) {
    carrito = carrito.filter((i) => i.id !== id);
    save();
    toast("Producto eliminado", "error");
  }

  function clearAll() {
    carrito = [];
    save();
    toast("Carrito vaciado", "error");
  }

  function getAll() {
    return carrito;
  }

  function toast(msg, tipo = "success") {
    // simple toast fallback
    const container =
      document.querySelector(".toast-container") ||
      (function () {
        const d = document.createElement("div");
        d.className = "toast-container";
        document.body.appendChild(d);
        return d;
      })();
    const t = document.createElement("div");
    t.className = `toast ${tipo}`;
    t.textContent = msg;
    container.appendChild(t);
    setTimeout(() => {
      t.style.animation = "slideOut .35s forwards";
      setTimeout(() => t.remove(), 350);
    }, 2600);
  }

  // expose
  window.cartAdd = add;
  window.cartRemove = remove;
  window.cartClear = clearAll;
  window.cartGet = getAll;

  // init UI count
  document.addEventListener("DOMContentLoaded", updateUI);
})();
