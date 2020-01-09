const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");
const bp = require("body-parser");
app.use(cors());
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
app.use(require("morgan")("dev"));

const port = process.env.PORT || 5000;
mongoose.Promise = global.Promise;
//"mongodb://127.0.0.1:27017/authdb" ||
const mongodbAPI = "mongodb://127.0.0.1:27017/patronDB";
app.use(require("morgan")("dev"));

var jwthelper = (req, res, next) => {
  console.log("helper .....");
  const token = req.headers.authorization;
  //  req.body.token || req.query.token || req.headers['x-access-token']
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, jwtsecret, function(err, decoded) {
      if (err) {
        console.log(err);

        return res
          .status(401)
          .json({ error: true, message: "unauthorized_access" });
      }
      if (decoded.type === "regular") {
        console.log("helper oK");

        req.id = decoded.id;

        newview
          .save()
          .then(result => {})
          .catch(err => {
            console.log(err);
          });
        next();
      } else {
        return res
          .status(401)
          .json({ error: true, message: "unauthorized_access" });
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      error: true,
      message: "no_token_provided."
    });
  }
};

app.use("/auth", require("./routes/auth/auth.router")); //dont add jwt middleware
// app.use("/reg", require("./routes/register/register.router")); //dont add jwt middleware

app.use("/api", require("./routes/api/api.router"));

try {
  mongoose.connect(
    mongodbAPI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    err => {
      if (!err) console.log("connected to mongodb sucsessfully" + "👍");
    }
  );
} catch (error) {
  console.log(err);
}

app.listen(port, () => {
  console.log("listning on " + port);
});
