// utils.js - helpers sencillos
function formatPrice(num) {
  return `$${Number(num).toLocaleString("es-AR")}`;
}

// export-like global (we're not using modules — attach to window)
window.utils = {
  formatPrice,
};
