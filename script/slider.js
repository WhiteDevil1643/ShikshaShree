(function () {
  const initSlider = (sliderId, modalId, prevBtnId, nextBtnId, closeBtnId, slidePrevBtnId, slideNextBtnId) => {
    const slider = document.getElementById(sliderId);
    const modal = document.getElementById(modalId);
    const modalImage = modal.querySelector('img');
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const closeBtn = document.getElementById(closeBtnId);
    const slidePrevBtn = document.getElementById(slidePrevBtnId);
    const slideNextBtn = document.getElementById(slideNextBtnId);
    const slides = slider.querySelectorAll('.slider-item');
    const images = slider.querySelectorAll('img');
    const loading = slider.nextElementSibling.nextElementSibling;

    let currentIndex = 0;
    let autoSlideInterval;
    let isAutoSliding = true;
    let touchStartX = 0;
    let touchEndX = 0;

    // Update slider position
    function updateSlider() {
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
      slides.forEach((slide, index) => {
        slide.style.opacity = index === currentIndex ? '1' : '0.7';
        slide.style.transform = index === currentIndex ? 'scale(1)' : 'scale(0.95)';
      });
    }

    // Start auto sliding
    function startAutoSlide() {
      if (autoSlideInterval) clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => {
        if (isAutoSliding) {
          currentIndex = (currentIndex + 1) % slides.length;
          updateSlider();
        }
      }, 3000);
    }

    // Show modal with image
    function showModal(index) {
      currentIndex = index;
      modalImage.src = images[index].src;
      modalImage.alt = images[index].alt;
      modal.classList.add('show');
      isAutoSliding = false;
      clearInterval(autoSlideInterval);
    }

    // Event listeners for buttons
    slidePrevBtn.addEventListener('click', () => {
      isAutoSliding = false;
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider();
      setTimeout(() => {
        isAutoSliding = true;
        startAutoSlide();
      }, 3000);
    });

    slideNextBtn.addEventListener('click', () => {
      isAutoSliding = false;
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
      setTimeout(() => {
        isAutoSliding = true;
        startAutoSlide();
      }, 3000);
    });

    slides.forEach((slide, index) => {
      slide.addEventListener('click', () => showModal(index));
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('show');
      isAutoSliding = true;
      startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      modalImage.src = images[currentIndex].src;
      modalImage.alt = images[currentIndex].alt;
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      modalImage.src = images[currentIndex].src;
      modalImage.alt = images[currentIndex].alt;
    });

    // Touch events for mobile
    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      isAutoSliding = false;
      clearInterval(autoSlideInterval);
    });

    slider.addEventListener('touchmove', (e) => {
      touchEndX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', () => {
      const touchDistance = touchStartX - touchEndX;
      if (touchDistance > 50) {
        currentIndex = (currentIndex + 1) % slides.length;
      } else if (touchDistance < -50) {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      }
      updateSlider();
      setTimeout(() => {
        isAutoSliding = true;
        startAutoSlide();
      }, 3000);
    });

    // Image loading handling
    let loadedImages = 0;
    images.forEach(img => {
      if (img.complete) {
        img.classList.add('loaded');
        loadedImages++;
      } else {
        img.addEventListener('load', () => {
          img.classList.add('loaded');
          loadedImages++;
          if (loadedImages === images.length) {
            loading.style.display = 'none';
          }
        });
        img.addEventListener('error', () => {
          img.src = './images/fallback.webp';
          img.classList.add('loaded');
          loadedImages++;
          if (loadedImages === images.length) {
            loading.style.display = 'none';
          }
        });
      }
    });

    if (loadedImages === images.length) {
      loading.style.display = 'none';
    }

    // Initialize
    updateSlider();
    startAutoSlide();

    // Handle resize
    window.addEventListener('resize', updateSlider);
  };

  // Initialize both sliders
  initSlider(
    'learning-slider',
    'learning-slider-modal',
    'learning-modal-prev',
    'learning-modal-next',
    'learning-modal-close',
    'learning-slide-prev',
    'learning-slide-next'
  );

  initSlider(
    'visit-slider',
    'visit-slider-modal',
    'visit-modal-prev',
    'visit-modal-next',
    'visit-modal-close',
    'visit-slide-prev',
    'visit-slide-next'
  );
})();