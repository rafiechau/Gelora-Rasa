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
        allowNull: false,
        type: Sequelize.INTEGER
      },
      nik: {
        allowNull: false,
        type: Sequelize.STRING
      },
      namaLengkap: {
        allowNull: false,
        type: Sequelize.STRING
      },
      jenisKelamin: {
        allowNull: false,
        type: Sequelize.STRING
      },
      golonganDarah: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tempatLahir: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tanggalLahir: {
        allowNull: false,
        type: Sequelize.STRING
      },
      provinsi: {
        allowNull: false,
        type: Sequelize.STRING
      },
      kotaKabupaten: {
        allowNull: false,
        type: Sequelize.STRING
      },
      alamat: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      rt: {
        allowNull: false,
        type: Sequelize.STRING
      },
      rw: {
        allowNull: false,
        type: Sequelize.STRING
      },
      kelurahanDesa: {
        allowNull: false,
        type: Sequelize.STRING
      },
      kecamatan: {
        allowNull: false,
        type: Sequelize.STRING
      },
      agama: {
        allowNull: false,
        type: Sequelize.STRING
      },
      statusPerkawinan: {
        allowNull: false,
        type: Sequelize.STRING
      },
      statusKerja: {
        allowNull: false,
        type: Sequelize.STRING
      },
      kewarganegaraan: {
        allowNull: false,
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