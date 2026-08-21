const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const express = require("express");
const connectDB = require("./db/db");
const errorMiddleware = require("./middlewares/error.middleware");
const userRoute = require("./routes/user.route");
const cookieParser = require('cookie-parser');
const messageRoute = require('./routes/message.route');
const cors = require("cors");
const http = require("http");
const { initializeSocket } = require("./socket/socket");

const app = express();
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));


app.use(cookieParser())

app.use(express.json());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute)

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    const server = http.createServer(app);
    initializeSocket(server);
    server.listen(PORT, () => {
      console.log(`server running on ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to MongoDB", error);
    process.exit(1);
  }
};

startServer();





