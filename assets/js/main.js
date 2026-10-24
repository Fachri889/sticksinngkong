/**
 * main.js
 * Logika Umum Antarmuka, Navigasi Mobile, dan Toast Notification
 */

// Toast notification helper
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const typeClass = type === 'success' ? 'toast-success' : 'toast-info';
  const icon = type === 'success' 
    ? '<i class="fa-solid fa-circle-check text-emerald-400"></i>' 
    : '<i class="fa-solid fa-circle-info text-amber-300"></i>';

  toast.className = `toast ${typeClass}`;
  toast.innerHTML = `${icon} <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px) scale(0.95)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

// Inisialisasi antarmuka saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
  // Mobile drawer toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Tutup saat link di-klik
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Set active link berdasarkan URL saat ini
  const currentPath = window.location.pathname;
  const pageName = currentPath.split('/').pop() || 'index.html';

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === pageName || (pageName === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Sinkronkan badge cart
  if (typeof updateGlobalCartBadge === 'function') {
    updateGlobalCartBadge();
  }
});
