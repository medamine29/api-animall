import NotFoundError from "../errors/notFoundError"
import Product from "../models/product"

export default class UserService {

    static async createProduct(body) {
        const newProduct = new Product(body)
        return await newProduct.save()
    }

    static async getProducts(matchQuery) {
        const products = await Product.find(matchQuery).lean()
        return products
    }

    static async getProductDetails(productId) {
        const product = await Product.findOne({ _id: productId }).lean()
        if(!product) throw new NotFoundError('Produit Introuvable')
        return product
    }

    static async getFilteredProducts(filter) {
        const matchQuery = {}
        if (filter === "new") matchQuery.isNew = true
        if (filter === "best") matchQuery.isBestSale = true

        const products = await Product.find(matchQuery).lean()
        return products
    }
}