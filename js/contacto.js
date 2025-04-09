// Script específico para la página de contacto

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades cuando el DOM esté listo
    initMapResponsive();
    initContactForm();
    initScrollToTopButton();
    initAnimations();
    enhanceAccessibility();
  });
  
  /**
   * Hace que el mapa sea completamente responsive
   */
  function initMapResponsive() {
    const mapWrapper = document.querySelector('.map-wrapper');
    
    if (mapWrapper) {
      // Ajustar proporción del contenedor del mapa
      const setMapHeight = () => {
        // En móvil hacemos el mapa más pequeño
        if (window.innerWidth < 768) {
          mapWrapper.style.height = '300px';
        } else if (window.innerWidth < 992) {
          mapWrapper.style.height = '350px';
        } else {
          mapWrapper.style.height = '450px';
        }
      };
      
      // Configurar tamaño inicial
      setMapHeight();
      
      // Recalcular al cambiar el tamaño de la ventana
      window.addEventListener('resize', setMapHeight);
    }
  }
  
  /**
   * Inicializa y maneja el formulario de contacto
   */
  function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validación básica del formulario
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();
        
        if (nombre === '' || email === '' || mensaje === '') {
          showFormError('Por favor, completa todos los campos obligatorios.');
          return;
        }
        
        if (!validateEmail(email)) {
          showFormError('Por favor, introduce un email válido.');
          return;
        }
        
        // Simulación de envío del formulario
        showFormLoading();
        
        // Simular una solicitud a un servidor (reemplazar con llamada real a API)
        setTimeout(() => {
          // Ocultar formulario y mostrar mensaje de éxito
          contactForm.style.display = 'none';
          formSuccess.style.display = 'block';
          
          // Desplazamiento suave al mensaje de éxito
          formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
          // Reset del formulario para futuros envíos
          contactForm.reset();
        }, 1500);
      });
    }
  }
  
  /**
   * Valida el formato de un email
   * @param {string} email - El email a validar
   * @returns {boolean} - Verdadero si el email es válido
   */
  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }
  
  /**
   * Muestra un mensaje de error en el formulario
   * @param {string} message - El mensaje de error
   */
  function showFormError(message) {
    // Verificar si ya existe un mensaje de error
    let errorDiv = document.querySelector('.form-error');
    
    // Si no existe, crearlo
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'form-error alert alert-danger mt-3';
      document.getElementById('contactForm').appendChild(errorDiv);
    }
    
    // Mostrar el mensaje
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
      errorDiv.style.display = 'none';
    }, 5000);
  }
  
  /**
   * Muestra un indicador de carga durante el envío del formulario
   */
  function showFormLoading() {
    const submitButton = document.querySelector('.btn-submit');
    const originalText = submitButton.textContent;
    
    // Cambiar el botón a estado de carga
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitButton.disabled = true;
    
    // Restaurar el botón después de 2 segundos (simular procesamiento)
    setTimeout(() => {
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }, 2000);
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
   * Inicializa animaciones de la página
   */
  function initAnimations() {
    // Solo aplicar animaciones si el usuario no ha indicado preferencia por movimiento reducido
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const animatedElements = document.querySelectorAll('.fade-in-up');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      animatedElements.forEach(element => {
        observer.observe(element);
      });
      
      // Animar los íconos de contacto al hacer hover
      const contactItems = document.querySelectorAll('.contact-item');
      
      contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
          const icon = this.querySelector('.icon-wrapper');
          const iconElement = this.querySelector('.icon-wrapper i');
          
          if (icon && iconElement) {
            icon.style.backgroundColor = 'var(--color-primario)';
            iconElement.style.color = 'white';
          }
        });
        
        item.addEventListener('mouseleave', function() {
          const icon = this.querySelector('.icon-wrapper');
          const iconElement = this.querySelector('.icon-wrapper i');
          
          if (icon && iconElement) {
            icon.style.backgroundColor = 'rgba(7, 18, 173, 0.05)';
            iconElement.style.color = 'var(--color-primario)';
          }
        });
      });
    } else {
      // Si el usuario prefiere movimiento reducido, mostrar elementos sin animaciones
      document.querySelectorAll('.fade-in-up').forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'none';
      });
    }
  }
  
  /**
   * Mejora la accesibilidad de la página
   */
  function enhanceAccessibility() {
    // Asegurar que los enlaces del mapa tienen descripciones adecuadas
    const mapLinks = document.querySelectorAll('.map-actions a');
    
    mapLinks.forEach(link => {
      if (!link.getAttribute('aria-label')) {
        const text = link.textContent.trim();
        link.setAttribute('aria-label', text);
      }
    });
    
    // Mejorar la accesibilidad del formulario
    const formInputs = document.querySelectorAll('.form-control');
    
    formInputs.forEach(input => {
      // Asegurar que todos los campos obligatorios están marcados para lectores de pantalla
      if (input.hasAttribute('required')) {
        input.setAttribute('aria-required', 'true');
      }
      
      // Añadir descripciones adicionales para campos específicos
      if (input.id === 'email') {
        input.setAttribute('aria-describedby', 'email-help');
        
        // Crear elemento de ayuda si no existe
        if (!document.getElementById('email-help')) {
          const helpText = document.createElement('div');
          helpText.id = 'email-help';
          helpText.className = 'form-text visually-hidden';
          helpText.textContent = 'Introduce un email válido donde podamos contactarte';
          input.parentNode.appendChild(helpText);
        }
      }
    });
    
    // Mejorar enfoque visual en elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    
    interactiveElements.forEach(element => {
      element.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--color-primario)';
        this.style.outlineOffset = '2px';
      });
      
      element.addEventListener('blur', function() {
        this.style.outline = '';
        this.style.outlineOffset = '';
      });
    });
  }
  
  // Cuando la página está totalmente cargada
  window.addEventListener('load', function() {
    // Eliminar clases de animación después de que se completen
    setTimeout(() => {
      document.querySelectorAll('.fade-in-up').forEach(element => {
        element.classList.remove('fade-in-up');
      });
    }, 1500);
  });