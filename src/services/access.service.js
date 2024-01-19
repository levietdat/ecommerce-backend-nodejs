"use strict";
const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getIntoData } = require("../utils");
const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};
class AccessService {
  static signUp = async ({ email, password, name }) => {
    try {
      const holderShop = await shopModel.findOne({ email }).lean();
      if (holderShop) {
        return {
          code: "xxx",
          messsage: "Shop is already registered",
        };
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: hashPassword,
        roles: [RoleShop.SHOP],
      });

      if (newShop) {
        //create private,  publickey
        // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        //   modulusLength: 4096,
        //   publicKeyEncoding: {
        //     type: "pkcs1",
        //     format: "pem",
        //   },
        //   privateKeyEncoding: {
        //     type: "pkcs1",
        //     format: "pem",
        //   },
        // });
        // console.log(privateKey, publicKey);
        const privateKey = crypto.randomBytes(64).toString("hex");
        const publicKey = crypto.randomBytes(64).toString("hex");
        const keyStore = await KeyTokenService.createToken({
          userId: newShop._id,
          publicKey,
          privateKey,
        });

        if (!keyStore) {
          return {
            code: "xxx",
            messsage: "keyStore string err",
          };
        }
        const token = await createTokenPair(
          { userId: newShop._id, email },
          publicKey,
          privateKey,
        );
        console.log(`create token successfully`, token);

        return {
          code: 201,
          metadata: {
            shop: getIntoData({
              fields: ["_id", "email"],
              object: newShop,
            }),
            token,
          },
        };
      }
      return {
        code: 201,
        metadata: null,
      };
    } catch (err) {
      return {
        status: "xxx",
        messsage: err.message,
        status: "error",
      };
    }
  };
}

module.exports = AccessService;
