'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Categories", [
      {
        categoryName: "Business & Entrepreneurship",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryName: "Sports & Wellness",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryName: "Parenting & Relationship",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryName: "Technology & Science",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryName: "Kids",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Categories", null, {});
  }
};
