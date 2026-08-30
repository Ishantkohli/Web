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

// ================= PINK MULTILINGUAL WELCOME SCREEN =================
document.addEventListener("DOMContentLoaded", () => {
  const welcomeScreen = document.getElementById("welcome-screen");
  if (!welcomeScreen) return;

  document.body.classList.add("welcome-active");

  const languages = [
    { name: "English", word: "Welcome", sub: "Ishant Kohli Site" },
    { name: "Hindi • हिंदी", word: "स्वागत है", sub: "ईशांत कोहली साइट" },
    { name: "Chinese • 中文", word: "欢迎", sub: "柯利 (Ishant Kohli) 网站" },
    { name: "Korean • 한국어", word: "환영합니다", sub: "이샨트 코흘리 사이트" },
    { name: "French • Français", word: "Bienvenue", sub: "Site de Ishant Kohli" },
    { name: "German • Deutsch", word: "Willkommen", sub: "Ishant Kohli Website" },
    { name: "Japanese • 日本語", word: "ようこそ", sub: "イシャント・コーリ サイト" },
    { name: "Spanish • Español", word: "Bienvenido", sub: "Sitio de Ishant Kohli" },
    { name: "Italian • Italiano", word: "Benvenuto", sub: "Sito di Ishant Kohli" },
    { name: "Russian • Русский", word: "Добро пожаловать", sub: "Сайт Ишанта Кохли" }
  ];

  const wordEl = document.getElementById("welcome-word");
  const subEl = document.getElementById("welcome-subtext");
  const badgeEl = document.getElementById("welcome-lang-badge");
  const progressEl = document.getElementById("welcome-progress");

  let currentIndex = 0;
  const total = languages.length;

  const updateLanguage = (index) => {
    if (wordEl && subEl) {
      wordEl.classList.add("changing");
      subEl.classList.add("changing");

      setTimeout(() => {
        const item = languages[index];
        if (wordEl) wordEl.textContent = item.word;
        if (subEl) subEl.textContent = item.sub;
        if (badgeEl) badgeEl.textContent = item.name;

        wordEl.classList.remove("changing");
        subEl.classList.remove("changing");
      }, 120);
    }

    if (progressEl) {
      const percentage = ((index + 1) / total) * 100;
      progressEl.style.width = `${percentage}%`;
    }
  };

  // Set initial state (English)
  updateLanguage(0);

  const runStep = () => {
    // English stays for 1000ms (1 second), subsequent languages stay for 380ms
    const delay = currentIndex === 0 ? 1000 : 380;

    setTimeout(() => {
      currentIndex++;
      if (currentIndex < total) {
        updateLanguage(currentIndex);
        runStep();
      } else {
        setTimeout(() => {
          welcomeScreen.style.opacity = "0";
          welcomeScreen.style.transform = "scale(1.06)";
          document.body.classList.remove("welcome-active");
          setTimeout(() => {
            welcomeScreen.remove();
          }, 800);
        }, 400);
      }
    }, delay);
  };

  runStep();
});

