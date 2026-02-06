/* =========================================
   1. NAVIGATION (Mobile Menu)
   ========================================= */
const initNavigation = () => {
    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.nav-links');

    if (menu && menuLinks) {
        menu.addEventListener('click', () => {
            menuLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuLinks.classList.remove('active');
            });
        });
    }
};

/* =========================================
   2. HINTERGRUND-ANIMATION (Canvas)
   ========================================= */
const initBackgroundAnimation = () => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];

    const initParticles = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2,
                speed: Math.random() * 0.5 + 0.1
            });
        }
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(56, 189, 248, 0.4)"; 
        
        particles.forEach(p => {
            p.y -= p.speed;
            if (p.y < 0) p.y = canvas.height;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(animate);
    };

    window.addEventListener('resize', initParticles);
    initParticles();
    animate();
};

/* =========================================
   3. HERO & PROJEKT LOGIK
   ========================================= */
const initHeroEffects = () => {
    const scrollBtn = document.querySelector('.hero-overlap-btn');
    const hero = document.querySelector('.hero-section');
    const typewriterElement = document.getElementById('typewriter');

    // A. Nur ausführen, wenn wir auf der Startseite (mit Hero) sind
    if (scrollBtn && hero) {
        scrollBtn.addEventListener('click', (e) => {
            e.preventDefault();
            hero.classList.add('hero-removed');

            setTimeout(() => {
                hero.style.display = 'none';
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 800);
        });
    }

    // B. Schreibmaschinen-Effekt (Nur wenn Element existiert)
    if (typewriterElement) {
        const textArray = ["IT-Systemintegration", "Digitale Kunst", "Python Developer"];
        let arrayIndex = 0;
        let charIndex = 0;

        const type = () => {
            if (charIndex < textArray[arrayIndex].length) {
                typewriterElement.textContent += textArray[arrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, 100);
            } else {
                setTimeout(erase, 2000);
            }
        };

        const erase = () => {
            if (charIndex > 0) {
                typewriterElement.textContent = textArray[arrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, 50);
            } else {
                arrayIndex = (arrayIndex + 1) % textArray.length;
                setTimeout(type, 500);
            }
        };
        type();
    }
};

/* =========================================
   4. PROJEKT-FILTER LOGIK
   ========================================= */
const initProjectFilters = () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 1. Aktiven Button-Stil umschalten
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // 2. Filter-Wert holen
                const filterValue = btn.getAttribute('data-filter');

                // 3. Karten filtern
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || filterValue === category) {
                        card.style.display = 'flex';
                        // Kleiner Trick für eine Einblend-Animation
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300); // Wartet auf die CSS-Transition
                    }
                });
            });
        });
    }
};

/* =========================================
   ANIMATION LOGIK (Skills & Timeline)
   ========================================= */
const initAboutAnimations = () => {
    // 1. Skill Balken Animation
    const progressLines = document.querySelectorAll('.progress-line');
    progressLines.forEach(line => {
        const value = line.getAttribute('data-skill');
        // Wir nutzen einen kleinen Timeout, damit der Browser die Transition erkennt
        setTimeout(() => {
            line.style.setProperty('--width', value); // Für CSS ::after
            line.classList.add('animate');
            
            // Sicherheitshalber direkt setzen, falls CSS-Variable hakt:
            // line.style.width = "100%"; // Falls nötig
        }, 300);
    });

    // 2. Timeline Scroll Observer
    const observerOptions = {
        threshold: 0.15, // Reagiert, wenn 15% sichtbar sind
        rootMargin: "0px 0px -50px 0px" // Startet etwas früher
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Einmal eingeblendet, brauchen wir den Beobachter nicht mehr
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        observer.observe(item);
    });

    const typingLines = document.querySelectorAll('.terminal-typing');
    typingLines.forEach((line, index) => {
        // Zeilen erst unsichtbar machen
        line.style.opacity = "0";
        line.style.transform = "translateX(-10px)";
        
        setTimeout(() => {
            line.style.transition = "all 0.3s ease";
            line.style.opacity = "1";
            line.style.transform = "translateX(0)";
        }, 500 + (index * 400)); // Jede Zeile erscheint 400ms nach der vorherigen
    });
};

/* =========================================
   5. INITIALISIERUNG
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initBackgroundAnimation();
    initHeroEffects();
    initProjectFilters();
    initAboutAnimations();
});

function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const clickedImgSrc = element.querySelector('img').src;
    
    lightboxImg.src = clickedImgSrc;
    lightbox.style.display = 'flex';
}

// Dieser "EventListener" läuft automatisch im Hintergrund
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero-section');
    const mainStart = document.getElementById('main-start');
    
    // Nur ausführen, wenn der Hero überhaupt noch da ist
    if (hero && hero.style.display !== 'none') {
        const position = mainStart.getBoundingClientRect();

        // Wenn der User den Hero komplett weggescrollt hat (top <= 0)
        if (position.top <= 0) {
            hero.classList.add('hero-removed');
            
            setTimeout(() => {
                hero.style.display = 'none';
                window.scrollTo(0, 0);
                
                // Optional: Navigation fixieren oder einblenden
                const nav = document.querySelector('nav');
                if(nav) nav.style.position = 'sticky';
            }, 800); 
        }
    }
});