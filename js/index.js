// Script para la página de inicio adaptado para Bootstrap

document.addEventListener('DOMContentLoaded', function() {
    // Marcar la página como cargada para activar animaciones
    setTimeout(() => {
      document.querySelector('.hero').classList.add('loaded');
    }, 100);
  
    // Configuración del scroll suave para los enlaces de anclaje
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Configuración del scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      scrollIndicator.addEventListener('click', () => {
        const desarrolloSection = document.querySelector('.desarrollo');
        if (desarrolloSection) {
          desarrolloSection.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }
      });
  
      // Ocultar el indicador de scroll cuando el usuario ya ha scrolleado
      window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
          scrollIndicator.style.opacity = '0';
          setTimeout(() => {
            scrollIndicator.style.display = 'none';
          }, 500);
        }
      });
    }
  
    // Función para detectar elementos en el viewport y animar
    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    };
  
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };
  
    const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);
  
    // Observar los elementos que queremos animar
    document.querySelectorAll('.text-section, .image-section').forEach(element => {
      intersectionObserver.observe(element);
    });
  
    // Control de animaciones para elementos con fade-in-up
    if ('IntersectionObserver' in window) {
      const fadeUpObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            fadeUpObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
  
      document.querySelectorAll('.fade-in-up').forEach(el => {
        el.style.animationPlayState = 'paused';
        fadeUpObserver.observe(el);
      });
    } else {
      // Fallback para navegadores sin IntersectionObserver
      document.querySelectorAll('.fade-in-up').forEach(el => {
        el.style.animationPlayState = 'running';
      });
    }
  
    // Animación para botón volver arriba
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          scrollToTopBtn.classList.add('visible');
        } else {
          scrollToTopBtn.classList.remove('visible');
        }
      });
  
      scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  
    // Efectos para header al hacer scroll
    const header = document.querySelector('header');
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    }
  
    // Efectos hover para cards y servicios
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      const icon = card.querySelector('.card-icon');
      if (icon) {
        card.addEventListener('mouseenter', () => {
          icon.style.transform = 'rotateY(180deg)';
        });
        
        card.addEventListener('mouseleave', () => {
          icon.style.transform = 'rotateY(0)';
        });
      }
    });
  
    const servicios = document.querySelectorAll('.servicio');
    servicios.forEach(servicio => {
      const img = servicio.querySelector('img');
      if (img) {
        servicio.addEventListener('mouseenter', () => {
          img.style.transform = 'scale(1.05)';
        });
        
        servicio.addEventListener('mouseleave', () => {
          img.style.transform = 'scale(1)';
        });
      }
    });
  
    // Contador animado para los años de experiencia (cuando está visible)
    const experienceHighlight = document.querySelector('.highlight:contains("30")');
    if (experienceHighlight) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(experienceHighlight);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
  
      observer.observe(experienceHighlight);
    }
  
    function animateCounter(element) {
      if (element && element.textContent.includes('30')) {
        const initialText = element.textContent;
        const targetNumber = 30;
        let currentNumber = 0;
        
        element.textContent = initialText.replace('30', '0');
        
        const interval = setInterval(() => {
          currentNumber += 1;
          element.textContent = initialText.replace('30', currentNumber);
          
          if (currentNumber >= targetNumber) {
            clearInterval(interval);
          }
        }, 60);
      }
    }
  
    // Agregar una pequeña animación de pulso al CTA después de cierto tiempo
    const ctaButton = document.querySelector('.btn-cta');
    if (ctaButton) {
      setTimeout(() => {
        ctaButton.classList.add('pulse');
        setTimeout(() => {
          ctaButton.classList.remove('pulse');
        }, 1000);
      }, 3000);
    }
  
    // Estilos adicionales inyectados dinámicamente
    injectAdditionalStyles();
  
    function injectAdditionalStyles() {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        .pulse {
          animation: pulse 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
        
        /* Fix para que el menú de Bootstrap no tape el contenido al hacer scroll hasta anclas */
        html {
          scroll-padding-top: 80px;
        }
  
        /* Fix para que las imágenes de las cards tengan altura consistente */
        .servicio img {
          object-fit: cover;
          height: 280px;
        }
        
        /* Optimización para dispositivos móviles */
        @media (max-width: 576px) {
          .servicio img {
            height: 220px;
          }
        }
      `;
      document.head.appendChild(style);
    }
  });
  
  // Extensión de jQuery-like selector para texto
  Node.prototype.contains = function(text) {
    return this.textContent.includes(text);
  };