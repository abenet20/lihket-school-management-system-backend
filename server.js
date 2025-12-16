const express = require("express");
const app = express();
const cors = require("cors");
const database = require("./config/database");

database
 .sync()
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

app.listen(5000, "0.0.0.0", () =>
  console.log("server is running on port 5000")
);