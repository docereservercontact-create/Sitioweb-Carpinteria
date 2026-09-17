// Importar módulos de Firebase desde CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Configuración de tu App en Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDEHx5caOMKTa2aHRzSf9v_RsKpy6h50PY",
  authDomain: "site-web-6625b.firebaseapp.com",
  projectId: "site-web-6625b",
  storageBucket: "site-web-6625b.firebasestorage.app",
  messagingSenderId: "291488546963",
  appId: "1:291488546963:web:860ccef5a3763a90840d66",
  measurementId: "G-38Z6NBM83Y"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Efecto Parallax en la Portada al hacer Scroll
    const heroBg = document.getElementById('hero-bg');
    const heroContent = document.getElementById('hero-content');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
        
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

    // 3. Guardar la solicitud en Firestore
    const formCotizacion = document.getElementById('form-cotizacion');
    const btnSubmit = document.getElementById('btn-submit');
    const formStatus = document.getElementById('form-status');
    
    if (formCotizacion) {
        formCotizacion.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Deshabilitar botón temporalmente mientras guarda
            if (btnSubmit) btnSubmit.disabled = true;
            if (formStatus) {
                formStatus.textContent = 'Guardando tu solicitud...';
                formStatus.className = 'form-status';
            }

            const nombre = document.getElementById('nombre').value;
            const telefono = document.getElementById('telefono').value;
            const mensaje = document.getElementById('mensaje').value;

            try {
                // GUARDAR EN FIREBASE FIRESTORE
                await addDoc(collection(db, "cotizaciones"), {
                    nombre: nombre,
                    telefono: telefono,
                    mensaje: mensaje,
                    fecha: serverTimestamp()
                });
                console.log("Cotización guardada exitosamente en Firebase!");
                if (typeof gtag === 'function') {
                    gtag('event', 'generate_lead', {
                        form_name: 'cotizacion_inicio'
                    });
                }
            } catch (error) {
                console.error("Error al guardar en Firebase: ", error);
                if (btnSubmit) btnSubmit.disabled = false;
                if (formStatus) {
                    formStatus.textContent = 'No pudimos guardar tu solicitud. Inténtalo de nuevo.';
                    formStatus.className = 'form-status form-status-error';
                }
                return;
            }

            // Habilitar botón y limpiar formulario
            if (btnSubmit) btnSubmit.disabled = false;
            if (formStatus) {
                formStatus.textContent = 'Tu solicitud se envió correctamente.';
                formStatus.className = 'form-status form-status-success';
            }
            formCotizacion.reset();
        });
    }
});