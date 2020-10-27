"use strict";

const bcrypt = require("bcryptjs");

const createPassword = () => {
  return bcrypt.hashSync("password");
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "Demo-lition",
          email: "demo@example.com",
          hashedPassword: createPassword(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "tkasher",
          email: "tkasher@cursive.com",
          hashedPassword: createPassword(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "shutchinson",
          email: "scott@frightenedrabbit.com",
          hashedPassword: createPassword(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
