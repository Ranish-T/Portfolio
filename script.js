function scrollToAbout() {
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Navbar hamburger menu toggle
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarLinks = document.querySelector('.navbar-links');

if (navbarToggle && navbarLinks) {
  navbarToggle.addEventListener('click', () => {
    const expanded = navbarToggle.getAttribute('aria-expanded') === 'true';
    navbarToggle.setAttribute('aria-expanded', !expanded);
    navbarLinks.classList.toggle('open');
  });
  // Close menu on link click (mobile)
  navbarLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navbarLinks.classList.remove('open');
      navbarToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Smooth scrolling for nav links
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      e.preventDefault();
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Active section highlight on scroll
const sections = [
  { id: 'home', link: null },
  { id: 'about', link: null },
  { id: 'projects', link: null },
  { id: 'tech-stack', link: null },
  { id: 'contact', link: null }
];
sections.forEach(section => {
  section.link = document.querySelector(`.nav-link[href="#${section.id}"]`);
});

function setActiveNav() {
  let scrollPos = window.scrollY + 120;
  let current = sections[0];
  for (let section of sections) {
    const el = document.getElementById(section.id);
    if (el && el.offsetTop <= scrollPos) {
      current = section;
    }
  }
  sections.forEach(section => {
    if (section.link) section.link.classList.remove('active');
  });
  if (current.link) current.link.classList.add('active');
}
window.addEventListener('scroll', setActiveNav);
window.addEventListener('DOMContentLoaded', setActiveNav);

// Section scroll animations using IntersectionObserver
const animatedSections = [
  document.querySelector('#home'),
  document.querySelector('#about'),
  document.querySelector('#projects'),
  document.querySelector('#tech-stack'),
  document.querySelector('#contact'),
  document.querySelector('.site-footer')
].filter(Boolean);

window.addEventListener('DOMContentLoaded', () => {
  animatedSections.forEach(section => {
    section.classList.add('section-animate');
  });

  const observer = new window.IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-animated');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  animatedSections.forEach(section => {
    observer.observe(section);
  });
});

// Clipboard functionality for contact details
function copyToClipboard(value, textSpanId, copiedText) {
  navigator.clipboard.writeText(value).then(() => {
    const textSpan = document.getElementById(textSpanId);
    const btn = textSpan.closest('.copy-btn');
    const original = textSpan.dataset.original || textSpan.textContent;

    // Store original text if not already stored
    if (!textSpan.dataset.original) {
      textSpan.dataset.original = original;
    }

    textSpan.textContent = copiedText;
    btn.classList.add('copied');

    setTimeout(() => {
      textSpan.textContent = textSpan.dataset.original;
      btn.classList.remove('copied');
    }, 1500);
  });
}

// Toast notification system
function showToast(message) {
  // Remove existing toast if any
  const existingToast = document.querySelector('.toast-notification');
  if (existingToast) {
    existingToast.remove();
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'toast-notification fixed top-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
  toast.textContent = message;
  
  // Add to page
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.transform = 'translateX(full)';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 300);
  }, 3000);
}

 
