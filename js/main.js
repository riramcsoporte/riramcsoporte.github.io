/* ======================================================
   1. DEFINICIÓN DE COMPONENTES (Header, Footer, WhatsApp)
   ====================================================== */

// ENCABEZADO CON SUBMENÚ
const headerTemplate = `
<div class="container navbar">
<a href="index.html" class="logo">
    <img src="img/logo_riramc.png" alt="Logo de RIRAMC Soporte">
</a>
    
    <div class="menu-toggle" id="mobile-menu-btn">
        <i class="fa-solid fa-bars"></i>
    </div>

    <ul class="nav-links" id="nav-links-container">
        <li><a href="index.html" class="nav-link" data-page="index">Inicio</a></li>
        
        <li class="dropdown-item">
            <a href="servicios.html" class="nav-link" data-page="servicios">
                Servicios <i class="fa-solid fa-chevron-down" style="font-size:0.7em; margin-left:5px;"></i>
            </a>
            <ul class="dropdown-menu">
                <li><a href="servicio-soporte.html"><i class="fa-solid fa-computer"></i> Soporte PC</a></li>
                <li><a href="servicio-redes.html"><i class="fa-solid fa-mobile-retro"></i>Celulares</a></li>
                <li><a href="servicio-ciberseguridad.html"><i class="fa-solid fa-shield-halved"></i> Ciberseguridad</a></li>
                <li><a href="servicio-cloud.html"><i class="fa-solid fa-server"></i> Servicios a domicilio</a></li>
                <li><a href="servicio-camaras.html"><i class="fa-solid fa-video"></i> Cámaras</a></li>
                <li><a href="servicio-web.html"><i class="fa-solid fa-code"></i> Diseño Web</a></li>
            </ul>
        </li>

        <li><a href="nosotros.html" class="nav-link" data-page="nosotros">Nosotros</a></li>
        <li><a href="contacto.html" class="nav-link" data-page="contacto">Contacto</a></li>
    </ul>
</div>
<style>@media(max-width:992px){#mobile-menu-btn{display:block!important}}</style>
`;

// PIE DE PÁGINA
const footerTemplate = `
<div class="container">
    <div class="footer-grid">
        <div class="footer-col">
            <h3>RIRAMC_Soporte</h3>
            <p style="color:#64748b; font-size:0.9rem; line-height:1.6;">
                Soluciones tecnológicas integrales para empresas y particulares que buscan eficiencia y seguridad.
            </p>
        </div>
        <div class="footer-col">
            <h4>Enlaces Rápidos</h4>
            <a href="index.html">Inicio</a>
            <a href="servicios.html">Servicios</a>
            <a href="nosotros.html">Nosotros</a>
            <a href="contacto.html">Contacto</a>
        </div>
        <div class="footer-col">
            <h4>Contacto</h4>
            <span style="display:block; margin-bottom:10px; color:#64748b;">riramc.soporte@gmail.com</span>
            <span style="display:block; margin-bottom:10px; color:#64748b;">+54 9 11 6872-2917</span>
            <span style="display:block; color:#64748b;">Haedo, Buenos Aires</span>
        </div>
    </div>
    <div class="copyright">
        © 2025 RIRAMC_Soporte. Todos los derechos reservados.
    </div>
</div>
`;

// BOTÓN DE WHATSAPP
const whatsappBtn = `
<a href="https://wa.me/+5491168722917" target="_blank" class="whatsapp-float" style="position:fixed; bottom:30px; right:30px; background:#25d366; color:white; width:60px; height:60px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:2rem; box-shadow:0 0 20px rgba(37,211,102,0.4); z-index:9999; transition:0.3s;">
    <i class="fa-brands fa-whatsapp"></i>
</a>`;


/* ======================================================
   2. INICIALIZACIÓN AL CARGAR LA PÁGINA
   ====================================================== */
document.addEventListener("DOMContentLoaded", () => {
    
    // A. Inyectar HTML del Header y Footer
    const headerElement = document.getElementById('main-header');
    const footerElement = document.getElementById('main-footer');
    
    if(headerElement) headerElement.innerHTML = headerTemplate;
    if(footerElement) footerElement.innerHTML = footerTemplate;
    
    // Inyectar WhatsApp si no existe
    if(!document.querySelector('.whatsapp-float')) {
        document.body.insertAdjacentHTML('beforeend', whatsappBtn);
    }

    // B. Marcar el enlace activo (Resalta la página actual en el menú)
    const pathName = window.location.pathname;
    let currentPage = "index"; // Por defecto
    
    if(pathName.includes("servicios") || pathName.includes("servicio-")) {
        currentPage = "servicios";
    } else if(pathName.includes("nosotros")) {
        currentPage = "nosotros";
    } else if(pathName.includes("contacto")) {
        currentPage = "contacto";
    }

    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        if(link.dataset.page === currentPage) {
            link.style.color = "white"; // Resaltar en blanco
            link.style.fontWeight = "bold";
        }
    });

    // C. Lógica del Menú Móvil (Hamburguesa)
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navContainer = document.getElementById('nav-links-container');
    
    if(mobileBtn && navContainer){
        mobileBtn.addEventListener('click', () => {
            navContainer.classList.toggle('active');
            // Cambiar icono de hamburguesa a cruz
            const icon = mobileBtn.querySelector('i');
            if(navContainer.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }
});

/* ======================================================
   3. FUNCIONES GLOBALES (Pestañas)
   ====================================================== */
// Usada en la sección de Dashboard de Servicios (index.html y otros)
function switchTab(tabId, btn) {
    // Ocultar todos los contenidos
    document.querySelectorAll('.service-content').forEach(el => {
        el.style.display = 'none';
        el.classList.remove('active');
    });
    
    // Desactivar todos los botones
    document.querySelectorAll('.dash-btn').forEach(el => {
        el.classList.remove('active');
        // Resetear estilos inline si los hubiera
        el.style.backgroundColor = 'transparent'; 
        el.style.color = '#aaa';
    });
    
    // Mostrar el contenido seleccionado
    const target = document.getElementById(tabId);
    if(target) {
        target.style.display = 'block';
        target.classList.add('active'); // Por si usamos clases CSS para animar
    }
    
    // Activar el botón presionado
    if(btn) {
        btn.classList.add('active');
        // Estilo activo forzado por JS para asegurar visibilidad
        btn.style.backgroundColor = 'rgba(255,255,255,0.1)';
        btn.style.color = 'white';
    }
}