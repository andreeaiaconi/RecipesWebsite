document.addEventListener("DOMContentLoaded", () => {
  // Check if the recipe-specific elements exist
  const recipeTitleElement = document.getElementById("recipe-title");
  const recipeImageElement = document.getElementById("recipe-image");

  if (recipeTitleElement && recipeImageElement) {
    // Only run this code if the elements exist (i.e. only on the recipe.html page)
    
    // Read URL parameters
    const params = new URLSearchParams(window.location.search);

    // Get recipe data from URL parameters
    const recipeTitle = params.get("title");
    const recipeCategory = params.get("category");
    const recipeImage = params.get("image");
    const recipeIngredients = params.get("ingredients");
    const recipeInstructions = params.get("instructions");
    const recipeTips = params.get("tips");

    // Function to replace **text** with <strong>text</strong>
    function formatBoldText(text) {
      return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    }

    // Populate the recipe page with data
    document.getElementById("recipe-title").textContent = recipeTitle;
    document.getElementById("recipe-image").src = recipeImage;

    // Populate Ingredients
    const ingredientsList = document.getElementById("ingredients");
    if (recipeIngredients) {
      ingredientsList.innerHTML = recipeIngredients
        .split("\n")
        .map(ingredient => `${formatBoldText(ingredient.trim())}<br>`)
        .join("");
    } else {
      ingredientsList.innerHTML = "<li>No ingredients listed.</li>";
    }

    // Populate Instructions
    const instructionsList = document.getElementById("instructions");
    if (recipeInstructions) {
      instructionsList.innerHTML = recipeInstructions
        .split("\n")
        .map(step => `${formatBoldText(step.trim())}<br>`)
        .join("");
    } else {
      instructionsList.innerHTML = "<li>No instructions listed.</li>";
    }

    // Populate Useful Tips
    const usefulTips = document.getElementById("useful-tips");
    const usefulTipsSection = document.querySelector(".useful-tips-section");

    if (usefulTipsSection) {
      if (recipeTips && recipeTips.trim() !== "") {
        usefulTips.innerHTML = recipeTips
          .split("\n")
          .map(tip => `${formatBoldText(tip.trim())}<br>`)
          .join("");
        usefulTipsSection.style.display = "block";
      } else {
        usefulTipsSection.style.display = "none";
      }
    } else {
      console.error("Useful tips section not found in the DOM.");
    }
  }
});
