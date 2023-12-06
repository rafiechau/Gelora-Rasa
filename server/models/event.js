'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsTo(models.User, { foreignKey: 'userId' }); 
      Event.belongsTo(models.Location, { foreignKey: 'locationId' }); 
      Event.belongsTo(models.Category, { foreignKey: 'categoryId' });
    }
  }
  Event.init({
    eventName: DataTypes.STRING,
    date: DataTypes.DATE,
    registrationDealine: DataTypes.STRING,
    type: DataTypes.STRING,
    address: DataTypes.TEXT,
    venueName: DataTypes.STRING,
    status: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.STRING,
    stok: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};