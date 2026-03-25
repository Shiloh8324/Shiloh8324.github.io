/* ══════════════════════════════════════════
   DecorJRZ — Script.js
══════════════════════════════════════════ */

/* ──────────────────────────────────────────
   DATOS DE PRODUCTOS
────────────────────────────────────────── */
const products = [
  {
    id: 1,
    cat: "Lambrín",
    featured: true,
    name: "Lambrín pvc",
    price: "Desde $165/ m²",
    img: "Lambrin.jpg",
    desc: "El lambrín de material pvc aporta calidez genuina a cualquier espacio. Ideal para salas, habitaciones y estudios. Su textura única crea ambientes acogedores y con carácter que perduran en el tiempo.",
    specs: [
      ["Material",    "Pvc resistente"],
      ["Grosor",      "12 mm"],
      ["Medidas",     "120 × 20 cm por tabla"],
      ["Acabado",     "Calidad premium de excelente calidad"],
      ["Uso",         "Interior"],
      ["Instalación", "Uso de pegamento o tornillos"],
    ]
  },
  {
    id: 2,
    cat: "Lambrín",
    featured: false,
    name: "Lambrín PVC Premium",
    price: "Desde $60 / m²",
    img: "Lambrin2.jpg",
    desc: "El lambrín de PVC combina la estética de la madera con la practicidad de un material impermeable y de bajo mantenimiento. Perfecto para baños, cocinas y zonas húmedas.",
    specs: [
      ["Material",    "PVC de alta densidad"],
      ["Grosor",      "8 mm"],
      ["Medidas",     "200 × 25 cm por tabla"],
      ["Acabado",     "Madera / Liso / Texturizado"],
      ["Uso",         "Interior / Zonas húmedas"],
      ["Instalación", "Clip o adhesivo"],
    ]
  },
  {
    id: 3,
    cat: "Efecto Mármol",
    featured: true,
    name: "Panel Efecto Mármol Blanco",
    price: "Desde $120 / m²",
    img: "Panel.png",
    desc: "Placas decorativas con acabado mármol blanco de alta fidelidad. Transforman cualquier pared o suelo en una superficie de lujo sin los costos ni el peso del mármol natural.",
    specs: [
      ["Material",    "Composite de alta presión"],
      ["Grosor",      "6 mm"],
      ["Medidas",     "120 × 60 cm"],
      ["Acabado",     "Alto brillo / Mate"],
      ["Uso",         "Interior"],
      ["Resistencia", "Golpes y humedad"],
    ]
  },
  {
    id: 4,
    cat: "Efecto Mármol",
    featured: false,
    name: "Panel Mármol Negro Veteado",
    price: "Desde $135 / m²",
    img: "Placa.jpg",
    desc: "Panel decorativo con vetas doradas sobre fondo negro profundo. Crea ambientes de alta gama en baños, cocinas y espacios de recepción con un impacto visual inigualable.",
    specs: [
      ["Material",    "Composite premium"],
      ["Grosor",      "6 mm"],
      ["Medidas",     "120 × 60 cm"],
      ["Acabado",     "Ultra brillo"],
      ["Uso",         "Interior"],
      ["Resistencia", "Alta resistencia al calor"],
    ]
  },
  {
    id: 5,
    cat: "Persianas",
    featured: true,
    name: "Persiana Roller",
    price: "Desde $350 / pieza",
    img: "Persianas.jpg",
    desc: "Las persianas roller blackout bloquean el 100% de la luz exterior. Perfectas para recámaras, cines en casa y cualquier espacio donde necesites control total de la iluminación.",
    specs: [
      ["Material",    "Tela blackout 100%"],
      ["Operación",   "Cadena o motorizada"],
      ["Medidas",     "A la medida hasta 3 m"],
      ["Colores",     "+15 opciones"],
      ["Garantía",    "2 años"],
    ]
  },
  {
    id: 6,
    cat: "Persianas",
    featured: false,
    name: "Persiana Veneciana Aluminio",
    price: "Desde $280 / pieza",
    img: "Persianas2.jpg",
    desc: "Las persianas venecianas de aluminio son el equilibrio perfecto entre privacidad y luz natural. Sus láminas orientables permiten regular la entrada de luz con precisión.",
    specs: [
      ["Material",    "Aluminio anodizado"],
      ["Láminas",     "25 mm o 50 mm"],
      ["Operación",   "Cordón de elevación"],
      ["Colores",     "Blanco / Gris / Madera"],
      ["Garantía",    "1 año"],
    ]
  },
  {
    id: 7,
    cat: "Lamparas",
    featured: false,
    name: "Lampara estilo",
    price: "Desde $45 / m²",
    img: "Lamparas2.jpg",
    desc: "Plafones de PVC texturizado, fáciles de instalar y mantener. Transforman techos ordinarios en superficies decorativas elegantes sin necesidad de obras mayores.",
    specs: [
      ["Material",      "PVC"],
      ["Grosor",        "10 mm"],
      ["Medidas",       "300 × 25 cm"],
      ["Acabado",       "Texturizado / Liso"],
      ["Uso",           "Interior"],
      ["Mantenimiento", "Paño húmedo"],
    ]
  },
  {
    id: 8,
    cat: "Lamparas",
    featured: true,
    name: "Lampara estilo",
    price: "Desde $95 / m²",
    img: "Lamparas.jpg",
    desc: "Paneles tridimensionales que crean efectos de profundidad y textura únicos. Perfectos como paredes de acento en salas, recámaras y espacios comerciales modernos.",
    specs: [
      ["Material",    "Poliestireno / MDF"],
      ["Grosor",      "20 mm"],
      ["Medidas",     "50 × 50 cm por pieza"],
      ["Acabado",     "Listo para pintar"],
      ["Uso",         "Interior"],
      ["Instalación", "Adhesivo o tornillos"],
    ]
  },
  
  {
    id: 9,
    cat: "Cortinas Waves",
    featured: false,
    name: "Cortinas",
    price: "Desde $45 / m²",
    img: "Cortinas.jpg",
    desc: "Plafones de PVC texturizado, fáciles de instalar y mantener. Transforman techos ordinarios en superficies decorativas elegantes sin necesidad de obras mayores.",
    specs: [
      ["Material",      "PVC"],
      ["Grosor",        "10 mm"],
      ["Medidas",       "300 × 25 cm"],
      ["Acabado",       "Texturizado / Liso"],
      ["Uso",           "Interior"],
      ["Mantenimiento", "Paño húmedo"],
    ]
  },
  {
    id: 10,
    cat: "Cortinas Waves",
    featured: true,
    name: "Waves",
    price: "Desde $95 / m²",
    img: "Waves2.png",
    desc: "Paneles tridimensionales que crean efectos de profundidad y textura únicos. Perfectos como paredes de acento en salas, recámaras y espacios comerciales modernos.",
    specs: [
      ["Material",    "Poliestireno / MDF"],
      ["Grosor",      "20 mm"],
      ["Medidas",     "50 × 50 cm por pieza"],
      ["Acabado",     "Listo para pintar"],
      ["Uso",         "Interior"],
      ["Instalación", "Adhesivo o tornillos"],
    ]
  },
  
  {
    id: 11,
    cat: "Placa Espejo",
    featured: false,
    name: "Placa espejo",
    price: "Desde $45 / m²",
    img: "Espejo.jpg",
    desc: "Plafones de PVC texturizado, fáciles de instalar y mantener. Transforman techos ordinarios en superficies decorativas elegantes sin necesidad de obras mayores.",
    specs: [
      ["Material",      "PVC"],
      ["Grosor",        "10 mm"],
      ["Medidas",       "300 × 25 cm"],
      ["Acabado",       "Texturizado / Liso"],
      ["Uso",           "Interior"],
      ["Mantenimiento", "Paño húmedo"],
    ]
  },
  {
    id: 12,
    cat: "Placa Espejo",
    featured: false,
    name: "Placa Espejo",
    price: "Desde $95 / m²",
    img: "Espejo2.jpg",
    desc: "Paneles tridimensionales que crean efectos de profundidad y textura únicos. Perfectos como paredes de acento en salas, recámaras y espacios comerciales modernos.",
    specs: [
      ["Material",    "Poliestireno / MDF"],
      ["Grosor",      "20 mm"],
      ["Medidas",     "50 × 50 cm por pieza"],
      ["Acabado",     "Listo para pintar"],
      ["Uso",         "Interior"],
      ["Instalación", "Adhesivo o tornillos"],
    ]
  },
];


