// Script específico para la página de productos/trabajos realizados

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades cuando el DOM esté listo
    initClientLogosAnimation();
    initScrollToTopButton();
    initLazyLoading();
    enhanceAccessibility();
    initAnimations();
  });
  
  /**
   * Inicializa las animaciones para los logos de clientes
   */
  function initClientLogosAnimation() {
    const clientLogos = document.querySelectorAll('.client-logo');
    const logoObserverOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };
  
    // Solo aplicar animaciones si el usuario no ha indicado preferencia por movimiento reducido
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const logoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Añadir un pequeño retraso entre cada logo para un efecto escalonado
            setTimeout(() => {
              entry.target.style.opacity = 1;
              entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            
            observer.unobserve(entry.target);
          }
        });
      }, logoObserverOptions);
  
      // Preparar logos para la animación y observarlos
      clientLogos.forEach(logo => {
        logo.style.opacity = 0;
        logo.style.transform = 'translateY(20px)';
        logo.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        logoObserver.observe(logo);
      });
    } else {
      // Si el usuario prefiere movimiento reducido, mostrar todos los logos sin animaciones
      clientLogos.forEach(logo => {
        logo.style.opacity = 1;
        logo.style.transform = 'none';
      });
    }
  }
  
  /**
   * Inicializa el botón de volver arriba
   */
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
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
        });
      });
    }
  }
  
  /**
   * Inicializa la carga perezosa de imágenes
   * Esto mejora el rendimiento cargando las imágenes solo cuando son necesarias
   */
  function initLazyLoading() {
    // Verificar si el navegador soporta IntersectionObserver
    if ('IntersectionObserver' in window) {
      const lazyImages = document.querySelectorAll('img');
      
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // Si la imagen tiene un atributo data-src, usarlo como src
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            
            observer.unobserve(img);
          }
        });
      });
      
      lazyImages.forEach(img => {
        imageObserver.observe(img);
      });
    }
  }
  
  /**
   * Mejora la accesibilidad de la página
   */
  function enhanceAccessibility() {
    // Asegurar que todos los elementos interactivos tengan foco visible
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    
    interactiveElements.forEach(element => {
      // Solo aplicar si no tiene ya un outline personalizado
      if (!element.hasAttribute('data-custom-focus')) {
        element.addEventListener('focus', function() {
          this.style.outline = '2px solid var(--color-primario)';
          this.style.outlineOffset = '3px';
        });
        
        element.addEventListener('blur', function() {
          this.style.outline = '';
          this.style.outlineOffset = '';
        });
      }
    });
    
    // Mejorar el contraste y legibilidad donde sea necesario
    document.querySelectorAll('.client-logo').forEach((logo, index) => {
      logo.setAttribute('aria-label', `Cliente ${index + 1}`);
    });
  }
  
  /**
   * Inicializa animaciones generales de la página
   */
  function initAnimations() {
    // Animación para la tarjeta del blog
    const blogCard = document.querySelector('.blog-card');
    
    if (blogCard && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Añadir efecto hover más refinado
      blogCard.addEventListener('mouseenter', function() {
        const cardImage = this.querySelector('.card-img-top');
        if (cardImage) {
          cardImage.style.transform = 'scale(1.05)';
        }
      });
      
      blogCard.addEventListener('mouseleave', function() {
        const cardImage = this.querySelector('.card-img-top');
        if (cardImage) {
          cardImage.style.transform = '';
        }
      });
    }
    
    // Animación de entrada para títulos de sección
    const sectionTitles = document.querySelectorAll('section h2');
    
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const titleObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      sectionTitles.forEach(title => {
        titleObserver.observe(title);
      });
    } else {
      // Si el usuario prefiere movimiento reducido, mostrar títulos sin animaciones
      sectionTitles.forEach(title => {
        title.style.opacity = 1;
      });
    }
  }
  
  /**
   * Se ejecuta cuando la página está completamente cargada, incluyendo todos los recursos
   */
  window.addEventListener('load', function() {
    // Ocultar el indicador de carga si existe
    const loader = document.querySelector('.page-loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }
    
    // Aplicar animaciones iniciales
    document.body.classList.add('page-loaded');
    
    // Optimización de imágenes de logos
    document.querySelectorAll('.client-logo img').forEach(img => {
      // Asegurar que la imagen está cargada correctamente
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        img.addEventListener('load', function() {
          this.classList.add('loaded');
        });
      }
    });
  });