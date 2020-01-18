const Requstor = require("../../models/usersRequesters");

exports.newpostfiles = (req, res) => {
  console.log(req.files);
  console.log(req.id);

  console.log("new post");

  res.send("ok");

  //   Requstor.findOneAndUpdate(
  //     { _id: req.id },
  //     {
  //       $push: {
  //         requests: {
  //           title: req.body.title,
  //           description: req.body.description,
  //           estimatedBudget: req.body.estimatedBudget,
  //           donationTypeAccepted: req.body.donationTypeAccepted,
  //           createdAt: new Date().toISOString() //timestamp
  //         }
  //       }
  //     }
  //   )
  //     .then(doc => {
  //       console.log(doc);
  //       res.send(doc);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
};
