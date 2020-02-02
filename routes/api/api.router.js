const express = require("express");
const router = express.Router();
const path = require("path");

const apiroutes = require("./api.routes");

const multer = require("multer");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    var path2img = path.resolve(__dirname, "assets");
    cb(null, path2img); // here we specify the destination . in this case i specified the current directory
  },
  filename: function(req, file, cb) {
    console.log(file);
    cb(null, file.originalname); // here we specify the file saving name . in this case i specified the original file name
  }
});
const fileup = multer({ storage: storage });

router.get("/getposts", apiroutes.getposts);
router.get("/getallposts", apiroutes.getallposts);
router.post("/newpost", fileup.array("resobj"), apiroutes.newpost);

module.exports = router;
