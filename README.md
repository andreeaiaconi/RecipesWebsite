# Recipe Website

Welcome to the **Recipe Website**! This project is a responsive website that showcases a collection of recipes organized into the categories **Bakes**, **Mains**, **Sides**, and **Vegan**. The website dynamically fetches recipe data from a Google Sheet, allowing for easy updates and management of recipes. The site is built using **Webpack**, **JavaScript**, **HTML** and **CSS**.

---

## Features

### 1. **Interactive Recipe Box**
- The homepage features an interactive recipe box with four clickable sections: **Bakes**, **Mains**, **Sides**, and **Vegan**.
- Each section is dynamically mapped using an **image map**, with coordinates updated in real-time using a **ResizeObserver** to ensure responsiveness across all devices.

### 2. **Dynamic Recipe Pages**
- Recipes are fetched from a **Google Sheet** and displayed dynamically on their respective category pages.
- Each recipe card is clickable and takes the user to a recipe page showing the recipe's:
  - Ingredients
  - Step-by-step instructions
  - Useful tips

### 3. **Search Functionality**
- Users can search for recipes by typing keywords into the search bar. The results are filtered in real-time.

### 4. **Responsive Design**
- The website is fully responsive, ensuring a good user experience on desktops, tablets, and mobile devices.
- The navigation menu collapses into a hamburger menu on smaller screens.

### 5. **Pop-Up Modals**
- The website includes pop-up modals for **About** and **Contact** sections for additional information.

### 6. **Webpack Integration**
- The project uses **Webpack** for bundling:
  - JavaScript files
  - CSS styles
  - HTML templates
- Webpack plugins like **HtmlWebpackPlugin** and **MiniCssExtractPlugin** are used to optimize and manage the build process.

---

## Technologies Used

- **Frontend:**
  - HTML5
  - CSS3
  - JavaScript (ES6+)
- **Build Tools:**
  - Webpack (with Babel for transpiling)
  - HtmlWebpackPlugin
  - MiniCssExtractPlugin
- **APIs:**
  - Google Sheets API (for fetching recipe data)
- **Other Tools:**
  - Google Sheets (as a backend database)

---

## Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/andreeaiaconi/RecipesWebsite.git
   cd RecipesWebsite
