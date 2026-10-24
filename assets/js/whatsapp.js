/**
 * whatsapp.js
 * Integrasi Direct WhatsApp Gateway & Generator Template Pesan
 */

// Konfigurasi Nomor WhatsApp Merchant (Ganti sesuai nomor admin Anda)
// Format: 628xxxx (tanpa tanda + atau spasi)
const WA_PHONE_NUMBER = "6281234567890";

/**
 * Format angka ke mata uang Rupiah
 */
function formatRupiah(num) {
  return "Rp" + Number(num).toLocaleString('id-ID');
}

/**
 * Buat template pesan WhatsApp untuk checkout pesanan
 */
function buildWhatsAppOrderMessage(customerData, cartTotals) {
  const dateStr = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  let message = `*HALO ADMIN STIK SINGKONG - CRUNCH YOUR DAY!* 🍟✨\n`;
  message += `Saya ingin melakukan pemesanan Fresh Pre-Order (PO):\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `📅 *Waktu Pesan:* ${dateStr}\n\n`;

  message += `👤 *DATA PEMESAN:*\n`;
  message += `• Nama: *${customerData.name}*\n`;
  message += `• No. WhatsApp: *${customerData.phone || '-'}*\n`;
  message += `• Metode: *${customerData.deliveryMethod || 'Kirim ke Alamat'}*\n`;
  message += `• Alamat / Titik COD: *${customerData.address}*\n`;
  if (customerData.notes) {
    message += `• Catatan Khusus: _${customerData.notes}_\n`;
  }
  if (customerData.paymentMethod) {
    message += `• Rencana Pembayaran: *${customerData.paymentMethod}*\n`;
  }

  message += `\n📦 *RINCIAN MENU YANG DIPESAN:*\n`;
  cartTotals.items.forEach((item, index) => {
    message += `${index + 1}. *${item.product.name}*\n`;
    message += `   ${item.qty} x ${formatRupiah(item.product.price)} = *${formatRupiah(item.subtotal)}*\n`;
  });

  if (cartTotals.freeBonusPcs > 0) {
    message += `\n🎁 *BONUS PROMO (Beli 10 Gratis 1):*\n`;
    message += `• *GRATIS ${cartTotals.freeBonusPcs} Pouch* (Request rasa bonus: ${customerData.bonusFlavor || 'Bebas / Campur'})\n`;
  }

  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `🛒 *Total Item:* ${cartTotals.totalItemsCount} kemasan\n`;
  message += `💰 *TOTAL PEMBAYARAN:* *${formatRupiah(cartTotals.totalPrice)}*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `Mohon konfirmasi ketersediaan batch gorengan dan total ongkir (jika ada). Terima kasih banyak! 🙏`;

  return message;
}

/**
 * Redirect pengguna langsung ke aplikasi WhatsApp dengan URL yang di-encode
 */
function sendWhatsAppMessage(messageText) {
  const encodedText = encodeURIComponent(messageText);
  const waUrl = `https://wa.me/${WA_PHONE_NUMBER}?text=${encodedText}`;
  window.open(waUrl, '_blank');
}

/**
 * Chat Cepat untuk konsultasi Reseller / Grosir
 */
function openResellerChat() {
  const msg = `Halo Admin Stik Singkong Cimande! 🌾\n\nSaya tertarik dengan *Paket Kemitraan Reseller / Pembelian Grosir* Stik Singkong "Crunch Your Day!". Boleh minta informasi harga grosir, minimal order, dan syarat kemitraannya? Terima kasih!`;
  sendWhatsAppMessage(msg);
}

/**
 * Chat Cepat Umum / Layanan Pelanggan
 */
function openCustomerServiceChat() {
  const msg = `Halo Admin Stik Singkong "Crunch Your Day!"! 👋 Mau tanya-tanya seputar produk stik singkong, pengiriman ke area saya, atau jadwal goreng fresh hari ini. Terima kasih!`;
  sendWhatsAppMessage(msg);
}

/**
 * Quick Order langsung 1 produk dari tombol di katalog
 */
function quickOrderDirect(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const msg = `Halo Admin! Saya ingin memesan langsung:
*1x ${product.name}* (${formatRupiah(product.price)})

Mohon info pengiriman dan pembayarannya ya. Terima kasih!`;
  sendWhatsAppMessage(msg);
}
