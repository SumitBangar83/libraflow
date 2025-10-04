import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import authRoutes from './routes/AuthRoutes.js';
import attendanceRoutes from './routes/AttendanceRoutes.js';
import userRoutes from './routes/UserRoutes.js';
const app = express();

app.use(bodyParser.json())
app.use(cors());
dotenv.config();
app.use('/api/auth', authRoutes)
app.use('/api/attendance', attendanceRoutes)
app.use('/api/users', userRoutes)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


app.get('/', () => {
    console.log("hello")
})
app.listen(process.env.PORT || 3000, () => {
    console.log(`listen port ${process.env.PORT}`);
})