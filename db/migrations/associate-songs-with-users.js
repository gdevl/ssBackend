module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Songs', // name of Source model
      'CreatorId', // name of the key we're adding 
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
      'Songs', // name of Source model
      'CreatorId' // key we want to remove
    );
  }
};