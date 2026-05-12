const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

const header = $(".site-header");
const offsetTop = (el) =>
  el.getBoundingClientRect().top +
  window.scrollY -
  (header?.offsetHeight || 0) -
  6;

// smooth scroll for internal links
$$('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href").slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    window.scrollTo({ top: offsetTop(target), behavior: "smooth" });
  });
});

// MOBILE MENU TOGGLE
const toggleBtn = document.querySelector(".menu-toggle");
const nav = document.getElementById("primaryNav");

if (toggleBtn && nav) {
  // start closed on mobile
  nav.hidden = true;
  toggleBtn.setAttribute("aria-expanded", "false");

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = toggleBtn.getAttribute("aria-expanded") === "true";
    const nowOpen = !isOpen;

    toggleBtn.setAttribute("aria-expanded", String(nowOpen));
    nav.hidden = !nowOpen;
    document.body.classList.toggle("no-scroll", nowOpen);
  });

  document.addEventListener("click", (e) => {
    if (nav.hidden) return;
    if (!nav.contains(e.target) && e.target !== toggleBtn) {
      toggleBtn.setAttribute("aria-expanded", "false");
      nav.hidden = true;
      document.body.classList.remove("no-scroll");
    }
  });

  nav.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", () => {
      toggleBtn.setAttribute("aria-expanded", "false");
      nav.hidden = true;
      document.body.classList.remove("no-scroll");
    });
  });
}

// REVEAL ON SCROLL
const reveals = $$(".reveal");
if ("IntersectionObserver" in window && reveals.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -5% 0px" }
  );

  reveals.forEach((el) => io.observe(el));
}


// MUSIC SCROLL (prevent page scroll while inside list)
const musicScroll = document.querySelector(".music-scroll");
if (musicScroll) {
  musicScroll.addEventListener(
    "wheel",
    function (e) {
      const atTop = musicScroll.scrollTop === 0;
      const atBottom =
        musicScroll.scrollHeight - musicScroll.clientHeight ===
        musicScroll.scrollTop;
      if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) {
        e.stopPropagation();
      }
    },
    { passive: true }
  );
}

// WHATSAPP CONTACT FROM FORM
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    const whatsappMessage =
      "*New Contact Form Submission*%0A%0A" +
      `*Name:* ${name}%0A` +
      `*Email:* ${email}%0A` +
      `*Message:* ${message}`;

    const phoneNumber = "919220037676";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    window.open(whatsappURL, "_blank");
    // optional: let the form submit to Web3Forms as well; do not call e.preventDefault()
  });
}

// THEME TOGGLE (dark / light)
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

if (themeToggle) {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    root.classList.add("light-theme");
    themeToggle.querySelector(".theme-icon").textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    const isLight = root.classList.toggle("light-theme");
    themeToggle.querySelector(".theme-icon").textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
}

// SCROLL TO TOP BUTTON
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (!scrollTopBtn) return;
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ================= NEON COLOR CYCLE =================

// ================= LOADER CONTROL (NO AUDIO) =================
window.addEventListener("load", () => {

  const LOADER_DURATION = 2000; // 2 seconds

  setTimeout(() => {
    const loader = document.getElementById("page-loader");
    if (!loader) return;

    loader.style.transition = "opacity .6s ease, transform .6s ease";
    loader.style.opacity = "0";
    loader.style.transform = "scale(1.05)";

    setTimeout(() => {
      loader.remove();
      document.body.classList.remove("loading");
    }, 350);

  }, LOADER_DURATION);
});