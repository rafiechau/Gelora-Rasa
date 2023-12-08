'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetailEventOrganizers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      nik: {
        type: Sequelize.STRING
      },
      namaLengkap: {
        type: Sequelize.STRING
      },
      jenisKelamin: {
        type: Sequelize.STRING
      },
      golonganDarah: {
        type: Sequelize.INTEGER
      },
      tempatLahir: {
        type: Sequelize.STRING
      },
      tanggalLahir: {
        type: Sequelize.DATE
      },
      provinsi: {
        type: Sequelize.STRING
      },
      kotaKabupaten: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.TEXT
      },
      rt: {
        type: Sequelize.INTEGER
      },
      rw: {
        type: Sequelize.INTEGER
      },
      kelurahanDesa: {
        type: Sequelize.STRING
      },
      kecamatan: {
        type: Sequelize.STRING
      },
      agama: {
        type: Sequelize.STRING
      },
      statusPerkawinan: {
        type: Sequelize.STRING
      },
      statusKerja: {
        type: Sequelize.STRING
      },
      kewarganegaraan: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DetailEventOrganizers');
  }
};