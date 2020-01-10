const express = require("express");
const router = express.Router();
const authroutes = require("./auth.routes");

router.post("/login", authroutes.login);
router.post("/register", authroutes.register);
// router.post("/forgotpassword", authroutes.forgotPassword);
// router.post("/resetpassword", authroutes.resetpassword);

module.exports = router;
