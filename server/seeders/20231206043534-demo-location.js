'use strict';
const axios = require('axios');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const response = await axios.get('https://wilayah.id/api/provinces.json')
    const locationData = response.data.data
    console.log(locationData)

    await queryInterface.bulkInsert(
      'Locations',
      locationData.map((location) => ({
        namaProvinsi: location.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {}
    );
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
