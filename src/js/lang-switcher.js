import langs from './langs.js';


export let currentLang = 'en';

export function updateLanguage(lang) {
    
    currentLang = lang;
    const langLabel = document.querySelector('.lang-label');
    langLabel.textContent = lang === 'en' ? 'ES' : 'EN';


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

    document.querySelector('#text-cv').textContent = langs[lang].footer.cv;
}