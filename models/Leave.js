import mongoose from "mongoose";

const LeaveSchema = mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  appliedAt: { type: Date, default: Date.now },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  reviewedAt: { type: Date },
});

const Leave = mongoose.model("Leave", LeaveSchema);

export default Leave;
