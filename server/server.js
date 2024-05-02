require("dotenv").config();
console.log(process.env.MONGO_URI);
console.log("Server listening on port:", process.env.PORT);
const express = require("express");
const blogRoutes = require("./routes/blogs");
const userRoutes = require("./routes/user");
const lostandFoundRoutes = require("./routes/lostandfound");
const notificationsRoutes = require("./routes/notification");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({ origin:'https://ccat-blogs-lost-found-frontend.onrender.com'}));

// Middleware
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// API Routes
app.use("/api/user", userRoutes);
app.use("/api", blogRoutes);
app.use("/item", lostandFoundRoutes);
app.use("/notif", notificationsRoutes);

// // Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/dist")));

// // All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

// Connect to database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to db & listening on Port:", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
