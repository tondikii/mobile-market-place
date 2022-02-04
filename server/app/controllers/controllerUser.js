const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const jwt = require("../helpers/jwt");

const postRegister = async (req, res, next) => {
  try {
    const { namaLengkap, email, password, nomorHP } = req.body;
    console.log({ namaLengkap, email, password, nomorHP });
    const user = await User.create({ namaLengkap, email, password, nomorHP });
    res
      .status(201)
      .json({
        namaLengkap: user.namaLengkap,
        email: user.email,
        nomorHP: user.nomorHP,
      });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw { name: "Bad request login" };
    const user = await User.findOne({ where: { email } });
    if (!user || !comparePassword(password, user.password)) throw { name: "Unauthorized login" };
    const payload = {id: user.id}
    const token = jwt.sign(payload);
    res.status(200).json({access_token: token})
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { postRegister, postLogin };
