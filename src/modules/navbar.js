// navbar.js
export function renderNavbar(parent) {
  // =========================
  // ۱. لینک‌ها و دکمه‌ها
  // =========================
  const links = [
    { label: "Categories", href: "#" },
    { label: "Brands", href: "#" }
  ];

  const rightButtons = [
    { label: "Sell with Online Shop", class: "btn btn-custom rounded-3 px-3 py-2" },
    { label: '<i class="bi bi-search"></i>', class: "btn btn-custom rounded-3 px-3 py-2" },
    { 
      label: '<i class="bi bi-cart"></i>', 
      class: "btn btn-custom rounded-3 px-3 py-2 position-relative", 
      id: "navbar-cart-btn", 
      toggle: "offcanvas", 
      target: "#cartSidebar" 
    },
    { label: '<i class="bi bi-heart-fill"></i>', class: "btn btn-custom rounded-3 px-3 py-2", href: "favorites.html" },
    { label: '<i class="bi bi-person"></i>', class: "btn btn-custom rounded-3 px-3 py-2" }
  ];

  // =========================
  // ۲. ایجاد المان navbar
  // =========================
  const nav = document.createElement("nav");
  nav.className = "glassNavbar navbar navbar-expand-lg";
  nav.setAttribute("aria-label", "Main navbar");

  nav.innerHTML = `
    <div class="container d-flex align-items-center py-2">
      <!-- لوگو -->
      <a class="navbar-brand d-flex align-items-center me-3 mobile-logo mobile-hide-on-toggle" href="index.html">
        <img src="assets/images/shopping-logo.png" alt="logo" width="30" height="30" class="me-2" onerror="this.style.display='none'">
        <span class="fw-bold">Online Shopping</span>
      </a>

      <!-- دکمه‌های موبایل -->
      <div class="d-flex align-items-center gap-2 d-lg-none ms-auto mobile-toggle-buttons">
        <button class="${rightButtons[1].class} btn-sm">${rightButtons[1].label}</button>
        <button class="${rightButtons[2].class} btn-sm position-relative"
                data-bs-toggle="offcanvas" 
                data-bs-target="#cartSidebar">
          ${rightButtons[2].label}
          <span id="navbar-cart-count-mobile" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">0</span>
        </button>
        <a href="favorites.html" class="${rightButtons[3].class} btn-sm">${rightButtons[3].label}</a>
        <button class="navbar-toggler btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#mobileMenu" aria-controls="mobileMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>

      <!-- منوی دسکتاپ -->
      <div class="collapse navbar-collapse" id="mainNavbar">
        <ul class="navbar-nav me-auto mb-lg-0 align-items-center"></ul>
        <div class="d-flex align-items-center gap-2 nav-actions"></div>
      </div>
    </div>

    <!-- منوی موبایل -->
    <div class="collapse" id="mobileMenu">
      <div class="menu-header d-flex justify-content-between align-items-center position-absolute start-0 w-100 px-5 py-2">
        <button class="btn btn-sm btn-outline-secondary mobile-signup">
           <i class="bi bi-person"></i>
        </button>
        <button class="btn btn-sm btn-outline-secondary mobile-close" data-bs-toggle="collapse" data-bs-target="#mobileMenu">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      <ul class="list-unstyled p-3 mb-0 mt-5">
        <li><a href="#" class="d-block nav-link py-2">Sell with Online Shop</a></li>
        <li><a href="#" class="d-block nav-link py-2">Categories</a></li>
        <li><a href="#" class="d-block nav-link py-2">Brands</a></li>
        <li><a href="favorites.html" class="d-block nav-link py-2 text-danger">❤️ Favorites</a></li>
      </ul>
    </div>
  `;

  // =========================
  // ۳. اضافه کردن لینک‌ها و دکمه‌ها (دسکتاپ)
  // =========================
  const ul = nav.querySelector(".navbar-nav");
  links.forEach(l => {
    const li = document.createElement("li");
    li.className = "nav-item";
    li.innerHTML = `<a class="nav-link px-2 text-dark" href="${l.href}">${l.label}</a>`;
    ul.appendChild(li);
  });

  const actions = nav.querySelector(".nav-actions");
  rightButtons.forEach(b => {
    const wrapper = document.createElement("div");
    if (b.href) {
      wrapper.innerHTML = `<a href="${b.href}" class="${b.class}">${b.label}</a>`;
    } else {
      wrapper.innerHTML = `
        <button type="button" 
                class="${b.class}" 
                ${b.toggle ? `data-bs-toggle="${b.toggle}"` : ""} 
                ${b.target ? `data-bs-target="${b.target}"` : ""} 
                ${b.id ? `id="${b.id}"` : ""}>
          ${b.label}
          ${b.id === "navbar-cart-btn" 
            ? `<span id="navbar-cart-count" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">0</span>` 
            : ""}
        </button>`;
    }
    actions.appendChild(wrapper.firstElementChild);
  });

  parent.appendChild(nav);

  // =========================
  // ۴. مدیریت موبایل (نمایش/مخفی)
  // =========================
  const mobileMenu = nav.querySelector('#mobileMenu');
  const mobileToggleButtons = nav.querySelectorAll('.mobile-toggle-buttons button, .mobile-toggle-buttons a');
  const mobileLogo = nav.querySelector('.mobile-hide-on-toggle');

  mobileMenu.addEventListener('show.bs.collapse', () => {
    mobileToggleButtons.forEach(btn => btn.style.display = 'none');
    mobileLogo.classList.add('hide');
  });

  mobileMenu.addEventListener('hide.bs.collapse', () => {
    mobileToggleButtons.forEach(btn => btn.style.display = 'inline-block');
    mobileLogo.classList.remove('hide');
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) {
      mobileMenu.classList.remove('show');
      mobileMenu.setAttribute('aria-expanded', 'false');

      const bsCollapse = bootstrap.Collapse.getInstance(mobileMenu);
      if (bsCollapse) bsCollapse.hide();

      mobileToggleButtons.forEach(btn => btn.style.display = 'inline-block');
      mobileLogo.classList.remove('hide');
    }
  });

  // =========================
  // ۵. جستجو دسکتاپ
  // =========================
  let searchBtn = actions.querySelector('button .bi-search')?.closest('button')
               || actions.querySelector('a .bi-search')?.closest('a');

  if (!searchBtn) {
    const anyIcon = nav.querySelector('.bi-search');
    if (anyIcon) {
      const possibleBtn = anyIcon.closest('button, a');
      if (possibleBtn && possibleBtn.parentElement === actions) {
        searchBtn = possibleBtn;
      }
    }
  }

  const searchWrapper = document.createElement('div');
  searchWrapper.className = 'search-wrapper';
  searchWrapper.innerHTML = `<input type="text" class="search-input" placeholder="Search..." aria-label="Search" />`;

  if (searchBtn && searchBtn.parentElement === actions) {
    actions.insertBefore(searchWrapper, searchBtn);
  } else {
    actions.appendChild(searchWrapper);
  }

  let searchOpen = false;
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      searchOpen = !searchOpen;
      searchWrapper.classList.toggle('active', searchOpen);
      if (searchOpen) searchWrapper.querySelector('.search-input').focus();
      else searchWrapper.querySelector('.search-input').blur();
    });

    searchBtn.addEventListener('dblclick', () => {
      searchOpen = false;
      searchWrapper.classList.remove('active');
      searchWrapper.querySelector('.search-input').blur();
    });
  } else {
    searchWrapper.addEventListener('click', () => {
      searchOpen = true;
      searchWrapper.classList.add('active');
      searchWrapper.querySelector('.search-input').focus();
    });
  }

  // =========================
  // ۶. جستجو موبایل
  // =========================
  const mobileSearchBtn = nav.querySelector('.mobile-toggle-buttons .bi-search')?.closest('button');
  if (mobileSearchBtn) {
    const mobileSearchWrapper = document.createElement('div');
    mobileSearchWrapper.className = 'search-wrapper mobile-search-wrapper';
    mobileSearchWrapper.innerHTML = `<input type="text" class="search-input" placeholder="Search..." aria-label="Search" />`;
    mobileSearchBtn.insertAdjacentElement('afterend', mobileSearchWrapper);

    let mobileSearchOpen = false;
    mobileSearchBtn.addEventListener('click', () => {
      mobileSearchOpen = !mobileSearchOpen;
      mobileSearchWrapper.classList.toggle('active', mobileSearchOpen);
      if (mobileSearchOpen) mobileSearchWrapper.querySelector('.search-input').focus();
      else mobileSearchWrapper.querySelector('.search-input').blur();
    });

    mobileSearchBtn.addEventListener('dblclick', () => {
      mobileSearchOpen = false;
      mobileSearchWrapper.classList.remove('active');
      mobileSearchWrapper.querySelector('.search-input').blur();
    });
  }
}
