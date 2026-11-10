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
      // Don't toggle if an internal link was clicked
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

  // ==========================================
  // 9. AI ASSISTANT CHATBOT LOGIC
  // ==========================================
  const chatbotToggle = document.getElementById("chatbotToggle");
  const chatbotWindow = document.getElementById("chatbotWindow");
  const chatbotClose = document.getElementById("chatbotClose");
  const chatbotForm = document.getElementById("chatbotForm");
  const chatbotInput = document.getElementById("chatbotInput");
  const chatbotMessages = document.getElementById("chatbotMessages");
  const quickPills = document.querySelectorAll(".quick-pill");

  if (chatbotToggle && chatbotWindow) {
    // Open/Close Chat Window
    const toggleChat = () => {
      const isOpen = chatbotWindow.classList.toggle("open");
      chatbotWindow.setAttribute("aria-hidden", isOpen ? "false" : "true");
      if (isOpen) {
        chatbotInput?.focus();
        const unreadDot = chatbotToggle.querySelector(".chat-unread-dot");
        if (unreadDot) unreadDot.style.display = "none";
      }
    };

    chatbotToggle.addEventListener("click", toggleChat);
    chatbotClose?.addEventListener("click", () => {
      chatbotWindow.classList.remove("open");
      chatbotWindow.setAttribute("aria-hidden", "true");
    });

    // Helper: Add Message to Chat
    const addMessage = (text, sender = "bot") => {
      const msgDiv = document.createElement("div");
      msgDiv.className = `chat-message ${sender}-message`;

      const bubble = document.createElement("div");
      bubble.className = "chat-bubble";
      bubble.innerHTML = text;

      const time = document.createElement("span");
      time.className = "chat-time";
      const now = new Date();
      time.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      msgDiv.appendChild(bubble);
      msgDiv.appendChild(time);
      chatbotMessages.appendChild(msgDiv);

      // Auto scroll to latest
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    };

    // Chatbot Knowledge Engine (Instant client-side response matching Jeric's resume)
    const getBotResponse = (query) => {
      const q = query.toLowerCase();

      if (q.includes("experience") || q.includes("background") || q.includes("work") || q.includes("company") || q.includes("companies")) {
        return "Jeric has over <strong>6 years of IT experience</strong> across four companies:<br><br>" +
               "• <strong>Supima Holding Inc</strong> (May 2023 - Present) — IT Staff (CCTV/NVR, LAN/Fiber optic cabling, NAS backups, user support).<br>" +
               "• <strong>Ultimax Building Solutions</strong> (2022 - 2023) — IT Support & website.<br>" +
               "• <strong>Byaheros Express</strong> (2020 - 2022) — IT Associate.<br>" +
               "• <strong>ATAW Marketing</strong> (2019 - 2020) — IT Associate.<br><br>" +
               "👉 You can check the <a href='#experience' style='color:#6af0c4;text-decoration:underline;'>Experience Section</a> for full bullet points!";
      }

      if (q.includes("supima")) {
        return "At <strong>Supima Holding Inc</strong> (May 2023 – Present), Jeric works as IT Staff handling:<br>" +
               "• CCTV system & NVR setup<br>" +
               "• LAN and fiber optic cabling<br>" +
               "• Monthly NAS server backups<br>" +
               "• Desktop reformatting, remote assistance, and hardware support.";
      }

      if (q.includes("ultimax")) {
        return "At <strong>Ultimax Building Solutions Inc</strong> (Apr 2022 – May 2023), Jeric managed desktop reformatting, CCTV maintenance, printer/telephone troubleshooting, and built their official website! <a href='ultimax-project.html' style='color:#6af0c4;text-decoration:underline;'>View Ultimax Project Gallery →</a>";
      }

      if (q.includes("skill") || q.includes("tech") || q.includes("hardware") || q.includes("network") || q.includes("cctv")) {
        return "Jeric's core technical skills include:<br>" +
               "• <strong>IT & Desktop Support</strong>: Windows OS, reformatting, hardware diagnosis, AnyDesk/remote tools.<br>" +
               "• <strong>Networking</strong>: LAN, Fiber optic cabling, TCP/IP, routers, DNS, DHCP.<br>" +
               "• <strong>CCTV & Security</strong>: NVR setup, camera wiring, backup management.<br>" +
               "• <strong>Creative & Automation</strong>: Adobe Photoshop, n8n workflows, and OpenAI.";
      }

      if (q.includes("project") || q.includes("portfolio")) {
        return "Jeric's featured projects are:<br>" +
               "1. <a href='ultimax-project.html' style='color:#6af0c4;text-decoration:underline;'>Ultimax Building Solutions Website</a> (Company website)<br>" +
               "2. <a href='ai-project.html' style='color:#6af0c4;text-decoration:underline;'>AI Social Media Workflow</a> (n8n + OpenAI automation)<br>" +
               "3. <a href='photoshop-project.html' style='color:#6af0c4;text-decoration:underline;'>Photoshop Design Collection</a> (Branding & food graphics)";
      }

      if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("reach") || q.includes("hire") || q.includes("location") || q.includes("address")) {
        return "You can get in touch with Jeric directly:<br>" +
               "📧 <strong>Email</strong>: <a href='mailto:jericalbar@gmail.com' style='color:#6af0c4;'>jericalbar@gmail.com</a><br>" +
               "📱 <strong>Phone</strong>: 09696488009<br>" +
               "📍 <strong>Location</strong>: Sampaloc Manila, Philippines<br>" +
               "Or drop a message down in the <a href='#contact' style='color:#6af0c4;text-decoration:underline;'>Contact Form</a>!";
      }

      if (q.includes("resume") || q.includes("cv") || q.includes("download")) {
        return "📄 You can download Jeric's official resume right here: <br><br><a href='images/CV/CV.pdf' class='timeline-badge-link' download style='color:#04111e;background:#6af0c4;padding:6px 14px;border-radius:20px;font-weight:700;'>Download Resume (PDF)</a>";
      }

      if (q.includes("education") || q.includes("graduate") || q.includes("college") || q.includes("school") || q.includes("degree")) {
        return "🎓 Jeric graduated with a <strong>Bachelor of Science in Information Technology (BSIT)</strong> from <strong>STI Recto</strong> in 2018.";
      }

      if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("kamusta")) {
        return "Hello! How can I assist you with Jeric's profile today? Feel free to ask about his technical experience, projects, or how to get in touch!";
      }

      // Default fallback
      return "Thanks for asking! Jeric specializes in <strong>IT Support, Networking, CCTV systems, and AI Automation</strong>.<br><br>" +
             "You can reach him at <a href='mailto:jericalbar@gmail.com' style='color:#6af0c4;'>jericalbar@gmail.com</a> or use the quick buttons above to explore!";
    };

    // Form Submit Handler
    chatbotForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const userText = chatbotInput.value.trim();
      if (!userText) return;

      addMessage(userText, "user");
      chatbotInput.value = "";

      // Simulate a quick AI thinking indicator
      setTimeout(() => {
        const botResponse = getBotResponse(userText);
        addMessage(botResponse, "bot");
      }, 400);
    });

    // Quick Pill Buttons
    quickPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        const prompt = pill.getAttribute("data-prompt");
        if (!prompt) return;

        addMessage(prompt, "user");
        setTimeout(() => {
          const botResponse = getBotResponse(prompt);
          addMessage(botResponse, "bot");
        }, 350);
      });
    });
  }
});
