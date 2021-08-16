const express = require('express');
const storeMiddleware = require('../middlewares/storeMdd');

const Product = require('../models/Product');
const router = express.Router();

router.use(storeMiddleware);

router.post('/register', async (req, res) => {
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

router.patch('/update/:id', async (req, res) => {
    try {
        const store_updated = await Product.updateOne({ _id: req.params.id }, { $set: { name: req.body.name } })

        return res.send({
            store_updated,
        });
    } catch (err) {
        return res.status('400').send({ error: 'failed to update' })
    }

})

router.get('/', async (req, res) => {
    Product.find({}, function (err, products) {
        var productsMap = {};

        products.forEach(function (products) {
            productsMap[store._id] = product;
        });

        res.send(productsMap);
    });
});

module.exports = app => app.use('/products', router);