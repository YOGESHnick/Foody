const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// R E G I S T E R 
router.post("/register", async (req, res) => {
  
  try {
    const { name, cash, email, password } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user 
    const newUser = new User({
      name,
      cash,
      email,
      password: hashedPassword,
    });
    console.log(newUser);
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  }catch (error) {
    res.status(500).json(error);
  }
});

// L O G I N 
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send("User not found!");
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
      return res.status(400).json("Wrong password!");
    }

    const userToken = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
    // localStorage.setItem('userToken',userToken); 
    // return res.status(200).json({ user, userToken });
    return res.status(200).json({ userToken, userId: user._id });

  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

// GET USER
router.get("/user/:id", async(req,res)=>{
  const user = await User.findOne({ _id: req.params.id });
  return res.status(200).json(user);
});

// G E T  U S E R  C A S H
router.get("/user/:id/cash", async(req,res)=>{
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ cash: user.cash });
  } catch (error) {
    console.error("Error fetching user cash:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// U P D A T E  C A S H 
router.patch("/user/:id/updateCash", async (req, res) => {
  try {
    const { cash } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { cash },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Cash updated successfully", user: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
