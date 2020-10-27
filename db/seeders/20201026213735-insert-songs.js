"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Songs",
      [
        {
          title: "From The Hips",
          genre: "rock",
          creatorId: 2,
          songUrl: "https://open.spotify.com/track/0MJdJaOstnyoXEMMnLReun",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Working Stiff",
          genre: "rock",
          creatorId: 1,
          songUrl: "https://open.spotify.com/track/6p3SPRICmYOwHwFRC8GHgY",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "A Simple Script",
          genre: "rock",
          creatorId: 1,
          songUrl: "https://open.spotify.com/track/7l51t7EOqWndWXofem1Z3z",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Nothing",
          genre: "rock",
          creatorId: 1,
          songUrl: "https://open.spotify.com/track/1yb3G1zT0Hy3BaIVNJoBtA",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Songs", null, {});
  },
};
