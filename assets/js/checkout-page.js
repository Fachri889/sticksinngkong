/**
 * checkout-page.js
 * Script Khusus Halaman Pemesanan & Kalkulator WhatsApp (checkout.html)
 */

function renderCheckoutItems() {
  const container = document.getElementById('checkout-items-list');
  const emptyState = document.getElementById('checkout-empty-state');
  const contentArea = document.getElementById('checkout-content-area');
  
  if (!container) return;

  const totals = calculateCartTotals();

  if (totals.items.length === 0) {
    if (emptyState) emptyState.classList.remove('hidden');
    if (contentArea) contentArea.classList.add('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');
  if (contentArea) contentArea.classList.remove('hidden');

  container.innerHTML = totals.items.map(item => `
    <div class="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm gap-3">
      <div class="flex items-center gap-3">
        <img src="${item.product.image}" alt="${item.product.name}" class="w-14 h-14 rounded-xl object-cover bg-amber-50">
        <div>
          <h4 class="font-bold text-gray-900 text-sm sm:text-base">${item.product.name}</h4>
          <span class="text-xs text-red-600 font-extrabold">${formatRupiah(item.product.price)} / pouch</span>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <!-- Counter -->
        <div class="flex items-center gap-1.5 bg-amber-50/70 p-1 rounded-xl border border-amber-200">
          <button type="button" onclick="addToCart('${item.product.id}', -1)" class="w-7 h-7 rounded-lg bg-white border border-gray-300 font-black text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition active:scale-95 text-xs">-</button>
          <span class="w-7 text-center font-bold text-gray-900 text-sm">${item.qty}</span>
          <button type="button" onclick="addToCart('${item.product.id}', 1)" class="w-7 h-7 rounded-lg bg-amber-500 font-black text-white hover:bg-amber-600 flex items-center justify-center transition active:scale-95 text-xs">+</button>
        </div>

        <!-- Subtotal -->
        <div class="text-right min-w-[70px] sm:min-w-[90px]">
          <span class="font-extrabold text-sm sm:text-base text-gray-900">${formatRupiah(item.subtotal)}</span>
        </div>

        <!-- Delete button -->
        <button type="button" onclick="removeFromCart('${item.product.id}')" class="text-gray-400 hover:text-red-500 p-1.5 transition text-sm" title="Hapus dari pesanan">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  `).join('');

  // Update summary sidebar
  updateCheckoutSummary(totals);
}

function updateCheckoutSummary(totals) {
  const totalQtyEl = document.getElementById('summary-total-qty');
  const totalPriceEl = document.getElementById('summary-total-price');
  const bonusBox = document.getElementById('summary-bonus-box');
  const bonusQtyEl = document.getElementById('summary-bonus-qty');
  const bonusFlavorSelect = document.getElementById('bonus-flavor-wrapper');

  if (totalQtyEl) totalQtyEl.innerText = totals.totalItemsCount;
  if (totalPriceEl) totalPriceEl.innerText = formatRupiah(totals.totalPrice);

  if (totals.freeBonusPcs > 0) {
    if (bonusBox) bonusBox.classList.remove('hidden');
    if (bonusQtyEl) bonusQtyEl.innerText = totals.freeBonusPcs;
    if (bonusFlavorSelect) bonusFlavorSelect.classList.remove('hidden');
  } else {
    if (bonusBox) bonusBox.classList.add('hidden');
    if (bonusFlavorSelect) bonusFlavorSelect.classList.add('hidden');
  }
}

// Handler pengiriman form ke WhatsApp
function handleCheckoutSubmit(e) {
  if (e) e.preventDefault();

  const totals = calculateCartTotals();
  if (totals.items.length === 0) {
    showToast("Keranjang Anda masih kosong. Silakan pilih menu terlebih dahulu!", "info");
    return;
  }

  const nameInput = document.getElementById('cust-name');
  const phoneInput = document.getElementById('cust-phone');
  const addressInput = document.getElementById('cust-address');
  const notesInput = document.getElementById('cust-notes');
  const deliverySelect = document.getElementById('cust-delivery');
  const paymentSelect = document.getElementById('cust-payment');
  const bonusFlavorSelect = document.getElementById('cust-bonus-flavor');
  const errorBox = document.getElementById('checkout-error');

  const name = nameInput ? nameInput.value.trim() : '';
  const phone = phoneInput ? phoneInput.value.trim() : '';
  const address = addressInput ? addressInput.value.trim() : '';
  const notes = notesInput ? notesInput.value.trim() : '';
  const delivery = deliverySelect ? deliverySelect.value : 'Kirim Ekspedisi/Kurir';
  const payment = paymentSelect ? paymentSelect.value : 'Transfer Bank / QRIS';
  const bonusFlavor = bonusFlavorSelect ? bonusFlavorSelect.value : 'Bebas / Campur';

  // Validasi input wajib
  if (!name || !address) {
    if (errorBox) {
      errorBox.innerText = "Mohon lengkapi Nama Anda dan Alamat Pengiriman / Titik COD!";
      errorBox.classList.remove('hidden');
      errorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }

  if (errorBox) errorBox.classList.add('hidden');

  const customerData = {
    name,
    phone,
    address,
    notes,
    deliveryMethod: delivery,
    paymentMethod: payment,
    bonusFlavor: totals.freeBonusPcs > 0 ? bonusFlavor : null
  };

  const message = buildWhatsAppOrderMessage(customerData, totals);
  sendWhatsAppMessage(message);

  showToast("Membuka WhatsApp untuk mengirim pesanan...", "success");
}

document.addEventListener('DOMContentLoaded', () => {
  renderCheckoutItems();

  window.addEventListener('cart-updated', () => {
    renderCheckoutItems();
  });

  const form = document.getElementById('checkout-form');
  if (form) {
    form.addEventListener('submit', handleCheckoutSubmit);
  }
});
