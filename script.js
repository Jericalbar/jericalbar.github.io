/*
  Portfolio Website
  Owner/Name: Jeric Albar
  File: script.js
  Remarks: JavaScript for typing animation, current year, and contact form email action.
*/

// TYPING TEXT ELEMENT: Gets the span where the animated job title appears
const typingText = document.getElementById("typingText");

// FOOTER YEAR: Automatically updates the copyright year
document.getElementById("year").textContent = new Date().getFullYear();

// TYPING PHRASES: List of job titles shown in the hero section
const phrases = [
  "IT Support Specialist",
  "Network Troubleshooter",
  "Printer Technician",
  "CCTV Support Technician",
  "Remote Helpdesk Assistant"
];

// TYPING VARIABLES: Track current phrase, letter position, and delete mode
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

// TYPING FUNCTION: Types and deletes each phrase smoothly
function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (!deleting) {
    typingText.textContent = currentPhrase.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentPhrase.length) {
      deleting = true;
      setTimeout(typeEffect, 1200);
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

// START TYPING EFFECT: Runs the typing animation when the page loads
typeEffect();

// CONTACT FORM FUNCTION: Opens the visitor email app using mailto
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
