// Script base para funcionalidades compartidas

// Función para manejar el menú responsivo
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    const menu = document.querySelector('.menu');
    
    if (menuIcon && menu) {
      menuIcon.addEventListener('click', function() {
        menu.classList.toggle('active');
        
        // Cambia el ícono dependiendo del estado del menú
        const icon = menuIcon.querySelector('i');
        if (menu.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    }
    
    // Cierra el menú al hacer clic en un enlace (para móviles)
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768 && menu.classList.contains('active')) {
          menu.classList.remove('active');
          const icon = menuIcon.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
    
    // Escuchar cambios de tamaño de ventana para resetear el menú
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && menu.classList.contains('active')) {
        menu.classList.remove('active');
        const icon = menuIcon.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  });
  
  // Detectar posición de scroll para animar elementos
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    // Animación para elementos que deben aparecer al hacer scroll
    const elementsToAnimate = document.querySelectorAll('.card, .servicio, .text-section');
    
    elementsToAnimate.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      
      if (scrollPosition > elementPosition - window.innerHeight * 0.8) {
        element.classList.add('visible');
      }
    });
  });