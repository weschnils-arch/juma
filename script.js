// Burger menu
const burger = document.querySelector(".burger");
const mobileNav = document.getElementById("mobile-nav");

if (burger && mobileNav) {
  burger.addEventListener("click", () => {
    const isOpen = burger.classList.toggle("is-open");
    mobileNav.classList.toggle("is-open", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      burger.classList.remove("is-open");
      mobileNav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    });
  });
}

// Scroll animations with enhanced timing
const animated = document.querySelectorAll("[data-animate]");

if ("IntersectionObserver" in window && animated.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    }
  );

  animated.forEach((el) => observer.observe(el));
} else {
  animated.forEach((el) => el.classList.add("is-visible"));
}

// Parallax effect for hero background
const heroMedia = document.querySelector(".hero-media img");
if (heroMedia) {
  let ticking = false;
  
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector(".hero");
        if (hero) {
          const heroHeight = hero.offsetHeight;
          if (scrolled < heroHeight) {
            const parallaxValue = scrolled * 0.2;
            heroMedia.style.transform = `translateY(${parallaxValue}px)`;
          }
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

// Smooth header shadow on scroll
const header = document.querySelector(".site-header");
if (header) {
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      header.style.boxShadow = "0 10px 40px rgba(0, 0, 0, 0.3)";
    } else {
      header.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.3)";
    }
  });
}

// FAQ Accordion
const faqQuestions = document.querySelectorAll(".faq-question");
faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const faqItem = question.closest(".faq-item");
    const isOpen = faqItem.classList.contains("is-open");
    
    // Close all other items
    document.querySelectorAll(".faq-item").forEach((item) => {
      if (item !== faqItem) {
        item.classList.remove("is-open");
        item.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      }
    });
    
    // Toggle current item
    faqItem.classList.toggle("is-open");
    question.setAttribute("aria-expanded", String(!isOpen));
  });
});

// Slideshow functionality
const slideshowContainer = document.querySelector(".slideshow-container");
if (slideshowContainer) {
  const slides = slideshowContainer.querySelectorAll(".slideshow-slide");
  const prevArrow = slideshowContainer.querySelector(".slideshow-arrow-prev");
  const nextArrow = slideshowContainer.querySelector(".slideshow-arrow-next");
  let currentSlide = 0;
  let slideshowInterval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  function startSlideshow() {
    slideshowInterval = setInterval(nextSlide, 4000); // 4 seconds per picture
  }

  function stopSlideshow() {
    clearInterval(slideshowInterval);
  }

  // Arrow navigation
  if (nextArrow) {
    nextArrow.addEventListener("click", () => {
      nextSlide();
      stopSlideshow();
      startSlideshow();
    });
  }

  if (prevArrow) {
    prevArrow.addEventListener("click", () => {
      prevSlide();
      stopSlideshow();
      startSlideshow();
    });
  }

  // Pause on hover
  slideshowContainer.addEventListener("mouseenter", stopSlideshow);
  slideshowContainer.addEventListener("mouseleave", startSlideshow);

  // Initialize
  if (slides.length > 0) {
    showSlide(0);
    startSlideshow();
  }
}

