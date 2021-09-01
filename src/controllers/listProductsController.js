const express = require('express');

const Product = require('../models/Product');
const router = express.Router();

router.get('/', async (req, res) => {
    Product.find({ }, function (err, products) {
        var productsMap = [];

        products.forEach(function (product) {
            productsMap.push(product);
        });

        res.send(productsMap);
    });
});

router.get('/store/:store', async (req, res) => {
    Product.find({}, function (err, products) {
        var productsMap = [];

        products.forEach(function (product) {
            if (product.store == req.params.store) {
                productsMap.push(product);
            }
        });

        res.send(productsMap);
    });
});

router.get('/:id', async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id })

    return res.send(product);
});

router.post('/register/product', async (req, res) => {
    try {
        const product = await Product.create(req.body);

        return res.send({ product });
    } catch (err) {
        return res.status('400').send({ error: 'failed' })
    }
});

router.delete('/del/:id', async (req, res) => {

    try {
        const store_remove = await Product.deleteOne({ _id: req.params.id })

        return res.send({
            store_remove,
        });
    } catch (err) {
        return res.status('400').send({ error: 'failed to delete' })
    }
})

module.exports = app => app.use('/listproducts', router);