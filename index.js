const { Restaurants, Cuisines } = require("./utils/data");
const express = require("express");
const path = require("path");
const {
  generateRandomMenuItem,
  generateMenu,
  selectRandomCuisine,
  generateRestaurantReport,
  menus,
} = require("./utils/restaurantUtils");

const app = express();
let restaurantData = {}; //This should be populated soon

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

/**
 * GET /
 * Renders the homepage that lists cities and restaurant names.
 */
app.get("/", (request, response) => {
  // Generate a random menu item for demonstration purposes
  const randomRestaurant =
    Restaurants[Math.floor(Math.random() * Restaurants.length)];
  const randomMenuItem = generateRandomMenuItem(selectRandomCuisine());
  response.render("index", {
    restaurants: Restaurants,
    randomMenuItem,
    restaurantName: randomRestaurant.name,
  });
});

/**
 * GET /restaurant/:name
 * Displays a specific restaurant's random menu.
 * The cuisine is randomly selected and a menu is generated based on it.
 */
app.get("/restaurant", (request, response) => {
  const restaurantId = request.query.restaurantId;
  const restaurant = Restaurants.find((r) => r.id === restaurantId);
  if (!restaurant) {
    return response.status(404).send("Restaurant not found.");
  }
  const menu = generateMenu();
  response.render("restaurant", {
    restaurant,
    menu,
  });
});

//Add any other required routes here

/**
 * GET /alerts
 * Displays special menu alerts for all restaurants.
 */
app.get("/alerts", (request, response) => {
  const alerts = Restaurants.map((restaurant) => {
    const menu = menus[restaurant.id];
    const specials = menu.items.filter((item) => item.isSpecial);
    return {
      restaurant,
      specials,
    };
  });
  response.render("alerts", { alerts });
});

/**
 * GET /report
 * Displays a full restaurant report with the selected cuisine and menu.
 */

app.get("/report", (request, response) => {
  const report = generateRestaurantReport();
  response.render("report", { report });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
