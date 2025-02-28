import proyectos from './projects.js';


export function cargarProyectos() {
    
    const proyectoGrid = document.getElementById('projectGrid');
    
    // if (!proyectoGrid) {
    //     console.error('#projectGrid no se encuentra en el DOM');
    //     return;
    // }
    
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