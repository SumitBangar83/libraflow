import express from 'express';
const router = express.Router();
import { checkIn, checkOut, getAttendanceHistory, getLiveAttendance } from '../controllers/AttendanceController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.post('/checkin', protect, checkIn);
router.post('/checkout', protect, checkOut);

router.get('/history/:userId', protect, getAttendanceHistory); // User can get own, admin can get any
router.get('/live', protect, admin, getLiveAttendance); // Admin only

export default router;
