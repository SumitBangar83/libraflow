import Attendance from '../models/Attendance';
import Slot from '../models/Slot';
// @desc    Check-in a user
// @route   POST /api/attendance/checkin
// @access  Private
const checkIn = async (req, res) => {
    const { slotId } = req.body;
    try {
        const slot = await Slot.findById(slotId);
        if (!slot || !slot.isActive) {
            return res.status(400).json({ message: 'Invalid or inactive slot' });
        }

        // Check if user is already checked in
        const existingAttendance = await Attendance.findOne({ user: req.user._id, checkOutTime: null });
        if (existingAttendance) {
            return res.status(400).json({ message: 'User is already checked in' });
        }

        const attendance = new Attendance({
            user: req.user._id,
            slot: slotId,
            date: new Date().setHours(0,0,0,0) // Store date only
        });

        const newAttendance = await attendance.save();
        res.status(201).json(newAttendance);

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Check-out a user
// @route   POST /api/attendance/checkout
// @access  Private
const checkOut = async (req, res) => {
    try {
        const attendance = await Attendance.findOne({ user: req.user._id, checkOutTime: null });
        if (!attendance) {
            return res.status(400).json({ message: 'User is not checked in' });
        }

        attendance.checkOutTime = new Date();
        const updatedAttendance = await attendance.save();
        res.json(updatedAttendance);

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get attendance history for a user
// @route   GET /api/attendance/history/:userId
// @access  Private
const getAttendanceHistory = async (req, res) => {
    try {
        // A user can only get their own history, unless they are an admin
        const userId = (req.user.role === 'admin') ? req.params.userId : req.user._id;

        const history = await Attendance.find({ user: userId }).populate('slot', 'name').sort({ checkInTime: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


// @desc    Get live attendance
// @route   GET /api/attendance/live
// @access  Private/Admin
const getLiveAttendance = async (req, res) => {
    try {
        const liveUsers = await Attendance.find({ checkOutTime: null })
            .populate('user', 'name email')
            .populate('slot', 'name');
        res.json(liveUsers);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export default { checkIn, checkOut, getAttendanceHistory, getLiveAttendance };
