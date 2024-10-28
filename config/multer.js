const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'product-images', // Folder where the images will be stored in Cloudinary
        allowedFormats: ['jpeg', 'png', 'jpg'], // Allowed formats
    },
});

const upload = multer({ storage });

module.exports = upload;
