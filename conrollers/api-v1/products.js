const product = require('../../models/products');

const getAllProducts = async (req, res) => {
    try {
        const products = await product.find(req.query)
        res.json({sucess: true, data: products});
    } catch (error) {
        throw {status: 400, msg: error.message};
    }
}

// const createProduct = async (req, res) => {
//     try {
//         const cratedProduct = await product.create(req.body);
//         res.json({sucess: true, data: cratedProduct});
//     } catch (error) {
//         throw {status: 400, msg: error.message};
//     }
// }

module.exports = {
    getAllProducts,
}