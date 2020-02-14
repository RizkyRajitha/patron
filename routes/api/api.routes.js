const Requstor = require("../../models/usersRequesters");
const Donator = require("../../models/usersDonator");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const ObjectID = require("mongodb").ObjectID;
const uuidv4 = require("uuid/v4");

cloudinary.config({
  cloud_name: process.env.clodinary_cloud_name || "",
  api_key: process.env.clodinary_api_key || "",
  api_secret: process.env.clodinary_api_secret || ""
});

exports.donatorDashboard = async (req, res) => {
  console.log("getting posts");

  var donationSum = 0;

  Donator.findOne({ _id: req.id })
    .then(doc => {
      doc.donations.forEach(element => {
        donationSum += parseFloat(element.amount);
      });

      var payload = {
        donations: donationSum,
        name: doc.firstName
      };

      res.json(payload);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getposts = async (req, res) => {
  console.log("getting posts");

  Requstor.findOne({ _id: req.id })
    .then(doc => {
      var payload = {
        requests: doc.requests,
        name: doc.firstName
      };

      res.json(payload);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getallposts = (req, res) => {
  Requstor.find({ activeState: true })
    .then(docs => {
      var payload = [];

      docs.forEach(element => {
        element.requests.forEach(ele2 => {
          var temppay = {
            // _id: ele2._id,
            requestid: ele2.requestid,
            title: ele2.title,
            description: ele2.description,
            estimatedBudget: ele2.estimatedBudget,
            availableBudget: ele2.availableBudget,
            donationTypeAccepted: ele2.donationTypeAccepted,
            createdAt: ele2.createdAt,
            images: ele2.images,
            username: element.firstName + " " + element.lastName,
            requesterId: element._id
          };
          payload.push(temppay);
        });
      });

      res.json({ requests: payload });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.newpost = (req, res) => {
  console.log(req.body);
  console.log(req.id);
  console.log(req.files);

  console.log("new post");

  const postid = uuidv4();

  var promiseArr = [];

  req.files.forEach((element, index) => {
    console.log("path - " + element.path);
    promiseArr.push(fileupcloud(postid + "_" + index, element.path));
  });

  Promise.all(promiseArr)
    .then(result => {
      console.log(result);
      Requstor.findOneAndUpdate(
        { _id: req.id },
        {
          $push: {
            requests: {
              requestid: postid,
              title: req.body.title,
              description: req.body.description,
              estimatedBudget: req.body.estimatedBudget,
              availableBudget: req.body.estimatedBudget,
              donationTypeAccepted: req.body.donationTypeAccepted,
              createdAt: new Date().toISOString(), //timestamp
              images: result
            }
          }
        }
      )
        .then(doc => {
          console.log(doc);
          res.json({ msg: "success" });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.donate = (req, res) => {
  console.log(req.body);
  console.log(req.id);

  Donator.findOneAndUpdate(
    { _id: req.id },
    {
      $push: {
        donations: {
          requesterId: req.body.requesterId,
          donatedAt: new Date(),
          requestid: req.body.requestid,
          amount: req.body.amount
        }
      }
    }
  )
    .then(doc => {
      console.log(doc);

      Requstor.findOne({
        _id: req.body.requesterId
        // "requests.requestid": req.body.requestid
      })
        .then(doc5 => {
          console.log(doc5);
          var nowbudg;

          for (let index = 0; index < doc5.requests.length; index++) {
            const element33 = doc5.requests[index];

            if (element33.requestid === req.body.requestid) {
              nowbudg = element33.availableBudget;
            }
          }

          console.log(nowbudg);

          Requstor.findOneAndUpdate(
            {
              _id: req.body.requesterId,
              "requests.requestid": req.body.requestid
            },
            {
              $set: {
                "requests.$.availableBudget":
                  parseInt(nowbudg) - parseInt(req.body.amount)
              }
            }
            // { new: true
          )
            .then(doc3 => {
              console.log(doc3);
              res.json({ msg: "success" });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });

      // console.log(doc2);
      res.json({ msg: "success" });
    })
    .catch(err => {
      console.log(err);
    });
};

const fileupcloud = function(filename, path) {
  console.log("cloud");
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      {
        tags: "basic_sample",
        folder: "patron/",
        public_id: filename,
        sign_url: true
      },
      function(err, cvuploaddata) {
        console.log();
        console.log("** File Upload");
        if (err) {
          console.warn(err);
          reject(err);
        }
        console.log(
          "* public_id for the uploaded pdf is generated by Cloudinary's service."
        );
        console.log("* " + cvuploaddata.public_id);
        console.log("* " + cvuploaddata.url);

        var cvhttps =
          cvuploaddata.url.slice(0, 4) +
          "s:" +
          cvuploaddata.url.slice(5, cvuploaddata.url.length);

        resolve(cvhttps);

        fs.unlinkSync(path);
      }
    );
  });
};
