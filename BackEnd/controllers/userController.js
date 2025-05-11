import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";
import orderModel from "../model/orderModel.js";

// Generate email verification token
const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

// Create email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//Route for User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist.Please create an Account",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Password." });
    }

    if (!user.isVerified) {
      return res.json({
        success: false,
        message: "Please verify your email before logging in",
      });
    }
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Route for User Resgistraion
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check is user exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User Already exists" });
    }

    //validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please Enter a Valid Email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please Enter a password longer than 8 characters",
      });
    }

    //securing user pass
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    // Generate verification token
    const verificationToken = generateVerificationToken();
    const verificationTokenExpires = Date.now() + 3600000;

    const newUser = new userModel({
      name,
      email,
      password: hashPass,
      isVerified: false,
      verificationToken,
      verificationTokenExpires,
    });
    const user = await newUser.save();

    // Send verification email
    const verificationUrl = `${process.env.BASE_URL}/api/user/verify-email?token=${verificationToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "🎉 Verify Your Email - UrbanWeave",

      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          <h2 style="color: #333;">Welcome to <span style="color: #4f46e5;">UrbanWeave</span> 👋</h2>
          <p style="font-size: 16px; color: #555;">Thank you for signing up! To get started, please verify your email address by clicking the button below:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 16px;">Verify Email</a>
          </div>
    
          <p style="font-size: 14px; color: #777;">If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="font-size: 14px; word-break: break-word;"><a href="${verificationUrl}" style="color: #4f46e5;">${verificationUrl}</a></p>
    
          <p style="font-size: 14px; color: #999;">Note: This link will expire in 1 hour for your security.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message:
        "Registration successful! Please check your email to verify your account.",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for Email Verification
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    const user = await userModel.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }

    // Update user verification status
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    const authToken = createToken(user._id);

    res.redirect(
      `${process.env.BASE_URL}/login?verified=true&message=${encodeURIComponent(
        "Email verified successfully! Please log in."
      )}`
    );
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Route for Admin Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res.json({ success: true, users });
  } catch (error) {
    res.json({ success: false, message: "Error fetching users" });
  }
};

// Get single user by ID
const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching user" });
  }
};

// Update user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const updateData = { name, email };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .select("-password");

    if (!updatedUser) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.json({ success: false, message: "Error updating user" });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: "Error deleting user" });
  }
};

/*
const addProfileImg = async (req, res) => {
  try {
    const profileImg = req.file; // since you're using upload.single("profileImg")
    if (!profileImg) {
      return res.json({ success: false, message: "No image file provided" });
    }

    const result = await cloudinary.uploader.upload(profileImg.path, {
      resource_type: "image",
    });
    
    
    const imageUrl = result.secure_url;

    await userModel.findByIdAndUpdate(
      req.body.id,
      { profileImage: imageUrl },
    );
    console.log("Image URL:", imageUrl);
console.log("User ID:", req.body.userId);

    res.json({
      success: true,
      message: "Profile image updated successfully",
     
    });
  } catch (error) {
    console.log("Upload error:", error);
    res.json({ success: false, message: "Server error", error: error.message });
  }
};
*/

const addProfileImg = async (req, res) => {
  try {
    const { userId } = req;

    if (!userId) {
      return res.json({ success: false, message: "User ID not found" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const file = req.file;
    if (!file) {
      return res.json({ success: false, message: "No file uploaded" });
    }

    const uploadResult = await cloudinary.uploader.upload(file.path, {
      resource_type: "image",
    });

    const result = uploadResult.secure_url;
    const imgData = { profileImage: result };

    await userModel.findByIdAndUpdate(userId, imgData);

    console.log("Image URL:", result);
    console.log("User ID:", userId);

    res.json({
      success: true,
      message: "Profile image updated successfully",
      imageUrl: result,
    });
  } catch (error) {
    console.log("Upload error:", error);
    res.json({ success: false, message: "Server error", error: error.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("-password");
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.json({ success: false, message: "Server error", error: error.message });
  }
};

export const getUserDashboard = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Fetch delivered orders only
    const deliveredOrders = await orderModel
      .find({
        userId: req.userId,
        status: "Delivered",
      })
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      message: "User dashboard data fetched successfully",
      data: {
        user,
        totalDeliveredOrders: deliveredOrders.length,
        deliveredOrders,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching user dashboard",
    });
  }
};

export {
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
};
