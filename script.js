document.addEventListener("DOMContentLoaded", () => {
  // 1. TYPING TEXT ANIMATION
  const typedTextEl = document.getElementById("typedText");
  const words = [
    "IT Support Specialist",
    "Network Support Technician",
    "CCTV & Hardware Tech",
    "AI Automation Enthusiast"
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 90;
  const backSpeed = 45;
  const pauseDuration = 1800;

  function typeEffect() {
    if (!typedTextEl) return;
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typedTextEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? backSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      delay = pauseDuration;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }

    setTimeout(typeEffect, delay);
  }
  typeEffect();

  // 2. MOBILE NAVIGATION MENU
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navLinkItems = document.querySelectorAll(".nav-link");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("open");
      document.body.classList.toggle("menu-open");
    });

    navLinkItems.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("open");
        document.body.classList.remove("menu-open");
      });
    });
  }

  // 3. HEADER SCROLL SHADOW
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  });

  // 4. TIMELINE ACCORDION (Click to Expand / Collapse)
  const timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      // Don't trigger toggle if user clicks an internal link
      if (e.target.tagName.toLowerCase() === "a") return;

      const wasActive = item.classList.contains("active");
      item.classList.toggle("active");
      item.setAttribute("aria-expanded", !wasActive);
    });

    // Keyboard Accessibility (Enter or Space to toggle)
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const wasActive = item.classList.contains("active");
        item.classList.toggle("active");
        item.setAttribute("aria-expanded", !wasActive);
      }
    });
  });

  // 5. CONTACT FORM HANDLER (Mailto)
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name")?.value || "";
      const email = document.getElementById("email")?.value || "";
      const message = document.getElementById("message")?.value || "";

      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      );

      window.location.href = `mailto:jericalbar@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  // 6. DYNAMIC CURRENT YEAR
  const currentYearEl = document.getElementById("currentYear");
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // 7. BACKGROUND CURSOR GLOW
  const cursorGlow = document.getElementById("cursorGlow");
  window.addEventListener("mousemove", (e) => {
    if (cursorGlow) {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    }
  });

  // 8. CUSTOM NEON CURSOR (Dot + Glow Ring)
  const cursorDot = document.getElementById("cursorDot");
  const cursorRing = document.getElementById("cursorRing");

  if (cursorDot && cursorRing) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function renderCursor() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    const hoverTargets = document.querySelectorAll(
      "a, button, input, textarea, .gallery-item, .clickable-experience, .project-card-link, .timeline-item"
    );

    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", () => cursorRing.classList.add("cursor-hover"));
      el.addEventListener("mouseleave", () => cursorRing.classList.remove("cursor-hover"));
    });
  }
});
