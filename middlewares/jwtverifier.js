const jwt = require("jsonwebtoken");
const jwtsecret = process.env.JWT_SECRET || "demo";

module.exports = jwthelper = (req, res, next) => {
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

      req.id = decoded._id;
      next();
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
