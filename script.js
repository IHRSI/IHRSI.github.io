document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('night-mode');
        document.body.classList.toggle('day-mode');
        themeToggle.textContent = document.body.classList.contains('night-mode') ? '🌌' : '☀️';
    });

    // The Navigator's Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let lastX = mouseX;
    let lastY = mouseY;

    if (cursorDot && cursorRing) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
            
            // Hero Cinematic Parallax & Fog Flashlight
            const heroSection = document.getElementById('base-camp');
            if (heroSection) {
                const rect = heroSection.getBoundingClientRect();
                // Only process if hero is visible
                if (rect.bottom > 0) {
                    const xCenter = window.innerWidth / 2;
                    const yCenter = window.innerHeight / 2;
                    
                    // Parallax calculation (-1 to 1)
                    const xRatio = (mouseX - xCenter) / xCenter;
                    const yRatio = (mouseY - yCenter) / yCenter;
                    
                    const backMtn = document.querySelector('.hero-mountain-back');
                    const midMtn = document.querySelector('.hero-mountain-mid');
                    const frontMtn = document.querySelector('.hero-mountain-front');
                    
                    // X-axis only parallax to keep mountains anchored to the bottom
                    if (backMtn) backMtn.style.transform = `translateX(${xRatio * -10}px)`;
                    if (midMtn) midMtn.style.transform = `translateX(${xRatio * -20}px)`;
                    if (frontMtn) frontMtn.style.transform = `translateX(${xRatio * -40}px)`;
                }
            }
            
            // Summit Cinematic Parallax
            const summitSection = document.getElementById('summit-contact');
            if (summitSection) {
                const rect = summitSection.getBoundingClientRect();
                // Only process if summit is visible
                if (rect.top < window.innerHeight) {
                    const xCenter = window.innerWidth / 2;
                    const xRatio = (mouseX - xCenter) / xCenter;
                    
                    const summitMtn1 = document.querySelector('.summit-mountain-1');
                    const summitMtn2 = document.querySelector('.summit-mountain-2');
                    const summitMtn3 = document.querySelector('.summit-mountain-3');
                    
                    // X-axis only parallax
                    if (summitMtn1) summitMtn1.style.transform = `translateX(${xRatio * -10}px)`;
                    if (summitMtn2) summitMtn2.style.transform = `translateX(${xRatio * -20}px)`;
                    if (summitMtn3) summitMtn3.style.transform = `translateX(${xRatio * -40}px)`;
                }
            }
            
            const currentSection = document.body.className.split(' ').find(c => c.startsWith('section-'));
            
            if (currentSection === 'section-zermatt-tech') {
                if (Math.random() > 0.6) {
                    const trail = document.createElement('div');
                    trail.className = 'cursor-trail-dot';
                    trail.style.left = `${mouseX}px`;
                    trail.style.top = `${mouseY}px`;
                    document.body.appendChild(trail);
                    setTimeout(() => trail.remove(), 1000);
                }
            }
        });

        document.addEventListener('click', (e) => {
            const currentSection = document.body.className.split(' ').find(c => c.startsWith('section-'));
            if (currentSection === 'section-victoria-falls-leadership') {
                const ripple = document.createElement('div');
                ripple.className = 'cursor-ripple';
                ripple.style.left = `${e.clientX}px`;
                ripple.style.top = `${e.clientY}px`;
                document.body.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            }
        });

        const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .flip-card, .sidebar-dot');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });

        function animateCursor() {
            const dx = mouseX - lastX;
            const dy = mouseY - lastY;
            const velocity = Math.sqrt(dx*dx + dy*dy);
            
            lastX = mouseX;
            lastY = mouseY;

            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;

            if (velocity > 0.1) {
                // Interlaken uses velocity to stretch
                cursorRing.style.setProperty('--cursor-velocity', `${Math.min(velocity, 40)}px`);
                
                // Pipeline uses angle to rotate teardrop
                const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                cursorRing.style.setProperty('--cursor-angle', `${angle - 45}deg`); 
            } else {
                cursorRing.style.setProperty('--cursor-velocity', `0px`);
            }
            
            cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    }

    // Expedition Particle Engine
    const particleContainer = document.getElementById('particle-container');
    const particleConfigs = {
        'base-camp': { class: 'p-drift', count: 40, size: [2, 6], duration: [1.5, 3] },
        'aurora-moment': { class: 'p-star', count: 15, size: [50, 150], duration: [2, 5] },
        'zermatt-tech': { class: 'p-snow', count: 60, size: [3, 8], duration: [3, 6] },
        'pipeline-projects': { class: 'p-spray', count: 40, size: [2, 5], duration: [1.5, 3] },
        'interlaken-achievements': { class: 'p-wind', count: 50, size: [40, 120], duration: [0.5, 1.2] },
        'library-education': { class: 'p-dust', count: 30, size: [4, 10], duration: [6, 12] },
        'victoria-falls-leadership': { class: 'p-mist', count: 40, size: [10, 30], duration: [2, 4] },
        'summit-contact': { class: 'p-ice', count: 30, size: [1, 4], duration: [4, 8] }
    };

    let activeParticles = [];

    function updateParticles(sectionId) {
        if (!particleContainer) return;
        
        // Clear old particles
        particleContainer.innerHTML = '';
        activeParticles = [];
        
        const config = particleConfigs[sectionId];
        if (!config) return;

        for (let i = 0; i < config.count; i++) {
            const p = document.createElement('div');
            p.className = `particle ${config.class}`;
            
            // Randomize based on config
            const size = Math.random() * (config.size[1] - config.size[0]) + config.size[0];
            const duration = Math.random() * (config.duration[1] - config.duration[0]) + config.duration[0];
            const delay = Math.random() * -duration; // Negative delay to start immediately
            
            p.style.setProperty('--duration', `${duration}s`);
            p.style.setProperty('--delay', `${delay}s`);
            
            if (config.class === 'p-star' || config.class === 'p-wind') {
                p.style.setProperty('--length', `${size}px`);
            } else {
                p.style.setProperty('--size', `${size}px`);
            }
            
            // Position vars based on class
            p.style.setProperty('--start-x', `${Math.random() * 100}vw`);
            p.style.setProperty('--start-y', `${Math.random() * 100}vh`);
            p.style.setProperty('--end-y', `${(Math.random() - 0.5) * 100 + 50}vh`);
            p.style.setProperty('--drift', `${(Math.random() - 0.5) * 20}vw`);
            p.style.setProperty('--drift-x', `${(Math.random() - 0.5) * 10}vw`);
            p.style.setProperty('--drift-y', `${(Math.random() - 0.5) * 10}vh`);
            p.style.setProperty('--max-opacity', `${Math.random() * 0.5 + 0.3}`);
            
            particleContainer.appendChild(p);
            activeParticles.push(p);
        }
    }

    // Expedition Log Lines
    const logLines = {
        'base-camp': 'Altitude: 2,800m. Visibility: uncertain. Base Camp established. JEE cleared. Now we climb.',
        'aurora-moment': 'Paused everything for a moment just to ask: what am I actually building? Worth the stop.',
        'zermatt-tech': 'Gears meticulously sorted. Every tool serves a purpose. The right framework makes all the difference.',
        'pipeline-projects': 'Eight projects shipped. Three survived real users. That\'s the only metric that matters.',
        'interlaken-achievements': 'At 13,000ft the world gets very quiet. Top 130 of 15,000 teams felt like that.',
        'library-education': '8.00 CGPA and a lot of late-night debugging. Manipal taught me more outside the classroom.',
        'victoria-falls-leadership': 'Orchestrated 4 major treks, 3 donation campaigns, and events drawing 900+ attendees. Execution is everything.',
        'summit-contact': 'The Everest Summit. 8,848m. You scrolled all the way here — let\'s build something.'
    };
    
    const logTextElement = document.getElementById('log-text');
    
    // Intersection Observer for Sections (Log and Sidebar dots)
    const sections = document.querySelectorAll('.section');
    const navDots = document.querySelectorAll('.sidebar-dot');
    const sidebarCarabiner = document.getElementById('sidebar-carabiner');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Trigger when section passes middle of screen
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.id;
                
                // Update body class for cursor styling
                document.body.className = document.body.className.replace(/\bsection-[^ ]+/g, '');
                document.body.classList.add(`section-${currentId}`);
                
                // Update log text with fade effect
                if (logTextElement) {
                    logTextElement.style.opacity = 0;
                    setTimeout(() => {
                        logTextElement.textContent = logLines[currentId] || '';
                        logTextElement.style.opacity = 1;
                    }, 300);
                }

                // Update particles for this section
                updateParticles(currentId);

                // Update sidebar dots
                let activeIndex = 0;
                let targetDot = null;
                navDots.forEach((dot, index) => {
                    dot.classList.remove('active');
                    if (dot.getAttribute('href') === `#${currentId}`) {
                        dot.classList.add('active');
                        activeIndex = index;
                        targetDot = dot;
                    }
                });
                
                // Update sidebar carabiner
                if (sidebarCarabiner && targetDot) {
                    sidebarCarabiner.style.top = `${targetDot.offsetTop}px`;
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Reveal Animations Observer & Scramble Effect
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Removed Cryptographic Scramble based on user feedback
                
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, { root: null, rootMargin: '0px 0px -15% 0px', threshold: 0.1 });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 3D Tilt Effect on Aurora Bio Card
    const auroraCard = document.querySelector('.aurora-content');
    if (auroraCard) {
        auroraCard.addEventListener('mousemove', (e) => {
            const rect = auroraCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -4; // max 4 deg
            const rotateY = ((x - centerX) / centerX) * 4;
            
            auroraCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        auroraCard.addEventListener('mouseleave', () => {
            auroraCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        });
    }



    // Project Cards Hover Glow Effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Form Confetti and Submit Override
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Stop native submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Transmitting...';
            
            // Trigger Confetti
            createConfetti();
            
            const data = new FormData(contactForm);
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    document.querySelector('[data-fs-success]').style.display = 'block';
                    document.querySelector('[data-fs-error]').style.display = 'none';
                    contactForm.reset();
                    submitBtn.textContent = 'Leave a Mark';
                } else {
                    document.querySelector('[data-fs-error]').style.display = 'block';
                    document.querySelector('[data-fs-success]').style.display = 'none';
                    submitBtn.textContent = 'Leave a Mark';
                    submitBtn.disabled = false;
                }
            } catch (error) {
                document.querySelector('[data-fs-error]').style.display = 'block';
                document.querySelector('[data-fs-success]').style.display = 'none';
                submitBtn.textContent = 'Leave a Mark';
                submitBtn.disabled = false;
            }
        });
    }

    function createConfetti() {
        const colors = ['#C07D1A', '#B84A2A', '#3AAFA9', '#5E60CE', '#1E3A2F'];
        const container = document.createElement('div');
        container.className = 'confetti-container';
        document.body.appendChild(container);

        for(let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-flag';
            
            // Random styling
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            
            // Random delay and duration
            const delay = Math.random() * 0.5;
            const duration = Math.random() * 2 + 2;
            confetti.style.animationDelay = delay + 's';
            confetti.style.animationDuration = duration + 's';
            
            container.appendChild(confetti);
        }
        
        setTimeout(() => {
            container.remove();
        }, 5000);
    }
});
