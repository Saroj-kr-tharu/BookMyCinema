'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('PaymentNotifications', [
      {
        id: 1,
        userId: 1,
        transitionId: 'TRANS001',
        amount: 100,
        date: new Date(),
        gateway: 'PayPal',
        email_status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        userId: 1,
        transitionId: 'TRANS002',
        amount: 200,
        date: new Date(),
        gateway: 'Stripe',
        email_status: 'SUCCESS',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        userId: 1,
        transitionId: 'TRANS003',
        amount: 300,
        date: new Date(),
        gateway: 'Razorpay',
        email_status: 'FAILED',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        userId: 1,
        transitionId: 'TRANS004',
        amount: 400,
        date: new Date(),
        gateway: 'PayPal',
        email_status: 'SUCCESS',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        userId: 1,
        transitionId: 'TRANS005',
        amount: 500,
        date: new Date(),
        gateway: 'Stripe',
        email_status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        userId: 1,
        transitionId: 'TRANS006',
        amount: 600,
        date: new Date(),
        gateway: 'Razorpay',
        email_status: 'FAILED',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        userId: 1,
        transitionId: 'TRANS007',
        amount: 700,
        date: new Date(),
        gateway: 'PayPal',
        email_status: 'SUCCESS',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        userId: 1,
        transitionId: 'TRANS008',
        amount: 800,
        date: new Date(),
        gateway: 'Stripe',
        email_status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        userId: 1,
        transitionId: 'TRANS009',
        amount: 900,
        date: new Date(),
        gateway: 'Razorpay',
        email_status: 'FAILED',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        userId: 1,
        transitionId: 'TRANS010',
        amount: 1000,
        date: new Date(),
        gateway: 'PayPal',
        email_status: 'SUCCESS',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PaymentNotifications', null, {});
  }
};