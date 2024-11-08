const { Dishes, Cuisines, Restaurants } = require("./data");

let menus = {};

/**
 * Generates a random menu item based on a given cuisine.
 * @param {string} cuisine - The desired cuisine for the menu item.
 * @returns {*} A random menu item with a name, description, price, and special status.
 */

function generateRandomMenuItem(cuisine) {
  const dishes = Dishes[cuisine];
  if (!dishes) {
    throw new Error(`Invalid cuisine: ${cuisine}`);
  }
  const randomDish = dishes[Math.floor(Math.random() * dishes.length)];
  return {
    name: randomDish.name,
    description: randomDish.description,
    price: (Math.random() * 20 + 5).toFixed(2),
    isSpecial: Math.random() < 0.1,
  };
}

/**
 * Selects a random cuisine type for a restaurant.
 * @returns {*} A random cuisine type.
 */

function selectRandomCuisine() {
  const randomIndex = Math.floor(Math.random() * Cuisines.length);
  return Cuisines[randomIndex];
}

/**
 * Generates a menu for a restaurant, including a random cuisine type and a list of menu items.
 * @returns {*} An object representing the restaurant's menu, including the cuisine type and items.
 */

function generateMenu() {
  const cuisine = selectRandomCuisine();
  console.log(`Selected cuisine: ${cuisine}`); // Debugging line
  const itemCount = Math.floor(Math.random() * 6) + 5;
  const items = Array.from({ length: itemCount }, () =>
    generateRandomMenuItem(cuisine)
  );
  return {
    cuisine,
    items,
  };
}

/**
 * Generates a full restaurant report with the selected cuisine and menu.
 * @returns {*} An object representing the restaurant's report, including the cuisine type and items.
 */
function generateRestaurantReport() {
  const menu = generateMenu();
  return {
    cuisine: menu.cuisine,
    items: menu.items,
  };
}

/**
 * Generates menus for all restaurants and stores them in memory.
 */
function generateMenusForAllRestaurants() {
  Restaurants.forEach((restaurant) => {
    menus[restaurant.id] = generateMenu();
  });
}

// Generate menus when the application starts
generateMenusForAllRestaurants();

module.exports = {
  generateRandomMenuItem,
  selectRandomCuisine,
  generateMenu,
  generateRestaurantReport,
  generateMenusForAllRestaurants,
  menus,
};
