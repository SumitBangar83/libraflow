import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    slot: { type: Schema.Types.ObjectId, ref: 'Slot', required: true },
    checkInTime: { type: Date, default: Date.now },
    checkOutTime: { type: Date, default: null },
    date: { type: Date, required: true }
}, { timestamps: true });

const Attendance =  mongoose.model('Attendance', AttendanceSchema);

export default Attendance;