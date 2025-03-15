// routes/profileRoutes.js
const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/auth"); // JWT verification middleware
const profileController = require("../controllers/Users/ProfileController"); // Profile controller
const multer = require("multer");
const path = require("path");

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure 'uploads/' exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

// Multer middleware with file size and type validation
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB size limit
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  },
});

// Get current user profile (protected route)
router.get("/me", authenticateJWT, profileController.getProfile);

// Update user profile (protected route with file upload)
router.put("/profile", authenticateJWT, upload.single("profilePic"), profileController.updateProfile);

module.exports = router;