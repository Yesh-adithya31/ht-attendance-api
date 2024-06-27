import mongoose from "mongoose";

const AttendanceSchema = mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
  date: { type: Date, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date },
  workingHours: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["present", "absent", "onLeave"],
    default: "present",
  },
});

const Attendance = mongoose.model("Attendance", AttendanceSchema);

export default Attendance;
