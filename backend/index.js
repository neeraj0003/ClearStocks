require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { SignUp, Login } = require("./Controllers/AuthController");
const { userVerification } = require('./Middlewares/AuthMiddleware');
const Holding = require('./models/holdingModel');
const Position = require('./models/positionModel');
const Order = require("./models/OrderModel");

const app = express();
const uri = process.env.MONGO_URL;
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({
  origin: ["",""],
  credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// Auth Routes
app.post("/signup", SignUp);
app.post("/login", Login);

// Auth-Protected Route
app.post("/verify", userVerification, (req, res) => {
  res.json({
    status: true,
    user: {
      id: req.user._id,
      email: req.user.email,
      username: req.user.username
    }
  });
});

// Holdings API
app.get("/getHoldings", async (req, res) => {
  const result = await Holding.find({});
  res.send(result);
});

// Positions API
app.get("/getPositions", async (req, res) => {
  const result = await Position.find({});
  res.send(result);
});

// Orders API
app.get("/getOrders", async (req, res) => {
  const result = await Order.find({});
  res.send(result);
});

// Create New Order (BUY / SELL)
app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    if (!name || isNaN(qty) || isNaN(price) || !mode) {
      return res.status(400).send("Invalid input data");
    }

    const order = new Order({ name, qty, price, mode });
    await order.save();

    let holding = await Holding.findOne({ name });

    if (mode === "BUY") {
      if (holding) {
        const totalQty = holding.qty + qty;
        const totalCost = (holding.avg * holding.qty) + (price * qty);
        holding.avg = totalCost / totalQty;
        holding.qty = totalQty;
      } else {
        holding = new Holding({
          name,
          qty,
          avg: price,
          price,
          net: "+0.00%",
          day: "+0.00%",
        });
      }
      await holding.save();
    } else if (mode === "SELL") {
      if (!holding || holding.qty < qty) {
        return res.status(400).send("Not enough stock to sell.");
      }

      holding.qty -= qty;
      if (holding.qty === 0) {
        await Holding.deleteOne({ name });
      } else {
        await holding.save();
      }
    }

    res.send("Order placed and holdings updated");
  } catch (err) {
    console.error("Error in /newOrder:", err.message);
    res.status(500).send("Internal server error");
  }
});
