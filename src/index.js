import "./style.css";

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
}

document.addEventListener("DOMContentLoaded", () => {
  const navbarPlaceholder = document.getElementById("navbar-placeholder");

  if (navbarPlaceholder) {
    fetch("navbar.html")
      .then(response => response.text())
      .then(data => {
        navbarPlaceholder.innerHTML = data;
        setupNavbar(); // Setup navbar after content is loaded

        // Setup modal after navbar is loaded
        const openBtn = document.querySelector("#openModal");
        const closeBtn = document.querySelector(".closeModal");
        const modal = document.querySelector(".modal");

        if (openBtn && closeBtn && modal) {
          openBtn.addEventListener("click", e => {
            e.preventDefault();
            modal.classList.add("open");
          });

          closeBtn.addEventListener("click", () => {
            modal.classList.remove("open");
          });
        }
      })
      .catch(error => {
        console.error("Error loading navbar:", error);
      });
  }
});

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
        // Fixed: removed indexlink
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

function initializeSearch() {
  const searchInput = document.querySelector(".search input");
  if (!searchInput) return;

  const recipes = document.querySelectorAll(".recipe");

  searchInput.addEventListener("input", e => {
    const searchTerm = e.target.value.toLowerCase();
    recipes.forEach(recipe => {
      const title = recipe.querySelector(".recipe-title").textContent.toLowerCase();
      recipe.style.display = title.includes(searchTerm) ? "" : "none";
    });
  });
}

// Initialize features after DOM content loads
document.addEventListener("DOMContentLoaded", () => {
  const navbarPlaceholder = document.getElementById("navbar-placeholder");

  // Only fetch navbar if placeholder exists (non-index pages)
  if (navbarPlaceholder) {
    fetch("navbar.html")
      .then(response => response.text())
      .then(data => {
        navbarPlaceholder.innerHTML = data;
        setupNavbar();
      })
      .catch(error => {
        console.error("Error loading navbar:", error);
      });
  }

  // Check if we're on index page
  const indexNav = document.querySelector(".index-page__nav");
  if (indexNav) {
    setupIndexNavbar();
  }

  // Initialize search regardless of page type
  initializeSearch();
});

// targetting the opening and the closing of the nav button
const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");
const modal = document.getElementById("modal");

openBtn.addEventListener("click", () => {
  modal.classList.add("open");
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("open");
});

// =================updating coordinates=====================
// Get the container and map elements
const container = document.querySelector('.recipe-box__divider');
const imageMap = document.querySelector('map[name="bakesdivider"]');
const areas = imageMap.getElementsByTagName('area');

// Function to update coordinates
function updateMapCoordinates() {
    // Get current container dimensions
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Calculate section widths (divide total width by 4 for each section)
    const sectionWidth = containerWidth / 4;
    
    // Update coordinates for each area
    // Format: x1,y1,x2,y2
    const newCoordinates = [
        `0,0,${sectionWidth},${containerHeight}`,                           // Bakes
        `${sectionWidth},0,${sectionWidth * 2},${containerHeight}`,        // Mains
        `${sectionWidth * 2},0,${sectionWidth * 3},${containerHeight}`,    // Sides
        `${sectionWidth * 3},0,${containerWidth},${containerHeight}`       // Vegan
    ];
    
    // Update each area's coordinates
    for (let i = 0; i < areas.length; i++) {
        areas[i].coords = newCoordinates[i];
    }
}

// Create a ResizeObserver to watch the container
const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
        if (entry.target === container) {
            updateMapCoordinates();
        }
    }
});

// Start observing the container
resizeObserver.observe(container);

// Initial update
document.addEventListener('DOMContentLoaded', updateMapCoordinates);

// // Read rows from spreadsheet
// const metaData = await googleSheets.spreadsheets.get({
//   auth,
//   spreadsheetId,
// });

// // Read rows from spreadsheet
// const getRows = await googleSheets.spreadsheets.values.get({
//   auth,
//   spreadsheetId,
//   range: "Sheet1"
// });

let SHEET_ID = "1D2Uei_gmRRzVMZaxU8i9tcXI0GxkdDAZeTneyM_EL3U";
let SHEET_TITLE = "Sheet1";
let SHEET_RANGE = "E1:E20";
let FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_TITLE}&range=${SHEET_RANGE}`;

fetch(FULL_URL)
  .then(res => res.text())
  .then(rep => {
    // Remove the Google visualization API specific prefix and suffix
    const jsonData = rep.slice(47, -2);
    const data = JSON.parse(jsonData);
    console.log(data);
  })
  .catch(error => {
    console.error("Error:", error);
  });
