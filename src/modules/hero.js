// hero data
const heroData = {
  title: "Find the Best Online Deals & Trusted Products Across the Globe",
  subtitle:
    "Every purchase allows you to access quality products at great prices, enjoy fast and reliable delivery, and experience a seamless shopping journey that meets all your daily needs.",
  freeShipping: { big: "ENJOY", small: "FREE SHIPPING" },
  image: "assets/images/hero-picc.jpg",
};

// Render hero section
export function renderHeroSection(parent) {
  const section = document.createElement("section");
  section.className = "hero-section py-5";

  // Stracture hero
  section.innerHTML = `
    <div class="container">
      <div class="row align-items-center">
        <!-- متن سمت چپ -->
        <div class="col-lg-6 text-white order-2 order-lg-1">
          <h1 class="fw-bold mb-2 mt-4 pt-5">${heroData.title}</h1>
          <p class="mb-4">${heroData.subtitle}</p>

          <!-- Free Shipping Box -->
          <div class="free-shipping-box d-inline-block p-3">
            <span class="d-block fw-bold fs-1 bg-white text-dark text-center mb-2">${heroData.freeShipping.big}</span>
            <span class="d-block fs-4 bg-white text-dark text-center px-2">${heroData.freeShipping.small}</span>
          </div>
        </div>

        <!-- Right image-->
        <div class="col-lg-6 text-center order-1 order-lg-2">
          <img src="${heroData.image}" alt="Hero Image" class="img-fluid hero-image">
        </div>
      </div>
    </div>
  `;

  // Adding to parent
  parent.appendChild(section);
}
