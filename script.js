const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const folderBox = document.getElementById("folderBox");
const projectGallery = document.getElementById("projectGallery");
const backToTop = document.getElementById("backToTop");
const typingText = document.getElementById("typingText");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

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
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, letterIndex--);
  } else {
    typingText.textContent = currentWord.substring(0, letterIndex++);
  }

  if (!isDeleting && letterIndex === currentWord.length + 1) {
    isDeleting = true;
    setTimeout(typeEffect, 1200);
    return;
  }

  if (isDeleting && letterIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeEffect, isDeleting ? 60 : 100);
}

typeEffect();

folderBox.addEventListener("click", () => {
  projectGallery.classList.toggle("show");
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

const sections = document.querySelectorAll(".section, .timeline-item, .skill-card, .project-card, .service-card");

sections.forEach(section => {
  section.classList.add("fade-in");
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.15
});

sections.forEach(section => {
  observer.observe(section);
});
