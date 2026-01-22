"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class oAuthProvider extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }

  oAuthProvider.init(
    {
      providerUserId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      provider: {
        type: DataTypes.ENUM("google", "facebook", "linkedin", "github"),
        allowNull: false,
      },
      providerUserName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      providerPhoto: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "oAuthProvider",
    }
  );

  return oAuthProvider;
};