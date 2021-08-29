const express = require('express');

const Product = require('../models/Product');
const router = express.Router();

router.get('/', async (req, res) => {
    Product.find({}, function (err, products) {
        var productsMap = [];

        products.forEach(function (product) {
            productsMap.push(product);
        });

        res.send(productsMap);
    });
});

router.get('/:id', async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id })

    return res.send(product);
});

module.exports = app => app.use('/listproducts', router);