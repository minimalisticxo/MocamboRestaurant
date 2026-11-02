
/* =========================================
   MOCAMBO — WEBSITE INTERACTIONS
   Complete JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     PRELOADER
  ===================================== */

  const preloader = document.getElementById("preloader");

  function hidePreloader() {
    if (!preloader) return;

    preloader.classList.add("hide");

    setTimeout(() => {
      preloader.style.display = "none";
    }, 850);
  }

  window.addEventListener("load", hidePreloader);

  // Fallback in case the load event has already fired.
  if (document.readyState === "complete") {
    hidePreloader();
  }


  /* =====================================
     MOBILE NAVIGATION
  ===================================== */

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const navLinks = mainNav
    ? mainNav.querySelectorAll("a")
    : [];

  function closeNavigation() {
    if (!menuToggle || !mainNav) return;

    menuToggle.classList.remove("active");
    mainNav.classList.remove("open");
    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
  }

  function openNavigation() {
    if (!menuToggle || !mainNav) return;

    menuToggle.classList.add("active");
    mainNav.classList.add("open");
    document.body.classList.add("menu-open");

    menuToggle.setAttribute("aria-expanded", "true");
  }

  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.contains("open");

      if (isOpen) {
        closeNavigation();
      } else {
        openNavigation();
      }
    });

    navLinks.forEach(link => {
      link.addEventListener("click", closeNavigation);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeNavigation();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeNavigation();
      }
    });

  }


  /* =====================================
     STICKY HEADER
  ===================================== */

  const header = document.querySelector(".site-header");

  function updateHeader() {
    if (!header) return;

    if (window.scrollY > 70) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  updateHeader();


  /* =====================================
     INTERACTIVE MENU TABS
  ===================================== */

  const menuTabs = document.querySelectorAll(".menu-tab");
  const menuCategories = document.querySelectorAll(".menu-category");

  function activateMenu(categoryName) {

    menuTabs.forEach(tab => {
      const isActive =
        tab.dataset.category === categoryName;

      tab.classList.toggle("active", isActive);
      tab.setAttribute(
        "aria-selected",
        isActive ? "true" : "false"
      );

      tab.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    menuCategories.forEach(category => {
      const isActive =
        category.dataset.menu === categoryName;

      category.classList.toggle("active", isActive);
    });

  }

  menuTabs.forEach((tab, index) => {

    tab.addEventListener("click", () => {
      activateMenu(tab.dataset.category);
    });

    // Keyboard navigation between menu categories.
    tab.addEventListener("keydown", event => {

      let nextIndex = index;

      if (event.key === "ArrowRight") {
        nextIndex = (index + 1) % menuTabs.length;
      }

      if (event.key === "ArrowLeft") {
        nextIndex =
          (index - 1 + menuTabs.length) % menuTabs.length;
      }

      if (event.key === "Home") {
        nextIndex = 0;
      }

      if (event.key === "End") {
        nextIndex = menuTabs.length - 1;
      }

      if (nextIndex !== index) {
        event.preventDefault();

        menuTabs[nextIndex].focus();

        activateMenu(
          menuTabs[nextIndex].dataset.category
        );
      }

    });

  });


  /* =====================================
     SCROLL REVEAL ANIMATIONS
  ===================================== */

  const revealElements = document.querySelectorAll(
    ".section-padding > *, " +
    ".story-image, " +
    ".story-content > *, " +
    ".signature-content > *, " +
    ".gallery-card, " +
    ".location-visual"
  );

  revealElements.forEach(element => {
    element.classList.add("reveal");
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          observer.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  /* =====================================
     SMOOTH INTERNAL NAVIGATION
  ===================================== */

  const internalLinks = document.querySelectorAll(
    'a[href^="#"]'
  );

  internalLinks.forEach(link => {

    link.addEventListener("click", event => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      closeNavigation();

      target.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches ? "auto" : "smooth",
        block: "start"
      });

    });

  });


  /* =====================================
     GALLERY IMAGE LOAD HANDLING
  ===================================== */

  const galleryImages = document.querySelectorAll(
    ".gallery-card img, .intro-image-wrap img"
  );

  galleryImages.forEach(image => {

    image.addEventListener("error", () => {
      image.style.opacity = "0.25";
    });

  });


  /* =====================================
     CURRENT YEAR
  ===================================== */

  const yearElements = document.querySelectorAll(
    ".current-year"
  );

  yearElements.forEach(element => {
    element.textContent = new Date().getFullYear();
  });


  /* =====================================
     ACCESSIBILITY: REDUCED MOTION
  ===================================== */

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  if (prefersReducedMotion.matches) {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  console.log(
    "Mocambo website initialized successfully."
  );

});
