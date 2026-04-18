document.addEventListener('DOMContentLoaded', () => {
    
    // -----------------------------------------
    // 1. Mobile Menu Toggle
    // -----------------------------------------
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Toggle icon between list and X
        const icon = hamburger.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('ph-list');
            icon.classList.add('ph-x');
        } else {
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
        }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
        });
    });

    // -----------------------------------------
    // 2. Sticky Navbar & Active Link Update
    // -----------------------------------------
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link Update
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // -----------------------------------------
    // 3. Scroll Reveal Animations
    // -----------------------------------------
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // -----------------------------------------
    // 4. Skills Progress Bars Animation
    // -----------------------------------------
    const skillBars = document.querySelectorAll('.progress-bar');
    const skillsSection = document.getElementById('skills');

    if(skillsSection && skillBars.length > 0) {
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillBars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-width');
                        bar.style.width = targetWidth;
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        skillsObserver.observe(skillsSection);
    }

    // -----------------------------------------
    // 5. Stats Counters Animation
    // -----------------------------------------
    const counters = document.querySelectorAll('.counter');
    const statsSection = document.querySelector('.stats');

    if(statsSection && counters.length > 0) {
        let started = false;
        
        const statsObserver = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting && !started) {
                started = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    
                    let current = 0;
                    const updateCounter = () => {
                        current += increment;
                        if(current < target) {
                            counter.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCounter();
                });
            }
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    // -----------------------------------------
    // 6. Portfolio Filtering & Lightbox
    // -----------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Initialize all items to show
    portfolioItems.forEach(item => item.classList.add('show'));

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                item.classList.remove('show');
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    // Small timeout to allow CSS animation to restart
                    setTimeout(() => {
                        item.classList.add('show');
                    }, 50);
                }
            });
        });
    });

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const zoomIcons = document.querySelectorAll('.zoom-icon');

    zoomIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            // Prevent event bubbling if needed
            e.stopPropagation();
            // Get the image inside the same portfolio item
            const item = icon.closest('.portfolio-item');
            const imgTarget = item.querySelector('img').getAttribute('src');
            
            lightboxImg.setAttribute('src', imgTarget);
            lightbox.classList.add('active');
        });
    });

    // Close lightbox
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // -----------------------------------------
    // 7. Testimonials Slider
    // -----------------------------------------
    const slides = document.querySelectorAll('.slide');
    const btnNext = document.querySelector('.slide-btn.next');
    const btnPrev = document.querySelector('.slide-btn.prev');
    let currentSlide = 0;

    if (slides.length > 0) {
        const updateSlider = () => {
            slides.forEach((slide, index) => {
                slide.classList.remove('active');
                if (index === currentSlide) {
                    slide.classList.add('active');
                }
            });
        };

        btnNext.addEventListener('click', () => {
            currentSlide++;
            if (currentSlide >= slides.length) currentSlide = 0;
            updateSlider();
        });

        btnPrev.addEventListener('click', () => {
            currentSlide--;
            if (currentSlide < 0) currentSlide = slides.length - 1;
            updateSlider();
        });

        // Auto slide
        setInterval(() => {
            currentSlide++;
            if (currentSlide >= slides.length) currentSlide = 0;
            updateSlider();
        }, 5000);
    }

    // -----------------------------------------
    // 8. Contact Form Validation
    // -----------------------------------------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            const nameErr = document.getElementById('nameError');
            const emailErr = document.getElementById('emailError');
            const msgErr = document.getElementById('messageError');

            // Reset errors
            nameErr.style.display = 'none';
            emailErr.style.display = 'none';
            msgErr.style.display = 'none';

            if (name.value.trim() === '') {
                nameErr.textContent = 'Name is required';
                nameErr.style.display = 'block';
                isValid = false;
            }

            if (email.value.trim() === '') {
                emailErr.textContent = 'Email is required';
                emailErr.style.display = 'block';
                isValid = false;
            } else if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
                emailErr.textContent = 'Invalid email format';
                emailErr.style.display = 'block';
                isValid = false;
            }

            if (message.value.trim() === '') {
                msgErr.textContent = 'Message is required';
                msgErr.style.display = 'block';
                isValid = false;
            }

            if (isValid) {
                const successMsg = document.getElementById('successMsg');
                successMsg.style.display = 'block';
                contactForm.reset();
                
                // Hide success message after 3 seconds
                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 3000);
            }
        });
    }
});
