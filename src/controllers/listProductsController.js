const express = require('express');

const Product = require('../models/Product');
const router = express.Router();

router.get('/', async (req, res) => {
    Product.find({}, function (err, products) {
        var productsMap = {};

        products.forEach(function (product) {
            productsMap[store._id] = product;
        });

        res.send(productsMap);
    });
});

module.exports = app => app.use('/listproducts', router);