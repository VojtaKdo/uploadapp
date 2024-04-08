const path = require("path");
const multer = require("multer");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../public/images"))    //Spojení dvou pathů
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});

const filter = (req, file, cb) => {
  file.mimetype === "image/jpeg" ||     //ternární operátor
  file.mimetype === "image/png" ||
  file.mimetype === "image/gif" ||
  file.mimetype === "image/webm"
  ? cb(null, true)
  : cb(null, false);
}

exports.upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10,
    },
    fileFilter: filter
})