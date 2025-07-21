document.addEventListener('DOMContentLoaded', () => {
  // Hamburger Menu Toggle
  const hamburgerBtn = document.querySelector('#hamburger-btn');
  const navMenu = document.querySelector('.nav__menu');
  const navLinks = document.querySelectorAll('.nav__menu a');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('nav__menu--open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 600) {
          hamburgerBtn.classList.remove('active');
          navMenu.classList.remove('nav__menu--open');
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('nav__menu--open');
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 600) {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('nav__menu--open');
      }
    });
  }

  // FAQ Toggle
  const faqs = document.querySelectorAll('.faq');
  faqs.forEach(faq => {
    faq.addEventListener('click', () => {
      faq.classList.toggle('open');
      const icon = faq.querySelector('.faq__icon i');
      if (icon) {
        icon.classList.toggle('uil-plus');
        icon.classList.toggle('uil-minus');
      }
    });
  });

  // Section Animation on Scroll
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach(section => observer.observe(section));

  // Button Click Animation
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.style.transform = 'scale(0.97)';
      setTimeout(() => {
        btn.style.transform = 'scale(1)';
      }, 100);
    });
  });

  // Header Particle System
  const headerCanvas = document.getElementById('particle-canvas');
  if (headerCanvas) {
    const headerCtx = headerCanvas.getContext('2d');
    headerCanvas.width = window.innerWidth;
    headerCanvas.height = window.innerHeight;

    const headerParticles = [];
    const headerParticleCount = window.innerWidth <= 600 ? 20 : window.innerWidth <= 1024 ? 30 : 40;

    class HeaderParticle {
      constructor() {
        this.x = Math.random() * headerCanvas.width;
        this.y = Math.random() * headerCanvas.height;
        this.size = Math.random() * 2.5 + 0.8;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.speedY = Math.random() * 0.8 - 0.4;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.03;
        if (this.x < 0 || this.x > headerCanvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > headerCanvas.height) this.speedY *= -1;
      }

      draw() {
        headerCtx.fillStyle = 'rgba(0, 247, 255, 0.5)';
        headerCtx.beginPath();
        headerCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        headerCtx.fill();
      }
    }

    function initHeaderParticles() {
      for (let i = 0; i < headerParticleCount; i++) {
        headerParticles.push(new HeaderParticle());
      }
    }

    function animateHeaderParticles() {
      headerCtx.clearRect(0, 0, headerCanvas.width, headerCanvas.height);
      for (let i = 0; i < headerParticles.length; i++) {
        headerParticles[i].update();
        headerParticles[i].draw();
        if (headerParticles[i].size <= 0.2) {
          headerParticles.splice(i, 1);
          i--;
          headerParticles.push(new HeaderParticle());
        }
      }
      requestAnimationFrame(animateHeaderParticles);
    }

    initHeaderParticles();
    animateHeaderParticles();

    window.addEventListener('resize', () => {
      headerCanvas.width = window.innerWidth;
      headerCanvas.height = window.innerHeight;
    });
  }
});