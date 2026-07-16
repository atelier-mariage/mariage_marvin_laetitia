document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-header nav");

  function updateHeader() {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 50);
    }
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  if (menu && nav) {
    menu.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");

      document.body.classList.toggle("menu-open", isOpen);
      menu.setAttribute("aria-expanded", String(isOpen));
      menu.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
      menu.textContent = isOpen ? "×" : "☰";
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        document.body.classList.remove("menu-open");
        menu.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-label", "Ouvrir le menu");
        menu.textContent = "☰";
      });
    });
  }

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("visible"));
  }

  const weddingDate = new Date("2026-08-08T16:00:00+02:00");

  function updateCountdown() {
    const difference = Math.max(0, weddingDate.getTime() - Date.now());

    const values = {
      days: Math.floor(difference / 86400000),
      hours: Math.floor((difference / 3600000) % 24),
      minutes: Math.floor((difference / 60000) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };

    Object.entries(values).forEach(([key, value]) => {
      const element = document.getElementById(key);

      if (element) {
        element.textContent = String(value).padStart(key === "days" ? 3 : 2, "0");
      }
    });
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  const petalLayer = document.querySelector(".petal-layer");

  function generatePetals() {
    if (!petalLayer) {
      return;
    }

    petalLayer.replaceChildren();

    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const count = mobile ? 32 : 46;

    for (let index = 0; index < count; index += 1) {
      const petal = document.createElement("span");
      const duration = 8 + Math.random() * 11;
      const size = 8 + Math.random() * 12;

      petal.className = "petal";
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.setProperty("--size", `${size}px`);
      petal.style.setProperty("--duration", `${duration}s`);
      petal.style.setProperty("--delay", `${-Math.random() * duration}s`);
      petal.style.setProperty("--opacity", `${0.5 + Math.random() * 0.48}`);
      petal.style.setProperty("--scale", `${0.65 + Math.random() * 1}`);
      petal.style.setProperty("--sway", `${20 + Math.random() * 55}px`);
      petal.style.setProperty("--drift", `${-90 + Math.random() * 180}px`);

      petalLayer.appendChild(petal);
    }
  }

  generatePetals();

  let resizeTimer;

  window.addEventListener(
    "resize",
    () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(generatePetals, 250);
    },
    { passive: true }
  );

  const musicButton = document.getElementById("musicButton");
  const music = document.getElementById("music");
  const musicState = document.getElementById("musicState");

  if (musicButton && music) {
    music.volume = 0.35;

    musicButton.addEventListener("click", async () => {
      try {
        if (music.paused) {
          await music.play();
          musicButton.classList.add("playing");
          musicButton.setAttribute("aria-label", "Mettre la musique en pause");

          if (musicState) {
            musicState.textContent = "Pause";
          }
        } else {
          music.pause();
          musicButton.classList.remove("playing");
          musicButton.setAttribute("aria-label", "Activer la musique");

          if (musicState) {
            musicState.textContent = "Musique";
          }
        }
      } catch (error) {
        console.error("Impossible de lire le fichier audio.", error);

        if (musicState) {
          musicState.textContent = "Ajoutez le MP3";
        }
      }
    });
  }
});
