document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Efecto Parallax en la Portada al hacer Scroll
    const heroBg = document.getElementById('hero-bg');
    const heroContent = document.getElementById('hero-content');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // La imagen de fondo se desplaza suavemente hacia abajo
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
        
        // El texto sube y se desvanece
        if (heroContent) {
            heroContent.style.transform = `translateY(-${scrolled * 0.3}px)`;
            heroContent.style.opacity = Math.max(0, 1 - (scrolled / 600));
        }
    });

    // 2. Menú Hamburguesa para Móviles
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        const navLinks = document.querySelectorAll('.nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // 3. Envío del Formulario directo a WhatsApp
    const formCotizacion = document.getElementById('form-cotizacion');
    
    if (formCotizacion) {
        formCotizacion.addEventListener('submit', (e) => {
            e.preventDefault();

            // Ingresa tu número de teléfono de WhatsApp (con código de país, ej. 52 para México)
            const numeroTelefono = "525512345678"; 

            const nombre = document.getElementById('nombre').value;
            const telefono = document.getElementById('telefono').value;
            const mensaje = document.getElementById('mensaje').value;

            const textoWhatsApp = `Hola Carpintería León, me gustaría cotizar un proyecto.%0A%0A` +
                                  `*Nombre:* ${encodeURIComponent(nombre)}%0A` +
                                  `*Teléfono:* ${encodeURIComponent(telefono)}%0A` +
                                  `*Detalles:* ${encodeURIComponent(mensaje)}`;

            const urlWhatsApp = `https://wa.me/${numeroTelefono}?text=${textoWhatsApp}`;
            window.open(urlWhatsApp, '_blank');
        });
    }
});
