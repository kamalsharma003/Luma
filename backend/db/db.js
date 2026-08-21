const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () => {
  return mongoose.connect(process.env.MONGODB_URL);
};

module.exports = connectDB;