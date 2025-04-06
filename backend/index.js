const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const app = express();
const { PORT } = require("./config");

// ✅ CORS Configuration (no trailing slash)
const corsOptions = {
  origin: ["http://localhost:5173", "https://pay-ment-one.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json()); // Enable JSON request parsing

// ✅ Import and use all routes
const rootRouter = require("./routes/index");
app.use("/api/v1", rootRouter);

// ✅ Start server
app.listen(PORT || 3000, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT || 3000}`);
});
