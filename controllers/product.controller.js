import  ProductService from '../services/product.service'

export const getProducts = async (req, res) => {
    let matchQuery = {}

    const { category, subCategory, role } = req.query
    if (role != "admin") {
        matchQuery = { category, subCategory }
    }

    const products = await ProductService.getProducts(matchQuery)    
    return res.json(products)
}

export const addProduct = async (req, res) => {
    if(req.file) req.body.imageUrl = `${req.protocol}://${req.get('host')}/images/products/${req.file.filename}`
    const product = await ProductService.createProduct(req.body)
    return res.status(201).json(product)
}

export const getProductDetails = async (req, res) => {
    const product = await ProductService.getProductDetails(req.params.productId)
    return res.json(product)
}

export const getFilteredProducts = async (req, res) => {
    const products = await ProductService.getFilteredProducts(req.params.filter)
    return res.json(products)
}

