/**
 * Portfolio Show More Functionality
 * Handles the show/hide behavior for portfolio items
 */

class PortfolioShowMore {
  constructor() {
    this.button = null;
    this.hiddenItems = [];
    this.isLoaded = false;
    this.init();
  }

  init() {
    // Wait for DOM to be ready and components to load
    const checkElements = () => {
      this.button = document.getElementById("portfolio-show-more");
      this.hiddenItems = document.querySelectorAll(".portfolio-item-hidden");

      if (this.button && this.hiddenItems.length > 0) {
        this.setupEvents();
        this.isLoaded = true;
        console.log(
          "Portfolio show more initialized with",
          this.hiddenItems.length,
          "hidden items"
        );
      } else {
        // Wait a bit more for components to load
        setTimeout(checkElements, 100);
      }
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", checkElements);
    } else {
      checkElements();
    }
  }

  setupEvents() {
    if (!this.button) return;

    this.button.addEventListener("click", (e) => {
      e.preventDefault();
      this.toggleItems();
    });
  }

  toggleItems() {
    if (!this.button || this.hiddenItems.length === 0) return;

    const isShowing = this.button.textContent.includes("Show More");

    // Add loading state
    this.button.classList.add("loading");

    if (isShowing) {
      this.showItems();
    } else {
      this.hideItems();
    }

    // Remove loading state after animation
    setTimeout(() => {
      this.button.classList.remove("loading");
    }, 600);
  }

  showItems() {
    // Show hidden items
    this.hiddenItems.forEach((item) => {
      item.classList.add("show");
    });

    // Wait a moment for DOM changes, then refresh Isotope
    setTimeout(() => {
      const portfolioContainer = document.querySelector(".isotope-container");
      if (portfolioContainer && window.portfolioIsotope) {
        // Force Isotope to detect new items and recalculate layout
        window.portfolioIsotope.reloadItems();
        window.portfolioIsotope.layout();

        // Also trigger imagesLoaded to ensure proper layout after images load
        if (typeof imagesLoaded !== "undefined") {
          const imgLoad = imagesLoaded(portfolioContainer);
          imgLoad.on("done", () => {
            window.portfolioIsotope.layout();
          });
        }
      }

      // Trigger AOS animation if available
      if (typeof AOS !== "undefined") {
        AOS.refresh();
      }
    }, 100);

    // Update button text and icon
    setTimeout(() => {
      this.button.innerHTML = `
                <i class="bi bi-dash-circle me-2"></i>
                Show Less Projects
            `;
    }, 200);
  }

  hideItems() {
    // Hide items
    this.hiddenItems.forEach((item) => {
      item.classList.remove("show");
    });

    // Wait a moment for DOM changes, then refresh Isotope
    setTimeout(() => {
      const portfolioContainer = document.querySelector(".isotope-container");
      if (portfolioContainer && window.portfolioIsotope) {
        // Force Isotope to recalculate layout
        window.portfolioIsotope.reloadItems();
        window.portfolioIsotope.layout();
      }
    }, 100);

    // Update button text and icon
    setTimeout(() => {
      this.button.innerHTML = `
                <i class="bi bi-plus-circle me-2"></i>
                Show More Projects
            `;
    }, 200);

    // Scroll back to portfolio section
    setTimeout(() => {
      const portfolioSection = document.getElementById("portfolio");
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 300);
  }

  // Public method to refresh if needed
  refresh() {
    this.hiddenItems = document.querySelectorAll(".portfolio-item-hidden");
    if (typeof AOS !== "undefined") {
      AOS.refresh();
    }
  }

  // Public method to get stats
  getStats() {
    return {
      isLoaded: this.isLoaded,
      hiddenItemsCount: this.hiddenItems.length,
      buttonExists: !!this.button,
    };
  }
}

// Initialize when script loads
const portfolioShowMore = new PortfolioShowMore();

// Export for potential external use
window.PortfolioShowMore = portfolioShowMore;
