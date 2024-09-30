"use strict";

const {
  Types: { ObjectId },
} = require("mongoose");
const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }) => {
    try {
      // lv0
      // const tokens = await keytokenModel.create({
      //   user: userId,
      //   publicKey,
      //   privateKey,
      // });
      // return tokens ? tokens.publicKey : null;

      // lvxx
      const filter = { user: userId },
        update = {
          publicKey,
          privateKey,
          refreshTokensUsed: [],
          refreshToken,
        },
        options = { upsert: true, new: true };

      const tokens = await keytokenModel.findOneAndUpdate(
        filter,
        update,
        options
      );

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };

  static findByUserId = async (userId) => {
    return await keytokenModel.findOne({ user: ObjectId.createFromHexString(userId) });
  };

  static removeKeyById = async ({ id }) => {
    return await keytokenModel.deleteOne({ _id: ObjectId.createFromHexString(id) });
  };

  static findByRefreshTokenUsed = async (refreshToken) => {
    return await keytokenModel.findOne({ refreshTokensUsed: refreshToken }).lean();
  };

  static deleteById = async (userId) => {
    return await keytokenModel.deleteOne({ user: ObjectId.createFromHexString(userId) });
  };

  static findByRefreshToken = async (refreshToken) => {
    return await keytokenModel.findOne({refreshToken});
  };
}

module.exports = KeyTokenService;
