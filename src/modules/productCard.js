export function createProductCard(p, cart, favorites, saveCart, saveFavs, updateCart, renderUI, layout = "grid") {
  const col = document.createElement("div");

  if (layout === "scroll") {
    col.className = "col-card scroll-card col-12 col-md-6 col-lg-4";
  } else {
    col.className = "col-card col-12 col-md-6 col-lg-4";
  }

  const qty = cart[p.id] || 0;

  col.innerHTML = `
      <div class="card h-100 shadow-sm border-0">
        <div class="position-relative img-wrapper">
          <img src="${p.image}" class="card-img-top rounded-3 product-img" alt="${p.title}">
          <button class="btn btn-light rounded-circle shadow-sm position-absolute top-0 end-0 m-2 fav-btn">
            <i class="bi ${favorites.some(f => f.id === p.id) ? "bi-heart-fill text-danger" : "bi-heart"}"></i>
          </button>
        </div>
        <div class="card-body d-flex flex-column">
          <p class="small fw-bold mb-2 text-truncate" title="${p.title}">${p.title}</p>
          <div class="mt-auto d-flex justify-content-between align-items-center">
            <div>
              <div class="fw-bold text-dark">${p.price}</div>
              ${p.oldPrice ? `<div class="text-muted text-decoration-line-through small">${p.oldPrice}</div>` : ""}
            </div>
            <div id="controls-${p.id}" class="controls-wrapper">
              ${qty > 0
                ? `
                  <div class="quantity-box">
                    <button class="btn btn-sm btn-outline-card btn-minus" data-id="${p.id}">
                      <i class="bi bi-dash-lg"></i>
                    </button>
                    <span class="mx-2 small fw-bold text-white">${qty}</span>
                    <button class="btn btn-sm btn-outline-card btn-plus" data-id="${p.id}">
                      <i class="bi bi-plus-lg"></i>
                    </button>
                  </div>
                `
                : `<button class="btn btn-sm btn-outline-card btn-plus" data-id="${p.id}">
                    <i class="bi bi-plus-lg"></i>
                  </button>`
              }
            </div>
          </div>
        </div>
      </div>
  `;

  // ❤️ علاقه‌مندی
  col.querySelector(".fav-btn").addEventListener("click", () => {
    const index = favorites.findIndex(f => f.id === p.id);
    if (index !== -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(p);
    }
    saveFavs();
    renderUI();
  });

  return col;
}
