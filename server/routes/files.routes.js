const express = require('express')
const router = express.Router()

const parser = require('../configs/cloudinary.config')

router.post('/upload', parser.single('image'), (req, res, next) => {

    if (!req.file) {
        next(new Error('No file uploaded!'))
        return;
    }

    res.json({ secure_url: req.file.secure_url })
})

module.exports = router