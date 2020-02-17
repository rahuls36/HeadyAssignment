const Category = require("../models/category")
const Product = require("../models/product")
console.log(Product)
module.exports = {
    create : async (req, res) => {
        const { name, price } = req.body

        const product = await Product.create({
            name,
            price
        })

        return res.send(product)
    },

    find : async (req,res) => {
        const products = await Product.find()
        return res.send(products)
    },

    delete : async (req,res) => {
        let product = await Product.findOne({"name": req.params.name})
        let categories = product["categories"]
        await Product.remove({
            _id : product["_id"]
        }, async (err) => {
                if(err){
                    return res.send(err)
                }
                for (catNum in categories){
                    let cat = await Category.findById(categories[catNum])
                    i = cat["products"].indexOf(product["_id"])
                    cat["products"] = cat["products"].splice(i,1)
                    cat.save()
                }
                return res.json({
                    status : "Deleted"
                })
            }
        )
    },

    update : async (req,res) => {
        let product = await Product.findOne({"name" : req.params.name})
        let { name, price} = req.body
        if (name){
            product["name"] = name
        }
        if(price){
            product["price"] = price
        }
        product.save()
        return res.send(product)
    }
}