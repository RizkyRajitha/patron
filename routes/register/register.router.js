const express = require("express");
const router = express.Router();

const registerRoutes = require("./register.routes");

router.post("/registerRequester", registerRoutes.registerRequester);
router.post("/registerdonator", registerRoutes.registerDoantor);
// router.post("/newpost", apiroutes.newpost);

module.exports = router;
