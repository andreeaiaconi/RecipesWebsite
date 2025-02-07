import "./style.css";

function setupNavbar() {
  const hamburger = document.querySelector(".nav__hamburger");
  const linksContainer = document.querySelector(".nav__menu");
  const links = document.querySelectorAll(".nav__menu__link");

  if (!hamburger || !linksContainer) return;

  hamburger.addEventListener("click", () => {
    linksContainer.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  function closeMenu() {
    links.forEach(link => {
      link.addEventListener("click", () => {
        linksContainer.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });
  }

  if (window.matchMedia("(max-width: 820px)").matches) {
    closeMenu();
  }

  window.addEventListener("resize", () => {
    if (window.matchMedia("(max-width: 820px)").matches) {
      closeMenu();
    }
  });
}

// Modify navbar fetch to run setup after loading
fetch("navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar-placeholder").innerHTML = data;
    setupNavbar();
    initializeSearch(); // Initialize search after navbar loads
  });

function initializeSearch() {
  // This selects the <input> element inside an element with the class .search
  const searchInput = document.querySelector(".search input");
  if (!searchInput) return;

  // This selects all elements with the class .recipe
  const recipes = document.querySelectorAll(".recipe");

  // Adds an event listener to the search input field.
  // It listens for the input event, which fires every time the user types something.
  searchInput.addEventListener("input", e => {
    const searchTerm = e.target.value.toLowerCase();
    recipes.forEach(recipe => {
      // Selects the title inside each recipe
      // Extracts its text content and converts it to lowercase
      const title = recipe.querySelector(".recipe-title").textContent.toLowerCase();
      // The display property controls how the element is displayed.
      // Setting it to 'none' hides the element.
      // Setting it to '' (empty string) resets it
      recipe.style.display = title.includes(searchTerm) ? "" : "none";
    });
  });
}