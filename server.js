const express = require("express");
const app = express();
const cors = require("cors");
const database = require("./config/database");
require("./models/users");
require("./models/students");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

// Sync database
database
 .sync({ alter: true })
 .then(() => console.log("Database connected"))
 .catch((err) => console.log("Error: " + err));

app.use(
  cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

app.listen(8000, "0.0.0.0", () =>
  console.log("server is running on port 8000")
);