/* ──────────────────────────────────────────
   NAVEGACIÓN ENTRE PÁGINAS
────────────────────────────────────────── */
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');

  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const navEl = document.getElementById('nav-' + page);
  if (navEl) navEl.classList.add('active');

  // Cerrar menú móvil al navegar
  closeMenu();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Sombra en nav al hacer scroll
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 20);
});


/* ──────────────────────────────────────────
   MENÚ HAMBURGER (MÓVIL)
────────────────────────────────────────── */
function toggleMenu() {
  const links   = document.getElementById('nav-links');
  const burger  = document.getElementById('hamburger');
  const isOpen  = links.classList.contains('open');

  if (isOpen) {
    closeMenu();
  } else {
    links.classList.add('open');
    burger.classList.add('open');
    document.body.style.overflow = 'hidden'; // bloquea scroll de fondo
  }
}

function closeMenu() {
  const links  = document.getElementById('nav-links');
  const burger = document.getElementById('hamburger');
  links.classList.remove('open');
  burger.classList.remove('open');
  document.body.style.overflow = '';
}

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
  const nav    = document.getElementById('navbar');
  const links  = document.getElementById('nav-links');
  if (links.classList.contains('open') && !nav.contains(e.target)) {
    closeMenu();
  }
});


/* ──────────────────────────────────────────
   MARQUEE
────────────────────────────────────────── */
function buildMarquee() {
  const words = [
    "Lambrín", "Efecto Mármol", "Persianas",
    "Plafones", "Lámparas", "Decoración",
    "Juárez", "Calidad", "Estilo", "We Are Decor"
  ];
  const container = document.getElementById('marquee-inner');
  if (!container) return;

  let html = '';
  for (let i = 0; i < 6; i++) {
    words.forEach(w => {
      html += `<span class="marquee-item">${w} <span class="marquee-dot">✦</span></span> `;
    });
  }
  container.innerHTML = html;
}


