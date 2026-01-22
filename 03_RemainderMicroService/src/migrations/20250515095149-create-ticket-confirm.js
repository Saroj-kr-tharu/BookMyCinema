'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ticketConfirms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      movie: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false,
       validate: {
          isEmail: true
        },
      },
      email_status: {
        type: Sequelize.ENUM('PENDING','FAILED','SUCCESS'),
        allowNull:false,
        defaultValue:'pending'
      },
      Image: {
        type: Sequelize.TEXT,
        allowNull:false,
      },
      cinema: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      showname: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      cinemaLocation: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      showtime: {
        type: Sequelize.DATE,
        allowNull:false,
      },
      
      Ticket: {
         type: Sequelize.JSON, // Array of strings,
        allowNull:false,
      },
      notificationTime: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      transactionId: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      amount: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      currency: {
        type: Sequelize.STRING,
        allowNull:false,
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
    await queryInterface.dropTable('ticketConfirms');
  }
};