// Catálogo de productos (con imágenes placeholder)
const productsData = [
  { id: 1, name: "Espejo Alerón", category: "espejos", price: 52900, image: "https://placehold.co/400x300/1a1a2e/c41e1e?text=🔹+Espejo+Alerón" },
  { id: 2, name: "Espejo Fantasma", category: "espejos", price: 49900, image: "https://placehold.co/400x300/1a1a2e/c41e1e?text=🔹+Espejo+Fantasma" },
  { id: 3, name: "Espejo Abatible", category: "espejos", price: 45900, image: "https://placehold.co/400x300/1a1a2e/c41e1e?text=🔹+Espejo+Abatible" },
  { id: 4, name: "Espejo Café Racer / Retro", category: "espejos", price: 68900, image: "https://placehold.co/400x300/1a1a2e/c41e1e?text=🔹+Café+Racer" },
  { id: 5, name: "Manubrio Rizoma", category: "manubrios", price: 189900, image: "https://placehold.co/400x300/1a1a2e/c41e1e?text=🏍️+Rizoma" },
  { id: 6, name: "Manubrio ProTaper", category: "manubrios", price: 159900, image: "https://placehold.co/400x300/1a1a2e/c41e1e?text=🏍️+ProTaper" },
  { id: 7, name: "Manubrio Renthal", category: "manubrios", price: 145900, image: "https://placehold.co/400x300/1a1a2e/c41e1e?text=🏍️+Renthal" },
  { id: 8, name: "Luces Exploradoras LED", category: "luces", price: 89900, image: "https://placehold.co/400x300/1a1a2e/c41e1e?text=💡+Exploradoras" },
  { id: 9, name: "Luz LED para Farola", category: "luces", price: 129900, image: "https://placehold.co/400x300/1a1a2e/c41e1e?text=💡+Farola+LED" },
  { id: 10, name: "Direccional Secuencial", category: "direccionales", price: 45900, image: "https://placehold.co/400x300/1a1a2e/c41e1e?text=✨+Secuencial" },
  { id: 11, name: "Direccional Integrada", category: "direccionales", price: 39900, image: "https://placehold.co/400x300/1a1a2e/c41e1e?text=✨+Integrada" },
  { id: 12, name: "Direccional Luz de Posición", category: "direccionales", price: 34900, image: "https://placehold.co/400x300/1a1a2e/c41e1e?text=✨+Luz+Posición" },
  { id: 13, name: "Direccional Fija", category: "direccionales", price: 28900, image: "https://placehold.co/400x300/1a1a2e/c41e1e?text=✨+Fija" }
];

function renderProducts(filter = "all") {
  const container = document.getElementById('productsContainer');
  if (!container) return;
  let filtered = filter === "all" ? [...productsData] : productsData.filter(p => p.category === filter);
  if (filtered.length === 0) {
    container.innerHTML = '<div style="text-align:center; padding:2rem;">No hay productos en esta categoría</div>';
    return;
  }
  const whatsappBase = "https://wa.me/+573122665314?text=Hola%2C%20estoy%20interesado%20en%20el%20producto%3A%20";
  container.innerHTML = filtered.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-img" onerror="this.src='https://placehold.co/400x300/2a2a3a/c41e1e?text=${encodeURIComponent(product.name)}'">
      <h3>${product.name}</h3>
      <div class="product-category">${product.category.toUpperCase()}</div>
      <div class="product-price">$${product.price.toLocaleString()}</div>
      <a href="${whatsappBase}${encodeURIComponent(product.name)}" target="_blank" class="whatsapp-product-btn">
        <i class="fab fa-whatsapp"></i> Consultar por WhatsApp →
      </a>
    </div>
  `).join('');
}

function initFilters() {
  const desktopBtns = document.querySelectorAll('.filter-btn');
  const mobileSelect = document.getElementById('mobileFilterSelect');
  if (desktopBtns.length === 0) return;
  function updateActive(category) {
    desktopBtns.forEach(btn => {
      if (btn.dataset.category === category) btn.classList.add('active');
      else btn.classList.remove('active');
    });
    if (mobileSelect) mobileSelect.value = category;
    renderProducts(category);
  }
  desktopBtns.forEach(btn => {
    btn.addEventListener('click', () => updateActive(btn.dataset.category));
  });
  if (mobileSelect) {
    mobileSelect.addEventListener('change', (e) => updateActive(e.target.value));
  }
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('cat');
  if (catParam && ['espejos', 'manubrios', 'luces', 'direccionales'].includes(catParam)) {
    updateActive(catParam);
  } else {
    renderProducts("all");
  }
}

function initLogoHome() {
  const logoArea = document.getElementById('logoHomeLink');
  if (!logoArea) return;
  logoArea.addEventListener('click', () => {
    const path = window.location.pathname;
    if (path.includes('productos.html')) {
      window.location.href = '../index.html';
    } else {
      document.querySelector('.hero')?.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initLogoHome();
  if (document.getElementById('productsContainer')) initFilters();
});