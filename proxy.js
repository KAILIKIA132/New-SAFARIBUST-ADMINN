const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// Enable CORS for all routes
app.use(cors());

// Define a route to forward the API requests
app.get("/bookings", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:8083/bookings");
    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: "Something went wrong" });
  }
});

// Start the proxy server on port 5173
app.listen(5173, () => {
  console.log("Proxy server is running on http://localhost:5173");
});
