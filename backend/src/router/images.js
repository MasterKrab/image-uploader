const express = require("express");
const router = express.Router();
const path = require("path");
const id = require("nanoid").nanoid;

// Multer
const multer = require("multer");

const dest = path.join(__dirname, "../public/images");

const storage = multer.diskStorage({
  destination: dest,
  filename: (req, file, callBack) => {
    callBack(
      null,
      `photo-${id()}${path.extname(file.originalname).toLowerCase()}`
    );
  },
});

const upload = multer({
  storage,
  dest,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, callBack) => {
    const regex = /jpeg|jpg|png|gif/;
    const mimetype = regex.test(file.mimetype);
    const extensionName = regex.test(path.extname(file.originalname));

    mimetype && extensionName
      ? callBack(null, true)
      : callBack("Error: File must be a valid image");
  },
}).single("image");

router.post("/upload", (req, res) => {
  upload(req, res, (error) => {
    if (error) {
      res.json({
        state: false,
        message: error.code === "LIMIT_FILE_SIZE" ? "Limit file size" : error,
      });
    } else {
      res.json({
        state: true,
        message: "Uploaded",
        image_url: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      });
    }
  });
});

module.exports = router;
