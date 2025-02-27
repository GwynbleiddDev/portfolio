import '../css/app.css';
import proyectos from './projects';
import langs from './langs';


// ============ FUNCIONES =============== //

function cargarProyectos() {
    
    const proyectoGrid = document.getElementById('projectGrid');
    if (!proyectoGrid) {
        console.error('#projectGrid no se encuentra en el DOM');
        return;
    }
    proyectos.forEach(proyecto => {
        const div = document.createElement('div');
        div.className = 'bg-[#0d0d0d] border sm:p-8 md:p-6 border-indigo-500/50 rounded-lg p-6';
        div.setAttribute('data-aos', 'fade-up');
        div.innerHTML = `
            <h3 class="text-2xl font-semibold text-indigo-300 mb-4">${proyecto.nombre}</h3>
            <a href="${proyecto.url}" target="_blank">
                <img class="proyecto-card rounded-xl" src="${proyecto.imagen}" alt="imagen proyecto">
            </a>
            <p class="text-gray-400 text-xl mt-6">${proyecto.categoria}</p>
        `;
        proyectoGrid.appendChild(div);
    });
}

// Generar estrellas
function initializeStars() {
    const stars = document.getElementById('stars');
    if (!stars) {
        console.error('El elemento #stars no se encuentra en el DOM');
        return;
    }

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    };

    const render = () => {
        stars.innerHTML = '';
        const w = window.innerWidth;
        const h = document.body.scrollHeight;
        const starCount = 200;

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            const x = getRandomInt(0, w);
            const y = getRandomInt(0, h);
            star.style.setProperty('--x', `${x}px`);
            star.style.setProperty('--y', `${y}px`);
            stars.appendChild(star);
        }
    };

    requestAnimationFrame(render);
    window.addEventListener('resize', () => requestAnimationFrame(render));
}

// Ajustar altura de .scene para el footer
function adjustSceneHeight() {
    
    const scene = document.querySelector('.scene');
    const footer = document.querySelector('footer');
    const footerRect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const footerHeight = footerRect.height;
    const footerTop = footerRect.top;

    if (footerTop < windowHeight) {
        const visibleFooterHeight = Math.min(footerHeight, windowHeight - footerTop);
        scene.style.height = `calc(100% - ${visibleFooterHeight}px)`;
    } else {
        scene.style.height = '100%';
    }
}

// Limpiar estilos inline de nav según el tamaño de pantalla
function resetNavStyles() {
    const nav = document.querySelector('nav');
    if (window.innerWidth < 768) {
        nav.style.transform = ''; // Eliminar transform inline
        nav.classList.remove('hidden'); // Asegurar que no quede oculto
    } else {
        gsap.set(nav, { y: '0%' }); // Inicio pantallas grandes
    }
}

// Cambiar idioma
let currentLang = 'en'; // Inglés por defecto
function updateLanguage(lang) {
    currentLang = lang;
    const langLabel = document.querySelector('.lang-label');
    langLabel.textContent = lang === 'en' ? 'ES' : 'EN';

    // Actualizar textos
    document.querySelector('#nav-home').textContent = langs[lang].home.title;
    document.querySelector('#nav-about').textContent = langs[lang].about.title;
    document.querySelector('#nav-skills').textContent = langs[lang].skills.title;
    document.querySelector('#nav-journey').textContent = langs[lang].journey.title;
    document.querySelector('#nav-projects').textContent = langs[lang].projects.title;
    document.querySelector('#nav-contact').textContent = langs[lang].contact.title;
    
    document.querySelector('#about h2').textContent = langs[lang].about.title;
    document.querySelector('#about p').textContent = langs[lang].about.text;
    
    document.querySelector('#skills h2').textContent = langs[lang].skills.title;
    
    document.querySelector('#journey h2').textContent = langs[lang].journey.title;
    document.querySelector('#journey p').textContent = langs[lang].journey.text;
    
    document.querySelector('#projects h2').textContent = langs[lang].projects.title;
    document.querySelector('#go-github').textContent = langs[lang].projects.github;
    document.querySelector('#go-netlify').textContent = langs[lang].projects.netlify;

    document.querySelector('#contact h2').textContent = langs[lang].contact.title;

    document.querySelector('footer a').textContent = langs[lang].footer.cv;
}


// ========================================================== EVENT LISTENERS ===========================================================

// Cambiar idioma con el botón
const langToggle = document.querySelector('#lang-toggle');
langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'en' ? 'es' : 'en';
    updateLanguage(newLang);
});

// Navegación
const nav = document.querySelector('nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        if (window.innerWidth < 768) {
            nav.classList.remove('show');
        }
    });
});

// Ocultar/Mostrar barra de navegación con GSAP (solo pantallas grandes)
let lastScrollTop = 0;
let isNavHidden = false;

window.addEventListener('scroll', () => {
    const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
    if (window.innerWidth >= 768) { // Solo en pantallas grandes
        if (currentScrollTop > lastScrollTop && currentScrollTop > 50 && !isNavHidden) {
            gsap.to(nav, { y: '-100%', duration: 0.3, ease: 'power2.out' });
            isNavHidden = true;
        } else if (currentScrollTop < lastScrollTop && isNavHidden) {
            gsap.to(nav, { y: '0%', duration: 0.3, ease: 'power2.out' });
            isNavHidden = false;
        }
    }
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    adjustSceneHeight();
});

// Ajustar estado al cambiar tamaño de pantalla
window.addEventListener('resize', () => {
    resetNavStyles();
    adjustSceneHeight();
});

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM completamente cargado');
    AOS.init({ duration: 1000, once: false });
    initializeStars();
    cargarProyectos();
    adjustSceneHeight();
    resetNavStyles();
    updateLanguage('en');
});