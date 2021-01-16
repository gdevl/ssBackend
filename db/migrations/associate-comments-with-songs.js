module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Comments', // name of Source model
      'SongId', // name of the key we're adding 
      {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Songs', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Comments', // name of Source model
      'SongId' // key we want to remove
    );
  }
};