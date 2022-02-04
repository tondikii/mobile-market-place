const router = require("express").Router()
const Controller = require("../controllers/controllerProduct")

router.get("/", Controller.getProducts)
router.get("/:id", Controller.getProductById)

module.exports = router