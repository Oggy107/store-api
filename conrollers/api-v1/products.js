const { query } = require('express');
const product = require('../../models/products');
const url = require('url');

const getAllProducts = async (req, res) => {
    const {featured, sort, fields, company, name, page, numericFilters} = req.query;
    let {limit} = req.query;

    if (!page)
    {
        const parsedUrl = url.parse(req.url);
        let redirectUrl = parsedUrl.pathname + '?page=1';

        if(parsedUrl.query)
            redirectUrl += ('&' + parsedUrl.query);

        return res.redirect(redirectUrl);
    }

    const queryObject = {};

    if (featured)
        queryObject.featured = featured;

    if (company)
        queryObject.company = company;

    if (name)
        queryObject.name = {$regex: name, $options: 'i'};

    if (numericFilters)
    {
        const operatorMap = {
            '>': '$gt',
            '<': '$lt',
            '>=': '$gte',
            '<=': '$lte',
            '=': '$eq',
        }

        const regEx = /\b(>|<|>=|<=|=)\b/g;
        const filters = numericFilters.replace(regEx, (match) => (`-${operatorMap[match]}-`));

        const options = ['price', 'rating'];

        filters.split(',').forEach(item => {
            const [field, operator, value] = item.split('-');

            if (options.includes(field))
                queryObject[field] = {...queryObject[field], [operator]: value};
        });
    }

    // not awaiting here because we need to chain sorting, field selection, limiting and skip
    const result = product.find(queryObject);

    if (sort)
        result.sort(sort.replaceAll(',', ' '));

    if (fields)
        result.select(fields.replaceAll(',', ' '));

    limit = limit ? limit : 10;
    const skip = page >= 1 ? ((page - 1) * limit) : 0;

    // awaiting here
    const products = await result.skip(skip).limit(limit);
    res.json({sucess: true, hits: products.length, data: products});
}

module.exports = {
    getAllProducts,
}