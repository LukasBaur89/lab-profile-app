const router = require('express').Router();
const User = require('../models/User.model');
// auth middleware
const isLoggedOut = require('../middleware/isLoggedOut');
const isLoggedIn = require('../middleware/isLoggedIn');
// image upload
const fileUploader = require('../config/cloudinary.config');

router.put('/users', isLoggedIn, async (req, res, next) => {
  try {
    const { id, image } = req.body;
    const user = await User.findByIdAndUpdate(id, { image }, { new: true });
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.get('/users', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.find();
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/upload',
  fileUploader.single('imageUrl'),

  (req, res, next) => {
    console.log('File', req.file);
    if (!req.file) {
      next(new Error("File didn't upload"));
      return;
    }
    // get url of uploaded file and send as response
    res.json({ fileUrl: req.file.path });
  }
);

module.exports = router;
