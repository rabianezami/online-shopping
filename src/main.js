// main.js
import { renderNavbar } from "./modules/navbar.js";
import { renderHeroSection } from "./modules/hero.js";
import { renderCheckout } from "./modules/checkout-modal.js";
import { renderProductsBase } from "./modules/products-base.js"; // 👈 تغییر اینجا

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const hero = document.getElementById("hero");
  const products = document.getElementById("products");

  renderNavbar(navbar);
  renderHeroSection(hero);

  // اول checkout رو بساز
  renderCheckout(document.body);

  // حالا چندین سکشن محصولات بسازیم
  const categories = ["men", "women", "kids"];

  categories.forEach(cat => {
    const section = document.createElement("div");
    products.appendChild(section);
    renderProductsBase(section, cat, { enableDrag: true });
  });
});
