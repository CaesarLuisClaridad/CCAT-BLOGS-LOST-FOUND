require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

const blogRoutes = require("./routes/blogs");
const userRoutes = require("./routes/user");
const lostandFoundRoutes = require("./routes/lostandfound");
const notificationsRoutes = require("./routes/notification");

const app = express();

app.use(cors({ origin: 'https://ccat-blogs-lost-found-frontend.onrender.com' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Logging middleware for debugging
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// API routes
app.use("/api/user", userRoutes);
app.use("/api", blogRoutes);
app.use("/item", lostandFoundRoutes);
app.use("/notif", notificationsRoutes);

// Serve static files from the correct path
app.use(express.static(path.join(__dirname, "../client/dist")));

// Catch-all route to serve the index.html from the correct path
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Database connection and server start-up
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to the database successfully");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
