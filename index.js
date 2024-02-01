const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = process.env.PORT || 5000;

const usersRouter = require("./routes/Users.");
const roleRouter = require("./routes/roles");
const orderRouter = require("./routes/Orders");
const verfiyRouter = require("./routes/VerifyEmail");
app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/roles", roleRouter);
app.use("/orders", orderRouter);
app.use("/verify", verfiyRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
