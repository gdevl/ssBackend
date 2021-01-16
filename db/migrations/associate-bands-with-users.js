module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Bands', // name of Source model
      'Member', // name of the key we're adding 
      {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // name of Target model
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
      'Member' // key we want to remove
    );
  }
};