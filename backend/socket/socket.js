const { Server } = require('socket.io');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');

let io;

const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  }
  });

  io.use((socket, next) => {
    try {
      const token = cookie.parse(socket.handshake.headers.cookie || '').token;
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = userId.toString();
      next();
    } catch {
      next(new Error('Unauthorized socket connection'));
    }
  });

  io.on('connection', (socket) => {
    socket.join(socket.userId);
    console.log(`[Connected] user ${socket.userId}, socket ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`[Disconnected] user ${socket.userId}, socket ${socket.id}`);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) throw new Error('Socket.IO has not been initialized');
  return io;
};

module.exports = { initializeSocket, getIO };
