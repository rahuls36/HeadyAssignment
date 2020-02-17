let Category = require("../models/category")
let Product = require("../models/product")

module.exports = {
    create : async (req, res) => {
        let { name, products, categories  } = req.body

        categoriesById = []

        for (category in categories) {
            cat = await Category.findOne({"name": categories[category]})
            categoriesById.push(cat)
        }
        let productsById = []

        for (product in products) {
            prod = await Product.findOne({"name": products[product]})
            productsById.push(prod)
        }
        console.log(productsById[0]['categories']   )
        let category = await Category.create({
            name,
            child_categories: categoriesById,
            products:productsById
        })
        await category.save()

        for (product in productsById) {
            productsById[product].categories.push(category)
            await productsById[product].save()
        }

        return res.send(category)
    },

    find : async (req,res) => {
        let categories = await Category.find()
        return res.send(categories)
    },

    delete : async (req,res) => {
        let category = await Category.findOne({"name": req.params.name})
        product_ids = category["products"]
        products = []
        for (productNums in product_ids){
            prod = await Product.findById(product_ids[productNums])
            products.push(prod)
        }

        await Category.remove({
            _id: category["_id"]
            },
            async (err) => {
                if(err){
                    return res.send(err)
                }
                else {
                    for (num in products){
                        i = products[num]['categories'].indexOf(category["_id"])
                        products[num]['categories'] = products[num]['categories'].splice(i,1)
                        await products[num].save()
                    }
                    return res.json({
                            status : "Ok"
                    })
                }
            }
        )
    },

    update : async (req,res) => {
        let { name, products, categories  } = req.body
        let category = await Category.findOne({"name": req.params.name})
        console.log(products)
        categoriesById = []
        productById = []
        if(categories) {
            for (catnum in categories) {
                cat = await Category.findOne({"name": categories[catnum]})
                categoriesById.push(cat)
            }
        }
        else
            categoriesById = category["categories"]
        if(products) {
            for (prodnum in products) {
                prod = await Product.findOne({"name": products[prodnum]})
                if (!prod)
                    return res.send("No matching Products Found")
                if (!prod["categories"].includes(category["_id"])){
                    prod["categories"].push(category["_id"])
                }
                productById.push(prod["_id"])
            }
        }
        else
            productById = category["products"]
        category["categories"] = categoriesById
        category["products"] = productById
        category["name"] = name
        await category.save()

        res.send(category)
    }
}


