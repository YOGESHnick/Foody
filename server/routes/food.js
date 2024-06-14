const router = require("express").Router();
const Food = require("../models/Food");
const bcrypt = require("bcrypt");

//get food by name
router.post("/searchFoodByName", async (req, res) => {
    try {
      const { name } = req.body;
      const foods = await Food.find({ name: new RegExp(name, 'i') }); // Case-insensitive search
      if (!foods.length) {
        return res.status(404).json({ message: "No food items found with the given name" });
      }
      return res.status(200).json(foods);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  });
//GET -> all foods
router.get("/getAllFoods/:restaurantId", async (req, res) => {
    try {
      const foods = await Food.find({ restaurantId: req.params.restaurantId });
      if (!foods.length) {
        return res.status(404).json({ message: "No food items found for this restaurant" });
      }
      return res.status(200).json(foods);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  });
  
  // GET - > single food item
  router.get("/food/:id", async (req, res) => {
    try {
      const food = await Food.findById(req.params.id);
      if (!food) {
        return res.status(404).json({ message: "Food item not found" });
      }
      return res.status(200).json(food);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  });
  // new food
  router.post("/addFood", async (req, res) => {
    try {
      const { name, restaurantId, price } = req.body;
      const newFood = new Food({ name, restaurantId, price });
      const savedFood = await newFood.save();
      return res.status(201).json(savedFood);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  });

module.exports = router;
