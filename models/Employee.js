import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const EmployeeSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["employee", "manager", "admin"],
    default: "employee",
  },
  profile: {
    personal: {
      dob: { type: Date },
      address: { type: String },
      phone: { type: String },
    },
    professional: {
      jobTitle: { type: String },
      department: { type: String },
      dateOfJoining: { type: Date },
    },
    documents: [{ type: String }],
  },
//   team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

EmployeeSchema.methods.matchPassword  = async function(enteredPassword) {
    return await bcrypt.compare( enteredPassword, this.password)
}

EmployeeSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    
    const salt = await bcrypt.genSalt(10)
    this.password = bcrypt.hash(this.password, salt)
})

const Employee = mongoose.model("Employee", EmployeeSchema);

export default Employee;
