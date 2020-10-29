"use strict";

const genres = require("./genres");
const user = require("./user");

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
      songUrl: DataTypes.STRING(200),
    },
    {}
  );
  Song.associate = function (models) {
    Song.belongsTo(models.User, { foreignKey: "creatorId", as: "artist" });
    Song.hasMany(models.Comment, { foreignKey: "songId", as: "comments" });
  };
  return Song;
};
