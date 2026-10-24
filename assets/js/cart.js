/**
 * cart.js
 * Sistem Pengelolaan Keranjang Belanja & Logika Promo (Beli 10 Gratis 1)
 */

const CART_STORAGE_KEY = 'stikgoreng_cart_v1';

// Ambil keranjang dari localStorage
function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error("Gagal membaca cart dari localStorage", e);
    return {};
  }
}

// Simpan keranjang ke localStorage
function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    // Trigger global event
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: { cart } }));
    updateGlobalCartBadge();
  } catch (e) {
    console.error("Gagal menyimpan cart ke localStorage", e);
  }
}

// Tambah item ke keranjang
function addToCart(productId, qty = 1) {
  const cart = getCart();
  const currentQty = cart[productId] || 0;
  cart[productId] = currentQty + qty;

  if (cart[productId] <= 0) {
    delete cart[productId];
  }

  saveCart(cart);

  const product = getProductById(productId);
  if (product && typeof showToast === 'function') {
    showToast(`Ditambahkan ke keranjang: ${product.shortName} (${qty > 0 ? '+' + qty : qty})`, 'success');
  }

  return cart;
}

// Update kuantitas item
function updateCartItemQty(productId, qty) {
  const cart = getCart();
  if (qty <= 0) {
    delete cart[productId];
  } else {
    cart[productId] = qty;
  }
  saveCart(cart);
  return cart;
}

// Hapus item dari keranjang
function removeFromCart(productId) {
  const cart = getCart();
  delete cart[productId];
  saveCart(cart);
  return cart;
}

// Kosongkan keranjang
function clearCart() {
  saveCart({});
}

// Hitung total kuantitas, harga, dan bonus "Beli 10 Gratis 1"
function calculateCartTotals() {
  const cart = getCart();
  let totalItemsCount = 0;
  let totalPrice = 0;
  let alaCarteCount = 0; // untuk promo beli 10 gratis 1

  const items = [];

  for (const [productId, qty] of Object.entries(cart)) {
    if (qty > 0) {
      const product = getProductById(productId);
      if (product) {
        const itemSubtotal = product.price * qty;
        totalItemsCount += qty;
        totalPrice += itemSubtotal;

        if (product.category === 'ala-carte') {
          alaCarteCount += qty;
        }

        items.push({
          product,
          qty,
          subtotal: itemSubtotal
        });
      }
    }
  }

  // Hitung bonus beli 10 gratis 1 khusus kemasan ala carte
  const freeBonusPcs = Math.floor(alaCarteCount / 10);

  return {
    items,
    totalItemsCount,
    totalPrice,
    alaCarteCount,
    freeBonusPcs,
    hasDiscount: freeBonusPcs > 0
  };
}

// Update angka badge keranjang di navbar
function updateGlobalCartBadge() {
  const totals = calculateCartTotals();
  const badges = document.querySelectorAll('.cart-count-badge');
  badges.forEach(badge => {
    badge.innerText = totals.totalItemsCount;
    if (totals.totalItemsCount > 0) {
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  });
}

// Inisialisasi saat window load
document.addEventListener('DOMContentLoaded', () => {
  updateGlobalCartBadge();
});
