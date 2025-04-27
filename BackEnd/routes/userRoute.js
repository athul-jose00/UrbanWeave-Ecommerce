import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  verifyEmail,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addProfileImg,
  getUserDetails,
  getUserDashboard
} from "../controllers/userController.js";
import adminAuth from '../middleware/adminAuth.js';
import authUser from "../middleware/auth.js";
import upload from '../middleware/multer.js';

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.get("/verify-email", verifyEmail);
userRouter.post("/update-profile-image",authUser,upload.single("profileImg"),addProfileImg)
userRouter.get("/details", authUser, getUserDetails);
userRouter.get("/user-dashboard", authUser, getUserDashboard);


//admin actions
userRouter.get("/admin/users", adminAuth, getAllUsers);
userRouter.get("/admin/users/:id", adminAuth, getUserById);
userRouter.put("/admin/users/:id", adminAuth, updateUser);
userRouter.delete("/admin/users/:id", adminAuth, deleteUser);



export default userRouter;
