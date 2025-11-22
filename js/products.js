// products.js - helpers para crear cards de producto
(function () {
  function createCard(producto) {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${producto.img}" alt="${producto.nombre}">
      <div class="card-info">
        <h4>${producto.nombre}</h4>
        ${producto.socket ? `<small class="product-socket-info">Socket: ${producto.socket.toUpperCase()}</small>` : ""}
        <p class="price">${window.utils.formatPrice(producto.precio)}</p>
        <div class="card-actions">
          <button class="btn btn--primary" data-id="${producto.id}">AGREGAR AL CARRITO</button>
          <button class="btn btn--danger btn-quick" data-id="${producto.id}">VER</button>
        </div>
      </div>
    `;
    return div;
  }

  // make available
  window.productUI = {
    createCard,
  };
})();
