"use strict";

const keyTokenModel = require("../models/keyToken.model");

class KeyTokenService {
  static createToken = async ({ userId, publicKey, privateKey }) => {
    try {
      const token = await keyTokenModel.create({
        user: userId,
        publicKey: publicKey,
        privateKey: privateKey,
      });
      if (token) {
        return token ? token.publicKey : null;
      }
    } catch (err) {
      return err.message;
    }
  };
}

module.exports = KeyTokenService;