// #region agent log - Debug icon/headline alignment
// Measure actual positions of icons and headlines to diagnose alignment issues
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      const serviceHeaders = document.querySelectorAll('.service-header');
      serviceHeaders.forEach((header, idx) => {
        const icon = header.querySelector('.service-icon');
        const headline = header.querySelector('h3');
        if (icon && headline) {
          const iconRect = icon.getBoundingClientRect();
          const headlineRect = headline.getBoundingClientRect();
          const iconCenterY = iconRect.top + iconRect.height / 2;
          const headlineCenterY = headlineRect.top + headlineRect.height / 2;
          const offset = headlineCenterY - iconCenterY;
          const computedIcon = window.getComputedStyle(icon);
          const computedHeadline = window.getComputedStyle(headline);
          const computedHeader = window.getComputedStyle(header);
          fetch('http://127.0.0.1:7242/ingest/e246a15a-406e-4e49-bb42-d32783f2b993',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:165',message:'Service header alignment measurement',data:{index:idx,iconTop:iconRect.top,iconBottom:iconRect.bottom,iconHeight:iconRect.height,iconCenterY,headlineTop:headlineRect.top,headlineBottom:headlineRect.bottom,headlineHeight:headlineRect.height,headlineCenterY,offset,iconMarginTop:computedIcon.marginTop,headlineLineHeight:computedHeadline.lineHeight,headlineFontSize:computedHeadline.fontSize,headlineFontFamily:computedHeadline.fontFamily,headerAlignItems:computedHeader.alignItems,iconAlignSelf:computedIcon.alignSelf},timestamp:Date.now(),sessionId:'debug-session',runId:'comparison',hypothesisId:'H1'})}).catch(()=>{});
        }
      });
    }, 100);
  });
} else {
  setTimeout(() => {
    const serviceHeaders = document.querySelectorAll('.service-header');
    serviceHeaders.forEach((header, idx) => {
      const icon = header.querySelector('.service-icon');
      const headline = header.querySelector('h3');
      if (icon && headline) {
        const iconRect = icon.getBoundingClientRect();
        const headlineRect = headline.getBoundingClientRect();
        const iconCenterY = iconRect.top + iconRect.height / 2;
        const headlineCenterY = headlineRect.top + headlineRect.height / 2;
          const offset = headlineCenterY - iconCenterY;
          const computedIcon = window.getComputedStyle(icon);
          const computedHeadline = window.getComputedStyle(headline);
          const computedHeader = window.getComputedStyle(header);
          fetch('http://127.0.0.1:7242/ingest/e246a15a-406e-4e49-bb42-d32783f2b993',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:185',message:'Service header alignment measurement',data:{index:idx,iconTop:iconRect.top,iconBottom:iconRect.bottom,iconHeight:iconRect.height,iconCenterY,headlineTop:headlineRect.top,headlineBottom:headlineRect.bottom,headlineHeight:headlineRect.height,headlineCenterY,offset,iconMarginTop:computedIcon.marginTop,headlineLineHeight:computedHeadline.lineHeight,headlineFontSize:computedHeadline.fontSize,headlineFontFamily:computedHeadline.fontFamily,headerAlignItems:computedHeader.alignItems,iconAlignSelf:computedIcon.alignSelf},timestamp:Date.now(),sessionId:'debug-session',runId:'comparison',hypothesisId:'H1'})}).catch(()=>{});
      }
    });
  }, 100);
}
// #endregion

// #region agent log - Process section icon/headline alignment debugging
setTimeout(() => {
  document.querySelectorAll('.process-step').forEach((step, idx) => {
    const icon = step.querySelector('.process-icon');
    const headline = step.querySelector('.process-header h3');
    if (icon && headline) {
      const iconRect = icon.getBoundingClientRect();
      const headlineRect = headline.getBoundingClientRect();
      const iconCenterY = iconRect.top + iconRect.height / 2;
      const headlineCenterY = headlineRect.top + headlineRect.height / 2;
      const offset = Math.abs(iconCenterY - headlineCenterY);
      const computedIcon = window.getComputedStyle(icon);
      const computedHeadline = window.getComputedStyle(headline);
      const computedHeader = window.getComputedStyle(step.querySelector('.process-header'));
      fetch('http://127.0.0.1:7242/ingest/e246a15a-406e-4e49-bb42-d32783f2b993',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:210',message:'Process step alignment measurement',data:{index:idx,iconTop:iconRect.top,iconBottom:iconRect.bottom,iconHeight:iconRect.height,iconCenterY,headlineTop:headlineRect.top,headlineBottom:headlineRect.bottom,headlineHeight:headlineRect.height,headlineCenterY,offset,iconMarginTop:computedIcon.marginTop,headlineLineHeight:computedHeadline.lineHeight,headlineFontSize:computedHeadline.fontSize,headlineFontFamily:computedHeadline.fontFamily,headerAlignItems:computedHeader.alignItems,iconAlignSelf:computedIcon.alignSelf},timestamp:Date.now(),sessionId:'debug-session',runId:'comparison',hypothesisId:'H1'})}).catch(()=>{});
    }
  });
}, 100);
// #endregion
