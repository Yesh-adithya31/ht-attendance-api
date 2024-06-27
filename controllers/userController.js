import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Employee from "../models/Employee.js";

// @desc Auth Employee & get token
// @route POST /api/employees/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Employee.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      status: 201,
      message: "Success",
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        profile: user.profile,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } else {
    res.json({
      status: 401,
      message: "Invalid email or password",
    });
  }
});

// @desc Register a new Employee
// @route POST /api/employees
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userExists = await Employee.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Employee already exists.");
  }

  const user = await Employee.create({
    firstName,
    lastName,
    email,
    password
  });

  if (user) {
    res.json({
      status: 201,
      message: "Success",
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } else {
    res.json({
      status: 400,
      message: "Employee not found.",
    });
  }
});

// @desc GET Employee Details
// @route GET /api/employees
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.user._id);

  if (!employee) {
    return res.json({
      status: 404,
      message: "Employee not found.",
    });
  }

  if (employee) {
    res.json({
      status: 201,
      message: "Success",
      data: employee,
    });
  } else {
    res.json({
      status: 404,
      message: "Employee not found."
    });
  }
});

// @desc UPDATE user profile
// @route PUT /api/employees/profile
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await Employee.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    user.role = req.body.role || user.role;
    user.profile = req.body.profile || user.profile;

    const updatedUser = await user.save();

    res.json({
      status: 201,
      message: "Success",
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } else {
    res.json({
      status: 404,
      message: "Employee not found."
    });
  }
});

// @desc GET all users
// @route GET /api/users
// @access private/Admin
// const getUsers = asyncHandler(async (req, res) => {
//   const users = await User.find({});
//   res.json(users);
// });

// @desc DELETE user
// @route GET /api/users/:id
// @access private/Admin
// const deleteUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);
//   if (user) {
//     await user.remove();
//     res.json("User Removed");
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });

// @desc GET user by Id
// @route GET /api/employee/:id
// @access private/Admin
const getUsersById = asyncHandler(async (req, res) => {
  const user = await Employee.findById(req.params.id).select("-password");
  if (user) {
    res.json({
      status: 201,
      message: "Success",
      data: user
    });
  } else {
    res.json({
      status: 404,
      message: "Employee not found."
    });
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsersById,
};
