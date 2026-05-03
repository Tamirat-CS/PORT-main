document.addEventListener('DOMContentLoaded', function() {
    // ========== TYPEWRITER ROLE ROTATION ==========
    var rolesArray = ["Web Developer", "Full-Stack Developer", "Video Editor", "Data Entry Specialist", "Translator"];
    var currentIdx = 0;
    var currentChar = 0;
    var isDeleting = false;
    var roleSpan = document.getElementById('rotatingRoleText');
    
    if (roleSpan) {
        roleSpan.textContent = "";
        
        function typeRole() {
            var fullRole = rolesArray[currentIdx];
            
            if (isDeleting) {
                if (currentChar > 0) {
                    currentChar--;
                    roleSpan.textContent = fullRole.substring(0, currentChar);
                    setTimeout(typeRole, 40);
                } else {
                    isDeleting = false;
                    currentIdx = (currentIdx + 1) % rolesArray.length;
                    setTimeout(typeRole, 300);
                }
            } else {
                if (currentChar < fullRole.length) {
                    currentChar++;
                    roleSpan.textContent = fullRole.substring(0, currentChar);
                    setTimeout(typeRole, 80);
                } else {
                    isDeleting = true;
                    setTimeout(typeRole, 2000);
                }
            }
        }
        
        setTimeout(typeRole, 500);
    }

    // ========== ACTIVE NAVIGATION LINK ==========
    var sections = ['about', 'skills', 'projects', 'contact'];
    var navLinks = document.querySelectorAll('.main-nav .nav-link');
    
    function setActiveLink() {
        var scrollPosition = window.scrollY + 150;
        for (var i = 0; i < sections.length; i++) {
            var section = document.getElementById(sections[i]);
            if (section) {
                var sectionTop = section.offsetTop;
                var sectionBottom = sectionTop + section.offsetHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    for (var j = 0; j < navLinks.length; j++) {
                        navLinks[j].classList.remove('active');
                    }
                    if (navLinks[i]) navLinks[i].classList.add('active');
                }
            }
        }
    }
    window.addEventListener('scroll', setActiveLink);
    setActiveLink();

    // ========== WAVE TEXT ANIMATION ==========
    var waveSpans = document.querySelectorAll('.name-ellipse span');
    for (var i = 0; i < waveSpans.length; i++) {
        waveSpans[i].style.setProperty('--i', i);
    }

    // ========== SMOOTH SCROLL ==========
    var allNavLinks = document.querySelectorAll('.main-nav .nav-link, .sidebar-nav a, .btn-secondary[data-section], .btn-outline[data-section]');
    for (var i = 0; i < allNavLinks.length; i++) {
        allNavLinks[i].addEventListener('click', function(e) {
            var sectionId = this.getAttribute('data-section');
            if (sectionId) {
                e.preventDefault();
                var target = document.getElementById(sectionId);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // ========== SKILLS FILTER ==========
    var filterBtns = document.querySelectorAll('.filter-btn');
    var skills = document.querySelectorAll('.skill');
    
    for (var i = 0; i < filterBtns.length; i++) {
        filterBtns[i].addEventListener('click', function() {
            for (var j = 0; j < filterBtns.length; j++) {
                filterBtns[j].classList.remove('active');
            }
            this.classList.add('active');
            var filter = this.getAttribute('data-filter');
            for (var k = 0; k < skills.length; k++) {
                if (filter === 'all' || skills[k].getAttribute('data-category') === filter) {
                    skills[k].style.display = 'block';
                } else {
                    skills[k].style.display = 'none';
                }
            }
        });
    }

    // ========== PROJECTS FILTER ==========
    var projBtns = document.querySelectorAll('.proj-filter');
    var projects = document.querySelectorAll('.project-card');
    
    for (var i = 0; i < projBtns.length; i++) {
        projBtns[i].addEventListener('click', function() {
            for (var j = 0; j < projBtns.length; j++) {
                projBtns[j].classList.remove('active');
            }
            this.classList.add('active');
            var filter = this.getAttribute('data-proj');
            for (var k = 0; k < projects.length; k++) {
                if (filter === 'all' || projects[k].getAttribute('data-proj-cat') === filter) {
                    projects[k].style.display = 'block';
                } else {
                    projects[k].style.display = 'none';
                }
            }
        });
    }

    // ========== CONTACT FORM ==========
    var contactForm = document.getElementById('contactForm');
    var formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            var formData = new FormData(contactForm);
            formStatus.innerHTML = '<i class="fa-regular fa-spinner fa-pulse"></i> Sending...';
            try {
                var response = await fetch('contact.php', { method: 'POST', body: formData });
                var result = await response.json();
                if (result.success) {
                    formStatus.innerHTML = '<span style="color:#10b981;">✓ Message sent!</span>';
                    contactForm.reset();
                } else {
                    formStatus.innerHTML = '<span style="color:#ef4444;">✗ Error</span>';
                }
            } catch (err) {
                formStatus.innerHTML = '<span style="color:#ef4444;">✗ Network error</span>';
            }
            setTimeout(function() { formStatus.innerHTML = ''; }, 5000);
        });
    }

    // ========== VISITOR COUNTER ==========
    async function loadVisitorCount() {
        try {
            var res = await fetch('counter.php');
            var data = await res.json();
            document.getElementById('visitorCounter').innerHTML = '👁️ Total visits: ' + data.count;
        } catch(e) {
            document.getElementById('visitorCounter').innerHTML = '👁️ visits: 1.2k';
        }
    }
    loadVisitorCount();

    // ========== BACK TO TOP ==========
    var backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) backToTop.classList.add('visible');
        else backToTop.classList.remove('visible');
    });
    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ========== THEME TOGGLE ==========
    var themeToggle = document.getElementById('themeToggle');
    var themeIcon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light');
        if (document.body.classList.contains('light')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // ========== PARTICLES ==========
    var container = document.getElementById('particlesContainer');
    if (container) {
        for (var i = 0; i < 80; i++) {
            var dot = document.createElement('div');
            dot.classList.add('dot');
            dot.style.top = Math.random() * 100 + '%';
            dot.style.left = Math.random() * 100 + '%';
            dot.style.animationDuration = 8 + Math.random() * 20 + 's';
            container.appendChild(dot);
        }
    }

    // ========== ANIMATED COUNTERS ==========
    function animateCounter(el, target) {
        var start = 0;
        var timer = setInterval(function() {
            start += Math.ceil(target / 50);
            if (start >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = start;
            }
        }, 30);
    }

    var statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateCounter(document.getElementById('projectCount'), 15);
                animateCounter(document.getElementById('clientCount'), 12);
                animateCounter(document.getElementById('expCount'), 3);
                animateCounter(document.getElementById('videoCount'), 25);
                statsObserver.disconnect();
            }
        });
    }, { threshold: 0.3 });
    
    var heroStats = document.querySelector('.hero-stats');
    if (heroStats) statsObserver.observe(heroStats);
});