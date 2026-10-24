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
    name: "Paket Trio Crunch (3 Rasa)",
    shortName: "Paket Trio (3 Pouch)",
    category: "paket-hemat",
    price: 24000,
    weight: "3 x 100g",
    image: "assets/images/hero.jpg",
    badge: "HEMAT 3 RASA",
    badgeColor: "bg-emerald-600",
    spiciness: 2,
    description: "Nikmati komplit seluruh sensasi rasa! Berisi 1x Original Gurih, 1x Balado Manis Gurih, dan 1x Pedas Nampol. Solusi pas untuk icip-icip semua varian bersama teman.",
    features: ["Dapat 3 Pouch Lengkap", "Cocok untuk Icip-icip", "Kemasan Ziplock", "Hemat & Praktis"],
    isPopular: false,
    bundleItems: { original: 1, balado: 1, pedas: 1 }
  },
  {
    id: "paket-party-10",
    name: "Paket Party 10 Pcs (Bonus 1 Gratis)",
    shortName: "Paket 10 + Bonus 1",
    category: "paket-hemat",
    price: 80000,
    weight: "11 x 100g (Total 1.1kg)",
    image: "assets/images/hero.jpg",
    badge: "BELI 10 GRATIS 1 🎁",
    badgeColor: "bg-red-600",
    spiciness: 2,
    description: "Pilihan terbaik untuk konsumsi kumpul bareng, nonton bola, rapat organisasi kampus, atau oleh-oleh! Beli 10 kemasan, otomatis dapat GRATIS 1 kemasan tambahan (Bebas pilih rasa).",
    features: ["Total 11 Kemasan", "Hemat Rp8.000", "Bebas Mix Varian", "Freshly Fried PO"],
    isPopular: true,
    bundleItems: { original: 4, balado: 4, pedas: 2 }
  },
  {
    id: "paket-reseller-25",
    name: "Paket Kemitraan Reseller (25 Pouch)",
    shortName: "Paket Reseller 25 Pcs",
    category: "reseller",
    price: 175000,
    weight: "25 x 100g",
    image: "assets/images/original.jpg",
    badge: "HARGA GROSIR",
    badgeColor: "bg-blue-600",
    spiciness: 1,
    description: "Peluang usaha sampingan menguntungkan bagi mahasiswa, warung, kafe, dan toko oleh-oleh. Dapatkan harga khusus mitra Rp7.000/kemasan dengan margin profit menarik.",
    features: ["Harga Rp7.000/pcs", "Support Foto Promosi", "Bebas Mix Rasa", "Konsultasi Penjualan"],
    isPopular: false,
    bundleItems: { original: 10, balado: 10, pedas: 5 }
  }
];

// Helper get product by ID
function getProductById(id) {
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
