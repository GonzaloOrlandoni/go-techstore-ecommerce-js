// data.js - datos simulados (puede reemplazarse por fetch a una API)
const productos = [
  {
    id: 1,
    nombre: "Intel Core i9-14900K",
    precio: 650000,
    img: "assets/img/cpu-i9.jpg",
    categoria: "cpu",
    socket: "lga1700",
    destacado: true,
  },
  {
    id: 2,
    nombre: "AMD Ryzen 9 7950X",
    precio: 620000,
    img: "assets/img/ryzen-7950x.jpg",
    categoria: "cpu",
    socket: "am5",
  },
  {
    id: 3,
    nombre: "NVIDIA RTX 4090 24GB",
    precio: 2100000,
    img: "assets/img/rtx4090.jpg",
    categoria: "gpu",
    destacado: true,
  },
  { id: 4, nombre: "Radeon RX 7900 XTX", precio: 1400000, img: "assets/img/rx7900xtx.jpg", categoria: "gpu" },
  {
    id: 5,
    nombre: "ASUS ROG Strix Z790",
    precio: 450000,
    img: "assets/img/mobo-z790.jpg",
    categoria: "motherboard",
    socket: "lga1700",
  },
  {
    id: 6,
    nombre: "AORUS X670E Elite",
    precio: 420000,
    img: "assets/img/mobo-x670e.jpg",
    categoria: "motherboard",
    socket: "am5",
  },
  { id: 7, nombre: "Corsair Vengeance 32GB DDR5", precio: 180000, img: "assets/img/ram-32gb.jpg", categoria: "ram" },
  { id: 8, nombre: "Samsung 990 PRO 1TB", precio: 145000, img: "assets/img/ssd-990pro.jpg", categoria: "storage" },
  { id: 9, nombre: "Corsair RM850x Gold", precio: 190000, img: "assets/img/psu-rm850x.jpg", categoria: "psu" },
  { id: 10, nombre: "Lian Li O11 Dynamic", precio: 220000, img: "assets/img/case-o11.jpg", categoria: "case" },
  {
    id: 11,
    nombre: "NZXT Kraken 360 RGB",
    precio: 280000,
    img: "assets/img/cooler-kraken.jpg",
    categoria: "cooler",
    socket: "lga1700",
  },
  {
    id: 12,
    nombre: "Cooler Master Hyper 212",
    precio: 65000,
    img: "assets/img/cooler-hyper212.jpg",
    categoria: "cooler",
    socket: "am5",
  },
];

// expose globally
window.__PRODUCTS = productos;
