const { query } = require('express');
const product = require('../../models/products');

const getAllProducts = async (req, res) => {
    const {featured, company, name} = req.query;
    const queryObject = {};

    if (featured)
    {
        queryObject.featured = featured;
    }
    if (company)
    {
        queryObject.company = company;
    }
    if (name)
    {
        queryObject.name = {$regex: name, $options: 'i'};
    }

    try {
        const products = await product.find(queryObject);
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