const express = require("express");
const router = express.Router();

const apiroutes = require("./api.routes");

router.get("/getposts", apiroutes.getposts);
router.post("/newpost", apiroutes.newpost);

module.exports = router;
