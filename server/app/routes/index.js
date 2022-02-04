const router = require("express").Router()
const routerUser = require("./user")
const routerProduct = require("./product")
const routerUserProduct = require("./userProduct")
const errorHandler = require("../middlewares/errorHandler")
const authentication = require("../middlewares/authenticate")

router.use(routerUser)
router.use(authentication)
router.use("/products", routerProduct)
router.use("/user-products", routerUserProduct)
router.use(errorHandler)

module.exports = router