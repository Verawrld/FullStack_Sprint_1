const { Cuisines, Dishes } = require("../../utils/data");
const {
  generateRandomMenuItem,
  generateMenu,
  selectRandomCuisine,
} = require("../../utils/restaurantUtils");

describe("Restaurant Functions", () => {
  describe("generateRandomMenuItem", () => {
    it("should generate a random menu item with the correct attributes", () => {
      const cuisine = Cuisines[0]; // Use the first cuisine type for testing
      const menuItem = generateRandomMenuItem(cuisine);
      expect(menuItem).toHaveProperty("name");
      expect(menuItem).toHaveProperty("description");
      expect(menuItem).toHaveProperty("price");
      expect(menuItem).toHaveProperty("isSpecial");
    });
  });

  describe("generateMenu", () => {
    it("should generate a full menu for a restaurant", () => {
      const menu = generateMenu();
      expect(menu).toHaveProperty("cuisine");
      expect(menu).toHaveProperty("items");
      expect(Array.isArray(menu.items)).toBe(true);
      expect(menu.items.length).toBeGreaterThan(0);
      menu.items.forEach((item) => {
        expect(item).toHaveProperty("name");
        expect(item).toHaveProperty("description");
        expect(item).toHaveProperty("price");
        expect(item).toHaveProperty("isSpecial");
      });
    });
  });

  describe("selectRandomCuisine", () => {
    it("should select a random cuisine type", () => {
      const cuisine = selectRandomCuisine();
      expect(Cuisines).toContain(cuisine);
    });
  });
});
