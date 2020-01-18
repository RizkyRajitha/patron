const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");
const bp = require("body-parser");
const dotenv = require("dotenv");
const jwtverifier = require("./middlewares/jwtverifier");

dotenv.config();
app.use(cors());
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
app.use(require("morgan")("dev"));

const port = process.env.PORT || 5000;
mongoose.Promise = global.Promise;

// const mongodbAPI = "mongodb://127.0.0.1:27017/patronDB";
const mongodbAPI = process.env.DB_CONN || "mongodb://127.0.0.1:27017/patronDB";
app.use(require("morgan")("dev"));

// login
app.use("/auth", require("./routes/auth/auth.router")); //dont add jwt middleware
// register
app.use("/reg", require("./routes/register/register.router")); //dont add jwt middleware

app.use("/api", jwtverifier, require("./routes/api/api.router"));

app.use(
  "/upload",
  // jwtverifier,
  require("./routes/fileupload/fileupload.router")
);

//Middleware for JWT verification
app.get("/get", jwtverifier, (req, res) => {
  res.send({ messge: "From private Route" });
});

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
