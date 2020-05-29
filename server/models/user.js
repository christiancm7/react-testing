const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

// On save hook , encrpyt password
userSchema.pre("save", function (next) {
  const user = this;

  // Generate a salt then run callback
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    // hash(encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }
      // Overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

// Create the model class
const ModelClass = mongoose.model("user", userSchema);

// Export the model
module.exports = ModelClass;
