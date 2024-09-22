"use strict";

const keytokenModel = require("../models/keytoken.model");
const {Types} = require('mongoose')

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
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

  static findByUserId = async( userId ) => {
    return await keytokenModel.findOne({user: Types.ObjectId(userId)}).lean();
  }
}

module.exports = KeyTokenService;
