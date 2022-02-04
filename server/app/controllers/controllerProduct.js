const {Product } = require("../models")
const { Op } =  require("sequelize");

const getProducts = async(req, res, next) => {
  try {
    const { search } = req.query;
    console.log({ search });
    let where = {};
    if (search) where.name = { [Op.iLike]: `%${search}%` };
    const products = await Product.findAll({
      order: [['createdAt', "DESC"]],
      where: where
    });
    res.status(200).json(products);
  } catch (err) {
    console.log({err});
    next(err)
  }
}

const getProductById = async(req, res, next) => {
  try {
    const {id} = req.params
    const product = await Product.findByPk(id);
    res.status(200).json(product);
  } catch (err) {
    console.log({err});
    next(err)
  }
}

module.exports = {getProducts, getProductById}