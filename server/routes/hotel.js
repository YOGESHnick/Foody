const router = require("express").Router();
const Hotel = require("../models/Hotel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// GET HOTELS
router.get("/findHotels", async (req, res) => {
    try {
      const hotels = await Hotel.find(); 
      return res.status(200).json(hotels);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  });

//GET HOTEL
router.get("/hotel/:id", async (req, res) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
      return res.status(200).json(hotel);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  });

// R E G I S T E R 
router.post("/addHotel", async (req, res) => {
  
    try {
      const { name, location } = req.body;
  
      // Create a new user 
      const newHotel = new Hotel({
        name,
        location,
      });
      console.log(newHotel);
      await newHotel.save();
  
      res.status(201).json({ message: "Hotel registered successfully" });
    }catch (error) {
      res.status(500).json(error);
    }
  });

module.exports = router;
