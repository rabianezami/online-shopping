import { renderProductsBase } from "./products-base.js";

export function renderProducts(parent, category = "all") {
  renderProductsBase(parent, category, { layout: "scroll", enableDrag: true });
}
