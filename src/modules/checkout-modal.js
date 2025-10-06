import { updateCartCount } from "./cart.js";

let cart = JSON.parse(localStorage.getItem("cart")) || {};
let products = [];

export function setProducts(list) {
  products = list;
  renderCart();
}

export function updateCart(newCart) {
  cart = { ...newCart };
  saveCart();
  renderCart();
  updateCartCount();
  window.dispatchEvent(new CustomEvent("cartUpdated", { detail: cart }));
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

let cartItems, cartTotal, cartCount, checkoutBtn, modalCartItems, modalTotal, checkoutForm, checkoutModalEl, checkoutModal;

export function renderCheckout() {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <div class="offcanvas offcanvas-start" tabindex="-1" id="cartSidebar">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title">
          Your Cart (<span id="cart-count">0</span>)
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
      </div>
      <div class="offcanvas-body">
        <ul id="cart-items" class="list-group mb-3"></ul>
        <div class="d-flex justify-content-between fw-bold mb-3">
          <span>Total:</span>
          <span id="cart-total">0؋</span>
        </div>
        <button class="btn btn-success w-100 mt-3" id="checkoutBtn">Checkout</button>
      </div>
    </div>

    <div class="modal fade" id="checkoutModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Checkout</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <ul id="modal-cart-items" class="list-group mb-3"></ul>
            <form id="checkoutForm" novalidate>
              <div class="mb-3">
                <label for="name" class="form-label">Full Name</label>
                <input type="text" class="form-control" id="name" required>
              </div>
              <div class="mb-3">
                <label for="card" class="form-label">Card Number</label>
                <input type="text" class="form-control" id="card" required>
              </div>
              <div class="mb-3">
                <label for="expiry" class="form-label">Expiry Date</label>
                <input type="month" class="form-control" id="expiry" required>
              </div>
              <button type="submit" class="btn btn-success w-100">
                Pay <span id="modalTotal">0</span>؋
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(wrapper);

  cartItems = document.getElementById("cart-items");
  cartTotal = document.getElementById("cart-total");
  cartCount = document.getElementById("cart-count");
  checkoutBtn = document.getElementById("checkoutBtn");
  modalCartItems = document.getElementById("modal-cart-items");
  modalTotal = document.getElementById("modalTotal");
  checkoutForm = document.getElementById("checkoutForm");
  checkoutModalEl = document.getElementById("checkoutModal");
  checkoutModal = new bootstrap.Modal(checkoutModalEl);

  renderCart();

  checkoutBtn.addEventListener("click", () => {
    if (Object.keys(cart).length === 0) {
      alert("Cart is empty ⚠️");
      return;
    }
    renderModalCart();
    const totalAmount = Object.keys(cart).reduce((sum, id) => {
      const p = products.find(pr => pr.id == id);
      if (!p) return sum;
      const price = parseInt(p.price.toString().replace(/[^\d]/g, ""));
      return sum + price * cart[id];
    }, 0);
    modalTotal.textContent = totalAmount;
    checkoutModal.show();
  });

  checkoutForm.addEventListener("submit", e => {
    e.preventDefault();
    if (!document.getElementById("name").value.trim()) {
      alert("Full name is required.");
      return;
    }
    if (document.getElementById("card").value.replace(/\D/g, "").length !== 16) {
      alert("Card number must be 16 digits.");
      return;
    }
    if (!document.getElementById("expiry").value.trim()) {
      alert("Expiry date is required.");
      return;
    }

    checkoutModal.hide();
    alert("Your order has been successfully placed ✅");
    cart = {};
    saveCart();
    renderCart();
    updateCartCount();
    checkoutForm.reset();
    window.dispatchEvent(new CustomEvent("cartUpdated", { detail: cart }));
  });

  cartItems.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn?.dataset.id) return;
    const id = btn.dataset.id;

    if (btn.classList.contains("btn-plus")) cart[id] = (cart[id] || 0) + 1;
    if (btn.classList.contains("btn-minus")) cart[id] > 1 ? cart[id]-- : delete cart[id];
    if (btn.classList.contains("btn-remove")) delete cart[id];

    saveCart();
    renderCart();
    updateCartCount();
    window.dispatchEvent(new CustomEvent("cartUpdated", { detail: cart }));
  });
}

function renderCart() {
  if (!cartItems) return;
  cartItems.innerHTML = "";
  let total = 0, count = 0;

  Object.keys(cart).forEach(id => {
    const p = products.find(pr => pr.id == id);
    if (!p) return;
    const qty = cart[id];
    count += qty;
    const price = parseInt(p.price.toString().replace(/[^\d]/g, ""));
    total += price * qty;

    cartItems.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <strong>${p.title}</strong>
          <span class="badge bg-secondary ms-2">${qty}</span>
          <div class="mt-1">
            <button class="btn btn-sm btn-outline-secondary btn-minus" data-id="${p.id}">
              <i class="bi bi-dash-lg"></i>
            </button>
            <button class="btn btn-sm btn-outline-secondary btn-plus" data-id="${p.id}">
              <i class="bi bi-plus-lg"></i>
            </button>
            <button class="btn btn-sm btn-outline-secondary btn-remove" data-id="${p.id}">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
        <span>${qty * price}؋</span>
      </li>`;
  });

  cartTotal.textContent = `${total}؋`;
  cartCount.textContent = count;
  updateCartCount();
}

function renderModalCart() {
  modalCartItems.innerHTML = Object.keys(cart)
    .map(id => {
      const p = products.find(pr => pr.id == id);
      if (!p) return "";
      const price = parseInt(p.price.toString().replace(/[^\d]/g, ""));
      return `<li class="list-group-item d-flex justify-content-between">
        <span>${p.title} × ${cart[id]}</span>
        <strong>${price * cart[id]}؋</strong>
      </li>`;
    })
    .join("");
}
