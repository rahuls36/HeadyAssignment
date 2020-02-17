let Category = require("./controller/category")
let Product = require("./controller/product")

let router = require('express').Router()

router.get('/', (req,res ) => res.json({
    status : "OK",
    message:"Working_Fine"})
)

router.post('/category/create', Category.create)
router.post('/product/create', Product.create)
router.get('/category', Category.find)
router.get('/product', Product.find)
router.delete('/category/:name', Category.delete)
router.put('/category/:name', Category.update)
router.delete('/product/:name', Product.delete)
router.put('/product/:name', Product.update)

module.exports = router
