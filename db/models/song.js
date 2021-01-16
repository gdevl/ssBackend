"use strict";

const genres = require("./genres");
const user = require("./user");
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define(
    "Song",
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      genre: {
        allowNull: false,
        type: DataTypes.ENUM(genres),
      },
      creatorId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: user,
        },
      },
      bandId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: user,
        },
      },
      songUrl: DataTypes.STRING(200),
      createdAt: {
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue("createdAt")).format(
            "DD/MM/YYYY h:mm:ss"
          );
        },
      },
      updatedAt: {
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue("updatedAt")).format(
            "DD/MM/YYYY h:mm:ss"
          );
        },
      },
    },
    {}
  );
  Song.associate = function (models) {
    Song.belongsTo(models.User, { foreignKey: "creatorId", as: "artist" });
    Song.hasMany(models.Comment, { foreignKey: "songId", as: "comments" });
  };
  return Song;
};
