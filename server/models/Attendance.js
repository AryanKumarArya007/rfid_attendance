import mongoose, {Schema} from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  uid: String,
  name: String,
  timestamp: { type: Date, default: Date.now }
});

export const Attendance = mongoose.model("Attendance", AttendanceSchema);