const bcrypt = require("bcryptjs");
const Requstor = require("../../models/usersRequesters");
const { registerValidator } = require("../../validators/authValidation");
const { send } = require("../../emailer/mailer");

//////////////////////////////////////////////////////REGISTER
exports.registerRequester = async (req, res) => {
  // console.log('Register API');

  //Validate req data
  //Extract error object from the validation object
  //null if valid
  const { error } = registerValidator(req.body);
  if (error) {
    console.log(error.details[0].message);
    return res.status(400).json({ message: error.details[0].message });
  }

  //Password hashing
  const salt = bcrypt.genSaltSync();
  const hashed = bcrypt.hashSync(req.body.password, salt);

  console.log(req.body);

  //If valid data & No existing user with email, create New User in DB, & send welcome email
  const newUser = new Requstor({
    firstName: req.body.firstName,
    email: req.body.email,
    hash: hashed,
    nicNumber: req.body.nic
  });

  try {
    const savedUser = await newUser.save();
    console.log(`New user created: ${newUser.email}`);

    // Send welcome email to the new user
    const mailData = {
      email: req.body.email,
      name: req.body.firstName
    }

    const responseFromSendgrid = send(mailData);
    console.log(responseFromSendgrid);
    res.json({ user_id: savedUser._id, mailerResponse: responseFromSendgrid });

  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ message: "User is already in use!" });
    } else {
      console.log(err);
      console.error("DB save error");
    }
    // res.status(400).json(err);
  }
};
