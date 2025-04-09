// Script específico para la página de servicios

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar las animaciones basadas en scroll
    initScrollAnimations();
    
    // Inicializar comportamiento suave para enlaces ancla
    initSmoothScrolling();
    
    // Inicializar comportamiento del botón de volver arriba
    initScrollToTopButton();
    
    // Inicializar efectos hover para tarjetas de servicios
    initServiceCardEffects();
  });
  
  // Función para manejar las animaciones basadas en scroll
  function initScrollAnimations() {
    // Elementos que se animarán al hacer scroll
    const animatedElements = document.querySelectorAll('.fade-in-up, .servicio-card, .proceso-card');
    
    // Configuración del observer para detectar cuando los elementos son visibles
    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.15 // 15% del elemento visible para activar
    };
    
    // Crear el observer
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Agregar clase para activar la animación
          entry.target.classList.add('visible');
          // Dejar de observar el elemento una vez que ya se ha animado
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observar cada elemento
    animatedElements.forEach(element => {
      // Eliminar clase visible para asegurar que la animación se dispare correctamente
      element.classList.remove('visible');
      observer.observe(element);
    });
    
    // Manejar el comportamiento cuando el usuario tiene preferencia por movimiento reducido
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Mostrar todos los elementos sin animaciones
      animatedElements.forEach(element => {
        element.classList.add('visible');
        observer.unobserve(element);
      });
    }
  }
  
  // Función para manejar el scroll suave a los anclas
  function initSmoothScrolling() {
    // Seleccionar todos los enlaces internos que comienzan con #
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Prevenir el comportamiento predeterminado
        e.preventDefault();
        
        // Obtener el objetivo del anclaje
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Calcular la posición de desplazamiento considerando el header fijo
          const headerHeight = document.getElementById('header').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          // Desplazarse suavemente a la posición
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Actualizar la URL sin recargar la página
          history.pushState(null, null, targetId);
        }
      });
    });
  }
  
  // Función para manejar el botón de volver arriba
  function initScrollToTopButton() {
    const scrollToTopButton = document.querySelector('.scroll-to-top');
    
    if (scrollToTopButton) {
      // Manejar la visibilidad del botón basado en la posición de scroll
      window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
          scrollToTopButton.classList.add('visible');
        } else {
          scrollToTopButton.classList.remove('visible');
        }
      });
      
      // Manejar el clic en el botón
      scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }
  
  // Función para efectos de tarjetas de servicios
  function initServiceCardEffects() {
    const serviceCards = document.querySelectorAll('.servicio-card');
    
    serviceCards.forEach(card => {
      // Efecto para destacar la tarjeta al pasar el mouse
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.08)';
      });
      
      // Si hay una imagen en la tarjeta, agregar efecto de zoom
      const cardImage = card.querySelector('img');
      if (cardImage) {
        card.addEventListener('mouseenter', function() {
          cardImage.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
          cardImage.style.transform = 'scale(1)';
        });
      }
    });
    
    // Efecto para tarjetas de proceso
    const processCards = document.querySelectorAll('.proceso-card');
    
    processCards.forEach(card => {
      const iconWrapper = card.querySelector('.icon-wrapper');
      const icon = card.querySelector('.icon-wrapper img');
      
      if (iconWrapper && icon) {
        card.addEventListener('mouseenter', function() {
          iconWrapper.style.backgroundColor = 'var(--color-primario)';
          icon.style.filter = 'brightness(0) invert(1)';
        });
        
        card.addEventListener('mouseleave', function() {
          iconWrapper.style.backgroundColor = 'rgba(7, 18, 173, 0.05)';
          icon.style.filter = 'none';
        });
      }
    });
  }
  
  // Función para resaltar el menú activo basado en la sección visible
  function updateActiveMenuOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    window.addEventListener('scroll', function() {
      let current = '';
      const scrollPosition = window.pageYOffset;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
          link.classList.add('active');
        }
      });
    });
  }
  
  // Función para mejorar la accesibilidad
  function enhanceAccessibility() {
    // Asegurar que todos los elementos interactivos tengan foco visible
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    
    interactiveElements.forEach(element => {
      element.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--color-primario)';
      });
      
      element.addEventListener('blur', function() {
        this.style.outline = 'none';
      });
    });
    
    // Agregar roles ARIA donde sea apropiado
    document.querySelectorAll('.servicio-card').forEach((card, index) => {
      card.setAttribute('role', 'region');
      card.setAttribute('aria-label', `Servicio ${index + 1}`);
    });
  }
  
  // Detector de cuando se carga la página completa (incluyendo imágenes)
  window.addEventListener('load', function() {
    // Animación de entrada para el hero cuando la página está completamente cargada
    const heroTitle = document.querySelector('.hero-section .titulo');
    const heroSubtitle = document.querySelector('.hero-section .subtitulo');
    
    if (heroTitle && heroSubtitle) {
      heroTitle.style.opacity = '1';
      heroTitle.style.transform = 'translateY(0)';
      
      setTimeout(() => {
        heroSubtitle.style.opacity = '1';
        heroSubtitle.style.transform = 'translateY(0)';
      }, 300);
    }
    
    // Inicializar características adicionales cuando todo esté cargado
    enhanceAccessibility();
  });