const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');
const User = require('../models/User');

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });

}

router.delete('/del/:id', async (req, res) => {

    try {
        const user_remove = await User.deleteOne({ _id: req.params.id })

        return res.send({
            user_remove,
        });
    } catch (err) {
        return res.status('400').send({ error: 'failed to delete' })
    }
})

router.patch('/update/:id', async (req, res) => {
    try {
        const user_updated = await User.updateOne({ _id: req.params.id }, { $set: { name: req.body.name } })

        return res.send({
            user_updated,
        });
    } catch (err) {
        return res.status('400').send({ error: 'failed to update' })
    }

})

router.get('/', async(req,res) =>{
    User.find({}, function(err, users) {
        var userMap = [];
    
        users.forEach( (user) => {
          userMap.push(user);
        });
    
        res.send(userMap);  
      });
});

router.post('/register', async (req, res) => {
    try {
        const { email } = req.body;
        if (await User.findOne({ email }))
            return res.status('400').send({ error: 'Email already exist' });

        const user = await User.create(req.body);
        user.password = undefined;

        return res.send({
            user,
            token: generateToken({ id: user.id })
        });
    } catch (err) {
        return res.status('400').send({ error: 'failed' })
    }

});

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user)
        return res.status('400').send({ error: 'User not found' });

    if (!await bcrypt.compare(password, user.password))
        return res.status('400').send({ error: 'Invalid password' });

    user.password = await undefined;


    return res.send({
        user,
        token: generateToken({ id: user.id })
    });
});

module.exports = app => app.use('/auth', router);