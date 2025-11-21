const productos = [
  // --- 1. PROCESADORES (CPU) ---
  {
    id: 1,
    nombre: "Intel Core i9-14900K",
    precio: 650000,
    img: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=500&q=80",
    categoria: "cpu",
    socket: "lga1700",
    destacado: true,
  },
  {
    id: 2,
    nombre: "AMD Ryzen 9 7950X",
    precio: 620000,
    img: "https://images.unsplash.com/photo-1555616635-64096c3d4d96?auto=format&fit=crop&w=500&q=80",
    categoria: "cpu",
    socket: "am5",
    destacado: false,
  },
  // --- 2. COOLERS ---
  {
    id: 20,
    nombre: "Cooler Master Hyper 212",
    precio: 65000,
    img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=500&q=80",
    categoria: "cooler",
    socket: "am5",
  },
  {
    id: 21,
    nombre: "NZXT Kraken 360 RGB",
    precio: 280000,
    img: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=500&q=80",
    categoria: "cooler",
    socket: "lga1700",
  },
  // --- 3. MOTHERBOARDS ---
  {
    id: 5,
    nombre: "ASUS ROG Strix Z790",
    precio: 450000,
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80",
    categoria: "motherboard",
    socket: "lga1700",
  },
  {
    id: 7,
    nombre: "AORUS X670E Elite",
    precio: 420000,
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80",
    categoria: "motherboard",
    socket: "am5",
  },
  // --- 4. RAM ---
  {
    id: 6,
    nombre: "Corsair Vengeance 32GB DDR5",
    precio: 180000,
    img: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=500&q=80",
    categoria: "ram",
  },
  // --- 5. GPU ---
  {
    id: 3,
    nombre: "NVIDIA RTX 4090 24GB",
    precio: 2100000,
    img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=500&q=80",
    categoria: "gpu",
    destacado: true,
  },
  {
    id: 4,
    nombre: "Radeon RX 7900 XTX",
    precio: 1400000,
    img: "https://images.unsplash.com/photo-1624705024411-db99130065ea?auto=format&fit=crop&w=500&q=80",
    categoria: "gpu",
  },
  // --- 6. STORAGE ---
  {
    id: 30,
    nombre: "Samsung 990 PRO 1TB",
    precio: 145000,
    img: "https://images.unsplash.com/photo-1628557044797-f21a1735506d?auto=format&fit=crop&w=500&q=80",
    categoria: "storage",
  },
  {
    id: 31,
    nombre: "Kingston NV2 2TB",
    precio: 110000,
    img: "https://images.unsplash.com/photo-1628557044797-f21a1735506d?auto=format&fit=crop&w=500&q=80",
    categoria: "storage",
  },
  // --- 7. PSU ---
  {
    id: 40,
    nombre: "Corsair RM850x Gold",
    precio: 190000,
    img: "https://images.unsplash.com/photo-1587202372616-b4345a271442?auto=format&fit=crop&w=500&q=80",
    categoria: "psu",
  },
  // --- 8. GABINETES ---
  {
    id: 50,
    nombre: "Lian Li O11 Dynamic",
    precio: 220000,
    img: "https://images.unsplash.com/photo-1587202372162-411f29b674d5?auto=format&fit=crop&w=500&q=80",
    categoria: "case",
  },
  // --- EXTRAS ---
  {
    id: 10,
    nombre: "Teclado Mecánico 60%",
    precio: 120000,
    img: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=500&q=80",
    categoria: "periferico",
  },
  {
    id: 12,
    nombre: "Monitor 144Hz IPS 27'",
    precio: 350000,
    img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&q=80",
    categoria: "monitor",
  },
  {
    id: 60,
    nombre: "Silla Gamer Titan",
    precio: 450000,
    img: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=500&q=80",
    categoria: "sillas",
  },
  {
    id: 61,
    nombre: "Corsair T3 RUSH",
    precio: 320000,
    img: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=500&q=80",
    categoria: "sillas",
  },
];
