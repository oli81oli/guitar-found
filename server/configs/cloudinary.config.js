const cloudinary = require('cloudinary')
const  cloudinaryStorage  = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const storage = cloudinaryStorage({
    cloudinary,
    folder: 'Home',
    allowedFormats: ['jpg', 'png'],
    filename: function (req, res, cb) {
        cb(null, res.originalname);
    }
});

const parser = multer({ storage: storage });

module.exports = parser