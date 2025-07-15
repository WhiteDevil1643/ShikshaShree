(function () {
  // Initialize both roulettes
  const initRoulette = (rouletteId, modalId, prevBtnId, nextBtnId, closeBtnId, rotateLeftBtnId, rotateRightBtnId) => {
    const roulette = document.getElementById(rouletteId);
    const modal = document.getElementById(modalId);
    const modalImage = modal.querySelector('img');
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const closeBtn = document.getElementById(closeBtnId);
    const rotateLeftBtn = document.getElementById(rotateLeftBtnId);
    const rotateRightBtn = document.getElementById(rotateRightBtnId);
    const slots = roulette.querySelectorAll('.roulette-slot');
    const images = roulette.querySelectorAll('img');
    const loading = roulette.nextElementSibling;

    let currentAngle = 0;
    let currentIndex = 0;
    let autoRotateInterval;
    let isAutoRotating = true;

    // Position slots in 3D space
    function positionSlots() {
      const radius = Math.min(300, window.innerWidth * 0.3);
      slots.forEach((slot, index) => {
        const angle = (index * 90) * (Math.PI / 180);
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        slot.style.transform = `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px) rotateY(${-angle * (180/Math.PI)}deg)`;
      });
    }

    // Rotate carousel
    function rotate(angle) {
      currentAngle = angle;
      roulette.style.transform = `rotateY(${currentAngle}deg)`;
    }

    // Start auto rotation
    function startAutoRotation() {
      if (autoRotateInterval) clearInterval(autoRotateInterval);
      autoRotateInterval = setInterval(() => {
        if (isAutoRotating) {
          currentAngle -= 1;
          rotate(currentAngle);
        }
      }, 50);
    }

    // Show modal with image
    function showModal(index) {
      currentIndex = index;
      modalImage.src = images[index].src;
      modalImage.alt = images[index].alt;
      modal.classList.add('show');
      isAutoRotating = false;
    }

    // Event listeners
    rotateLeftBtn.addEventListener('click', () => {
      isAutoRotating = false;
      currentAngle += 90;
      rotate(currentAngle);
      setTimeout(() => isAutoRotating = true, 3000);
    });

    rotateRightBtn.addEventListener('click', () => {
      isAutoRotating = false;
      currentAngle -= 90;
      rotate(currentAngle);
      setTimeout(() => isAutoRotating = true, 3000);
    });

    slots.forEach((slot, index) => {
      slot.addEventListener('click', () => showModal(index));
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('show');
      isAutoRotating = true;
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slots.length) % slots.length;
      modalImage.src = images[currentIndex].src;
      modalImage.alt = images[currentIndex].alt;
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slots.length;
      modalImage.src = images[currentIndex].src;
      modalImage.alt = images[currentIndex].alt;
    });

    // Initialize
    positionSlots();
    startAutoRotation();
    window.addEventListener('resize', positionSlots);

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
  };

  // Initialize both roulettes
  initRoulette(
    'learning-roulette',
    'learning-roulette-modal',
    'learning-modal-prev',
    'learning-modal-next',
    'learning-modal-close',
    'learning-rotate-left',
    'learning-rotate-right'
  );

  initRoulette(
    'visit-roulette',
    'visit-roulette-modal',
    'visit-modal-prev',
    'visit-modal-next',
    'visit-modal-close',
    'visit-rotate-left',
    'visit-rotate-right'
  );
})();