"use strict";

const bcrypt = require("bcrypt");
const { salt } = require("../config/serverConfig");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 500],
        },
      },
      role: {
        allowNull: false,
        type: DataTypes.ENUM("CUSTUMER", "ADMIN", "MODERATOR"),
        defaultValue: "CUSTUMER"
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user) => {
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  });



  return User;
};