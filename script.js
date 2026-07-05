const typingText = document.getElementById("typingText");

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

typeEffect();

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
