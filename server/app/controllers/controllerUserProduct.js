const {UserProduct, User, Product} = require("../models")

const postUserProduct = async(req, res, next) => {
  try {
    const {UserId} = req.user
    const {ProductId} = req.params
    const {kelamin, size} = req.body
    console.log({ UserId });
    const userProduct = await UserProduct.create({UserId, ProductId, kelamin, size});
    res.status(200).json(userProduct);
  } catch (err) {
    console.log(err);
    next(err)
  }
}

const getUserProducts = async(req, res, next) => {
  try {
    const {UserId} = req.user
    console.log({ UserId });
    const userProducts = await UserProduct.findAll({
      include: [
        { model: Product },
        { model: User },
      ],
      order: [['createdAt', "DESC"]],
    });
    res.status(200).json(userProducts);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {getUserProducts, postUserProduct}