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
document.addEventListener('DOMContentLoaded', () => {
  const navbarPlaceholder = document.getElementById("navbar-placeholder");
  
  if (navbarPlaceholder) {
    fetch("navbar.html")
      .then(response => response.text())
      .then(data => {
        navbarPlaceholder.innerHTML = data;
        setupNavbar();
        initializeSearch();
      });
  }
});