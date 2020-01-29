const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Requstor = require("../../models/usersRequesters");
const { loginValidator } = require("../../validators/authValidation");
const JWT_SECRET = process.env.JWT_SECRET || "demo";
//////////////////////////////////////////////////LOGIN
exports.loginRequester = async (req, res) => {
  // console.log('Login API');

  // Validate data before login
  // const { error } = loginValidator(req.body);
  // if (error) {
  //   console.log(error.details[0].message);
  //   return res.status(400).json({ message: error.details[0].message });
  // }

  // Check if user is in the DB
  const dbUser = await Requstor.findOne({ email: req.body.email });
  if (!dbUser) {
    console.error("Email not found!");
    return res.status(400).json({ message: "invalidcredentials" });
  }

  // Check pass
  const validPass = await bcrypt.compare(req.body.password, dbUser.hash);
  if (!validPass) {
    console.error("Password is incorrect!");
    return res.status(400).json({ message: "invalidcredentials" });
  }

  //If password is valid Login!
  //Generate JWT
  const token = jwt.sign({ _id: dbUser._id }, JWT_SECRET, {
    expiresIn: "7d",
    issuer: "Patron"
  });
  res.header("auth-token", token).json({ message: "success", token: token });
  //   res.json({ token: token });

  // res.send({message: 'Logged in!'});
};
