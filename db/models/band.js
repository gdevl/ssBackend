'use strict';
module.exports = (sequelize, DataTypes) => {
  const Band = sequelize.define('Band', {
    Members: DataTypes.INTEGER,
    albums: DataTypes.INTEGER
  }, {});
  Band.associate = function(models) {
    // associations can be defined here
  };
  return Band;
};