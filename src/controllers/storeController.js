const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Store = require('../models/Store');
const authConfig = require('../config/auth');

const router = express.Router();

function generateToken(params = {}){
    return jwt.sign(params, authConfig.storePass, {
        expiresIn: 86400,
    });

}

router.get('/', async(req,res) =>{
    Store.find({}, function(err, stores) {
        var storeMap = {};
    
        stores.forEach(function(store) {
          storeMap[store._id] = store;
        });
    
        res.send(storeMap);  
      });
});

router.post('/register', async ( req, res) => {
    try {
        const {email} = req.body;
        if(await Store.findOne({email}))
            return res.status('400').send({error: 'Email already exist'});

        const store = await Store.create(req.body);
        
        return res.send({
            store, 
            token: generateToken({id: store.id})
        });  
        
    } catch(err){
        return res.status('400').send({error: 'failed'})
    }

});

router.post('/authenticate' , async (req, res) => {
    const {email, password} = req.body;

    const store = await Store.findOne({email}).select('+password');
    
    if(!store)
        return res.status('400').send({error: 'User not found'});

    if(!await bcrypt.compare(password, store.password))
        return res.status('400').send({error: 'Invalid password'});  

    store.password = await undefined;
     

    return res.send({
        store, 
        token: generateToken({id: store.id})
    });  
    //return res.send({store});  
});

module.exports = app => app.use('/store',router);