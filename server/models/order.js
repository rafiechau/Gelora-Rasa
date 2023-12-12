'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      Order.belongsTo(models.Event, {
        foreignKey: 'eventId',
        as: 'event'
      });
    }
  }
  Order.init({
    tanggalPembelian: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
    totalTickets: DataTypes.INTEGER,
    totalPay: DataTypes.STRING,
    status: DataTypes.STRING,
    ticketsTypes: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};