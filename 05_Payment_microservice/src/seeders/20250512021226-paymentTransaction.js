'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    // Seed data
    await queryInterface.bulkInsert('paymentTransactions', [
      {
        id: 13, userEmail: 'sarojc11345@gmail.com', currency: 'npr', transactionId: 'afc89caef1c233c2e6da3080a2173b64', amount: 500, status: 'SUCCESS', paymentMethod: 'ESEWA',
        createdAt: new Date('2025-05-08T14:10:34'), updatedAt: new Date('2025-05-08T14:16:51'), 
      },
      {
        id: 14, userEmail: 'sarojc11345@gmail.com', currency: 'npr', transactionId: 'ae3abb71f9f19e4fd49290b3b61df580', amount: 500, status: 'SUCCESS', paymentMethod: 'ESEWA',
        createdAt: new Date('2025-05-08T14:18:12'), updatedAt: new Date('2025-05-08T14:19:03'), 
      },
      {
        id: 15, userEmail: 'sarojc11345@gmail.com', currency: 'npr', transactionId: 'f51c5ea5a3608734e00b5ba8c4b659de', amount: 500, status: 'SUCCESS', paymentMethod: 'ESEWA',
        createdAt: new Date('2025-05-09T07:15:58'), updatedAt: new Date('2025-05-09T07:17:13'), 
      },
      {
        id: 16, userEmail:'sarojc11345@gmail.com', currency: 'npr', transactionId: 'jQt7UiMazG538UDgTgW2Na', amount: 500, status: 'PENDING', paymentMethod: 'KHALTI',
        createdAt: new Date('2025-05-09T12:02:21'), updatedAt: new Date('2025-05-09T12:02:21'), 
      },
      {
        id: 17, userEmail:'sarojc11345@gmail.com', currency: 'npr', transactionId: 'z3S2W5Pik5yuGKz5ZMGcT4', amount: 500, status: 'PENDING', paymentMethod: 'KHALTI',
        createdAt: new Date('2025-05-09T12:02:24'), updatedAt: new Date('2025-05-09T12:02:24'), 
      },
      {
        id: 18, userEmail:'sarojc11345@gmail.com', currency: 'npr', transactionId: 'L2iHhr7Ci3bW33uzvexyBF', amount: 500, status: 'PENDING', paymentMethod: 'KHALTI',
        createdAt: new Date('2025-05-09T12:04:26'), updatedAt: new Date('2025-05-09T12:04:26'), 
      },
      {
        id: 19, userEmail:'sarojc11345@gmail.com', currency: 'npr', transactionId: 'nvwqoWUnjuZB9oYpLWRsGk', amount: 500, status: 'PENDING', paymentMethod: 'KHALTI',
        createdAt: new Date('2025-05-09T12:15:24'), updatedAt: new Date('2025-05-09T12:15:24'), 
      },
      {
        id: 20, userEmail:'sarojc11345@gmail.com', currency: 'npr', transactionId: 'geQzXUHGZXvRhRUYVz3Tq4', amount: 500, status: 'PENDING', paymentMethod: 'KHALTI',
        createdAt: new Date('2025-05-09T12:18:30'), updatedAt: new Date('2025-05-09T12:18:30'), 
      },
      {
        id: 21, userEmail:'sarojc11345@gmail.com', currency: 'npr', transactionId: 'wG8wV8AqH47dfEEhmfn6GS', amount: 500, status: 'PENDING', paymentMethod: 'KHALTI',
        createdAt: new Date('2025-05-09T12:30:43'), updatedAt: new Date('2025-05-09T12:30:43'), 
      },
      {
        id: 22, userEmail:'sarojc11345@gmail.com', currency: 'npr', transactionId: 'pF2G8fUQudToCY7YVBvUnA', amount: 500, status: 'SUCCESS', paymentMethod: 'KHALTI',
        createdAt: new Date('2025-05-09T12:31:59'), updatedAt: new Date('2025-05-09T13:16:05'), 
      },
      {
        id: 23, userEmail:'sarojc11345@gmail.com', currency: 'npr', transactionId: 'gnw4ccEdtn6TJkBFFMpQ9A', amount: 500, status: 'PENDING', paymentMethod: 'KHALTI',
        createdAt: new Date('2025-05-09T12:49:21'), updatedAt: new Date('2025-05-09T12:49:21'), 
      },
      {
        id: 24, userEmail:'sarojc11345@gmail.com', currency: 'npr', transactionId: '8swoEtH3B2Awg6dLsT3Xza', amount: 500, status: 'PENDING', paymentMethod: 'KHALTI',
        createdAt: new Date('2025-05-09T12:59:57'), updatedAt: new Date('2025-05-09T12:59:57'), 
      },
      {
        id: 25, userEmail:'sarojc11345@gmail.com', currency: 'npr', transactionId: 'f3LX25N75Gqde2zfd7WMxe', amount: 500, status: 'PENDING', paymentMethod: 'KHALTI',
        createdAt: new Date('2025-05-09T13:17:36'), updatedAt: new Date('2025-05-09T13:17:36'), 
      },
      {
        id: 26, userEmail:'sarojc11345@gmail.com', currency: 'npr', transactionId: 'uu54ao4DPoEmas76VVrP5m', amount: 500, status: 'SUCCESS', paymentMethod: 'KHALTI',
        createdAt: new Date('2025-05-09T13:19:39'), updatedAt: new Date('2025-05-09T13:19:55'), 
      },
      {
        id: 27, userEmail:'sarojc11345@gmail.com', currency: 'npr', transactionId: 'WZGjW6yW3hZRgX2iEcLm73', amount: 500, status: 'SUCCESS', paymentMethod: 'KHALTI',
        createdAt: new Date('2025-05-09T13:21:52'), updatedAt: new Date('2025-05-09T13:22:13'), 
      },
      {
        id: 28, userEmail:'sarojc11345@gmail.com', currency: 'npr', transactionId: 'jTrcFfVdbVWFM9s4WXNLE2', amount: 500, status: 'SUCCESS', paymentMethod: 'KHALTI',
        createdAt: new Date('2025-05-09T13:22:40'), updatedAt: new Date('2025-05-09T13:22:59'), 
      },
      {
        id: 29, userEmail:'sarojc11345@gmail.com', currency: 'npr', transactionId: 'Tm7AjcE68VzcfGQ65jjUR7', amount: 500, status: 'SUCCESS', paymentMethod: 'KHALTI',
        createdAt: new Date('2025-05-09T13:25:18'), updatedAt: new Date('2025-05-09T13:25:35'), 
      },
      {
        id: 30, userEmail:'sarojc11345@gmail.com', currency: 'USD', transactionId: '06ead25eb5c8eb1d305a08c44ef6371f', amount: 52000, status: 'PENDING', paymentMethod: 'STRIPE',
        createdAt: new Date('2025-05-10T12:57:52'), updatedAt: new Date('2025-05-10T12:57:52'), 
      },
      {
        id: 31, userEmail:'sarojc11345@gmail.com', currency: 'USD', transactionId: 'e70d6f964ef48f488e144f4b7be9d3b0', amount: 52000, status: 'PENDING', paymentMethod: 'STRIPE',
        createdAt: new Date('2025-05-10T13:01:12'), updatedAt: new Date('2025-05-10T13:01:12'), 
      },
      {
        id: 32, userEmail:'sarojc11345@gmail.com', currency: 'USD', transactionId: '39de8bb42b251820fb94d544c8f69a4f', amount: 52000, status: 'PENDING', paymentMethod: 'STRIPE',
        createdAt: new Date('2025-05-10T13:02:47'), updatedAt: new Date('2025-05-10T13:02:47'), 
      },
      {
        id: 33, userEmail:'sarojc11345@gmail.com', currency: 'USD', transactionId: '29aeef27ccca780ee6cfd038c412ed77', amount: 52000, status: 'PENDING', paymentMethod: 'STRIPE',
        createdAt: new Date('2025-05-10T13:03:11'), updatedAt: new Date('2025-05-10T13:03:11'), 
      },
      {
        id: 34, userEmail:'sarojc11345@gmail.com', currency: 'USD', transactionId: 'd226b45364689405556565334c5cf9e5', amount: 52000, status: 'PENDING', paymentMethod: 'STRIPE',
        createdAt: new Date('2025-05-10T13:04:25'), updatedAt: new Date('2025-05-10T13:04:25'), 
      },
      {
        id: 35, userEmail:'sarojc11345@gmail.com', currency: 'USD', transactionId: '349bff8bff8f8287c630aa1ba004ef2a', amount: 52000, status: 'PENDING', paymentMethod: 'STRIPE',
        createdAt: new Date('2025-05-10T13:04:37'), updatedAt: new Date('2025-05-10T13:04:37'), 
      },
      {
        id: 36, userEmail:'sarojc11345@gmail.com', currency: 'USD', transactionId: '933ae6577066c57e2d51f1965811afd0', amount: 52000, status: 'PENDING', paymentMethod: 'STRIPE',
        createdAt: new Date('2025-05-10T13:09:37'), updatedAt: new Date('2025-05-10T13:09:37'), 
      },
      {
        id: 37, userEmail:'sarojc11345@gmail.com', currency: 'USD', transactionId: 'cs_test_b165mLSmFqINiQprJTFEFJ4RSLCGc6gmG2wfS7bg48fKb7nrHdS54yZ0gv', amount: 52000, status: 'FAILED', paymentMethod: 'STRIPE',
        createdAt: new Date('2025-05-10T13:11:37'), updatedAt: new Date('2025-05-10T13:40:26'), 
      },
      {
        id: 38, userEmail:'sarojc11345@gmail.com', currency: 'USD', transactionId: 'cs_test_b1kNYcvABm0rGQ0mZtcxp4owxQHvOpC8Me1UblD4hqMLYwKFGjwwcUTX10', amount: 52000, status: 'PENDING', paymentMethod: 'STRIPE',
        createdAt: new Date('2025-05-10T13:41:10'), updatedAt: new Date('2025-05-10T13:41:10'), 
      },
      {
        id: 39, userEmail:'sarojc11345@gmail.com', currency: 'USD', transactionId: 'cs_test_b1XSXbscEe2UcS6QNldc5liG43aQItUvqw6INAOsHQK4ppYb1aK9fHmaXD', amount: 52000, status: 'SUCCESS', paymentMethod: 'STRIPE',
        createdAt: new Date('2025-05-10T13:41:44'), updatedAt: new Date('2025-05-10T13:41:52'), 
      },
      {
        id: 40, userEmail:'sarojc11345@gmail.com', currency: 'USD', transactionId: 'cs_test_b1cORFcwQ9BEwEBdUygFsikNW1ouytUB6aUoyVbk7F7W8TIlmT8JB2hx2z', amount: 52000, status: 'FAILED', paymentMethod: 'STRIPE',
        createdAt: new Date('2025-05-10T13:42:03'), updatedAt: new Date('2025-05-10T13:42:08'), 
      },
      {
        id: 41, userEmail:'sarojc11345@gmail.com', currency: 'USD', transactionId: 'cs_test_b1BaeUE2a84Nn1aEtq9NCP7dLzIa5dYdYGGG5p7tyoB5FPXhGPwOkadFzU', amount: 52000, status: 'FAILED', paymentMethod: 'STRIPE',
        createdAt: new Date('2025-05-10T13:54:47'), updatedAt: new Date('2025-05-10T13:54:53'), 
      },
      {
        id: 42, userEmail:'sarojc11345@gmail.com', currency: 'USD', transactionId: 'cs_test_b1Y489S3qZz4FqwWum8vL6LpNvKZZk22T1r7Ogm3OlNOgte21ftPG0fjJL', amount: 52000, status: 'SUCCESS', paymentMethod: 'STRIPE',
        createdAt: new Date('2025-05-10T13:55:11'), updatedAt: new Date('2025-05-10T13:55:19'), 
      },
      {
        id: 43, userEmail:'sarojc11345@gmail.com', currency: 'npr', transactionId: 'aDqV36DUmTB7PTLPLAXB5j', amount: 500, status: 'PENDING', paymentMethod: 'KHALTI',
        createdAt: new Date('2025-05-10T14:05:59'), updatedAt: new Date('2025-05-10T14:05:59'), 
      },
      {
        id: 44, userEmail:'sarojc11345@gmail.com', currency: 'npr', transactionId: 'fGc5PH8PgmrgL5CjtH2HxH', amount: 500, status: 'SUCCESS', paymentMethod: 'KHALTI',
        createdAt: new Date('2025-05-10T14:07:10'), updatedAt: new Date('2025-05-10T14:07:33'), 
      },
      {
        id: 45, userEmail: 'sarojc11345@gmail.com', currency: 'npr', transactionId: '678b1c1a2d6a833f0076730b2ac4ad68', amount: 500, status: 'SUCCESS', paymentMethod: 'ESEWA',
        createdAt: new Date('2025-05-10T14:10:07'), updatedAt: new Date('2025-05-10T14:11:31'), 
      },
      {
        id: 46, userEmail: 'sarojc11345@gmail.com', currency: 'npr', transactionId: 'b99d0b796ef40fbb47e16fd0c552d3a1', amount: 500, status: 'PENDING', paymentMethod: 'ESEWA',
        createdAt: new Date('2025-05-10T14:11:43'), updatedAt: new Date('2025-05-10T14:11:43'), 
      },
      {
        id: 47, userEmail: 'sarojc11345@gmail.com', currency: 'npr', transactionId: '4ab062effad8e330558e1af567a4e5d3', amount: 500, status: 'PENDING', paymentMethod: 'ESEWA',
        createdAt: new Date('2025-05-10T14:19:03'), updatedAt: new Date('2025-05-10T14:19:03'), 
      },
      {
        id: 48, userEmail: 'sarojc11345@gmail.com', currency: 'npr', transactionId: '337a1191af4239e7ca6a37e8370b9eed', amount: 500, status: 'PENDING', paymentMethod: 'ESEWA',
        createdAt: new Date('2025-05-10T14:19:17'), updatedAt: new Date('2025-05-10T14:19:17'), 
      },
      {
        id: 49, userEmail: 'sarojc11345@gmail.com', currency: 'npr', transactionId: '8e4615eb512904f385c7ff48fb2e6258', amount: 500, status: 'PENDING', paymentMethod: 'ESEWA',
        createdAt: new Date('2025-05-10T14:20:11'), updatedAt: new Date('2025-05-10T14:20:11'), 
      },
      {
        id: 50, userEmail: 'sarojc11345@gmail.com', currency: 'npr', transactionId: '475e8d4fafe82bfa53e21fadd76174e1', amount: 500, status: 'PENDING', paymentMethod: 'ESEWA',
        createdAt: new Date('2025-05-10T14:21:14'), updatedAt: new Date('2025-05-10T14:21:14'), 
      },
      {
        id: 51, userEmail: 'sarojc11345@gmail.com', currency: 'npr', transactionId: '1cdf58dc0863d719aed08c30fd97333e', amount: 500, status: 'PENDING', paymentMethod: 'ESEWA',
        createdAt: new Date('2025-05-10T14:22:17'), updatedAt: new Date('2025-05-10T14:22:17'), 
      },
      {
        id: 52, userEmail: 'sarojc11345@gmail.com', currency: 'npr', transactionId: 'a871c34151389e01b01eeb99fc12ffda', amount: 500, status: 'PENDING', paymentMethod: 'ESEWA',
        createdAt: new Date('2025-05-10T14:23:01'), updatedAt: new Date('2025-05-10T14:23:01'), 
      },
      {
        id: 53, userEmail: 'sarojc11345@gmail.com', currency: 'npr', transactionId: 'b5958e54df25bbd5a2d2d13736f3f32a', amount: 500, status: 'SUCCESS', paymentMethod: 'ESEWA',
        createdAt: new Date('2025-05-10T14:24:50'), updatedAt: new Date('2025-05-10T14:25:48'), 
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // Remove seeded data and column
    await queryInterface.bulkDelete('paymentTransactions', {
      id: { [Sequelize.Op.between]: [13, 53] }
    }, {});
    await queryInterface.removeColumn('paymentTransactions', 'emailStatus');
  }
};