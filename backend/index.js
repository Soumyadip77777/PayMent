const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load env vars

const app = express();
const { PORT } = require("./config");

// CORS Configuration
const corsOptions = {
  origin: ["http://localhost:5173", "https://your-frontend-url.com"], // replace with your frontend URLs
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

const rootRouter = require("./routes/index");
app.use("/api/v1", rootRouter);

app.listen(PORT || 3000, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT || 3000}`);
});
