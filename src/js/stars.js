export function initializeStars() {
    
    const stars = document.getElementById('stars');
    
    // if (!stars) {
    //     console.error('El elemento #stars no se encuentra en el DOM');
    //     return;
    // }

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