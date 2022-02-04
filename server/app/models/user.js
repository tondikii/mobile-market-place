'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require("../helpers/bcrypt")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.UserProduct)
    }
  }
  User.init({
    namaLengkap: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {msg: "Tolong isi nama lengkap"},
      }
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {msg: "Tolong isi email"},
        isEmail: {msg: "Invalid email format"}
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {msg: "Tolong isi password"},
      }
    },
    nomorHP: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {msg: "Tolong isi nomor hp"},
      }
    },
  }, {
    hooks: {
      beforeCreate: (instance) =>{
        instance.password = hashPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};