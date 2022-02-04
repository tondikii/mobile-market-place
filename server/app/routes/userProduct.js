const router = require("express").Router()
const Controller = require("../controllers/controllerUserProduct")

router.get("/", Controller.getUserProducts)
router.post("/:ProductId", Controller.postUserProduct)

module.exports = router