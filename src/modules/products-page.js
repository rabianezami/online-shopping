import { renderNavbar } from "./navbar.js";
import { renderProductsBase } from "./products-base.js";

export function renderProductsPage(parent, category = "all") {
  renderNavbar(document.body);
  renderProductsBase(parent, category, { layout: "grid" });
}
