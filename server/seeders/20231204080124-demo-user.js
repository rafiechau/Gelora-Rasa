'use strict';

const { hashPassword } = require('../utils/bycrpt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await Promise.all([
      hashPassword("12345678"),
      hashPassword("12345678"),
      hashPassword("12345678"),
    ]).then(hashedPasswords => [
      {
        id: 1,
        firstName: "Muhammad Rafie",
        lastName: "Chautie",
        email: "rafiqauti15@gmail.com",
        role: 1,
        password: hashedPasswords[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        firstName: "admin",
        email: "admin@gmail.com",
        role: 3,
        password: hashedPasswords[1],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        firstName: "Google",
        lastName: "Company",
        email: "google@gmail.com",
        role: 2,
        password: hashedPasswords[2],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    return queryInterface.bulkInsert("Users", users);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
