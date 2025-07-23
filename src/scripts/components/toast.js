/**
 * Custom Toast Notification System
 * Provides elegant toast notifications without external dependencies
 */

class Toast {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    this.container = document.getElementById("toast-container");
    if (!this.container) {
      // Create container if it doesn't exist
      this.container = document.createElement("div");
      this.container.id = "toast-container";
      this.container.className = "toast-container";
      document.body.appendChild(this.container);
    }
  }

  show(message, type = "info", duration = 5000) {
    const toast = this.createToast(message, type, duration);
    this.container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add("show");
    });

    // Auto remove
    setTimeout(() => {
      this.remove(toast);
    }, duration);

    return toast;
  }

  createToast(message, type, duration) {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    const icon = this.getIcon(type);

    toast.innerHTML = `
      <div class="toast-content">
        <div class="toast-icon">
          <i class="${icon}"></i>
        </div>
        <div class="toast-message">${message}</div>
        <button class="toast-close" onclick="window.toastInstance.remove(this.closest('.toast'))">
          <i class="bi bi-x"></i>
        </button>
      </div>
      <div class="toast-progress">
        <div class="toast-progress-bar" style="transition-duration: ${duration}ms;"></div>
      </div>
    `;

    // Start progress bar animation
    requestAnimationFrame(() => {
      const progressBar = toast.querySelector(".toast-progress-bar");
      progressBar.style.transform = "translateX(0)";
    });

    return toast;
  }

  getIcon(type) {
    const icons = {
      success: "bi bi-check-circle-fill",
      error: "bi bi-exclamation-circle-fill",
      warning: "bi bi-exclamation-triangle-fill",
      info: "bi bi-info-circle-fill",
    };
    return icons[type] || icons.info;
  }

  remove(toast) {
    if (!toast || !toast.parentNode) return;

    toast.style.transform = "translateX(100%)";
    toast.style.opacity = "0";

    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }

  success(message, duration = 5000) {
    return this.show(message, "success", duration);
  }

  error(message, duration = 7000) {
    return this.show(message, "error", duration);
  }

  warning(message, duration = 6000) {
    return this.show(message, "warning", duration);
  }

  info(message, duration = 5000) {
    return this.show(message, "info", duration);
  }

  clear() {
    if (this.container) {
      this.container.innerHTML = "";
    }
  }
}

// Create global instance
window.toastInstance = new Toast();

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = Toast;
}

// Global shorthand functions
window.toast = {
  success: (message, duration) =>
    window.toastInstance.success(message, duration),
  error: (message, duration) => window.toastInstance.error(message, duration),
  warning: (message, duration) =>
    window.toastInstance.warning(message, duration),
  info: (message, duration) => window.toastInstance.info(message, duration),
  show: (message, type, duration) =>
    window.toastInstance.show(message, type, duration),
  clear: () => window.toastInstance.clear(),
};
