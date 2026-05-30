/**
 * MotoStore JC - Catálogo de productos
 * Todas las imágenes .png se encuentran en la carpeta img/
 */

const productsData = [
  // ========== ESPEJOS ==========
  { id: 1, name: "Espejo Alerón Grande", category: "espejos", price: 60000, image: "img/AleronGrande.png" },
  { id: 2, name: "Espejo Alerón Pequeño", category: "espejos", price: 55000, image: "img/AleronPequeño.png" },
  { id: 3, name: "Espejo Fantasma", category: "espejos", price: 35000, image: "img/Fantasma.png" },
  { id: 4, name: "Espejo Café Racer", category: "espejos", price: 50000, image: "img/CafeRacer.png" },
  { id: 5, name: "Espejos Akt NKD", category: "espejos", price: 30000, image: "img/NKD.png" },
  { id: 6, name: "Espejos Rizoma 5 Puntas", category: "espejos", price: 35000, image: "img/5puntas.png" },
  { id: 7, name: "Espejos Suzuki Gixxer", category: "espejos", price: 55000, image: "img/Gixxer.png" },
  { id: 8, name: "Espejos Pulsar NS", category: "espejos", price: 35000, image: "img/NS.png" },

  // ========== MANUBRIOS ==========
  { id: 9, name: "Manubrio Rizoma Con Bases (Todos los colores)", category: "manubrios", price: 150000, image: "img/ManubrioRizoma.png" },
  { id: 10, name: "Manubrio Protaper Corto Con Bases (Todos los colores)", category: "manubrios", price: 150000, image: "img/ManubrioProtaper.png" },

  // ========== LUCES ==========
  { id: 11, name: "Direccionales Led Secuencial Moto Juego X 4 Unidades", category: "luces", price: 50000, image: "img/LedSecuencial.png" },
  { id: 12, name: "Direccional Led Amarilla Fija Lujo Ojo De Aguila X4 Unidades", category: "luces", price: 50000, image: "img/OjoAguila.png" },
  { id: 13, name: "Ojo De Diablo Conexion Universal", category: "luces", price: 50000, image: "img/OjoDiablo.png" },
  { id: 14, name: "Bombillo Led H4 Motoled 4 Caras 8.000 Lm", category: "luces", price: 50000, image: "img/BombilloLed.png" },
  { id: 15, name: "Exploradoras Led Auxiliares 2500lm Para Moto Y Carro", category: "luces", price: 50000, image: "img/ExploradorasLed.png" },

  // ========== MÁS ACCESORIOS ==========
  { id: 16, name: "Balaclava Color Negro Para Hombre", category: "accesorios", price: 20000, image: "img/Balaclava.png" },
  { id: 17, name: "Balaclava Color Negro Para Mujer", category: "accesorios", price: 20000, image: "img/BalaclavaM.png" },
  { id: 18, name: "Intercomunicador Moto Q58 Cano Importaciones 2 Unidades", category: "accesorios", price: 180000, image: "img/Q58.png" }
];

// ========== FUNCIÓN PARA RENDERIZAR PRODUCTOS ==========
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

// ========== FILTROS ==========
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
  if (catParam && ['espejos', 'manubrios', 'luces', 'accesorios'].includes(catParam)) {
    updateActive(catParam);
  } else {
    renderProducts("all");
  }
}

// ========== LOGO (volver al inicio) ==========
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

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', () => {
  initLogoHome();
  if (document.getElementById('productsContainer')) initFilters();
});