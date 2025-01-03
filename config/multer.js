const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create a directory for storing uploaded images if it doesn't exist
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure storage options for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Specify the folder to store the images
  },
  filename: (req, file, cb) => {
    // Generate a unique filename based on the current timestamp
    cb(null, Date.now() + path.extname(file.originalname)); // Ex: 1629349298721.jpg
  }
});

// Initialize multer with storage and file type filter
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true); 
    } else {
      cb(new Error('Only JPEG, JPG, or PNG images are allowed'));
    }
  }
});

module.exports = upload;
