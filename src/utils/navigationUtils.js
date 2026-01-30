/**
 * Handles click on the site logo — scrolls to top or navigates home, and cleans hash.
 * 
 * @param {Event} e - The click event.
 * @param {string} currentPath - Current pathname (e.g. location.pathname)
 * @param {Function} navigate - React Router navigate() function.
 */
export const handleLogoNavigation = (e, currentPath, navigate, to = "/") => {
    e.preventDefault();
  
    if (currentPath !== to) {
      // Navigate to homepage if we're not already there
      navigate(to);
    } else {
      // If already on home → smooth scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
  
      // Clean hash (#...) from the URL if it exists
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }
  };
  