module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Albums', // name of Source model
      'Song', // name of the key we're adding 
      {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Song', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Albums', // name of Source model
      'Song' // key we want to remove
    );
  }
};