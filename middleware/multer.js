const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img");
  },
  filename: (req, file, cb) => {
    let ext = file.originalname.substr(file.originalname.lastIndexOf("."));
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

module.exports = upload = multer({ storage: storage });
