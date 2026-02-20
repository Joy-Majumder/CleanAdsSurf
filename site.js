const CONFIG = {
  zipPath: "public/CleanAdsSurf-Extension.zip",
  githubRepo: "https://github.com/Joy-Majumder/CleanAdsSurf",
  webStoreUrl: ""
};

document.addEventListener("DOMContentLoaded", () => {
  setupYear();
  setupMobileMenu();
  setupActions();
  markActiveNav();
  setupModalEsc();
});

function setupYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}

function setupMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  if (!menuToggle || !navLinks) {
    return;
  }

  menuToggle.addEventListener("click", () => {
    const next = !navLinks.classList.contains("open");
    navLinks.classList.toggle("open", next);
    menuToggle.setAttribute("aria-expanded", String(next));
  });

  navLinks.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupActions() {
  bindClick("install-btn", () => scrollToId("install"));
  bindClick("download-btn", downloadZip);
  bindClick("git-clone-btn", () => openExternal(CONFIG.githubRepo));
  bindClick("auto-install-btn", openWebStoreOrModal);

  bindClick("open-chrome-btn", () => {
    openExternal("https://support.google.com/chrome/a/answer/2714278");
    closeModal();
  });
  bindClick("close-modal-btn", closeModal);
  bindClick("modal-close", closeModal);

  const modal = document.getElementById("install-modal");
  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  }
}

function bindClick(id, handler) {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener("click", handler);
  }
}

function scrollToId(id) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function downloadZip() {
  const link = document.createElement("a");
  link.href = CONFIG.zipPath;
  link.download = "CleanAdsSurf-Extension.zip";
  document.body.appendChild(link);
  link.click();
  link.remove();
  showToast("ZIP download started.", "success");
}

function openWebStoreOrModal() {
  if (CONFIG.webStoreUrl && CONFIG.webStoreUrl.startsWith("http")) {
    openExternal(CONFIG.webStoreUrl);
    return;
  }
  openModal();
}

function openExternal(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function openModal() {
  const modal = document.getElementById("install-modal");
  if (modal) {
    modal.classList.remove("hidden");
  }
}

function closeModal() {
  const modal = document.getElementById("install-modal");
  if (modal) {
    modal.classList.add("hidden");
  }
}

function setupModalEsc() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}

function markActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href") || "";
    if (href === path || (path === "index.html" && href.startsWith("#"))) {
      a.classList.add("active");
    }
  });
}

function showToast(message, kind = "info") {
  const existing = document.querySelector(".toast");
  if (existing) {
    existing.remove();
  }

  const toast = document.createElement("div");
  toast.className = `toast ${kind}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2400);
}
