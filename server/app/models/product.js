'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.UserProduct)
    }
  }
  Product.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {msg: "Tolong isi nama"}
      }
    },
    imageURL: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {msg: "Tolong isi imageURL"}
      }
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {msg: "Tolong isi harga"}
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};