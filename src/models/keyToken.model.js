"use strict";

const { model, Schema, Types, default: mongoose } = require("mongoose");
const DOCUMENT_NAME = "Key ";
const COLLETION_NAME = "Keys";
var shopSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Shop",
    },
    publicKey: {
      type: String,
      require: true,
    },
    privateKey: {
      type: String,
      require: true,
    },
    refressToken: {
      type: Array,
      default: [],
    },
  },
  {
    timeseries: true,
    collection: COLLETION_NAME,
  },
);

module.exports = mongoose.model(DOCUMENT_NAME, shopSchema);
