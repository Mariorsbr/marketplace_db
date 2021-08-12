const express = require('express');
const storeMiddleware = require('../middlewares/storeMdd');

const Product = require('../models/Product');
const router = express.Router();

router.use(storeMiddleware);

router.post('/register', async (req,res)=>{
    try {
        
        const product = await Product.create(req.body);
    
        return res.send({ product });
    } catch(err){
        return res.status('400').send({error: 'failed'})
    }
});

module.exports = app => app.use('/products', router);