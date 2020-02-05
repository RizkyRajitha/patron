const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userRequesterSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    dropDups: true
  },
  nicNumber: {
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
  address: {
    type: String
  },
  phone: {
    type: String
  },
  distric: {
    type: String
  },
  province: {
    type: String
  },
  requests: [
    {
      requestid: { type: String },
      title: { type: String },
      description: { type: String },
      estimatedBudget: { type: String },
      availableBudget: { type: String },
      donationTypeAccepted: { type: String },
      createdAt: { type: String },
      images: [],
      supportingDocuments: []
    }
  ]
});

const Requester = mongoose.model("Requester", userRequesterSchema);

module.exports = Requester;
