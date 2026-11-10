document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. DYNAMIC YEAR
  // ==========================================
  const currentYearSpan = document.getElementById("currentYear");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // ==========================================
  // 2. MOBILE MENU TOGGLE
  // ==========================================
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

  // ==========================================
  // 3. HEADER BACKGROUND ON SCROLL
  // ==========================================
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  });

  // ==========================================
  // 4. TYPING TEXT EFFECT
  // ==========================================
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

  // ==========================================
  // 5. CURSOR GLOW EFFECT (DESKTOP)
  // ==========================================
  const cursorGlow = document.getElementById("cursorGlow");
  if (cursorGlow && window.innerWidth > 768) {
    window.addEventListener("mousemove", (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  }

  // ==========================================
  // 6. CLICKABLE EXPERIENCE ACCORDION
  // ==========================================
  const timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach((item) => {
    const clickableArea = item.querySelector(".clickable-experience");
    if (!clickableArea) return;

    const toggleAccordion = (e) => {
      // Don't toggle if user clicked an explicit link inside the card
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

  // ==========================================
  // 7. CONTACT FORM SUBMISSION
  // ==========================================
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name")?.value.trim() || "";
      const email = document.getElementById("email")?.value.trim() || "";
      const message = document.getElementById("message")?.value.trim() || "";

      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

      window.location.href = `mailto:jericalbar@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  // ==========================================
  // 8. FLOATING AI CHATBOT LOGIC
  // ==========================================
  const chatFloatBtn = document.getElementById("chatFloatBtn");
  const chatPopup = document.getElementById("chatPopup");
  const chatCloseBtn = document.getElementById("chatCloseBtn");
  const chatInputBar = document.getElementById("chatInputBar");
  const chatTextInput = document.getElementById("chatTextInput");
  const chatConversation = document.getElementById("chatConversation");
  const chatPills = document.querySelectorAll(".chat-pill");

  if (chatFloatBtn && chatPopup) {
    // Open / Close Toggle
    chatFloatBtn.addEventListener("click", () => {
      const isOpen = chatPopup.classList.toggle("active");
      chatPopup.setAttribute("aria-hidden", isOpen ? "false" : "true");
      if (isOpen) {
        chatTextInput?.focus();
      }
    });

    chatCloseBtn?.addEventListener("click", () => {
      chatPopup.classList.remove("active");
      chatPopup.setAttribute("aria-hidden", "true");
    });

    // Helper: Append Message Bubble
    const appendMsg = (text, sender = "bot") => {
      if (!chatConversation) return;
      const row = document.createElement("div");
      row.className = `chat-bubble-row ${sender}-row`;

      const content = document.createElement("div");
      content.className = "chat-bubble-content";
      content.innerHTML = text;

      const time = document.createElement("span");
      time.className = "chat-timestamp";
      const now = new Date();
      time.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      row.appendChild(content);
      row.appendChild(time);
      chatConversation.appendChild(row);

      chatConversation.scrollTop = chatConversation.scrollHeight;
    };

    // Chatbot Knowledge Engine (Answers based on Jeric's resume & resources)
    const answerQuestion = (query) => {
      const q = query.toLowerCase();

      // Experience & Work
      if (q.includes("experience") || q.includes("background") || q.includes("work") || q.includes("company")) {
        return "Jeric has over <strong>6 years of IT experience</strong> across four companies:<br><br>" +
               "• <strong>Supima Holding Inc</strong> (May 2023 - Present) — IT Staff (CCTV/NVR, LAN/Fiber optic cabling, NAS backups, user support).<br>" +
               "• <strong>Ultimax Building Solutions</strong> (2022 - 2023) — IT Support & company website.<br>" +
               "• <strong>Byaheros Express</strong> (2020 - 2022) — IT Associate.<br>" +
               "• <strong>ATAW Marketing</strong> (2019 - 2020) — IT Associate.<br><br>" +
               "👉 Check the <a href='#experience' style='color:#6af0c4;text-decoration:underline;'>Experience Section</a> for full details!";
      }

      // Skills, AI Tools, and Resources
      if (q.includes("skill") || q.includes("tech") || q.includes("ai") || q.includes("resource") || q.includes("claude") || q.includes("google") || q.includes("hardware") || q.includes("network") || q.includes("cctv")) {
        return "Jeric's technical skills & AI resources include:<br>" +
               "• <strong>AI & Automation</strong>: Google AI Studio, Claude, OpenAI (ChatGPT), n8n workflows.<br>" +
               "• <strong>IT & Hardware</strong>: Windows reformatting, hardware troubleshooting, POS, remote diagnostics.<br>" +
               "• <strong>Networking</strong>: LAN & Fiber optic cabling, TCP/IP, routers, DNS/DHCP.<br>" +
               "• <strong>CCTV & NAS</strong>: NVR setup, camera wiring, monthly backups.<br>" +
               "• <strong>Creative</strong>: Adobe Photoshop, Web Design.";
      }

      // Projects
      if (q.includes("project") || q.includes("portfolio")) {
        return "Jeric's featured projects are:<br>" +
               "1. <a href='ultimax-project.html' style='color:#6af0c4;text-decoration:underline;'>Ultimax Building Solutions Website</a><br>" +
               "2. <a href='ai-project.html' style='color:#6af0c4;text-decoration:underline;'>AI Social Media Workflow (n8n, Google AI Studio, Claude, OpenAI)</a><br>" +
               "3. <a href='photoshop-project.html' style='color:#6af0c4;text-decoration:underline;'>Photoshop Design Collection</a>";
      }

      // Contact & Hire
      if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("reach") || q.includes("hire") || q.includes("location") || q.includes("address")) {
        return "You can reach Jeric directly:<br>" +
               "📧 <strong>Email</strong>: <a href='mailto:jericalbar@gmail.com' style='color:#6af0c4;'>jericalbar@gmail.com</a><br>" +
               "📱 <strong>Phone</strong>: 09696488009<br>" +
               "📍 <strong>Location</strong>: Sampaloc Manila, Philippines<br>" +
               "Or send a message using the <a href='#contact' style='color:#6af0c4;text-decoration:underline;'>Contact Form</a>!";
      }

      // Resume / CV
      if (q.includes("resume") || q.includes("cv") || q.includes("download")) {
        return "📄 You can download Jeric's resume here:<br><br><a href='images/CV/CV.pdf' class='timeline-badge-link' download style='color:#04111e;background:#6af0c4;padding:6px 14px;border-radius:20px;font-weight:700;'>Download Resume (PDF)</a>";
      }

      // Education
      if (q.includes("education") || q.includes("graduate") || q.includes("college") || q.includes("degree") || q.includes("sti")) {
        return "🎓 Jeric graduated with a <strong>Bachelor of Science in Information Technology (BSIT)</strong> from <strong>STI Recto</strong> in 2018.";
      }

      // Greetings
      if (q.includes("hello") || q.includes("hi") || q.includes("kamusta") || q.includes("hey")) {
        return "Hello! How can I assist you with Jeric's portfolio today? Feel free to ask about his work history, IT skills, Google AI Studio, Claude, or how to contact him!";
      }

      // Default Response
      return "Jeric is an <strong>IT Support Specialist</strong> experienced in hardware, networking, CCTV, and AI automation (Google AI Studio, Claude, n8n). Feel free to contact him at <a href='mailto:jericalbar@gmail.com' style='color:#6af0c4;'>jericalbar@gmail.com</a>!";
    };

    // Form Submit Listener
    if (chatInputBar) {
      chatInputBar.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = chatTextInput?.value.trim() || "";
        if (!text) return;

        appendMsg(text, "user");
        if (chatTextInput) chatTextInput.value = "";

        setTimeout(() => {
          const reply = answerQuestion(text);
          appendMsg(reply, "bot");
        }, 350);
      });
    }

    // Quick Pill Buttons Listener
    chatPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        const ask = pill.getAttribute("data-ask") || "";
        let queryText = pill.textContent.trim();
        appendMsg(queryText, "user");

        setTimeout(() => {
          const reply = answerQuestion(ask);
          appendMsg(reply, "bot");
        }, 300);
      });
    });
  }
});
