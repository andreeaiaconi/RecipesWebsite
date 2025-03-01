import "./style.css";
import "./recipe.js";

// ============ Pop Up Functions ===================
function showPopup(page) {
  let popupText = document.getElementById("popup-text");
  let overlay = document.getElementById("popup-overlay");

  if (page === "About") {
    popupText.innerHTML = `
      <strong>Welcome to Ina's corner!</strong><br>
      <p></p>
      <p>Ina is a connoisseur of good food and recipes from all over the world.</p>
      <p>She has selected all her favorite recipes and collected them in her recipe box to share with you.</p>
      <p>Enjoy!</p>
    `;
  } else if (page === "Contact") {
    popupText.innerHTML = `
      <strong>Contact Us</strong><br>
      <p>Have questions? Reach out to us via email at </p>
      <a href="mailto:inasrecipes@example.com">inasrecipes@example.com</a>.
    `;
  }

  document.getElementById("popup").style.display = "block"; // Show popup
  overlay.style.display = "block"; // Show the dark background overlay
}

function closePopup() {
  document.getElementById("popup").style.display = "none"; // Hide popup
  document.getElementById("popup-overlay").style.display = "none"; // Hide the overlay
}

// Make pop-up functions globally accessible
window.showPopup = showPopup;
window.closePopup = closePopup;

// ============ Navbar Setup ===================
function setupNavbar() {
  const hamburger = document.querySelector(".nav__hamburger");
  const linksContainer = document.querySelector(".nav__menu");
  const links = document.querySelectorAll(".nav__menu-link");

  if (!hamburger || !linksContainer) {
    console.log("Navbar elements not found");
    return;
  }

  // Hamburger menu toggle
  hamburger.addEventListener("click", () => {
    linksContainer.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Close menu when links are clicked
  links.forEach(link => {
    link.addEventListener("click", () => {
      linksContainer.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  // Re-attach popup event listeners for "About" and "Contact" links
  const aboutLink = document.querySelector('.nav__menu-link[onclick*="About"]');
  const contactLink = document.querySelector('.nav__menu-link[onclick*="Contact"]');

  if (aboutLink) {
    aboutLink.addEventListener("click", e => {
      e.preventDefault();
      showPopup("About");
    });
  }

  if (contactLink) {
    contactLink.addEventListener("click", e => {
      e.preventDefault();
      showPopup("Contact");
    });
  }
}

// ============ Initialize Features ===================
document.addEventListener("DOMContentLoaded", () => {
  setupNavbar(); // Call setupNavbar when the DOM is fully loaded
});

// ============ Index Page Navbar Setup ===================
function setupIndexNavbar() {
  const indexhamburger = document.querySelector(".index-page__nav-hamburger");
  const indexlinksContainer = document.querySelector(".index-page__nav-menu");
  const indexlinks = document.querySelectorAll(".index-page__nav__menu-link");

  if (!indexhamburger || !indexlinksContainer) return;

  indexhamburger.addEventListener("click", () => {
    indexlinksContainer.classList.toggle("active");
    indexhamburger.classList.toggle("active");
  });

  function closeIndexMenu() {
    indexlinks.forEach(link => {
      link.addEventListener("click", () => {
        indexlinksContainer.classList.remove("active");
        indexhamburger.classList.remove("active");
      });
    });
  }

  if (window.matchMedia("(max-width: 820px)").matches) {
    closeIndexMenu();
  }

  window.addEventListener("resize", () => {
    if (window.matchMedia("(max-width: 820px)").matches) {
      closeIndexMenu();
    }
  });
}

// ============ Initialize Features ===================
document.addEventListener("DOMContentLoaded", () => {
  const navbarPlaceholder = document.getElementById("navbar-placeholder");

  // Only fetch navbar if placeholder exists (non-index pages)
  if (navbarPlaceholder) {
    fetch("navbar.html")
      .then(response => response.text())
      .then(data => {
        navbarPlaceholder.innerHTML = data;
        setupNavbar(); // Setup navbar after content is loaded
      })
      .catch(error => {
        console.error("Error loading navbar:", error);
      });
  }

  // Check if we're on the index page
  const indexNav = document.querySelector(".index-page__nav");
  if (indexNav) {
    setupIndexNavbar();
  }


// ============ Map Coordinates Update ===================
function updateMapCoordinates() {
  const container = document.querySelector(".recipe-box__divider");
  const imageMap = document.querySelector('map[name="bakesdivider"]');
  const areas = imageMap.getElementsByTagName("area");

  if (!container || !imageMap || !areas) return;

  // Get current container dimensions
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  // Calculate section widths (divide total width by 4 for each section)
  const sectionWidth = containerWidth / 4;

  // Update coordinates for each area
  const newCoordinates = [
    `0,0,${sectionWidth},${containerHeight}`, // Bakes
    `${sectionWidth},0,${sectionWidth * 2},${containerHeight}`, // Mains
    `${sectionWidth * 2},0,${sectionWidth * 3},${containerHeight}`, // Sides
    `${sectionWidth * 3},0,${containerWidth},${containerHeight}` // Vegan
  ];

  // Update each area's coordinates
  for (let i = 0; i < areas.length; i++) {
    areas[i].coords = newCoordinates[i];
  }
}

// Create a ResizeObserver to watch the container
const resizeObserver = new ResizeObserver(entries => {
  for (const entry of entries) {
    if (entry.target === document.querySelector(".recipe-box__divider")) {
      updateMapCoordinates();
    }
  }
});

// Start observing the container
const container = document.querySelector(".recipe-box__divider");
if (container) {
  resizeObserver.observe(container);
}
});