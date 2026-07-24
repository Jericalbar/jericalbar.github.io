/* REMARK: MAIN PORTFOLIO JAVASCRIPT - navigation, typing, scroll reveal, contact form, at cursor glow */

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

/* REMARK: Mga job title para sa typing animation. */
const roles = [
  "IT Support Specialist",
  "Network Support Technician",
  "Printer & CCTV Specialist",
  "AI Automation Enthusiast"
];

let roleIndex = 0;
let characterIndex = 0;
let isDeleting = false;

/* REMARK: Type at delete effect ng job titles. */
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

/* REMARK: Mobile navigation menu control. */
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

/* REMARK: Header at active menu habang nag-scroll. */
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

/* REMARK: Fade-in animation ng sections. */
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

/* REMARK: Contact form na nagbubukas ng default email app. */
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

/* REMARK: Mouse-following background glow. */
document.addEventListener("mousemove", (event) => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

currentYear.textContent = new Date().getFullYear();

typeRole();
