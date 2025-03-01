// Function to fetch data from Google Sheets
async function getSheetData() {
  const spreadsheetId = "1D2Uei_gmRRzVMZaxU8i9tcXI0GxkdDAZeTneyM_EL3U";
  const apiKey = "AIzaSyCM-B7lkls3rGoLLq9Tf0kego91awAz-wo";
  const range = "Sheet1!A1:G20"; // Adjust the range as needed
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.values) {
      return data.values;
    } else {
      console.log("No data found");
      return [];
    }
  } catch (error) {
    console.error("Error fetching spreadsheet:", error);
    return [];
  }
}
// ============ Search Functionality ===================
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
// Function to create a recipe element
function createRecipeElement(recipe) {
  const recipeElement = document.createElement("div");
  recipeElement.className = "recipe";
  recipeElement.dataset.url = `recipe.html`; // Using the template recipe page

  const recipeImage = document.createElement("div");
  recipeImage.className = "recipe-image";
  const img = document.createElement("img");
  img.src = recipe[6];
  img.alt = recipe[0];
  recipeImage.appendChild(img);

  const recipeTitle = document.createElement("div");
  recipeTitle.className = "recipe-title";
  recipeTitle.textContent = recipe[0];

  recipeElement.appendChild(recipeImage);
  recipeElement.appendChild(recipeTitle);

  // Add click event listener to navigate to the recipe page
  recipeElement.addEventListener("click", () => {
    const url = new URL(recipeElement.dataset.url, window.location.origin);
    url.searchParams.set("title", recipe[0]); // Recipe title
    url.searchParams.set("category", recipe[1]); // Recipe category
    url.searchParams.set("image", recipe[6]); // Recipe image URL
    url.searchParams.set("ingredients", recipe[3]); // Ingredients (column D)
    url.searchParams.set("instructions", recipe[4]); // Instructions (column E)
    url.searchParams.set("tips", recipe[5]); // Useful Tips (column F)
    window.location.href = url.toString();
  });

  return recipeElement;
}

// Function to display recipes
function displayRecipes(recipes) {
  const recipeContainer = document.getElementById("recipe-container");
  if (!recipeContainer) {
    console.error("Recipe container not found");
    return;
  }

  recipeContainer.innerHTML = ""; // Clear existing content

  recipes.forEach(recipe => {
    const recipeElement = createRecipeElement(recipe);
    recipeContainer.appendChild(recipeElement);
  });
  // Initialize search functionality after recipes are loaded
  initializeSearch();
}

// Function to filter recipes based on the current page
function filterRecipes(recipes, currentPage) {
  if (currentPage === "vegan") {
    // Boolean filter for vegan recipes
    return recipes.filter(recipe => {
      const isVeganValue = (recipe[2] || "").toUpperCase(); // Use index 2 for the 3rd column
      const isVegan = isVeganValue === "TRUE"; // Ensure case-insensitive comparison
      console.log("Recipe:", recipe[0], "Is_vegan Value:", isVeganValue, "Is Vegan:", isVegan); // Log each recipe's vegan status
      return isVegan;
    });
  } else {
    // Filter for recipes matching the current page category
    return recipes.filter(recipe => recipe[1].toLowerCase() === currentPage);
  }
}

// Fetch data and display recipes
document.addEventListener("DOMContentLoaded", () => {
  // Determine the current page based on the body class
  const bodyClass = document.body.className;
  let currentPage = "";

  if (bodyClass.includes("mains-page")) {
    currentPage = "mains";
  } else if (bodyClass.includes("sides-page")) {
    currentPage = "sides";
  } else if (bodyClass.includes("bakes-page")) {
    currentPage = "bakes";
  } else if (bodyClass.includes("vegan-page")) {
    currentPage = "vegan";
  }

  console.log("Current Page:", currentPage); // Log the current page

  getSheetData().then(data => {
    const recipes = data.slice(1); // Skip the header row

    // Log the raw data from Google Sheets
    console.log("Raw Data from Google Sheets:", data);
    console.log("All Recipes:", recipes);

    const filteredRecipes = filterRecipes(recipes, currentPage); // Filter recipes

    // Log the filtered recipes for debugging
    console.log("Filtered Recipes for", currentPage, "Page:", filteredRecipes);

    displayRecipes(filteredRecipes); // Display filtered recipes
  });
});
