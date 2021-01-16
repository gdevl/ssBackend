module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Bands', // name of Source model
      'Albums', // name of the key we're adding 
      {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Albums', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Bands', // name of Source model
      'Albums' // key we want to remove
    );
  }
};