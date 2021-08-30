const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Store = require('../models/Store');
const authConfig = require('../config/auth');

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.storePass, {
        expiresIn: 86400,
    });

}

router.delete('/del/:id', async (req, res) => {

    try {
        const store_remove = await Store.deleteOne({ _id: req.params.id })

        return res.send({
            store_remove,
        });
    } catch (err) {
        return res.status('400').send({ error: 'failed to delete' })
    }
})

router.patch('/update/:id', async (req, res) => {
    try {
        const store_updated = await Store.updateOne({ _id: req.params.id }, { $set: { logo: req.body.logo } })

        return res.send({
            store_updated,
        });
    } catch (err) {
        return res.status('400').send({ error: 'failed to update' })
    }

})


router.get('/', async (req, res) => {
    Store.find({}, function (err, stores) {
        var storeMap = [];

        stores.forEach(function (store) {
            storeMap.push(store);
        });

        res.send(storeMap);
    });
});

router.get('/:name', async (req, res) => {
    const store = await Store.findOne({ name: req.params.name });
    res.send(store);
});

router.post('/register', async (req, res) => {
    try {
        const { email } = req.body;
        if (await Store.findOne({ email }))
            return res.status('400').send({ error: 'Email already exist' });

        const store = await Store.create(req.body);

        return res.send({
            store,
            token: generateToken({ id: store.id })
        });

    } catch (err) {
        return res.status('400').send({ error: 'failed' })
    }

});

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const store = await Store.findOne({ email }).select('+password');

    if (!store)
        return res.status('400').send({ error: 'User not found' });

    if (!await bcrypt.compare(password, store.password))
        return res.status('400').send({ error: 'Invalid password' });

    store.password = await undefined;


    return res.send({
        store,
        token: generateToken({ id: store.id })
    });
    //return res.send({store});  
});

module.exports = app => app.use('/store', router);