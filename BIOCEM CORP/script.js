const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const detailDialog = document.querySelector(".detail-dialog");
const dialogTitle = document.querySelector("#dialog-title");

if (menuToggle && siteNav) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    siteNav.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
    siteNav.classList.toggle("is-open", !isOpen);
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

if (detailDialog instanceof HTMLDialogElement && dialogTitle) {
  document.querySelectorAll(".product-detail").forEach((button) => {
    button.addEventListener("click", () => {
      dialogTitle.textContent = button.dataset.product || "Nombre del producto";
      detailDialog.showModal();
    });
  });

  const closeButton = detailDialog.querySelector(".dialog-close");
  const dismissButton = detailDialog.querySelector(".dialog-dismiss");
  closeButton?.addEventListener("click", () => detailDialog.close());
  dismissButton?.addEventListener("click", () => detailDialog.close());
  detailDialog.addEventListener("click", (event) => {
    if (event.target === detailDialog) detailDialog.close();
  });
}

const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = String(new Date().getFullYear());

const revealTargets = document.querySelectorAll(".about-copy, .about-visual, .fact-card, .product-card, .catalog-copy");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.transitionDelay = `${(index % 4) * 70}ms`;
    revealObserver.observe(element);
  });
}

const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
const observedSections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window && navLinks.length && observedSections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("is-current", isCurrent);
        if (isCurrent) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-25% 0px -65% 0px" });

  observedSections.forEach((section) => sectionObserver.observe(section));
}