module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Songs', // name of Source model
      'BandId', // name of the key we're adding 
      {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Bands', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Songs', // name of Source model
      'BandId' // key we want to remove
    );
  }
};