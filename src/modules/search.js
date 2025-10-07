// search.js
// تابع فعال‌سازی جستجو
export async function enableLiveSearch(inputSelector, resultContainerSelector) {
  const input = document.querySelector(inputSelector);
  if (!input) return;

  const container = document.createElement("div");
  container.className = "live-search-results shadow p-2 rounded bg-white position-absolute";
  container.style.display = "none";
  container.style.maxHeight = "300px";
  container.style.overflowY = "auto";
  container.style.zIndex = "9999";
  input.parentElement.style.position = "relative";
  input.parentElement.appendChild(container);

  const res = await fetch("assets/data/products.json");
  const products = await res.json();

  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    container.innerHTML = "";

    if (query.length === 0) {
      container.style.display = "none";
      return;
    }

    const results = products.filter(p =>
      p.title.toLowerCase().includes(query)
    );

    if (results.length === 0) {
      container.innerHTML = `<div class="p-2 text-muted">No results found</div>`;
    } else {
      results.forEach(p => {
        const item = document.createElement("div");
        item.className = "d-flex align-items-center gap-2 p-2 search-item";
        item.style.cursor = "pointer";
        item.innerHTML = `
          <img src="${p.image}" width="50" height="50" class="rounded border" alt="${p.title}">
          <div>
            <div class="fw-semibold">${p.title}</div>
            <div class="text-danger small">${p.price}</div>
          </div>
        `;
        item.addEventListener("click", () => {
          window.open("products.html?category=" + p.category, "_blank");
        });
        container.appendChild(item);
      });
    }

    container.style.display = "block";
  });

  // وقتی کلیک بیرون شد → بسته شود
  document.addEventListener("click", (e) => {
    if (!input.contains(e.target) && !container.contains(e.target)) {
      container.style.display = "none";
    }
  });
}
