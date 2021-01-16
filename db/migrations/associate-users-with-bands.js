module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users', // name of Source model
      'BandId', // name of the key we're adding 
      {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Bands', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Users', // name of Source model
      'BandId' // key we want to remove
    );
  }
};

