const Jimp = require("jimp");

const jimpImageResizer = async (req, res, next) => {
  const { path: tempUpload } = req.file;

  Jimp.read(tempUpload)
    .then((image) => {
      return image.resize(250, 250).write(tempUpload);
    })
    .then(() => {
      next();
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { jimpImageResizer };
