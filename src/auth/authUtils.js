"use strict";
const JWT = require("jsonwebtoken");
const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    //accesstoken
    const accessToken = await JWT.sign(payload, publicKey, {
      expiresIn: "2 days",
    });

    //refresh token
    const refressToken = await JWT.sign(payload, privateKey, {
      expiresIn: "7 days",
    });

    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.error(`error verifying ${err}`);
      } else {
        console.log(decode);
      }
    });

    return {
      accessToken,
      refressToken,
    };
  } catch (err) {}
};

module.exports = {
  createTokenPair,
};
