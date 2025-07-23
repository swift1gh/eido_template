/**
 * Main Application Script
 * Initializes and loads all components for the Eido website
 */

document.addEventListener("DOMContentLoaded", async function () {
  console.log("Initializing Eido Website...");
  console.log("DOM Content Loaded event fired");

  // Initialize component loader
  const loader = new ComponentLoader();
  console.log("Component loader initialized");

  // Define all components to load
  const componentsToLoad = [
    {
      name: "header",
      containerId: "header-container",
      callback: initializeNavigation,
    },
    {
      name: "hero",
      containerId: "hero-container",
    },
    {
      name: "about",
      containerId: "about-container",
    },
    {
      name: "stats",
      containerId: "stats-container",
      callback: initializeCounters,
    },
    {
      name: "services",
      containerId: "services-container",
    },
    {
      name: "clients",
      containerId: "clients-container",
    },
    {
      name: "features",
      containerId: "features-container",
    },
    {
      name: "testimonials",
      containerId: "testimonials-container",
      callback: initializeSwiper,
    },
    {
      name: "portfolio",
      containerId: "portfolio-container",
      callback: initializePortfolioFilters,
    },
    {
      name: "team",
      containerId: "team-container",
    },
    {
      name: "contact",
      containerId: "contact-container",
      callback: initializeContactForm,
    },
    {
      name: "footer",
      containerId: "footer-container",
    },
  ];

  try {
    console.log("Starting to load components...");
    // Load all components in parallel for better performance
    await loader.loadComponentsParallel(componentsToLoad);
    console.log("Components loading completed");

    // Initialize global scripts after all components are loaded
    initializeAOS();
    initializeGlobalFeatures();

    // Initialize scroll-based functionality
    initializeScrollEffects();
    initializeNavigationScrollspy();
    initializeScrollToTop();

    // Hide preloader after all components are loaded
    hidePreloader();

    console.log("All components loaded successfully!");
  } catch (error) {
    console.error("Error loading components:", error);
    // Hide preloader even if there's an error
    hidePreloader();
  }
});

/**
 * Initialize navigation functionality
 */
function initializeNavigation() {
  console.log("Initializing navigation...");

  // Use the NavigationComponent if available
  if (typeof NavigationComponent !== "undefined") {
    const nav = new NavigationComponent();
    nav.init();
  } else {
    // Fallback to basic navigation
    initializeBasicNavigation();
  }
}

/**
 * Basic navigation fallback
 */
function initializeBasicNavigation() {
  const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
  const navmenu = document.querySelector("#navmenu");

  if (mobileNavToggle && navmenu) {
    mobileNavToggle.addEventListener("click", function () {
      navmenu.classList.toggle("navmenu-mobile");
      mobileNavToggle.classList.toggle("bi-list");
      mobileNavToggle.classList.toggle("bi-x");
    });
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('#navmenu a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Close mobile menu if open
        if (navmenu.classList.contains("navmenu-mobile")) {
          navmenu.classList.remove("navmenu-mobile");
          mobileNavToggle.classList.add("bi-list");
          mobileNavToggle.classList.remove("bi-x");
        }
      }
    });
  });

  // Update active navigation link on scroll
  updateActiveNavOnScroll();
}

/**
 * Initialize counter animations
 */
function initializeCounters() {
  console.log("Initializing counters...");

  // This will work with the existing PureCounter library
  // The data attributes are already set in the stats component
  if (typeof PureCounter !== "undefined") {
    new PureCounter();
  }
}

/**
 * Initialize Swiper for testimonials
 */
function initializeSwiper() {
  console.log("Initializing Swiper...");

  // The swiper configuration is already embedded in the testimonials component
  // This function can be used for additional swiper customizations if needed
}

/**
 * Initialize portfolio filters
 */
function initializePortfolioFilters() {
  console.log("Initializing portfolio filters...");

  // Use the PortfolioComponent if available
  if (typeof PortfolioComponent !== "undefined") {
    const portfolio = new PortfolioComponent();
    portfolio.init();
  } else {
    // Fallback - the isotope functionality is handled by the existing isotope library
    console.log(
      "PortfolioComponent not found, using default isotope initialization"
    );
  }
}

/**
 * Initialize contact form
 */
function initializeContactForm() {
  console.log("Initializing contact form...");

  // Use the ContactFormComponent if available
  if (typeof ContactFormComponent !== "undefined") {
    const contactForm = new ContactFormComponent();
    contactForm.init();
  } else {
    // Fallback - the form validation is handled by the existing php-email-form library
    console.log("ContactFormComponent not found, using default form handling");
  }
}

/**
 * Initialize AOS (Animate On Scroll)
 */
function initializeAOS() {
  console.log("Initializing AOS...");

  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
}

/**
 * Initialize global features
 */
function initializeGlobalFeatures() {
  console.log("Initializing global features...");

  // Scroll top button
  initializeScrollTop();

  // Preloader
  initializePreloader();

  // Header scroll effect
  initializeHeaderScrollEffect();
}

/**
 * Initialize scroll to top button
 */
function initializeScrollTop() {
  const scrollTop = document.querySelector("#scroll-top");

  if (scrollTop) {
    const toggleScrollTop = function () {
      if (window.scrollY > 100) {
        scrollTop.classList.add("active");
      } else {
        scrollTop.classList.remove("active");
      }
    };

    window.addEventListener("scroll", toggleScrollTop);

    scrollTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}

/**
 * Hide preloader immediately
 */
function hidePreloader() {
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    preloader.remove();
    console.log("Preloader hidden");
  }
}

/**
 * Initialize preloader
 */
function initializePreloader() {
  const preloader = document.querySelector("#preloader");

  if (preloader) {
    window.addEventListener("load", function () {
      preloader.remove();
    });
  }
}

/**
 * Initialize header scroll effect
 */
function initializeHeaderScrollEffect() {
  const header = document.querySelector("#header");

  if (header) {
    const toggleHeaderScrolled = function () {
      if (window.scrollY > 100) {
        header.classList.add("header-scrolled");
      } else {
        header.classList.remove("header-scrolled");
      }
    };

    window.addEventListener("scroll", toggleHeaderScrolled);
  }
}

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavOnScroll() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('#navmenu a[href^="#"]');

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

/**
 * Initialize scroll effects for header background
 */
function initializeScrollEffects() {
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (!selectHeader) return;

    if (selectHeader.classList.contains("fixed-top")) {
      window.scrollY > 100
        ? selectBody.classList.add("scrolled")
        : selectBody.classList.remove("scrolled");
    }
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  console.log("Scroll effects initialized");
}

/**
 * Initialize navigation scrollspy
 */
function initializeNavigationScrollspy() {
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }

  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);

  console.log("Navigation scrollspy initialized");
}

/**
 * Initialize scroll to top functionality
 */
function initializeScrollToTop() {
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  console.log("Scroll to top initialized");
}
