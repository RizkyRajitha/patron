const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userDonatorSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    dropDups: true
  },

  firstName: {
    type: String
  },

  lastName: {
    type: String
  },

  activeState: {
    type: Boolean,
    default: true
  },

  hash: {
    type: String
  },

  phone: {
    type: String
  },
  donations: [
    {
      requesterId: { type: String },
      requestid: { type: String },
      amount: { type: String },
      donatedAt: { type: String }
    }
  ]
});

const Donator = mongoose.model("Donator", userDonatorSchema);

module.exports = Donator;
