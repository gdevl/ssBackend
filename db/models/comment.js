"use strict";

const user = require("./user");

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      songId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: user,
        },
      },
      commentText: {
        allowNull: false,
        type: DataTypes.STRING(200),
      },
      timeStamp: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
    },
    {}
  );
  Comment.associate = function (models) {
    Comment.belongsTo(models.User, { foreignKey: "userId", as: "author" });
  };
  return Comment;
};
