"use strict";

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
    let products = [
      {
        imageURL:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROphMpUbR96TPTBDZCABP2ujlUaW-5_XNKPy8ZypoFx5pqa3_47s8MHGJwQQh6x5R4FT8&usqp=CAU",
        name: "Baju polos hitam",
        price: 150000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        imageURL:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVnoWj5B5F9K3S6MW26RyyCFWTfmvaS9ZapenfRsew-J8JJ1Kf5cY1eqX0RnorJp-abo8&usqp=CAU",
        name: "Baju polos putih",
        price: 150000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        imageURL:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRESTmAdM4ZABN9c1BDd2SKjmqCmR2SfdUavQ&usqp=CAU",
        name: "Celana Jeans",
        price: 250000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        imageURL:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR8CqX56VOC7_tXrqXqURseZxFzTMQgKM7dQ&usqp=CAU",
        name: "Jaket Bomber",
        price: 350000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Products", products, null)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Products", null)
  },
};
