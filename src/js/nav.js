
export function setupNav(nav) {
    
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const navItems = document.querySelectorAll('nav ul li');

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
            
            updateActiveSection(targetId);
        });
    });

    // Ocultar/Mostrar barra con GSAP (pantallas grandes)
    let lastScrollTop = 0;
    let isNavHidden = false;

    window.addEventListener('scroll', () => {
        const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
        
        if (window.innerWidth >= 768) {
            
            if (currentScrollTop > lastScrollTop && currentScrollTop > 50 && !isNavHidden) {
                
                gsap.to(nav, { y: '-100%', duration: 0.3, ease: 'power2.out' });
                isNavHidden = true;
            
            } else if (currentScrollTop < lastScrollTop && isNavHidden) {
                
                gsap.to(nav, { y: '0%', duration: 0.3, ease: 'power2.out' });
                isNavHidden = false;
            }
        }
        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
        
        updateActiveSectionOnScroll();
    });

    
    // actualizar la sección activa clic
    function updateActiveSection(targetId) {
        
        navItems.forEach(item => {
            
            item.classList.remove('active');
            const link = item.querySelector('.nav-link');
            
            if (link.getAttribute('href') === `#${targetId}`) {
                item.classList.add('active');
            }
        });
    }

    // actualizar la sección activa scroll
    function updateActiveSectionOnScroll() {
        
        const sections = document.querySelectorAll('header, section, main');
        let currentSectionId = '';

        sections.forEach(section => {
            
            const rect = section.getBoundingClientRect();
            
            // activa la sección a 50% visible
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                currentSectionId = section.id;
            }
        });

        navItems.forEach(item => {
            
            item.classList.remove('active');
            const link = item.querySelector('.nav-link');
            
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    }
}