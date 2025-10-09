// Smooth scroll for navigation links
document.querySelectorAll('nav a, .hero-buttons a').forEach(link => {
  link.addEventListener('click', e => {
    if (link.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        document.querySelector('nav').classList.remove('active');
      }
    }
  });
});

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Intersection Observer for fade-in animations
const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('nav') && !e.target.closest('.menu-toggle')) {
    nav.classList.remove('active');
  }
});

// Contact form handling with professional alerts
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      
      // Show loading state
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      // Get form data
      const formData = new FormData(this);
      
      // Send form data using FormSubmit
      fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          // Show success modal after successful send
          showAlertModal('success', 'Thank you! Your message has been sent successfully. I will get back to you soon.');
          contactForm.reset();
        } else {
          showAlertModal('error', 'There was a problem sending your message. Please try again or email me directly at islchigozie@gmail.com.');
        }
      })
      .catch(error => {
        showAlertModal('error', 'There was a problem sending your message. Please check your connection and try again.');
      })
      .finally(() => {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      });
    });
  }
});

// Alert Modal Functions
function showAlertModal(type, message) {
  const modal = document.getElementById('alertModal');
  const alertIcon = modal.querySelector('.alert-icon');
  const alertTitle = modal.querySelector('.alert-title');
  const alertMessage = document.getElementById('alertMessage');
  
  // Set icon and colors based on type
  if (type === 'success') {
    alertIcon.className = 'alert-icon success';
    alertIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
    alertTitle.textContent = 'Success!';
    alertTitle.style.color = '#10b981';
  } else {
    alertIcon.className = 'alert-icon error';
    alertIcon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
    alertTitle.textContent = 'Oops!';
    alertTitle.style.color = '#ef4444';
  }
  
  alertMessage.textContent = message;
  modal.classList.add('active');
  
  // Close modal when clicking outside
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeAlertModal();
    }
  });
}

function closeAlertModal() {
  const modal = document.getElementById('alertModal');
  modal.classList.remove('active');
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeAlertModal();
  }
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    if (this.classList.contains('primary') || this.classList.contains('secondary')) {
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
      
      setTimeout(() => {
        this.innerHTML = originalText;
      }, 1500);
    }
  });
});


// Tab functionality for project pages
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanes = document.querySelectorAll('.tab-pane');

if (tabButtons.length > 0) {
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');
      
      // Remove active class from all buttons and panes
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));
      
      // Add active class to clicked button and corresponding pane
      button.classList.add('active');
      document.getElementById(targetTab).classList.add('active');
    });
  });
}

// Lightbox functionality for project screenshots
const initLightbox = () => {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <span class="lightbox-close">&times;</span>
      <img src="" alt="" class="lightbox-image">
      <div class="lightbox-caption"></div>
      <button class="lightbox-prev">&#10094;</button>
      <button class="lightbox-next">&#10095;</button>
    </div>
  `;
  document.body.appendChild(lightbox);
  
  const images = document.querySelectorAll('.screenshot-item img');
  let currentIndex = 0;
  
  const openLightbox = (index) => {
    currentIndex = index;
    const image = images[currentIndex];
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const caption = lightbox.querySelector('.lightbox-caption');
    
    lightboxImage.src = image.src;
    caption.textContent = image.nextElementSibling.querySelector('h4').textContent;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  };
  
  const showNext = () => {
    currentIndex = (currentIndex + 1) % images.length;
    openLightbox(currentIndex);
  };
  
  const showPrev = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    openLightbox(currentIndex);
  };
  
  // Add click events to images
  images.forEach((image, index) => {
    image.addEventListener('click', () => openLightbox(index));
  });
  
  // Lightbox controls
  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-next').addEventListener('click', showNext);
  lightbox.querySelector('.lightbox-prev').addEventListener('click', showPrev);
  
  // Close on background click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
};

// Initialize lightbox when DOM is loaded
document.addEventListener('DOMContentLoaded', initLightbox);