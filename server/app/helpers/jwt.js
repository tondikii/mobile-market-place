const jwt = require("jsonwebtoken")
const secretKey = process.env.SECRETKEY
const sign = (payload) => jwt.sign(payload, secretKey)
const verify = (token) => jwt.verify(token, secretKey)
module.exports = {sign, verify}