/**
 * MotoStore JC - JavaScript principal
 * Funcionalidades: carga de productos, filtros, redirección del logo al inicio, enlaces a WhatsApp
 */

// ==================== CATÁLOGO DE PRODUCTOS ====================
// Array con todos los productos (id, nombre, categoría, precio, imagen placeholder)
// Cuando tengas imágenes reales, cambia la URL por "img/nombre.jpg"
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
  { id: 10, name: "Direccional Secuencial (Recorrido)", category: "direccionales", price: 45900, image: "https://placehold.co/400x300/1a1a2e/c41e1e?text=✨+Secuencial" },
  { id: 11, name: "Direccional Integrada", category: "direccionales", price: 39900, image: "https://placehold.co/400x300/1a1a2e/c41e1e?text=✨+Integrada" },
  { id: 12, name: "Direccional Luz de Posición", category: "direccionales", price: 34900, image: "https://placehold.co/400x300/1a1a2e/c41e1e?text=✨+Luz+Posición" },
  { id: 13, name: "Direccional Fija", category: "direccionales", price: 28900, image: "https://placehold.co/400x300/1a1a2e/c41e1e?text=✨+Fija" }
];

// ========== FUNCIÓN PARA RENDERIZAR LOS PRODUCTOS EN EL GRID ==========
// Recibe un filtro (categoría) y muestra solo los productos que coinciden
function renderProducts(filter = "all") {
  const container = document.getElementById('productsContainer');
  if (!container) return; // Si no existe el contenedor (por ejemplo en index.html), no hace nada

  // Filtrar productos según la categoría seleccionada
  let filtered = filter === "all" ? [...productsData] : productsData.filter(p => p.category === filter);
  
  // Si no hay productos en la categoría, mostrar mensaje
  if (filtered.length === 0) {
    container.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:2rem;">No hay productos en esta categoría</div>';
    return;
  }

  // Base del enlace de WhatsApp (con mensaje predefinido que incluye el nombre del producto)
  const whatsappBase = "https://wa.me/+573122665314?text=Hola%2C%20estoy%20interesado%20en%20el%20producto%3A%20";
  
  // Generar el HTML de cada tarjeta de producto con botón mejorado
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

// ========== FUNCIÓN PARA INICIALIZAR LOS FILTROS ==========
// Se ejecuta solo en la página productos.html
function initFilters() {
  const desktopBtns = document.querySelectorAll('.filter-btn');
  const mobileSelect = document.getElementById('mobileFilterSelect');
  
  // Si no hay botones de filtro (porque no estamos en productos.html), salir
  if (desktopBtns.length === 0) return;
  
  // Función que actualiza el filtro activo y vuelve a renderizar productos
  function updateActive(category) {
    // Actualizar clase "active" en botones de escritorio
    desktopBtns.forEach(btn => {
      if (btn.dataset.category === category) btn.classList.add('active');
      else btn.classList.remove('active');
    });
    // Sincronizar el select móvil
    if (mobileSelect) mobileSelect.value = category;
    // Renderizar productos con la nueva categoría
    renderProducts(category);
  }
  
  // Eventos para botones de escritorio
  desktopBtns.forEach(btn => {
    btn.addEventListener('click', () => updateActive(btn.dataset.category));
  });
  
  // Evento para el select móvil
  if (mobileSelect) {
    mobileSelect.addEventListener('change', (e) => updateActive(e.target.value));
  }
  
  // Leer parámetro de la URL (ej: productos.html?cat=espejos) para filtrar automáticamente
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('cat');
  if (catParam && ['espejos', 'manubrios', 'luces', 'direccionales'].includes(catParam)) {
    updateActive(catParam);
  } else {
    renderProducts("all"); // Si no hay parámetro, mostrar todos
  }
}

// ========== FUNCIÓN PARA QUE EL LOGO LLEVE AL INICIO ==========
// Se ejecuta en ambas páginas (index.html y productos.html)
function initLogoHome() {
  const logoArea = document.getElementById('logoHomeLink');
  if (!logoArea) return;
  
  logoArea.addEventListener('click', () => {
    const path = window.location.pathname;
    // Si estamos en la página de productos, redirigir al index.html
    if (path.includes('productos.html')) {
      window.location.href = '../index.html';
    } else {
      // Si ya estamos en index.html, desplazar suavemente al hero
      const hero = document.getElementById('inicio');
      if (hero) hero.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ========== INICIALIZACIÓN CUANDO EL DOM ESTÉ LISTO ==========
document.addEventListener('DOMContentLoaded', () => {
  initLogoHome();               // Hacer que el logo sea clickeable
  if (document.getElementById('productsContainer')) {
    initFilters();             // Solo si estamos en la página de productos
  }
});