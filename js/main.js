// main.js - scripts globales/pequeñas inicializaciones
document.addEventListener("DOMContentLoaded", () => {
  // Attach quick global handlers if needed
  // Example: open cart (if exists)
  const openCart = document.getElementById("openCart");
  if (openCart)
    openCart.addEventListener("click", () => {
      alert("Abrir carrito (implementa tu modal o overlay)"); // placeholder
    });

  // If there are featured products area (index), render destacados there
  const destacadosDiv = document.getElementById("destacados-list");
  if (destacadosDiv && window.__PRODUCTS) {
    const destacados = window.__PRODUCTS.filter((p) => p.destacado);
    destacadosDiv.innerHTML = "";
    destacados.forEach((p) => destacadosDiv.appendChild(window.productUI.createCard(p)));
  }
});
