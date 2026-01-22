'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ticketConfirm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ticketConfirm.init({
    movie: DataTypes.STRING,
    email: DataTypes.STRING,
    Image: DataTypes.TEXT,
     email_status: DataTypes.ENUM('PENDING', 'FAILED', 'SUCCESS'),
    showtime: DataTypes.DATE,
    cinemaLocation: DataTypes.STRING,
    movie: DataTypes.STRING,
    showname: DataTypes.STRING,
    cinema: DataTypes.STRING,
    Ticket: DataTypes.ARRAY(DataTypes.STRING),
    notificationTime: DataTypes.STRING,
    transactionId: DataTypes.STRING,
    amount: DataTypes.STRING,
    currency: DataTypes.STRING,


  }, {
    sequelize,
    modelName: 'ticketConfirm',
  });
  return ticketConfirm;
};