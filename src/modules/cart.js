
// مدیریت سبد خرید (localStorage + رویدادها)
// =========================

let cart = JSON.parse(localStorage.getItem("cart")) || {}; // {id: qty}

// =========================
// ۱. عملیات روی cart
// =========================
export function addToCart(productId) {
  cart[productId] = (cart[productId] || 0) + 1;
  saveCart();
  dispatchCartUpdate();
}

export function removeFromCart(productId) {
  delete cart[productId];
  saveCart();
  dispatchCartUpdate();
}

export function clearCart() {
  cart = {};
  saveCart();
  dispatchCartUpdate();
}

export function getCart() {
  return cart;
}

// =========================
// ۲. ذخیره و بازیابی cart
// =========================
export function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// =========================
// ۳. بروزرسانی شمارنده cart در Navbar
// =========================
export function updateCartCount() {
  const count = Object.values(cart).reduce((acc, qty) => acc + qty, 0);

  // دسکتاپ
  const badgeDesktop = document.getElementById("navbar-cart-count");
  if (badgeDesktop) badgeDesktop.textContent = count;

  // موبایل
  const badgeMobile = document.getElementById("navbar-cart-count-mobile");
  if (badgeMobile) badgeMobile.textContent = count;
}

// =========================
// ۴. انتشار رویداد cartUpdated برای هماهنگی ماژول‌ها
// =========================
export function dispatchCartUpdate() {
  updateCartCount();
  window.dispatchEvent(new CustomEvent("cartUpdated", { detail: cart }));
}

// =========================
// ۵. گوش دادن به تغییرات خارجی cart
// =========================
window.addEventListener("cartUpdated", e => {
  cart = e.detail;
  updateCartCount();
});
