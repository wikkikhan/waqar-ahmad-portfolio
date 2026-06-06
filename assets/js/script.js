document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. THEME SWITCHER LOGIC
     ========================================== */
  const toggleSwitch = document.querySelector('#checkbox');
  const currentTheme = localStorage.getItem('theme');

  // Check saved theme or system preference
  if (currentTheme) {
    document.body.className = currentTheme;
    if (currentTheme === 'light-theme') {
      toggleSwitch.checked = true;
    }
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (!prefersDark) {
      document.body.classList.add('light-theme');
      toggleSwitch.checked = true;
    }
  }

  // Handle toggle switch change
  toggleSwitch.addEventListener('change', (e) => {
    if (e.target.checked) {
      document.body.classList.add('light-theme');
      localStorage.setItem('theme', 'light-theme');
    } else {
      document.body.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark-theme');
    }
  });


  /* ==========================================
     2. MOBILE MENU & NAVIGATION LOGIC
     ========================================== */
  const hamburger = document.getElementById('hamburger-menu');
  const navMenu = document.getElementById('nav-menu');
  const navbar = document.getElementById('navbar');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Shrink navbar on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  /* ==========================================
     3. TYPEWRITER EFFECT
     ========================================== */
  const typewriterText = document.getElementById('typewriter-text');
  const designations = [
    "AI Engineer",
    "Machine Learning & NLP",
    "Python Developer",
    "Generative AI",
    "Data Analysis Specialist",
    "AI Automation Specialist"
  ];
  let loopNum = 0;
  let period = 2000;
  let isDeleting = false;
  let txt = '';

  function tick() {
    let i = loopNum % designations.length;
    let fullTxt = designations[i];

    if (isDeleting) {
      txt = fullTxt.substring(0, txt.length - 1);
    } else {
      txt = fullTxt.substring(0, txt.length + 1);
    }

    typewriterText.innerHTML = txt;

    let delta = 200 - Math.random() * 100;

    if (isDeleting) { delta /= 2; }

    if (!isDeleting && txt === fullTxt) {
      delta = period;
      isDeleting = true;
    } else if (isDeleting && txt === '') {
      isDeleting = false;
      loopNum++;
      delta = 500;
    }

    setTimeout(() => {
      tick();
    }, delta);
  }

  // Initialize typewriter if element exists
  if (typewriterText) {
    tick();
  }


  /* ==========================================
     4. SCROLL REVEAL & ACTIVE SCROLLSPY
     ========================================== */
  const scrollElements = document.querySelectorAll('.scroll-reveal');

  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };

  const displayScrollElement = (element) => {
    element.classList.add('active');
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.15)) {
        displayScrollElement(el);
      }
    });
  };

  // Run once initially
  handleScrollAnimation();
  window.addEventListener('scroll', () => {
    handleScrollAnimation();
  });

  // Active navigation spy
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 120) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });


  /* ==========================================
     5. PROJECT FILTERING MECHANISM
     ========================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Toggle active class on buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category');
        if (filterValue === 'all' || categories === filterValue) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });


  /* ==========================================
     6. SKILLS PROGRESS ANIMATION
     ========================================== */
  const skillBarInners = document.querySelectorAll('.skill-bar-inner');
  const skillsSection = document.getElementById('skills');

  const animateSkills = () => {
    skillBarInners.forEach(bar => {
      const targetPercent = bar.getAttribute('data-percent');
      bar.style.width = targetPercent;
    });
  };

  if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkills();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(skillsSection);
  }


  /* ==========================================
     7. STATS COUNT-UP ANIMATION
     ========================================== */
  const statsSection = document.getElementById('achievements');
  const statNumbers = document.querySelectorAll('.stat-num');

  const runStatsCounter = () => {
    statNumbers.forEach(num => {
      const target = +num.getAttribute('data-target');
      if (target === 0) {
        num.innerText = "0";
        return;
      }
      
      let count = 0;
      const speed = 2000 / target; // Total duration 2 seconds

      const updateCount = () => {
        count++;
        num.innerText = count + "+";
        
        if (count < target) {
          setTimeout(updateCount, speed);
        } else {
          num.innerText = target + "+";
        }
      };

      updateCount();
    });
  };

  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runStatsCounter();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(statsSection);
  }


  /* ==========================================
     8. CONTACT FORM SUBMISSION MOCK
     ========================================== */
  const contactForm = document.getElementById('portfolio-contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      // Use standard mailto action format
      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const subject = document.getElementById('contact-subject').value;
      const message = document.getElementById('contact-message').value;
      
      const bodyText = `Hi Waqar,\n\n${message}\n\nBest regards,\n${name}\nEmail: ${email}`;
      
      // Update form attributes to mailto with formatted values
      contactForm.action = `mailto:waqarwk583@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
    });
  }


  /* ==========================================
     9. AUTO-UPDATE COPYRIGHT YEAR
     ========================================== */
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});


/* ==========================================
   10. CERTIFICATE VIEWING MODAL
   ========================================== */
function openCertModal(title, authority, imgName, ...pdfLinks) {
  const modal = document.getElementById('cert-modal');
  const modalImg = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalAuth = document.getElementById('modal-authority');
  const actionsContainer = document.getElementById('modal-actions-container');

  // Clear previous actions
  actionsContainer.innerHTML = '';

  // Setup modal text
  modalTitle.textContent = title;
  modalAuth.textContent = authority;

  // Visual Fallback Setup
  modalImg.src = imgName;
  modalImg.alt = title;

  // Handle broken/missing image loading gracefully
  modalImg.onerror = () => {
    // Generate beautiful visual placeholder representation in case image is missing
    modalImg.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450"><rect width="600" height="450" fill="%23112240" stroke="%23D4AF37" stroke-width="8"/><rect x="20" y="20" width="560" height="410" fill="none" stroke="%23D4AF37" stroke-width="2" stroke-dasharray="5 5"/><g transform="translate(300, 150)" text-anchor="middle"><circle r="40" fill="%23D4AF37" opacity="0.2"/><path d="M-15,-10 L15,-10 L20,15 L-20,15 Z" fill="%23D4AF37"/><text y="60" fill="%23D4AF37" font-family="Outfit, sans-serif" font-weight="bold" font-size="22">${authority.toUpperCase()}</text></g><text x="300" y="270" text-anchor="middle" fill="%23ffffff" font-family="Inter, sans-serif" font-size="20" font-weight="bold">${title}</text><text x="300" y="320" text-anchor="middle" fill="%2394A3B8" font-family="Inter, sans-serif" font-size="14">Verified Credential Record</text><rect x="250" y="360" width="100" height="30" rx="15" fill="none" stroke="%23D4AF37" stroke-width="1.5"/><text x="300" y="380" text-anchor="middle" fill="%23D4AF37" font-family="Inter, sans-serif" font-weight="bold" font-size="12">COMPLETED</text></svg>`;
    modalImg.onerror = null;
  };

  // Add PDF Action links if available
  if (pdfLinks && pdfLinks.length > 0) {
    pdfLinks.forEach((pdf, index) => {
      const cleanPath = pdf.trim();
      const filename = cleanPath.split('/').pop();
      const btn = document.createElement('a');
      btn.href = cleanPath;
      btn.target = '_blank';
      btn.className = 'btn btn-primary';
      btn.style.flex = '1';
      btn.innerHTML = `<i class="fas fa-file-pdf"></i> View ${pdfLinks.length > 1 ? 'Part ' + (index + 1) : 'PDF Document'}`;
      actionsContainer.appendChild(btn);
    });
  } else {
    // If no PDF link, show a close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'btn btn-outline';
    closeBtn.style.flex = '1';
    closeBtn.textContent = 'Close Preview';
    closeBtn.onclick = closeCertModal;
    actionsContainer.appendChild(closeBtn);
  }

  // Open modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Disable scroll
}

function closeCertModal() {
  const modal = document.getElementById('cert-modal');
  modal.classList.remove('active');
  document.body.style.overflow = ''; // Re-enable scroll
}

// Global utility helper for scroll navigation
function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}
