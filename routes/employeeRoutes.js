import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authUser, getUserProfile, getUsersById, registerUser, updateUserProfile } from "../controllers/userController.js";

const router = express.Router();

// System Users Routes
router.route("/").post(registerUser).get(protect, getUserProfile);
router.post("/login", authUser);
router.route("/profile").put(protect, updateUserProfile);
router.route("/:id").get(getUsersById);

export default router;
