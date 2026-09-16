document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Menú Hamburguesa para Móviles
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    mobileMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Cerrar el menú al hacer clic en una opción
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // 2. Envío del Formulario directo a WhatsApp
    const formCotizacion = document.getElementById('form-cotizacion');
    
    formCotizacion.addEventListener('submit', (e) => {
        e.preventDefault();

        // Número de teléfono de tu carpintería (incluye código de país, ej. 52 para México)
        const numeroTelefono = "525512345678"; 

        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;
        const mensaje = document.getElementById('mensaje').value;

        // Construir mensaje codificado para la URL
        const textoWhatsApp = `Hola Carpintería Gudiño, me gustaría cotizar un proyecto.%0A%0A` +
                              `*Nombre:* ${encodeURIComponent(nombre)}%0A` +
                              `*Teléfono:* ${encodeURIComponent(telefono)}%0A` +
                              `*Detalles:* ${encodeURIComponent(mensaje)}`;

        // Abrir WhatsApp Web o App
        const urlWhatsApp = `https://wa.me/${numeroTelefono}?text=${textoWhatsApp}`;
        window.open(urlWhatsApp, '_blank');
    });

    // 3. Cambiar sombra del Header al hacer scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
});
