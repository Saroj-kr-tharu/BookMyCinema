"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "admin@gmail.com",
          password: "$2b$10$7rY7/dPNXdtXlT6UKevGaunrXnFZUstVel0rUOrtuBp1JZEs.c9ae",
          role: "ADMIN",
          isVerified: 0,
          createdAt: new Date("2025-06-02 04:21:52"),
          updatedAt: new Date("2025-06-02 04:21:52"),
        },
        {
          email: "moderator@gmail.com",
          password: "$2b$10$7rY7/dPNXdtXlT6UKevGauuJLGSMMHPt/aacioD3vBYf.TBwyiTLy",
          role: "MODERATOR",
          isVerified: 0,
          createdAt: new Date("2025-06-02 04:33:25"),
          updatedAt: new Date("2025-06-02 04:35:14"),
        },
        {
          email: "Custumer@gmail.com",
          password: "$2b$10$7rY7/dPNXdtXlT6UKevGau/ydnFza5TG2W5W4r1ywLgq2BD1RPwuO",
          role: "CUSTUMER",
          isVerified: 0,
          createdAt: new Date("2025-06-02 04:35:58"),
          updatedAt: new Date("2025-06-02 04:35:58"),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  },
};