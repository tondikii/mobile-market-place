const {User} = require("../models")
const jwt = require("../helpers/jwt")

const authentication = async(req, res, next) => {
  try {
    const {access_token} = req.headers
    const payload = jwt.verify(access_token)
    if(!access_token || !payload) throw {name: "Unauthorized middleware"}
    const user = await User.findByPk(payload.id)
    if(!user) throw {name: "Unauthorized middleware"}
    req.user = {UserId: payload.id}
    next()
  } catch (err) {
    console.log(err);
    next(err)
  }
}

module.exports = authentication