'use strict';
const axios = require('axios');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const response = await axios.get('https://wilayah.id/api/provinces.json')
    const locationData = response.data.data
    
    await queryInterface.bulkInsert(
      'Locations',
      locationData.map((location) => ({
        namaProvinsi: location.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Locations", null, {});
  }
};
