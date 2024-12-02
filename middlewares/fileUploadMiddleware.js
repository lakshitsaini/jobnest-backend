//For handling files uploads using multer

const multer = require("multer");
const path = require("path");
const fs = require("fs");

//configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "";

    if (file.fieldname === "profilePhoto") {
      uploadPath = "upload/photo";
    } else if (file.fieldname === "resume") {
      uploadPath = "upload/resume";
    } else if (file.fieldname === "coverletter") {
      uploadPath = "upload/coverletter";
    }

    //ensure the directory exists

    const fullPath = path.join(__dirname, "../", uploadPath);

    fs.mkdirSync(fullPath, { recursive: true });

    cb(null, fullPath);
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); //save the file with timestamp
  },
});

//File filter to accept only certain types of files

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG and PDF FILES are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, //5MB limit for file size
  fileFilter: fileFilter,
});

module.exports = upload;
