/**
 * menu-page.js
 * Script Khusus Halaman Menu & Katalog Produk (menu.html)
 */

let currentCategory = 'all';

function renderMenuGrid(category = 'all') {
  const container = document.getElementById('menu-grid-container');
  if (!container) return;

  const filtered = category === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === category);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-gray-500">
        <i class="fa-solid fa-cookie-bite text-5xl text-gray-300 mb-3 block"></i>
        Belum ada produk untuk kategori ini.
      </div>
    `;
    return;
  }

  const cart = getCart();

  container.innerHTML = filtered.map(p => {
    const qtyInCart = cart[p.id] || 0;
    const isAlaCarte = p.category === 'ala-carte';

    return `
      <div class="menu-card bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between group">
        <div>
          <!-- Image Container -->
          <div class="relative overflow-hidden aspect-[4/3] bg-amber-50">
            <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            
            <!-- Badge -->
            <div class="absolute top-3 left-3 ${p.badgeColor} text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
              ${p.badge}
            </div>

            <!-- Netto / Weight Badge -->
            <div class="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
              ${p.weight}
            </div>
          </div>

          <!-- Content Body -->
          <div class="p-6">
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-xs font-bold uppercase tracking-wider text-amber-600">
                ${p.category === 'ala-carte' ? 'Varian Reguler' : p.category === 'paket-hemat' ? 'Paket Kombo' : 'Kemitraan'}
              </span>
              <div>${renderSpiciness(p.spiciness)}</div>
            </div>

            <h3 class="text-xl font-bold text-gray-900 leading-snug group-hover:text-red-600 transition-colors">
              ${p.name}
            </h3>

            <p class="text-gray-600 text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed">
              ${p.description}
            </p>

            <!-- Key feature tags -->
            <div class="mt-4 flex flex-wrap gap-1.5">
              ${p.features.map(f => `
                <span class="text-[11px] bg-amber-50 text-amber-900 border border-amber-200/60 px-2 py-0.5 rounded-md font-medium">
                  ✓ ${f}
                </span>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Footer / Action Area -->
        <div class="p-6 pt-0">
          <div class="pt-4 border-t border-gray-100 flex items-center justify-between mb-4">
            <div>
              <span class="text-[11px] text-gray-400 block font-medium">Harga Bersahabat</span>
              <span class="text-2xl font-black text-red-600">${formatRupiah(p.price)}</span>
            </div>
            ${qtyInCart > 0 ? `
              <span class="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                Di Keranjang: <strong>${qtyInCart}</strong>
              </span>
            ` : ''}
          </div>

          <div class="grid grid-cols-2 gap-2">
            <button onclick="addToCart('${p.id}', 1); renderMenuGrid('${currentCategory}');" class="inline-flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold py-2.5 px-3 rounded-xl text-xs sm:text-sm shadow-sm transition">
              <i class="fa-solid fa-cart-plus"></i>
              <span>+ Keranjang</span>
            </button>
            <button onclick="quickOrderDirect('${p.id}')" class="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold py-2.5 px-3 rounded-xl text-xs sm:text-sm shadow-sm transition">
              <i class="fa-brands fa-whatsapp"></i>
              <span>Pesan WA</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Inisialisasi tab kategori
function initCategoryTabs() {
  const tabs = document.querySelectorAll('.category-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.category || 'all';
      renderMenuGrid(currentCategory);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initCategoryTabs();
  renderMenuGrid('all');

  // Dengarkan jika ada update cart dari tab lain atau event
  window.addEventListener('cart-updated', () => {
    renderMenuGrid(currentCategory);
  });
});
