'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailEventOrganizer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DetailEventOrganizer.init({
    userId: DataTypes.INTEGER,
    nik: DataTypes.STRING,
    namaLengkap: DataTypes.STRING,
    jenisKelamin: DataTypes.STRING,
    golonganDarah: DataTypes.INTEGER,
    tempatLahir: DataTypes.STRING,
    tanggalLahir: DataTypes.DATE,
    provinsi: DataTypes.STRING,
    kotaKabupaten: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    rt: DataTypes.INTEGER,
    rw: DataTypes.INTEGER,
    kelurahanDesa: DataTypes.STRING,
    kecamatan: DataTypes.STRING,
    agama: DataTypes.STRING,
    statusPerkawinan: DataTypes.STRING,
    statusKerja: DataTypes.STRING,
    kewarganegaraan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DetailEventOrganizer',
  });
  return DetailEventOrganizer;
};