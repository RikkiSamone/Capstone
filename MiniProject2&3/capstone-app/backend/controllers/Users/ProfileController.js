const multer = require('multer');
const path = require('path');
const User = require('../../models/users'); 
const express = require('express');

// Set up Multer for file upload
const uploadDir = path.join(__dirname, '../../Uploads'); // Ensure this is the correct path for your uploads folder

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // The folder where files will be uploaded
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Set unique file name
  }
});

// Multer setup with limits and file type validation
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB file size limit
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

// Get current user profile
exports.getProfile = async (req, res) => {
  console.log('User ID from token:', req.userId); // Debugging
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Send profile data along with profile picture URL if available
    res.json({
      ...user.toObject(),
      profilePic: user.profilePic ? `${req.protocol}://${req.get("host")}/uploads/${user.profilePic}` : null,
    });
  } catch (err) {
    console.error("Error fetching user profile", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update user profile
exports.updateProfile = [
  upload.single('profilePic'), // Handle file upload for profile picture
  async (req, res) => {
    console.log('Request Body:', req.body); // Log to check form data
    console.log('Uploaded File:', req.file); // Log to check file data
    
    try {
      const { bio, grade, academicGoals } = req.body; // Get user data from body
      let updatedData = { bio, grade, academicGoals };

      // If a profile picture was uploaded, include the file path
      if (req.file) {
        updatedData.profilePic = req.file.filename;
      }
              console.log('Updated Data:', updatedData); // Log updated data

      // Find the user and update their fields
      const updatedUser = await User.findById(req.userId);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update the user's data with new profile information
      Object.keys(updatedData).forEach((key) => {
        if (updatedData[key] !== undefined) {
          updatedUser[key] = updatedData[key];
        }
      });

        await updatedUser.save();
              console.log('Updated User:', updatedUser); // Log the updated user
      res.json(updatedUser); // Return the updated user profile
    } catch (err) {
      console.error("Error updating user profile", err);
      if (err.message.includes('Only image files are allowed!')) {
        return res.status(400).json({ message: err.message });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
];

// Serve static files from the 'uploads' folder
const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'Uploads'))); // Make sure uploads are accessible via the web