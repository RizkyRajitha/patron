const express = require("express");
const router = express.Router();

const apiroutes = require("./fileupload.routes");
const multer = require("multer");
var storage = multer.memoryStorage();
const fileup = multer({ storage: storage });

router.post("/newpostfiles", fileup.array("resobj"), apiroutes.newpostfiles);

module.exports = router;
