const User = require("../models/user");

exports.signup = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }
    // If a user with the req email does exist return an error
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }

    if (!email || !password) {
      return res
        .status(422)
        .send({ error: "You must provide email and password" });
    }

    // If a user with email does not exist, create and save user record
    const user = new User({
      email: email,
      password: password,
    });

    user.save(function (err) {
      if (err) {
        return next(err);
      }

      // Respond tp request indicating the user was created
      res.json({ sucess: "true" });
    });
  });
};
