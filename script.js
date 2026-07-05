const loader = document.getElementById("loader");
const typingText = document.getElementById("typingText");
const themeToggle = document.getElementById("themeToggle");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const cursorGlow = document.querySelector(".cursor-glow");

window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hidden"), 700);
});

document.getElementById("year").textContent = new Date().getFullYear();

const phrases = [
  "IT Support Specialist",
  "Network Troubleshooter",
  "Printer Technician",
  "CCTV Support Technician",
  "Remote Helpdesk Assistant"
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (!deleting) {
    typingText.textContent = currentPhrase.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentPhrase.length) {
      deleting = true;
      setTimeout(typeEffect, 1300);
      return;
    }
  } else {
    typingText.textContent = currentPhrase.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typeEffect, deleting ? 45 : 80);
}

typeEffect();

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => observer.observe(el));

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  themeToggle.textContent = isLight ? "☀️" : "🌙";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
  themeToggle.textContent = "☀️";
}

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

document.addEventListener("mousemove", (event) => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

function sendMessage(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  window.location.href = `mailto:your-email@example.com?subject=${subject}&body=${body}`;
}
