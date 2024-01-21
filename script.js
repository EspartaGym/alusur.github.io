document.addEventListener('DOMContentLoaded', () => {
    const observarEntrada = (entradas, observador) => {
        entradas.forEach(entrada => {
          console.log("Elemento observado: ", entrada.target); // Para diagnóstico
          if (entrada.isIntersecting) {
            entrada.target.classList.add('en-pantalla');
          }
        });
      };
      

      
  
    const observador = new IntersectionObserver(observarEntrada, {
        root: null,
        rootMargin: '0px',
        threshold: 0.01 // Cambia esto a un valor más bajo
      });
  
    const secciones = document.querySelectorAll('.desarollo, .desarollo2');
    secciones.forEach(seccion => {
      observador.observe(seccion);
    });
  });
  
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseover', () => {
        const img = card.querySelector('.card-icon img');
        img.style.animationPlayState = 'running';
    });

    card.addEventListener('mouseout', () => {
        const img = card.querySelector('.card-icon img');
        img.style.animationPlayState = 'paused';
    });
});





document.querySelectorAll('.worked-for-logos .mosaic').forEach(function(logo) {
    logo.addEventListener('mouseover', function() {
        // Animación de entrada
        this.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.2)';
    });

    logo.addEventListener('mouseout', function() {
        // Animación de salida
        this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
    });
});




