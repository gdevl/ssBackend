const genres = [
  "avant-garde",
  "blues",
  "carribean",
  "classical",
  "comedy",
  "country",
  "easy listening",
  "electronic",
  "flamenco",
  "folk",
  "heavy metal",
  "hip hop",
  "jazz",
  "latin",
  "pop",
  "punk rock",
  "R&B",
  "rock",
  "soul",
];

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("__poop__", {});
};

module.exports.genres = genres;
