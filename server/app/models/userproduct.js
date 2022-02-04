'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProduct.belongsTo(models.User)
      UserProduct.belongsTo(models.Product)
    }
  }
  UserProduct.init({
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {msg: "Tolong isi User Id"}
      }
    },
    ProductId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {msg: "Tolong isi Product Id"}
      }
    },
    kelamin: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {msg: "Tolong isi jenis kelamin"}
      }
    },
    size: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {msg: "Tolong isi ukuran"}
      }
    },
  }, {
    sequelize,
    modelName: 'UserProduct',
  });
  return UserProduct;
};