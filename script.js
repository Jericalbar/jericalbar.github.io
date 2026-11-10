document.addEventListener("DOMContentLoaded", () => {
  // 1. DYNAMIC YEAR
  const currentYearSpan = document.getElementById("currentYear");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // 2. MOBILE MENU TOGGLE
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-link");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("open");
      document.body.classList.toggle("menu-open");
    });

    navItems.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("open");
        document.body.classList.remove("menu-open");
      });
    });
  }

  // 3. HEADER BACKGROUND ON SCROLL
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  });

  // 4. TYPING TEXT EFFECT
  const typedText = document.getElementById("typedText");
  const words = [
    "IT Support Specialist",
    "Network Support Specialist",
    "Systems & CCTV Support",
    "AI Automation Enthusiast"
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!typedText) return;
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typedText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 45 : 90;

    if (!isDeleting && charIndex === currentWord.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }

    setTimeout(typeEffect, delay);
  }
  typeEffect();

  // 5. SCROLL REVEAL ANIMATIONS
  const reveals = document.querySelectorAll(".reveal");
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.88;
    reveals.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < triggerBottom) {
        element.classList.add("show");
      }
    });
  };
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  // 6. CURSOR GLOW EFFECT (DESKTOP)
  const cursorGlow = document.getElementById("cursorGlow");
  if (cursorGlow && window.innerWidth > 768) {
    window.addEventListener("mousemove", (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  }

  // 7. CLICKABLE EXPERIENCE ACCORDION
  const timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach((item) => {
    const clickableArea = item.querySelector(".clickable-experience");
    if (!clickableArea) return;

    const toggleAccordion = (e) => {
      // Do not collapse if the user clicked an explicit link inside the card
      if (e.target.closest("a")) return;

      const isExpanded = item.classList.toggle("active");
      item.setAttribute("aria-expanded", isExpanded ? "true" : "false");
    };

    clickableArea.addEventListener("click", toggleAccordion);

    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleAccordion(e);
      }
    });
  });

  // 8. CONTACT FORM SUBMISSION
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

      window.location.href = `mailto:jericalbar@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});
