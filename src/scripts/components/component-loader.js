/**
 * Component Loader Module
 * Loads HTML components dynamically into the main document
 */

class ComponentLoader {
  constructor() {
    this.components = new Map();
    this.basePath = "src/components/";
  }

  /**
   * Load a component and inject it into the specified container
   * @param {string} componentName - Name of the component file (without .html)
   * @param {string} containerId - ID of the container element
   * @param {Function} callback - Optional callback after loading
   */
  async loadComponent(componentName, containerId, callback = null) {
    try {
      console.log(
        `Starting to load component: ${componentName} into ${containerId}`
      );

      const container = document.getElementById(containerId);
      if (!container) {
        console.error(`Container with ID '${containerId}' not found`);
        return;
      }

      console.log(`Container found for ${componentName}`);

      // Check if component is already cached
      if (this.components.has(componentName)) {
        console.log(`Using cached component: ${componentName}`);
        container.innerHTML = this.components.get(componentName);
        if (callback) callback();
        return;
      }

      // Fetch component from file
      const url = `${this.basePath}${componentName}.html`;
      console.log(`Fetching component from: ${url}`);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to load component: ${componentName} (${response.status})`
        );
      }

      const html = await response.text();
      console.log(
        `Component ${componentName} loaded, HTML length: ${html.length}`
      );

      // Cache the component
      this.components.set(componentName, html);

      // Inject into container
      container.innerHTML = html;

      // Execute callback if provided
      if (callback) callback();

      console.log(`Component '${componentName}' loaded successfully`);
    } catch (error) {
      console.error(`Error loading component '${componentName}':`, error);
    }
  }

  /**
   * Load multiple components in sequence
   * @param {Array} components - Array of {name, containerId, callback} objects
   */
  async loadMultipleComponents(components) {
    for (const component of components) {
      await this.loadComponent(
        component.name,
        component.containerId,
        component.callback
      );
    }
  }

  /**
   * Load all components in parallel for better performance
   * @param {Array} components - Array of {name, containerId, callback} objects
   */
  async loadComponentsParallel(components) {
    const promises = components.map((component) =>
      this.loadComponent(
        component.name,
        component.containerId,
        component.callback
      )
    );
    await Promise.all(promises);
  }

  /**
   * Clear cache for a specific component
   * @param {string} componentName - Name of the component to clear from cache
   */
  clearComponentCache(componentName) {
    this.components.delete(componentName);
  }

  /**
   * Clear all cached components
   */
  clearAllCache() {
    this.components.clear();
  }
}

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = ComponentLoader;
}

// Global instance for immediate use
window.ComponentLoader = ComponentLoader;