/* ──────────────────────────────────────────
   GRILLA DESTACADOS (HOME)
────────────────────────────────────────── */
function buildFeaturedGrid() {
  const grid = document.getElementById('featured-grid');
  if (!grid) return;

  products.filter(p => p.featured).forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" loading="lazy" />
      <div class="product-card-overlay">
        <p class="product-cat">${p.cat}</p>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-price">${p.price}</p>
      </div>
      <div class="product-hover-btn">Ver detalles →</div>
    `;
    card.addEventListener('click', () => openModal(p.id));
    grid.appendChild(card);
  });
}


/* ──────────────────────────────────────────
   CATÁLOGO CON FILTROS
────────────────────────────────────────── */
const categories = ['Todos', ...new Set(products.map(p => p.cat))];

function buildFilterBar() {
  const bar = document.getElementById('filter-bar');
  if (!bar) return;

  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (cat === 'Todos' ? ' active' : '');
    btn.textContent = cat;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCatalog(cat);
    });
    bar.appendChild(btn);
  });
}

function renderCatalog(filter) {
  const grid = document.getElementById('catalog-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const list = filter === 'Todos'
    ? products
    : products.filter(p => p.cat === filter);

  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'catalog-card';
    card.innerHTML = `
      <div class="catalog-card-img">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
      </div>
      <div class="catalog-card-body">
        <p class="catalog-card-cat">${p.cat}</p>
        <h3 class="catalog-card-name">${p.name}</h3>
        <p class="catalog-card-price">${p.price}</p>
      </div>
    `;
    card.addEventListener('click', () => openModal(p.id));
    grid.appendChild(card);
  });
}


/* ──────────────────────────────────────────
   MODAL DE PRODUCTO
────────────────────────────────────────── */
function openModal(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;

  const specsHTML = p.specs
    .map(([k, v]) => `
      <div class="spec-row">
        <span class="spec-key">${k}</span>
        <span class="spec-val">${v}</span>
      </div>`)
    .join('');

  document.getElementById('modal-content').innerHTML = `
    <div class="modal-img">
      <img src="${p.img}" alt="${p.name}" />
    </div>
    <div class="modal-body">
      <button class="modal-close" onclick="closeModal()">✕</button>
      <p class="modal-cat">${p.cat}</p>
      <h2 class="modal-title">${p.name}</h2>
      <p class="modal-price">${p.price}</p>
      <p class="modal-desc">${p.desc}</p>
      <div class="modal-specs">
        <h4>Especificaciones</h4>
        ${specsHTML}
      </div>
      <div class="modal-actions">
        <button class="btn-modal-primary" onclick="requestQuote('${p.name}')">
          Solicitar cotización
        </button>
        <button class="btn-modal-ghost" title="Compartir" onclick="shareProduct('${p.name}')">↗</button>
      </div>
    </div>
  `;

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function requestQuote(name) {
  closeModal();
  showPage('contact');
  const select = document.getElementById('f-topic');
  if (select) select.value = 'Cotización de proyecto';
  showToast(`Listo, cuéntanos tu proyecto: ${name}`);
}

function shareProduct(name) {
  if (navigator.share) {
    navigator.share({
      title: `DecorJRZ — ${name}`,
      text: `Mira este producto en DecorJRZ: ${name}`,
      url: window.location.href,
    }).catch(() => {});
  } else {
    showToast('¡Link copiado al portapapeles!');
  }
}

// Cerrar modal con clic en overlay o Escape
document.getElementById('modal-overlay').addEventListener('click', function (e) {
  if (e.target === this) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});


/* ──────────────────────────────────────────
   FORMULARIO
────────────────────────────────────────── */
function sendForm() {
  const name  = document.getElementById('f-name')?.value.trim();
  const email = document.getElementById('f-email')?.value.trim();
  const msg   = document.getElementById('f-msg')?.value.trim();

  if (!name || !email || !msg) {
    showToast('⚠️ Por favor completa los campos requeridos.');
    return;
  }
  ['f-name', 'f-phone', 'f-email', 'f-msg'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  showToast('✓ Mensaje enviado. Te contactaremos pronto.');
}


/* ──────────────────────────────────────────
   TOAST
────────────────────────────────────────── */
let toastTimer = null;

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}


/* ──────────────────────────────────────────
   INIT
────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  buildMarquee();
  buildFeaturedGrid();
  buildFilterBar();
  renderCatalog('Todos');
});