// ================= UNIVERSAL GYROSCOPE & MOTION MATRIX ENGINE =================
const GyroEngine = (function () {
  let targetGyroX = 0;
  let targetGyroY = 0;
  let currentGyroX = 0;
  let currentGyroY = 0;

  let hasOrientationData = false;
  let hasMotionData = false;

  // LAYER 1: W3C Device Orientation Engine (Standard iOS & Android)
  function handleOrientation(e) {
    if (e.beta === null || e.gamma === null) return;

    hasOrientationData = true;

    let orientationAngle = 0;
    if (typeof window.orientation !== "undefined") {
      orientationAngle = window.orientation;
    } else if (screen.orientation && typeof screen.orientation.angle !== "undefined") {
      orientationAngle = screen.orientation.angle;
    }

    let beta = e.beta;   // Pitch: front-to-back tilt (-180 to 180 deg)
    let gamma = e.gamma; // Roll: left-to-right tilt (-90 to 90 deg)

    // Standard phone holding angle baseline: ~45 deg upright pitch
    // Map tilt relative to natural holding angle without premature clamping
    let normBeta = (beta - 45) / 22; // Pitch offset
    let normGamma = gamma / 22;      // Roll offset

    normBeta = Math.max(-1.8, Math.min(1.8, normBeta));
    normGamma = Math.max(-1.8, Math.min(1.8, normGamma));

    let rawX = 0;
    let rawY = 0;

    switch (orientationAngle) {
      case 90: // Landscape Left
        rawX = normBeta;
        rawY = -normGamma;
        break;
      case -90:
      case 270: // Landscape Right
        rawX = -normBeta;
        rawY = normGamma;
        break;
      case 180: // Upside down
        rawX = -normGamma;
        rawY = -normBeta;
        break;
      default: // Portrait (0)
        rawX = normGamma;
        rawY = normBeta;
        break;
    }

    targetGyroX = rawX;
    targetGyroY = rawY;
  }

  // LAYER 2: DeviceMotion Accelerometer Engine (Fallback for restricted Android ROMs)
  function handleMotion(e) {
    if (hasOrientationData) return;
    if (!e.accelerationIncludingGravity) return;

    const acc = e.accelerationIncludingGravity;
    if (acc.x === null || acc.y === null) return;

    hasMotionData = true;

    let orientationAngle = 0;
    if (typeof window.orientation !== "undefined") {
      orientationAngle = window.orientation;
    } else if (screen.orientation && typeof screen.orientation.angle !== "undefined") {
      orientationAngle = screen.orientation.angle;
    }

    let normX = Math.max(-1.8, Math.min(1.8, -acc.x / 3.5));
    let normY = Math.max(-1.8, Math.min(1.8, (acc.y - 5.0) / 3.5));

    if (orientationAngle === 90) {
      targetGyroX = normY;
      targetGyroY = normX;
    } else if (orientationAngle === -90 || orientationAngle === 270) {
      targetGyroX = -normY;
      targetGyroY = -normX;
    } else {
      targetGyroX = normX;
      targetGyroY = normY;
    }
  }

  function init() {
    window.addEventListener("deviceorientation", handleOrientation, true);
    window.addEventListener("deviceorientationabsolute", handleOrientation, true);
    window.addEventListener("devicemotion", handleMotion, true);

    // iOS 13+ permission trigger
    if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
      const requestIOSPermission = () => {
        DeviceOrientationEvent.requestPermission()
          .then((state) => {
            if (state === "granted") {
              window.addEventListener("deviceorientation", handleOrientation, true);
            }
          })
          .catch(() => {});
      };
      window.addEventListener("touchstart", requestIOSPermission, { once: true, passive: true });
      window.addEventListener("click", requestIOSPermission, { once: true, passive: true });
    }
  }

  init();

  return {
    getOffsets: function () {
      currentGyroX += (targetGyroX - currentGyroX) * 0.1;
      currentGyroY += (targetGyroY - currentGyroY) * 0.1;

      return {
        x: currentGyroX,
        y: currentGyroY,
        active: hasOrientationData || hasMotionData
      };
    }
  };
})();

