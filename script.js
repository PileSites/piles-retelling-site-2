document.documentElement.classList.add("js");

const siteConfig = window.PILES_CONFIG;
if (siteConfig) {
  const colorVariables = {
    paper: "--paper",
    ink: "--ink",
    muted: "--muted",
    blue: "--blue",
    signal: "--signal",
    night: "--night"
  };
  Object.entries(colorVariables).forEach(([key, variable]) => {
    document.documentElement.style.setProperty(variable, siteConfig.brandColors[key]);
  });
  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    link.href = `mailto:${siteConfig.email}`;
  });
  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    link.href = `tel:${siteConfig.telephone}`;
  });
}

const heroVisual = document.querySelector(".hero-visual");
if (heroVisual) {
  const heroModes = heroVisual.querySelectorAll(".hero-mode");
  const heroCaption = heroVisual.querySelector("[data-hero-caption]");

  heroModes.forEach((mode) => {
    mode.addEventListener("click", () => {
      heroModes.forEach((item) => {
        const selected = item === mode;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      heroVisual.dataset.mode = mode.dataset.heroMode;
      heroCaption.textContent = mode.dataset.caption;
    });
  });
}

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
      menuButton.focus();
    }
  });
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const processTabs = document.querySelectorAll(".process-tab");
const processPanel = document.querySelector("#process-detail");
if (processTabs.length && processPanel) {
  processTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      processTabs.forEach((item) => {
        item.classList.remove("is-active");
        item.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      processPanel.classList.add("is-changing");
      window.setTimeout(() => processPanel.classList.remove("is-changing"), 100);
      processPanel.setAttribute("aria-labelledby", tab.id);
      processPanel.querySelector(".process-mark").textContent = String(index + 1).padStart(2, "0");
      processPanel.querySelector("h3").textContent = tab.dataset.title;
      processPanel.querySelector("p:last-child").textContent = tab.dataset.copy;
    });
    tab.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      processTabs[(index + direction + processTabs.length) % processTabs.length].focus();
    });
  });
}

const capabilityButtons = document.querySelectorAll(".capability-list .capability[data-title]");
const capabilityPreview = document.querySelector(".capability-preview");
if (capabilityButtons.length && capabilityPreview) {
  const capabilityTitle = capabilityPreview.querySelector("[data-capability-title]");
  const capabilityDescription = capabilityPreview.querySelector("[data-capability-description]");
  const capabilityLink = capabilityPreview.querySelector("[data-capability-link]");

  capabilityButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      capabilityButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      capabilityPreview.dataset.active = String(index + 1);
      capabilityTitle.textContent = button.dataset.title;
      capabilityDescription.textContent = button.dataset.description;
      capabilityLink.href = button.dataset.link;
      capabilityLink.setAttribute("aria-label", `Explore ${button.dataset.title}`);
    });
  });
}

const ventureSteps = document.querySelectorAll(".venture-step");
const ventureInsight = document.querySelector(".venture-insight");
if (ventureSteps.length && ventureInsight) {
  const ventureTitle = ventureInsight.querySelector("[data-venture-title]");
  const ventureCopy = ventureInsight.querySelector("[data-venture-copy]");

  ventureSteps.forEach((step) => {
    step.addEventListener("click", () => {
      ventureSteps.forEach((item) => {
        item.setAttribute("aria-pressed", String(item === step));
      });
      ventureInsight.classList.add("is-changing");
      ventureTitle.textContent = step.dataset.stepTitle;
      ventureCopy.textContent = step.dataset.stepCopy;
      window.setTimeout(() => ventureInsight.classList.remove("is-changing"), 120);
    });
  });
}

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".case-card");
if (filterButtons.length && projectCards.length) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.filter;
      filterButtons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      projectCards.forEach((card) => {
        card.hidden = category !== "all" && card.dataset.category !== category;
      });
    });
  });
}

const inquiryForm = document.querySelector("#inquiry-form");
if (inquiryForm) {
  const requestedCategory = new URLSearchParams(window.location.search).get("inquiry");
  if (requestedCategory) {
    const categoryField = inquiryForm.elements.namedItem("category");
    if (categoryField && Array.from(categoryField.options).some((option) => option.value === requestedCategory || option.text === requestedCategory)) {
      categoryField.value = requestedCategory;
    }
  }

  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!inquiryForm.reportValidity()) return;

    const values = new FormData(inquiryForm);
    const subject = `Website inquiry: ${values.get("category")}`;
    const body = [
      `Name: ${values.get("name")}`,
      `Organization: ${values.get("organization") || "Not provided"}`,
      `Email: ${values.get("email")}`,
      `Phone: ${values.get("phone") || "Not provided"}`,
      `Category: ${values.get("category")}`,
      `Budget: ${values.get("budget") || "Not provided"}`,
      "",
      "Project description:",
      values.get("description")
    ].join("\n");
    const feedback = document.querySelector("#form-feedback");
    feedback.textContent = "Your email app will open with this inquiry ready to send. Nothing is stored on this website.";
    window.location.href = `mailto:${siteConfig ? siteConfig.email : "pilesretelling@gmail.com"}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
