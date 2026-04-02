// ============================================
// TERRA BOTANICS — Shared JS
// This file handles cart logic and common UI
// ============================================

// Cart functions
function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem('terra_cart') || '[]');
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id, name, price, qty: 1 });
    }
    localStorage.setItem('terra_cart', JSON.stringify(cart));
    updateCartCount();
    showToast('Added to cart!');
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('terra_cart') || '[]');
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    const countEls = document.querySelectorAll('#cart-count');
    countEls.forEach(el => el.textContent = total);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

// Newsletter form
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    const nlForm = document.getElementById('newsletter-form');
    if (nlForm) {
        nlForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletter-email').value;
            showToast('Subscribed! Check your email for 10% off.');
            nlForm.reset();
        });
    }
});
