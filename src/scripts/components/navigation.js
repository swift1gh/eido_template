/**
 * Navigation Component Script
 * Handles all navigation-related functionality
 */

class NavigationComponent {
  constructor() {
    this.isInitialized = false;
    this.mobileNavOpen = false;
  }

  init() {
    if (this.isInitialized) return;

    this.setupMobileNavigation();
    this.setupSmoothScrolling();
    this.setupActiveNavigation();
    this.isInitialized = true;

    console.log("Navigation component initialized");
  }

  setupMobileNavigation() {
    const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
    const navmenu = document.querySelector("#navmenu");

    if (!mobileNavToggle || !navmenu) return;

    mobileNavToggle.addEventListener("click", () => {
      this.toggleMobileNav(navmenu, mobileNavToggle);
    });

    // Close mobile nav when clicking outside
    document.addEventListener("click", (e) => {
      if (
        this.mobileNavOpen &&
        !navmenu.contains(e.target) &&
        !mobileNavToggle.contains(e.target)
      ) {
        this.closeMobileNav(navmenu, mobileNavToggle);
      }
    });

    // Close mobile nav on window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1200 && this.mobileNavOpen) {
        this.closeMobileNav(navmenu, mobileNavToggle);
      }
    });
  }

  toggleMobileNav(navmenu, toggle) {
    if (this.mobileNavOpen) {
      this.closeMobileNav(navmenu, toggle);
    } else {
      this.openMobileNav(navmenu, toggle);
    }
  }

  openMobileNav(navmenu, toggle) {
    navmenu.classList.add("navmenu-mobile");
    toggle.classList.remove("bi-list");
    toggle.classList.add("bi-x");
    this.mobileNavOpen = true;
    document.body.style.overflow = "hidden";
  }

  closeMobileNav(navmenu, toggle) {
    navmenu.classList.remove("navmenu-mobile");
    toggle.classList.add("bi-list");
    toggle.classList.remove("bi-x");
    this.mobileNavOpen = false;
    document.body.style.overflow = "";
  }

  setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('#navmenu a[href^="#"]');

    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const headerHeight =
            document.querySelector("#header")?.offsetHeight || 0;
          const offsetTop = targetElement.offsetTop - headerHeight;

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });

          // Close mobile menu if open
          const navmenu = document.querySelector("#navmenu");
          const toggle = document.querySelector(".mobile-nav-toggle");
          if (this.mobileNavOpen && navmenu && toggle) {
            this.closeMobileNav(navmenu, toggle);
          }
        }
      });
    });
  }

  setupActiveNavigation() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll('#navmenu a[href^="#"]');

    if (sections.length === 0 || navLinks.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentSection = entry.target.getAttribute("id");
            this.updateActiveLink(navLinks, currentSection);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-100px 0px -100px 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  updateActiveLink(navLinks, currentSection) {
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }
}

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = NavigationComponent;
}

// Global instance
window.NavigationComponent = NavigationComponent;
