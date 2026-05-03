/* ============================================================
   AROMA DE CAFÉ – Compañía Folclórica
   script.js  |  JavaScript principal
   ============================================================
   CONTENIDO:
   1. Navbar: efecto scroll, menú móvil, link activo
   2. Animaciones de entrada (Intersection Observer)
   3. Año automático en el footer
   4. Suavizado de scroll para anclas
   5. Lightbox simple para la galería
   ============================================================ */

/* ============================================================
   1. NAVBAR
   ============================================================ */
const navbar  = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

/* — Efecto sombra al hacer scroll — */
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  marcarSeccionActiva();
});

/* — Menú hamburguesa (móvil) — */
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  navToggle.classList.toggle('active');
});

/* — Cerrar menú al hacer clic en un enlace — */
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

/* — Marcar el enlace activo según la sección visible — */
function marcarSeccionActiva() {
  const secciones = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 120; // offset del navbar fijo

  secciones.forEach(sec => {
    const top    = sec.offsetTop;
    const alto   = sec.offsetHeight;
    const id     = sec.getAttribute('id');
    const enlace = document.querySelector(`.nav-link[href="#${id}"]`);

    if (enlace) {
      if (scrollY >= top && scrollY < top + alto) {
        enlace.classList.add('active');
      } else {
        enlace.classList.remove('active');
      }
    }
  });
}

/* ============================================================
   2. ANIMACIONES DE ENTRADA (Intersection Observer)
   Al aparecer en pantalla, los elementos "aparecen" suavemente.
   Agrega class="reveal" a cualquier elemento que quieras animar.
   ============================================================ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // sólo una vez
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

/* Aplicar a tarjetas de trajes */
document.querySelectorAll('.traje-card').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = `opacity 0.55s ease ${i * 0.08}s, transform 0.55s ease ${i * 0.08}s`;
  revealObserver.observe(el);
});

/* Aplicar a tarjetas de aves */
document.querySelectorAll('.ave-card').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`;
  revealObserver.observe(el);
});

/* Aplicar a ítems de galería */
document.querySelectorAll('.galeria-item').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'scale(0.95)';
  el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
  revealObserver.observe(el);
});

/* Aplicar a los stats de "Nosotros" */
document.querySelectorAll('.stat').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.15}s, transform 0.5s ease ${i * 0.15}s`;
  revealObserver.observe(el);
});

/* Clase CSS que activa la visibilidad */
const styleReveal = document.createElement('style');
styleReveal.textContent = `
  .traje-card.visible,
  .ave-card.visible,
  .galeria-item.visible,
  .stat.visible {
    opacity: 1 !important;
    transform: none !important;
  }
`;
document.head.appendChild(styleReveal);

/* ============================================================
   3. AÑO AUTOMÁTICO EN EL FOOTER
   No necesitas actualizarlo manualmente cada año.
   ============================================================ */
const spanAnio = document.getElementById('anio');
if (spanAnio) {
  spanAnio.textContent = new Date().getFullYear();
}

/* ============================================================
   4. SUAVIZADO DE SCROLL PARA ANCLAS
   En caso de que scroll-behavior: smooth del CSS no funcione
   en algún navegador, este JS sirve como respaldo.
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70; // altura del navbar fijo
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ============================================================
   5. LIGHTBOX SIMPLE PARA LA GALERÍA
   Al hacer clic en una imagen de la galería, se muestra en
   pantalla completa. Presiona ESC o clic fuera para cerrar.

   INSTRUCCIÓN: Para activarlo, asegúrate de que tus imágenes
   reales en la galería tengan class="galeria-img".
   El placeholder también lo activa (muestra el texto de ruta).
   ============================================================ */

// Crear overlay del lightbox
const lightboxOverlay = document.createElement('div');
lightboxOverlay.id = 'lightbox';
lightboxOverlay.innerHTML = `
  <button id="lightbox-cerrar" aria-label="Cerrar">&times;</button>
  <img id="lightbox-img" src="" alt="Imagen galería">
  <p id="lightbox-caption"></p>
`;
document.body.appendChild(lightboxOverlay);

// Estilos del lightbox (inyectados por JS para mantener todo en un archivo)
const lightboxStyle = document.createElement('style');
lightboxStyle.textContent = `
  #lightbox {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(26, 10, 3, 0.95);
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 16px;
    padding: 24px;
    animation: lightboxFadeIn 0.25s ease;
  }
  #lightbox.open { display: flex; }
  #lightbox-cerrar {
    position: absolute;
    top: 20px; right: 24px;
    background: none;
    border: 2px solid rgba(245,236,215,0.4);
    color: #F5ECD7;
    font-size: 2rem;
    width: 48px; height: 48px;
    border-radius: 50%;
    cursor: pointer;
    line-height: 1;
    transition: background 0.2s;
    display: flex; align-items: center; justify-content: center;
  }
  #lightbox-cerrar:hover { background: rgba(255,255,255,0.1); }
  #lightbox-img {
    max-width: 92vw;
    max-height: 82vh;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.6);
  }
  #lightbox-caption {
    color: rgba(245,236,215,0.55);
    font-size: 0.82rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  @keyframes lightboxFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`;
document.head.appendChild(lightboxStyle);

// Abrir lightbox al clic en ítem de galería
document.querySelectorAll('.galeria-item').forEach(item => {
  item.style.cursor = 'pointer';
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const label = item.querySelector('.galeria-overlay span');

    if (img) {
      // Con imagen real
      document.getElementById('lightbox-img').src = img.src;
      document.getElementById('lightbox-img').alt = img.alt;
      document.getElementById('lightbox-caption').textContent = label ? label.textContent : '';
    } else {
      // Con placeholder (modo edición)
      const placeholder = item.querySelector('.placeholder-text');
      document.getElementById('lightbox-img').src = '';
      document.getElementById('lightbox-img').alt = 'Placeholder';
      document.getElementById('lightbox-caption').textContent =
        placeholder ? placeholder.textContent.trim() : 'Imagen de galería';
      // En modo placeholder, no abrimos el lightbox (no hay imagen real)
      return;
    }

    lightboxOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

// Cerrar lightbox
document.getElementById('lightbox-cerrar').addEventListener('click', cerrarLightbox);
lightboxOverlay.addEventListener('click', (e) => {
  if (e.target === lightboxOverlay) cerrarLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cerrarLightbox();
});

function cerrarLightbox() {
  lightboxOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* ============================================================
   FIN DEL SCRIPT
   ============================================================

   CÓMO AGREGAR FUNCIONALIDADES:
   - Para un formulario de contacto real, necesitarás un servicio
     externo como Formspree (formspree.io) o EmailJS.
   - Para un carrusel de galería, puedes agregar botones Prev/Next
     al lightbox con lógica similar a la de arriba.
   - Para filtrar trajes por provincia, agregar data-provincia="..."
     a las tarjetas y botones de filtro con JS.

   ============================================================ */
