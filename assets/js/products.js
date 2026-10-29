/**
 * products.js
 * Data Master Produk & Paket Stik Singkong "Crunch Your Day!"
 */

const PRODUCTS = [
  {
    id: "original",
    name: "Stik Singkong Original Gurih",
    shortName: "Original Gurih",
    category: "ala-carte",
    price: 8000,
    weight: "100g",
    image: "assets/images/original.jpg",
    badge: "FAVORIT KELUARGA",
    badgeColor: "bg-amber-500",
    spiciness: 0,
    description: "Perpaduan gurih alami bawang putih, ketumbar sangrai, dan garam laut murni. Menampilkan cita rasa manis-gurih alami dari singkong mentega pilihan Cimande Bogor.",
    features: ["Renyah & Empuk", "Gurih Rempah Alami", "Non-MSG Berlebih", "100% Halal"],
    isPopular: true
  },
  {
    id: "balado",
    name: "Stik Singkong Balado Manis Gurih",
    shortName: "Balado Manis Gurih",
    category: "ala-carte",
    price: 8000,
    weight: "100g",
    image: "assets/images/balado.jpg",
    badge: "BEST SELLER 🔥",
    badgeColor: "bg-red-600",
    spiciness: 2,
    description: "Bumbu balado racikan khas yang berlimpah dengan harmoni manis, gurih, dan pedas sedang beraroma daun jeruk segar. Varian paling digemari mahasiswa dan pekerja kantor!",
    features: ["Aroma Daun Jeruk", "Manis Pedas Pas", "Bumbu Melimpah", "100% Halal"],
    isPopular: true
  },
  {
    id: "pedas",
    name: "Stik Singkong Pedas Nampol",
    shortName: "Pedas Nampol",
    category: "ala-carte",
    price: 8000,
    weight: "100g",
    image: "assets/images/pedas.jpg",
    badge: "EXTRA PEDAS 🌶️",
    badgeColor: "bg-red-700",
    spiciness: 4,
    description: "Racikan cabai kering pilihan berpadu bumbu rempah gurih yang menantang lidah. Gurihnya stik singkong renyah dengan sensasi pedas nendang yang bikin melek!",
    features: ["Sensasi Pedas Nampol", "Cabai Kering Asli", "Bikin Semangat", "100% Halal"],
    isPopular: true
  },
  {
    id: "paket-trio",
    name: "Paket Trio Crunch",
    shortName: "Paket Trio (3 Pack)",
    kicker: "Paket Icip Lengkap",
    category: "paket-hemat",
    price: 22000,
    weight: "3 Pack",
    image: "assets/images/balado.jpg",
    badge: "PAKET ICIP LENGKAP",
    badgeColor: "bg-emerald-600",
    spiciness: 2,
    description: "Lebih Banyak, Lebih Hemat, Makin seru buat ngemil bareng!",
    features: ["1 Pack Original Gurih", "1 Pack Balado Gurih", "1 Pack Pedas Nampol"],
    isPopular: true,
    bundleItems: { original: 1, balado: 1, pedas: 1 }
  },
  {
    id: "paket-party-10",
    name: "Paket Borong Hemat",
    shortName: "Paket Borong Hemat (5 Pack)",
    kicker: "Kamis Penglaris",
    category: "paket-hemat",
    price: 35000,
    weight: "5 Pack",
    image: "assets/images/hero.jpg",
    badge: "BEST VALUE 🎁",
    badgeColor: "bg-red-600",
    spiciness: 2,
    description: "Beli 5 Pack cuma Rp35.000 Harga normal Rp40.000 Hemat Rp5.000!",
    features: ["Hemat Rp8.000 Langsung", "Bebas Mix Varian Rasa", "Otomatis Dihitung di Checkout"],
    isPopular: true,
    bundleItems: { original: 2, balado: 2, pedas: 1 }
  },
  {
    id: "paket-reseller-25",
    name: "Ambil 2 Bayar Rp15.000!",
    shortName: "Paket Borong Berdua (2 Pack)",
    kicker: "Paket Borong Berdua",
    category: "paket-hemat",
    price: 15000,
    weight: "2 Pack",
    image: "assets/images/original.jpg",
    badge: "PAKET BORONG BERDUA",
    badgeColor: "bg-amber-500",
    spiciness: 1,
    description: "Lebih Hemat, Lebih Seru Buat Ngemil! 😋",
    features: ["Crunch Your Day!", "2 PACK CUMA"],
    isPopular: false,
    bundleItems: { original: 1, balado: 1 }
  }
];

// Helper get product by ID
function getProductById(id) {
  if (id === 'paket-borong-berdua') {
    return PRODUCTS.find(p => p.id === 'paket-reseller-25');
  }
  return PRODUCTS.find(p => p.id === id);
}

// Render spiciness chili icons
function renderSpiciness(level) {
  if (level === 0) return '<span class="text-xs text-emerald-600 font-semibold"><i class="fa-solid fa-leaf mr-1"></i> Tidak Pedas</span>';
  let chilies = '';
  for (let i = 0; i < level; i++) {
    chilies += '<i class="fa-solid fa-pepper-hot text-red-500 text-xs"></i> ';
  }
  return `<span class="inline-flex items-center gap-1">${chilies}</span>`;
}
