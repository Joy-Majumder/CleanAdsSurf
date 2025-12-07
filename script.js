document.addEventListener('DOMContentLoaded', () => {
  setupThemeToggle();
  setupEventListeners();
  checkExtensionInstalled();
});

function setupThemeToggle() {
  // Dark mode only - apply immediately
  document.body.classList.add('dark-mode');
}

function setupEventListeners() {
  const installBtn = document.getElementById('install-btn');
  const autoInstallBtn = document.getElementById('auto-install-btn');
  const downloadBtn = document.getElementById('download-btn');
  const gitCloneBtn = document.getElementById('git-clone-btn');
  const learnMoreBtn = document.getElementById('learn-more-btn');
  const openChromeBtn = document.getElementById('open-chrome-btn');
  const modalClose = document.getElementById('modal-close');
  const modal = document.getElementById('install-modal');

  if (installBtn) {
    installBtn.addEventListener('click', () => {
      openInstallModal();
    });
  }

  if (autoInstallBtn) {
    autoInstallBtn.addEventListener('click', () => {
      handleAutoInstall();
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      downloadExtension();
    });
  }

  if (gitCloneBtn) {
    gitCloneBtn.addEventListener('click', () => {
      openGitHub();
    });
  }

  if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', () => {
      const featuresSection = document.getElementById('features');
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (openChromeBtn) {
    openChromeBtn.addEventListener('click', () => {
      openChromeWebStore();
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      closeInstallModal();
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeInstallModal();
      }
    });
  }

  setupSmoothScroll();
}

function openInstallModal() {
  const modal = document.getElementById('install-modal');
  if (modal) {
    modal.classList.remove('hidden');
  }
}

function closeInstallModal() {
  const modal = document.getElementById('install-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function handleAutoInstall() {
  openInstallModal();
  setTimeout(() => {
    openChromeWebStore();
  }, 500);
}

function openChromeWebStore() {
  const chromeWebStoreUrl = 'https://chrome.google.com/webstore/detail/cleanaadssurf/YOUR_EXTENSION_ID';
  window.open(chromeWebStoreUrl, '_blank');
  
  closeInstallModal();
}

function openGitHub() {
  const gitHubUrl = 'https://github.com/Joy-Majumder/CleanAdsSurf';
  window.open(gitHubUrl, '_blank');
}

function downloadExtension() {
  const fileName = 'CleanAdsSurf-Extension.zip';
  
  const link = document.createElement('a');
  link.href = '../'; // This would need to be replaced with actual ZIP URL
  link.download = fileName;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  showNotification('Download started! Follow the manual installation steps.', 'success');
}

function checkExtensionInstalled() {
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id) {
    chrome.runtime.sendMessage(
      { type: 'extensionCheck' },
      (response) => {
        if (response && response.installed) {
          updateUIForInstalledExtension();
        }
      }
    );
  }
}

function updateUIForInstalledExtension() {
  const installBtn = document.getElementById('install-btn');
  const autoInstallBtn = document.getElementById('auto-install-btn');
  
  if (installBtn) {
    installBtn.textContent = 'Extension Installed';
    installBtn.disabled = true;
    installBtn.style.opacity = '0.6';
    installBtn.style.cursor = 'not-allowed';
  }
  
  if (autoInstallBtn) {
    autoInstallBtn.textContent = 'Already Installed';
    autoInstallBtn.disabled = true;
    autoInstallBtn.style.opacity = '0.6';
    autoInstallBtn.style.cursor = 'not-allowed';
  }
  
  showNotification('CleanAdsSurf is installed and active!', 'success');
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  const style = document.createElement('style');
  style.textContent = `
    .notification {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      font-weight: 500;
      z-index: 2000;
      animation: slideInUp 0.3s ease;
      max-width: 300px;
    }
    
    .notification-success {
      background: #10b981;
      color: white;
    }
    
    .notification-error {
      background: #ef4444;
      color: white;
    }
    
    .notification-info {
      background: #6366f1;
      color: white;
    }
    
    @keyframes slideInUp {
      from {
        transform: translateY(100px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `;
  
  if (!document.querySelector('style[data-notification]')) {
    style.setAttribute('data-notification', 'true');
    document.head.appendChild(style);
  }
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideInUp 0.3s ease reverse';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Version info
const VERSION = '0.1.0';
const EXTENSION_NAME = 'CleanAdsSurf';

console.log(`${EXTENSION_NAME} Website v${VERSION}`);
console.log('For installation instructions, visit the Install section above.');

// Track page views
if (typeof gtag !== 'undefined') {
  window.addEventListener('load', () => {
    gtag('event', 'page_view');
  });
}
