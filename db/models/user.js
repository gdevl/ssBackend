"use strict";

const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        allowNull: false,
        type: DataTypes.STRING(50),
        validates: {
          len: [1, 255],
        },
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(50),
        unique: true,
        validates: {
          isEmail: true,
          len: [3, 255],
        },
      },
      hashedPassword: {
        allowNull: false,
        type: DataTypes.STRING.BINARY,
        validates: {
          len: [60, 60],
        },
      },
      tokenId: {
        type: DataTypes.STRING(50),
      },
    },
    {}
  );
  User.associate = function (models) {
    User.hasMany(models.Song, { foreignKey: "creatorId", as: "songs" });
    User.hasMany(models.Comment, { foreignKey: "userId", as: "comments" });
  };

  User.prototype.isValid = () => true;

  User.prototype.setPassword = function (password) {
    this.hashedPassword = bcrypt.hashSync(password);
    return this;
  };

  User.prototype.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.prototype.toSafeObject = function () {
    return {
      createdAt: this.createdAt,
      email: this.email,
      id: this.id,
      username: this.username,
      updatedAt: this.updatedAt,
    };
  };

  return User;
};
