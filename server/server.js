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
app.use(cors({ origin:'https://ccat-blogs-lost-found-frontend.onrender.com/'}))

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/user", userRoutes);
app.use("/api", blogRoutes);
app.use("/item", lostandFoundRoutes);
app.use("/notif", notificationsRoutes);

// Serve static files from the client/dist directory
app.use(express.static(path.join(__dirname, "/client/dist")));

console.log("hello")

// Serve the index.html file for all routes
app.get("*", (req, res) => {
  console.log("Serving index.html for path:", req.path);
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// });



//connect to database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on Port 5000!");
    });
  })
  .catch((error) => {
    console.log(error);
});
