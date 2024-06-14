const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const session = require('express-session');
const userRoute = require("./routes/user");
const hotelRoute = require("./routes/hotel");
const foodRoute = require("./routes/food");
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

app.use(
	session({
	  secret: 'your-secret-key',
	  resave: false,
	  saveUninitialized: true,
	})
);

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);


const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }
  
    try {
      const decoded = jwt.verify(token, 'your-secret-key');
      req.user = decoded; 
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Invalid token." });
    }
  };
app.post('/api/auth/verifyToken', verifyToken, (req, res) => {
  // If middleware passed, token is valid
  res.status(200).json({ message: 'Token verified successfully' });
});
/// L O G I N   H A N D L E R 
app.use("/api/auth", userRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/foods", foodRoute);


mongoose.connect(
	"mongodb://shamlinlearning:zJuHgQMxwcKWlB8B@ac-08dhk2y-shard-00-00.n6hxill.mongodb.net:27017,ac-08dhk2y-shard-00-01.n6hxill.mongodb.net:27017,ac-08dhk2y-shard-00-02.n6hxill.mongodb.net:27017/foody?ssl=true&replicaSet=atlas-pww4uv-shard-0&authSource=admin&retryWrites=true&w=majority"
    ).then(console.log("Connected to MongoDB !")
);

app.listen(8080, ()=>{
    console.log("Server started at port 8080");
});
