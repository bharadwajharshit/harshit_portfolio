document.addEventListener('DOMContentLoaded', () => {
    loadSharedComponents();
    // Typewriter Effect
    const typeTarget = document.querySelector('.hero-subtitle');
    if (typeTarget) {
        const originalText = typeTarget.innerHTML;
        typeTarget.innerHTML = '';

        let i = 0;
        // Strip HTML tags for typing effect simplicity, or just type purely text if possible. 
        // But we have a span in there. Let's type the visible text content logic or just simple substitution.
        // Better approach for "high impact": Keep structure, type the content. 
        // Simplified approach: Type a predetermined string array.

        const roles = [
            "Full-Stack Developer (MERN)",
            "Transitioning to Python",
            "6+ Years Experience",
            "Building Scalable Apps"
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                typeTarget.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typeTarget.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        // Override the static HTML for this effect
        typeTarget.innerHTML = '<span class="txt"></span>';
        const typeSpan = typeTarget.querySelector('.txt');

        // Adjusted type function to target the span
        function typeAdjusted() {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                typeSpan.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typeSpan.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typeSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500;
            }
            setTimeout(typeAdjusted, typeSpeed);
        }

        typeAdjusted();
    }

    // Tilt Effect
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    function loadSharedComponents() {
        // Inject Nav
        const nav = document.querySelector('nav');
        if (nav) {
            nav.innerHTML = `
            <div class="nav-links">
              <a href="index.html">Summary</a>
              <a href="skills.html">Skills</a>
              <a href="experience.html">Experience</a>
              <a href="projects.html">Projects</a>
              <a href="contact.html">Contact</a>
            </div>
            <div class="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </div>
            `;

            // Active State
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const navLinks = nav.querySelectorAll('.nav-links a');
            navLinks.forEach(link => {
                if (link.getAttribute('href') === currentPage) {
                    link.classList.add('active');
                }
            });

            // Init Mobile Nav
            initMobileNav();
        }

        // Inject Footer
        const footer = document.querySelector('footer');
        if (footer) {
            footer.innerHTML = `<p>© 2026 Harshit Bharadwaj</p>`;
        }
    }

    // Mobile Navigation Logic
    function initMobileNav() {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const links = document.querySelectorAll('.nav-links a');

        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                // Toggle Nav
                navLinks.classList.toggle('nav-active');
                hamburger.classList.toggle('toggle');

                // Animate Links
                links.forEach((link, index) => {
                    if (link.style.animation) {
                        link.style.animation = '';
                    } else {
                        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                    }
                });
            });

            // Close when clicking a link
            links.forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('nav-active');
                    hamburger.classList.remove('toggle');

                    links.forEach(link => {
                        link.style.animation = '';
                    });
                });
            });
        }
    }
});
