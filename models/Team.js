import mongoose from "mongoose";

const TeamSchema = mongoose.Schema({
  name: { type: String, required: true },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Team = mongoose.model("Team", TeamSchema);

export default Team;
