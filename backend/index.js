

const express = require("express");
const cors = require("cors");

const app = express(); // Moved up here before using it
require("dotenv").config(); // Load env vars

const { PORT } = require("./config");

app.use(express.json());
app.use(cors());

const rootRouter = require("./routes/index");

app.use("/api/v1", rootRouter);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
