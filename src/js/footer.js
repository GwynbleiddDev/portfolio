

export function adjustSceneHeight() {
    
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

export function resetNavStyles() {
    
    const nav = document.querySelector('nav');
    
    if (window.innerWidth < 768) {
        
        nav.style.transform = '';
        nav.classList.remove('hidden');
    
    } else {
        gsap.set(nav, { y: '0%' });
    }
}