import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import AdminRoute from "./Route/AdminRoute.js";

// Load environment variables
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Simple route
app.get('/', (req, res) => {
  res.send('Test API Success');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`API started & running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  });

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed.');
  process.exit(0);
});


app.use("/api/v1/admin", AdminRoute)