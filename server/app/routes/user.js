const router = require("express").Router()
const Controller = require("../controllers/controllerUser")

router.post("/register", Controller.postRegister)
router.post("/login", Controller.postLogin)

module.exports = router