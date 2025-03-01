import '../css/app.css';
import { cargarProyectos } from './projects-loader.js';
import { initializeStars } from './stars.js';
import { setupNav } from './nav.js';
import { adjustSceneHeight, resetNavStyles } from './footer.js';
import { updateLanguage, currentLang } from './lang-switcher.js';


document.addEventListener('DOMContentLoaded', () => {

    AOS.init({ duration: 1000, once: false });
    initializeStars();
    cargarProyectos();
    adjustSceneHeight();
    resetNavStyles();
    updateLanguage('en');
});


const nav = document.querySelector('nav');
setupNav(nav);


// Ev globales
window.addEventListener('scroll', adjustSceneHeight);
window.addEventListener('resize', () => {
    resetNavStyles();
    adjustSceneHeight();
});


// Cambio de idioma
const langToggle = document.querySelector('#lang-toggle');
langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'en' ? 'es' : 'en';
    updateLanguage(newLang);
});