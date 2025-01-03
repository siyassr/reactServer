const upload  = require("../config/multer")


const uploadAvatar = (req, res) => {
    if (req.file) {
      res.json({
        message: 'File uploaded successfully',
        file: req.file
      });
    } else {
      res.status(400).json({
        message: 'No file uploaded or invalid file format'
      });
    }
  };
  
  module.exports = {
    uploadAvatar
  };