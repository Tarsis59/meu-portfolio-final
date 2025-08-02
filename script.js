document.addEventListener("DOMContentLoaded", () => {
  const themeSwitcher = document.getElementById("theme-switcher");
  if (themeSwitcher) {
    const themeIcon = themeSwitcher.querySelector("i");
    const setTheme = (theme) => {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      themeIcon.className =
        theme === "dark" ? "ph-duotone ph-sun" : "ph-duotone ph-moon";
    };

    themeSwitcher.addEventListener("click", () => {
      const currentTheme = localStorage.getItem("theme") || "dark";
      setTheme(currentTheme === "dark" ? "light" : "dark");
    });

    setTheme(localStorage.getItem("theme") || "dark");
  }

  const langSwitcher = document.getElementById("lang-switcher");
  if (langSwitcher) {
    let currentLang = localStorage.getItem("lang") || "pt";
    let langData = {};

    async function loadLanguage(lang) {
      try {
        const response = await fetch(`lang/${lang}.json`);
        langData = await response.json();
        document.querySelectorAll("[data-translate]").forEach((el) => {
          const key = el.getAttribute("data-translate");
          if (langData[key]) el.innerHTML = langData[key];
        });
        document.documentElement.lang = lang;
        langSwitcher.textContent = lang.toUpperCase();
      } catch (error) {
        console.error("Erro ao carregar o arquivo de idioma:", error);
      }
    }

    langSwitcher.addEventListener("click", () => {
      currentLang = currentLang === "pt" ? "en" : "pt";
      loadLanguage(currentLang);
      localStorage.setItem("lang", currentLang);
    });

    loadLanguage(currentLang);
  }

  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navList = document.querySelector(".nav-list");

  if (hamburgerBtn && navList) {
    hamburgerBtn.addEventListener("click", () => {
      navList.classList.toggle("active");
      const icon = hamburgerBtn.querySelector("i");
      icon.className = navList.classList.contains("active")
        ? "ph ph-x"
        : "ph ph-list";
    });
  }

  const navLinks = document.querySelectorAll(
    ".nav-list a, .logo, .home-text .btn, .footer-logo"
  );
  const contentSections = document.querySelectorAll(".content-section");

  function showSection(sectionId) {
    contentSections.forEach((section) => {
      section.classList.toggle("active", "#" + section.id === sectionId);
    });
  }

  function setActiveLink(targetId) {
    document.querySelectorAll(".nav-list a").forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === targetId);
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href");
      if (document.querySelector(targetId)) {
        window.scrollTo(0, 0); // Volta ao topo da página ao trocar de seção
        showSection(targetId);
        setActiveLink(targetId);

        // Fecha o menu mobile se estiver aberto após um clique
        if (navList && navList.classList.contains("active")) {
          navList.classList.remove("active");
          if (hamburgerBtn) {
            hamburgerBtn.querySelector("i").className = "ph ph-list";
          }
        }
      }
    });
  });

  // Estado inicial
  showSection("#home");
  setActiveLink("#home");

  const cursorTrail = document.querySelector(".cursor-trail");
  if (cursorTrail) {
    window.addEventListener("mousemove", (e) => {
      const cursorX = e.clientX - cursorTrail.offsetWidth / 2;
      const cursorY = e.clientY - cursorTrail.offsetHeight / 2;
      cursorTrail.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    });
  }

  const magneticElements = document.querySelectorAll(".magnetic");
  const magneticStrength = 0.4;

  magneticElements.forEach((el) => {
    el.addEventListener("mousemove", function (e) {
      const pos = this.getBoundingClientRect();
      const x = e.clientX - pos.left - pos.width / 2;
      const y = e.clientY - pos.top - pos.height / 2;
      this.style.transition = "transform 0.1s ease-out";
      this.style.transform = `translate(${x * magneticStrength}px, ${
        y * magneticStrength
      }px)`;
    });
    el.addEventListener("mouseleave", function () {
      this.style.transition = "transform 0.3s ease-in-out";
      this.style.transform = "translate(0, 0)";
    });
  });
});