// ================= THREE.JS HYPER-INTERACTIVE 3D BACKGROUND =================
(function init3DScene() {
  const canvas = document.getElementById("bg3d");
  if (!canvas || typeof THREE === "undefined") return;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  
  // Hardware-accelerated WebGL renderer with power preference and mediump precision for mobile GPUs
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: !isMobile, // Enable MSAA antialiasing on desktop, performance optimization on mobile
    powerPreference: "high-performance",
    precision: isMobile ? "mediump" : "highp"
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  const maxDPR = isMobile ? 1.0 : Math.min(window.devicePixelRatio, 2);
  renderer.setPixelRatio(maxDPR);

  // 1. Diverse 3D Geometries Array
  const shapesGroup = new THREE.Group();
  scene.add(shapesGroup);

  const materials = [
    new THREE.MeshBasicMaterial({ color: 0xff2a85, wireframe: true, transparent: true, opacity: 0.4 }),
    new THREE.MeshBasicMaterial({ color: 0x00e7ff, wireframe: true, transparent: true, opacity: 0.38 }),
    new THREE.MeshBasicMaterial({ color: 0x39ff14, wireframe: true, transparent: true, opacity: 0.32 }),
    new THREE.MeshBasicMaterial({ color: 0xff85c0, wireframe: true, transparent: true, opacity: 0.38 }),
    new THREE.MeshBasicMaterial({ color: 0xffd700, wireframe: true, transparent: true, opacity: 0.35 })
  ];

  const geometries = [
    new THREE.TorusKnotGeometry(1.3, 0.35, isMobile ? 32 : 80, 10),
    new THREE.IcosahedronGeometry(1.6, 1),
    new THREE.DodecahedronGeometry(1.5, 0),
    new THREE.OctahedronGeometry(1.4, 0),
    new THREE.TetrahedronGeometry(1.5, 0),
    new THREE.TorusGeometry(1.8, 0.25, 10, isMobile ? 32 : 80),
    new THREE.SphereGeometry(1.4, 10, 10),
    new THREE.CylinderGeometry(0.8, 1.4, 2.2, 8),
    new THREE.ConeGeometry(1.2, 2.2, 8)
  ];

  const meshCount = isMobile ? 12 : 32; // Optimized for 120 FPS mobile GPU frame pacing
  const meshes = [];

  for (let i = 0; i < meshCount; i++) {
    const geom = geometries[i % geometries.length];
    const mat = materials[i % materials.length];
    const mesh = new THREE.Mesh(geom, mat);

    mesh.position.x = (Math.random() - 0.5) * 28;
    mesh.position.y = (Math.random() - 0.5) * 65;
    mesh.position.z = (Math.random() - 0.5) * 35 - 8;

    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;

    const scale = 0.55 + Math.random() * 0.7;
    mesh.scale.set(scale, scale, scale);

    mesh.userData = {
      rotX: (Math.random() - 0.5) * 0.012,
      rotY: (Math.random() - 0.5) * 0.012,
      floatSpeed: 0.001 + Math.random() * 0.002,
      initialY: mesh.position.y
    };

    shapesGroup.add(mesh);
    meshes.push(mesh);
  }

  // 2. Dynamic 3D Particle Starfield
  const particleCount = isMobile ? 600 : 2000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const color1 = new THREE.Color(0xff2a85);
  const color2 = new THREE.Color(0x00e7ff);
  const color3 = new THREE.Color(0x39ff14);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 55;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 45;

    const rand = Math.random();
    const mixedColor = rand < 0.5 ? color1.clone().lerp(color2, rand * 2) : color2.clone().lerp(color3, (rand - 0.5) * 2);
    colors[i * 3] = mixedColor.r;
    colors[i * 3 + 1] = mixedColor.g;
    colors[i * 3 + 2] = mixedColor.b;
  }

  const particleGeom = new THREE.BufferGeometry();
  particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleMat = new THREE.PointsMaterial({
    size: isMobile ? 0.14 : 0.09,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
  });

  const particleSystem = new THREE.Points(particleGeom, particleMat);
  scene.add(particleSystem);

  // 3. Click Shockwave Explosions
  const shockwaves = [];

  window.addEventListener("click", (e) => {
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
    const mouseY = -(e.clientY / window.innerHeight - 0.5) * 15;

    const waveGeom = new THREE.RingGeometry(0.1, 0.2, 24);
    const waveMat = new THREE.MeshBasicMaterial({
      color: Math.random() > 0.5 ? 0xff2a85 : 0x00e7ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9
    });
    const wave = new THREE.Mesh(waveGeom, waveMat);
    wave.position.set(mouseX, mouseY - currentScrollY * 0.005, 0);

    scene.add(wave);
    shockwaves.push({ mesh: wave, scale: 1, maxScale: 10 + Math.random() * 6 });
  }, { passive: true });

  camera.position.z = 10;

  // Passive Scroll & Mouse Event Listeners for 60-120 FPS
  let targetMouseX = 0;
  let targetMouseY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;
  let targetScrollY = 0;
  let currentScrollY = 0;
  let scrollSpeed = 0;
  let lastScrollY = window.scrollY;

  // Mouse tracking disabled to keep camera steady on hover
  window.addEventListener("mousemove", (e) => {
    targetMouseX = 0;
    targetMouseY = 0;
  }, { passive: true });

  window.addEventListener("scroll", () => {
    targetScrollY = window.scrollY;
    const deltaY = Math.abs(targetScrollY - lastScrollY);
    scrollSpeed = deltaY * 0.04;
    lastScrollY = targetScrollY;
  }, { passive: true });

  // Render Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    // Pause WebGL rendering on mobile while welcome screen is active for 100% smooth welcome text transitions
    if (isMobile && document.body.classList.contains("welcome-active")) {
      return;
    }

    const elapsedTime = clock.getElapsedTime();

    // Decay scroll speed warp
    scrollSpeed *= 0.92;

    // Smooth Lerp Mouse & Scroll
    currentMouseX += (targetMouseX - currentMouseX) * 0.06;
    currentMouseY += (targetMouseY - currentMouseY) * 0.06;
    currentScrollY += (targetScrollY - currentScrollY) * 0.09;

    // Get smoothed Gyro Offsets from device orientation or accelerometer motion
    const gyro = GyroEngine.getOffsets();

    // Combine Mouse & Gyro inputs seamlessly with continuous pitch/roll response
    const combinedX = currentMouseX + gyro.x * 3.0;
    const combinedY = currentMouseY + gyro.y * 3.0;

    // Camera perspective movement with device tilt
    camera.position.x = combinedX * 1.5;
    camera.position.y = -currentScrollY * 0.008 + (-combinedY * 1.5);
    camera.position.z = 10 + Math.sin(currentScrollY * 0.002) * 2 + scrollSpeed * 0.3;

    // Spatial rotational parallax on phone tilt
    camera.rotation.z = -gyro.x * 0.22;
    camera.rotation.x = gyro.y * 0.18;

    camera.lookAt(0, -currentScrollY * 0.008, 0);

    // 3D Background Group Rotation with Gyro reaction
    shapesGroup.rotation.y = currentScrollY * 0.0015 + elapsedTime * 0.02 + gyro.x * 0.5;
    shapesGroup.rotation.x = currentScrollY * 0.0008 + elapsedTime * 0.01 + gyro.y * 0.35;
    shapesGroup.position.x = gyro.x * 2.5;
    shapesGroup.position.y = -gyro.y * 2.5;

    // Individual 3D mesh float & spin
    for (let i = 0; i < meshes.length; i++) {
      const mesh = meshes[i];
      mesh.rotation.x += mesh.userData.rotX * (1 + scrollSpeed * 2);
      mesh.rotation.y += mesh.userData.rotY * (1 + scrollSpeed * 2);
      mesh.position.y = mesh.userData.initialY + Math.sin(elapsedTime * 2 + mesh.position.x) * 0.45;
    }

    // Particle rotation
    particleSystem.rotation.y = currentScrollY * 0.001 + elapsedTime * 0.02 + scrollSpeed * 0.05 + gyro.x * 0.2;
    particleSystem.rotation.x = elapsedTime * 0.01 + gyro.y * 0.15;

    // Expand shockwaves
    for (let i = shockwaves.length - 1; i >= 0; i--) {
      const sw = shockwaves[i];
      sw.scale += 0.4;
      sw.mesh.scale.set(sw.scale, sw.scale, sw.scale);
      sw.mesh.material.opacity = 1 - sw.scale / sw.maxScale;

      if (sw.scale >= sw.maxScale) {
        scene.remove(sw.mesh);
        sw.mesh.geometry.dispose();
        sw.mesh.material.dispose();
        shockwaves.splice(i, 1);
      }
    }

    renderer.render(scene, camera);
  }

  animate();

  // Resize Handler with Debounce
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }, 100);
  }, { passive: true });
})();

// ================= INTERACTIVE 3D CARD TILT ENGINE (DISABLED FOR STABILITY) =================
(function init3DTilt() {
  // Tilt engine disabled to prevent hover glitches
})();
