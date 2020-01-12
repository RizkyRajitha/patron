const Requstor = require("../../models/usersRequesters");

exports.getposts = async (req, res) => {
  console.log("getting posts");

  Requstor.findOne({ _id: req.id })
    .then(doc => {
      res.json(doc.requests);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.newpost = (req, res) => {
  console.log(req.body);
  console.log(req.id);

  console.log("new post");

  Requstor.findOneAndUpdate(
    { _id: req.id },
    {
      $push: {
        requests: {
          title: req.body.title,
          description: req.body.description,
          estimatedBudget: req.body.estimatedBudget,
          donationTypeAccepted: req.body.donationTypeAccepted,
          createdAt: new Date().toISOString() //timestamp
        }
      }
    }
  )
    .then(doc => {
      console.log(doc);
      res.send(doc);
    })
    .catch(err => {
      console.log(err);
    });
};
