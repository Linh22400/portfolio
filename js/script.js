// Initialize AOS Animation
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
});

// Particles.js Configuration
if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#ffffff" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.3, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
            "size": { "value": 3, "random": true, "anim": { "enable": false } },
            "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.1, "width": 1 },
            "move": { "enable": true, "speed": 1, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "push": { "particles_nb": 4 } }
        },
        "retina_detect": true
    });
}

// Vanilla Tilt Initialization
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".project-card, .skill-category, .education-card, .activity-card"), {
        max: 5, // Reduced from 10 to 5 for smoother, subtle effect
        speed: 400,
        glare: true,
        "max-glare": 0.1, // Reduced glare opacity
        scale: 1.02
    });
}

// Typing Effect
if (document.querySelector('.typewriter')) {
    new Typed('.typewriter', {
        strings: ['Frontend Developer', 'Fullstack Intern', 'UI/UX Enthusiast'],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 2000,
        loop: true
    });
}

// Navbar Toggle Mobile
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Sticky Navbar Background
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scroll for valid links
// Smooth Scroll & Active Link Handling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        // Set active class immediately on click
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        this.classList.add('active');

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Spy: Highlight active section in navbar
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    // Logic: If we are near bottom of page, highlight Contact
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        current = 'contact';
    } else {
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // -150 offset to trigger highlight a bit before the section hits top
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
    }

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// CV Download - Now handled by direct link to PDF file
// No JavaScript needed

// Custom Cursor Logic (Fluid Trail)
const appCursor = {
    trails: [],
    mouse: { x: 0, y: 0 },

    init: function () {
        // Create trail elements
        const trailCount = 20; // Number of dots

        for (let i = 0; i < trailCount; i++) {
            const node = document.createElement('div');
            node.className = 'cursor-trail';
            document.body.appendChild(node);

            this.trails.push({
                el: node,
                x: 0,
                y: 0
            });
        }

        // Track global mouse position
        window.addEventListener("mousemove", (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // Start animation loop
        this.animate();

        // Add hover effects
        const interactiveElements = document.querySelectorAll("a, button, .project-card, .skill-category, .btn, .nav-link");
        interactiveElements.forEach(el => {
            el.addEventListener("mouseenter", () => document.body.classList.add("hovering"));
            el.addEventListener("mouseleave", () => document.body.classList.remove("hovering"));
        });
    },

    animate: function () {
        let x = this.mouse.x;
        let y = this.mouse.y;

        this.trails.forEach((trail, index, trails) => {
            const nextNode = trails[index + 1] || trails[0];

            // Physics: Trail follows position of previous dot (or mouse)
            const ease = 0.4;

            trail.x += (x - trail.x) * ease;
            trail.y += (y - trail.y) * ease;

            // Apply Transform
            const scale = 1 - (index / trails.length);
            trail.el.style.transform = `translate(${trail.x}px, ${trail.y}px) scale(${scale}) translate(-50%, -50%)`;

            // Update next target position to be CURRENT position of this dot
            x = trail.x;
            y = trail.y;
        });

        requestAnimationFrame(() => this.animate());
    }
};

appCursor.init();

// Scroll Progress Bar Logic
window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;

    document.getElementById("scrollProgressBar").style.width = scrolled + "%";
});

// Magnetic Dust System (Google Antigravity Style)
const magneticDust = {
    canvas: document.getElementById('magnetic-dust'),
    ctx: null,
    particles: [],
    mouse: { x: -1000, y: -1000 },

    init: function () {
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');

        // Resize canvas
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Track mouse
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // Create scattered particles
        this.createParticles();

        this.animate();
    },

    createParticles: function () {
        this.particles = [];
        const particleCount = 400; // Very high density

        for (let i = 0; i < particleCount; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;

            this.particles.push({
                x: x,
                y: y,
                originX: x,
                originY: y,
                vx: (Math.random() - 0.5) * 1.2, // Stronger initial drift
                vy: (Math.random() - 0.5) * 1.2,
                size: Math.random() * 2.5 + 1.5, // Even larger particles
                color: `rgba(${Math.random() * 100}, ${150 + Math.random() * 105}, 255, ${Math.random() * 0.5 + 0.4})`
            });
        }
    },

    resize: function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.createParticles();
    },

    animate: function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(p => {
            // Calculate distance to mouse
            const dx = p.x - this.mouse.x;
            const dy = p.y - this.mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const repelRadius = 50; // Even smaller repulsion zone

            // REPULSION: Push away from mouse
            if (dist < repelRadius && dist > 0) {
                const force = (repelRadius - dist) / repelRadius;
                const angle = Math.atan2(dy, dx);

                // Strong push
                const pushStrength = 6;
                p.vx += Math.cos(angle) * pushStrength * force;
                p.vy += Math.sin(angle) * pushStrength * force;
            }

            // CONSTANT DRIFT: Gentle continuous wandering
            p.vx += (Math.random() - 0.5) * 0.08;
            p.vy += (Math.random() - 0.5) * 0.08;

            // FRICTION: Very gentle to maintain smooth flow
            p.vx *= 0.98;
            p.vy *= 0.98;

            // Apply velocity
            p.x += p.vx;
            p.y += p.vy;

            // SCREEN WRAP: Loop around edges
            if (p.x < -10) p.x = this.canvas.width + 10;
            if (p.x > this.canvas.width + 10) p.x = -10;
            if (p.y < -10) p.y = this.canvas.height + 10;
            if (p.y > this.canvas.height + 10) p.y = -10;

            // Draw as small dash/line
            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            const length = Math.max(speed * 2, 3); // Elongate when moving
            const angle = Math.atan2(p.vy, p.vx);

            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(angle);

            this.ctx.beginPath();
            this.ctx.moveTo(-length / 2, 0);
            this.ctx.lineTo(length / 2, 0);
            this.ctx.strokeStyle = p.color;
            this.ctx.lineWidth = p.size;
            this.ctx.lineCap = 'round';
            this.ctx.stroke();

            this.ctx.restore();
        });

        requestAnimationFrame(() => this.animate());
    }
};

magneticDust.init();
