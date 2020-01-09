const Requstor = require("../../models/usersRequesters");

exports.getposts = (req, res) => {
  console.log(res.body);
  res.send("ok");
};

exports.newpost = (req, res) => {
  console.log(res.body);
  //   res.send("ok");

  var newusr = new Requstor({
    email: "hihi",
    nicNumber: "haha",
    firstName: "hoho",

    lastName: "uuuu", 

    hash: "uuuu",
    address: "uuuu",
    phone: "uuuu",
    distric: "uuuu",
    province: "uuuu"
  });

  newusr
    .save()
    .then(result => {
      console.log(result);
      res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
};
