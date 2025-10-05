import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import authRoutes from './routes/AuthRoutes.js';
import attendanceRoutes from './routes/AttendanceRoutes.js';
import userRoutes from './routes/UserRoutes.js';
import http from 'http'
import { Server } from 'socket.io';
const app = express()
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://adduceable-charissa-communistic.ngrok-free.dev",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

app.use(bodyParser.json())
app.use(cors());
dotenv.config();
app.use((req, res, next) => {
  req.io = io;
  next(); // Agle step par jaane ke liye 'next()' call karna zaroori hai
});

app.use('/api/auth', authRoutes)
app.use('/api/attendance', attendanceRoutes)
app.use('/api/users', userRoutes)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.get('/', () => {
  console.log("hello")
})
server.listen(process.env.PORT || 3000, () => {
  console.log(`listen port ${process.env.PORT}`);
})