const multer = require("multer");
const path = require("path");

const temp = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, temp);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2000,
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = {
  upload,
};
