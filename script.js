document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const headerRightGroup = document.querySelector('.header-right-group');

  if (menuToggle && headerRightGroup) {
    menuToggle.addEventListener('click', () => {
      headerRightGroup.classList.toggle('active');
    });
  }

  // Hero Banner Slider (Supports mixed images and videos using .hero-banner-img and .hero-banner-video)
  const slides = document.querySelectorAll('.hero-banner-img, .hero-banner-video');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      const isActive = i === index;
      slide.classList.toggle('active', isActive);

      // Handle video playback state during slide transitions
      if (slide.tagName === 'VIDEO') {
        if (isActive) {
          slide.currentTime = 0;
          slide.play().catch(() => {});
        } else {
          slide.pause();
        }
      }
    });
  }

  if (slides.length > 0) {
    // Initialize first video if it starts active
    if (slides[0].tagName === 'VIDEO') {
      slides[0].play().catch(() => {});
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
      });
    }

    // Auto-advance slides every 6 seconds
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 6000);
  }

  // Capacity & Quantity Selectors (Interactive Helpers)
  const capButtons = document.querySelectorAll('.cap-btn');
  capButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.parentElement.querySelectorAll('.cap-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  const qtyContainers = document.querySelectorAll('.qty-selector');
  qtyContainers.forEach(container => {
    const minusBtn = container.querySelector('.qty-btn:first-child');
    const plusBtn = container.querySelector('.qty-btn:last-child');
    const input = container.querySelector('.qty-input');

    if (minusBtn && plusBtn && input) {
      minusBtn.addEventListener('click', () => {
        let val = parseInt(input.value) || 1;
        if (val > 1) input.value = val - 1;
      });
      plusBtn.addEventListener('click', () => {
        let val = parseInt(input.value) || 1;
        input.value = val + 1;
      });
    }
  });

  // Contact Form Feedback Mockup
  const contactForm = document.querySelector('.contact-form');
  const formStatus = document.querySelector('.form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formStatus.textContent = "Thank you! Your message has been successfully sent.";
      formStatus.classList.add('success');
      contactForm.reset();
      
      setTimeout(() => {
        formStatus.classList.remove('success');
      }, 5000);
    });
  }
});
