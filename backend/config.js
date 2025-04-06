require("dotenv").config(); // make sure this is at the top

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = { JWT_SECRET };
