const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Enable CORS to allow requests only from your frontend
app.use(cors({
  origin: "https://mini-stock-price-tracker-frontend.vercel.app", // Replace with your frontend's domain
}));


async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://singhsanbhav:wgUHb8iAckOf9ZQ6@cluster0.jyhyycy.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
start();

// schema for your stock data
const stockSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const Stock = mongoose.model("Stock", stockSchema);

// route to fetch stock prices
app.get("/api/stock-price/:stockName", async (req, res) => {
  const stockName = req.params.stockName;
  try {
    const stock = await Stock.findOne({ name: stockName });

    if (stock) {
      const newPrice = stock.price + (Math.random() - 0.5);
      stock.price = newPrice;
      await stock.save();
      res.json({ price: newPrice.toFixed(2) });
    } else {
      res.status(404).json({ message: "Stock not found" });
    }
  } catch (error) {
    console.error("Error fetching stock price:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
