const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const folderBox = document.getElementById("folderBox");
const projectGallery = document.getElementById("projectGallery");
const backToTop = document.getElementById("backToTop");
const typingText = document.getElementById("typingText");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.textContent = isOpen ? "✕" : "☰";
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.textContent = "☰";
    });
  });
}

const words = [
  "IT Support Specialist",
  "Printer Troubleshooting Expert",
  "Network Support Technician",
  "CCTV Support Specialist",
  "Remote Technical Assistant"
];

let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingText) return;

  const currentWord = words[wordIndex];
  typingText.textContent = currentWord.substring(0, letterIndex);

  if (!isDeleting) {
    letterIndex += 1;

    if (letterIndex > currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    letterIndex -= 1;

    if (letterIndex < 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      letterIndex = 0;
    }
  }

  setTimeout(typeEffect, isDeleting ? 55 : 95);
}

typeEffect();

if (folderBox && projectGallery) {
  folderBox.addEventListener("click", () => {
    const isOpen = projectGallery.classList.toggle("show");
    folderBox.setAttribute("aria-expanded", String(isOpen));

    const folderIcon = folderBox.querySelector(".folder-icon");
    if (folderIcon) folderIcon.textContent = isOpen ? "📂" : "📁";
  });
}

if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 400 ? "block" : "none";
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const animatedElements = document.querySelectorAll(
  ".section-title, .card, .stat-card, .timeline-item, .skill-card, .folder-box, .project-card, .service-card, .contact-card"
);

animatedElements.forEach((element) => element.classList.add("fade-in"));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  animatedElements.forEach((element) => observer.observe(element));
} else {
  animatedElements.forEach((element) => element.classList.add("show"));
}
