'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      ProductId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Products", key: "id" },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      kelamin: {
        allowNull: false,
        type: Sequelize.STRING
      },
      size: {
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
    await queryInterface.dropTable('UserProducts');
  }
};