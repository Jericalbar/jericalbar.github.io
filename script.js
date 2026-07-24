const header = document.querySelector(".header");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");
const reveals = document.querySelectorAll(".reveal");
const typedText = document.getElementById("typedText");
const currentYear = document.getElementById("currentYear");
const contactForm = document.getElementById("contactForm");
const cursorGlow = document.getElementById("cursorGlow");

const roles = [
  "IT Support Specialist",
  "Network Support Technician",
  "Printer & CCTV Specialist",
  "AI Automation Enthusiast"
];

let roleIndex = 0;
let characterIndex = 0;
let isDeleting = false;

function typeRole() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typedText.textContent = currentRole.slice(0, characterIndex + 1);
    characterIndex++;

    if (characterIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeRole, 1500);
      return;
    }
  } else {
    typedText.textContent = currentRole.slice(0, characterIndex - 1);
    characterIndex--;

    if (characterIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeRole, isDeleting ? 45 : 85);
}

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

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

reveals.forEach((element) => revealObserver.observe(element));

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  window.location.href = `mailto:jericalbar@gmail.com?subject=${subject}&body=${body}`;
});

document.addEventListener("mousemove", (event) => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

currentYear.textContent = new Date().getFullYear();

typeRole();

/* ============================= */
/* PROJECT SCROLL REVEAL */
/* ============================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});


/* ============================= */
/* PROJECT 3D TILT */
/* ============================= */

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  const glow = card.querySelector(".project-glow");

  card.addEventListener("mousemove", (event) => {
    const cardRect = card.getBoundingClientRect();

    const mouseX = event.clientX - cardRect.left;
    const mouseY = event.clientY - cardRect.top;

    const centerX = cardRect.width / 2;
    const centerY = cardRect.height / 2;

    const rotateX = ((mouseY - centerY) / centerY) * -5;
    const rotateY = ((mouseX - centerX) / centerX) * 5;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-10px)
    `;

    if (glow) {
      glow.style.left = `${mouseX}px`;
      glow.style.top = `${mouseY}px`;
    }
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      translateY(0)
    `;
  });
});
