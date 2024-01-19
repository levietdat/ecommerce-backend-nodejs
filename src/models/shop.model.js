"use strict";

const { model, Schema, Types, default: mongoose } = require("mongoose");
const DOCUMENT_NAME = "Shop";
const COLLETION_NAME = "Shops";
var shopSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 150,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    verify: {
      type: Schema.Types.Boolean,
      default: false,
    },
    roles: {
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
