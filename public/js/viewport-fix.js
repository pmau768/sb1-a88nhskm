// This script fixes the 100vh issue on mobile browsers and handles other mobile viewport optimizations
(function() {
  // Set visual viewport height variable
  function setVh() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  // Initial set
  setVh();

  // Update on resize and orientation change
  window.addEventListener('resize', debounce(setVh, 150));
  window.addEventListener('orientationchange', function() {
    // Delay execution to allow orientation change to complete
    setTimeout(setVh, 300);
  });
  
  // Save to home screen detection
  function isStandalone() {
    return window.navigator.standalone || 
           window.matchMedia('(display-mode: standalone)').matches;
  }
  
  // If in standalone mode, add class to body
  if (isStandalone()) {
    document.documentElement.classList.add('standalone-mode');
  }
  
  // Simple debounce function
  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    };
  }
  
  // Calculate content safe areas for iOS devices
  function setSafeAreas() {
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      // For iOS, set safe area variables
      // These are fallbacks if env() is not supported
      document.documentElement.style.setProperty('--sat', '44px'); // Safe area top
      document.documentElement.style.setProperty('--sar', '0px');  // Safe area right
      document.documentElement.style.setProperty('--sab', '34px'); // Safe area bottom
      document.documentElement.style.setProperty('--sal', '0px');  // Safe area left
    }
  }
  
  // Initial call
  setSafeAreas();
  
  // Pre-warm some pages for faster navigation
  document.addEventListener('DOMContentLoaded', function() {
    // Use native prefetch
    const links = ['/dogs', '/apply', '/lost-dogs'];
    links.forEach(function(href) {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    });
  });
})();