/**
 * Portfolio Component Script
 * Handles portfolio filtering and gallery functionality
 */

class PortfolioComponent {
  constructor() {
    this.isInitialized = false;
    this.isotope = null;
    this.filters = [];
  }

  init() {
    if (this.isInitialized) return;

    // Wait for Isotope library to be available
    if (typeof Isotope === "undefined") {
      setTimeout(() => this.init(), 100);
      return;
    }

    this.setupFilters();
    this.initializeIsotope();
    this.setupGallery();
    this.isInitialized = true;

    console.log("Portfolio component initialized");
  }

  setupFilters() {
    const filterContainer = document.querySelector(".portfolio-filters");
    if (!filterContainer) return;

    const filterItems = filterContainer.querySelectorAll("li[data-filter]");

    filterItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();

        // Remove active class from all filters
        filterItems.forEach((filter) =>
          filter.classList.remove("filter-active")
        );

        // Add active class to clicked filter
        item.classList.add("filter-active");

        // Get filter value
        const filterValue = item.getAttribute("data-filter");

        // Apply filter
        if (this.isotope) {
          this.isotope.arrange({ filter: filterValue });
        }
      });
    });
  }

  initializeIsotope() {
    const portfolioContainer = document.querySelector(".isotope-container");
    if (!portfolioContainer) return;

    // Initialize Isotope
    this.isotope = new Isotope(portfolioContainer, {
      itemSelector: ".portfolio-item",
      layoutMode: "masonry",
      masonry: {
        columnWidth: ".portfolio-item",
      },
      percentPosition: true,
    });

    // Make isotope instance globally accessible for show more functionality
    window.portfolioIsotope = this.isotope;

    // Layout after images load
    const imgLoad = imagesLoaded(portfolioContainer);
    imgLoad.on("done", () => {
      if (this.isotope) {
        this.isotope.layout();
      }
    });
  }

  setupGallery() {
    // GLightbox is handled by the existing library
    // Additional gallery customizations can be added here
    if (typeof GLightbox !== "undefined") {
      GLightbox({
        selector: ".glightbox",
      });
    }
  }

  // Method to manually trigger layout recalculation
  relayout() {
    if (this.isotope) {
      this.isotope.layout();
    }
  }

  // Method to add new portfolio items dynamically
  addItems(items) {
    if (this.isotope && items) {
      this.isotope.insert(items);
    }
  }

  // Method to remove portfolio items
  removeItems(items) {
    if (this.isotope && items) {
      this.isotope.remove(items);
    }
  }
}

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = PortfolioComponent;
}

// Global instance
window.PortfolioComponent = PortfolioComponent;
