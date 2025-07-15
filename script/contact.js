(function () {
    // Initialize EmailJS with your public key
    emailjs.init("Qel_SKQKhliCy9g6Q");

    document.getElementById('contact-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const firstName = this.querySelector('input[name="first-name"]');
        const lastName = this.querySelector('input[name="last-name"]');
        const email = this.querySelector('input[name="email"]');
        const message = this.querySelector('textarea[name="message"]');
        const formMessage = document.getElementById('form-message');

        // Reset error states
        [firstName, lastName, email, message].forEach(input => input.classList.remove('error'));

        // Validation
        let hasError = false;
        if (!firstName.value.trim()) {
            firstName.classList.add('error');
            showMessage('Please enter your first name.', 'error');
            hasError = true;
        }
        if (!lastName.value.trim()) {
            lastName.classList.add('error');
            showMessage('Please enter your last name.', 'error');
            hasError = true;
        }
        if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
            email.classList.add('error');
            showMessage('Please enter a valid email address.', 'error');
            hasError = true;
        }
        if (!message.value.trim()) {
            message.classList.add('error');
            showMessage('Please enter your message.', 'error');
            hasError = true;
        }

        if (!hasError) {
            // Prepare email parameters
            const templateParams = {
                from_name: `${firstName.value.trim()} ${lastName.value.trim()}`,
                from_email: email.value.trim(),
                message: message.value.trim(),
                to_email: 'minakshi.mehta0773@gmail.com'
            };

            // Send email using EmailJS
            emailjs.send('service_h8gwygg', 'template_xbr4dop', templateParams)
                .then(() => {
                    showMessage('Your message has been sent successfully!', 'success');
                    triggerConfetti();
                    this.reset();
                    document.querySelectorAll('.contact__form input, .contact__form textarea').forEach(input => {
                        input.classList.remove('has-value');
                    });
                }, (error) => {
                    showMessage('Failed to send message. Please try again.', 'error');
                    console.error('EmailJS error:', error);
                });
        }
    });

    // Handle label visibility on input
    document.querySelectorAll('.contact__form input, .contact__form textarea').forEach(input => {
        input.addEventListener('input', function () {
            this.classList.toggle('has-value', this.value.trim() !== '');
        });
        input.addEventListener('blur', function () {
            this.classList.toggle('has-value', this.value.trim() !== '');
        });
    });

    function showMessage(text, type) {
        const formMessage = document.getElementById('form-message');
        formMessage.textContent = text;
        formMessage.className = `form__message ${type} show`;
        setTimeout(() => {
            formMessage.className = 'form__message';
        }, 4000); // Extended to 4s for better visibility
    }

    function triggerConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const colors = ['#7b68ee', '#00f7ff', '#ff6f61', '#f7c94b'];
        const shapes = ['circle', 'star'];
        const particles = [];

        function createParticle() {
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            return {
                x: Math.random() * canvas.width,
                y: canvas.height + 10,
                size: Math.random() * 5 + 2, // Reduced size for mobile
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * -6 - 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: 1,
                shape: shape,
                rotation: Math.random() * 360
            };
        }

        function drawStar(ctx, x, y, r, rotation) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate((rotation * Math.PI) / 180);
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
                ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * r, Math.sin((18 + i * 72) * Math.PI / 180) * r);
                ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * (r / 2), Math.sin((54 + i * 72) * Math.PI / 180) * (r / 2));
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle, index) => {
                particle.y += particle.speedY;
                particle.x += particle.speedX;
                particle.alpha -= 0.02; // Faster fade for performance
                particle.rotation += particle.speedX;
                if (particle.alpha <= 0) {
                    particles.splice(index, 1);
                    return;
                }
                ctx.globalAlpha = particle.alpha;
                ctx.fillStyle = particle.color;
                if (particle.shape === 'circle') {
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    drawStar(ctx, particle.x, particle.y, particle.size, particle.rotation);
                }
            });
            if (particles.length > 0) {
                requestAnimationFrame(animate);
            }
        }

        for (let i = 0; i < 50; i++) { // Reduced particles for performance
            particles.push(createParticle());
        }
        animate();
    }
})();