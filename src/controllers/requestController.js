const express = require('express');


const Userrequest = require('../models/Userrequest');
const router = express.Router();



router.post('/register', async (req, res) => {
    try {

        const user_request = await Userrequest.create(req.body);

        return res.send({  user_request });
    } catch (err) {
        return res.status('400').send({ error: 'failed' })
    }
});


router.get('/user/:user', async (req, res) => {
    Userrequest.find({}, function (err, userrequests) {
        var userrequestsMap = [];

        userrequests.forEach(function (userrequest) {
            if (userrequest.user == req.params.user) {
                userrequestsMap.push(userrequest);
            }
        });

        res.send(userrequestsMap);
    });
});

module.exports = app => app.use('/user_requests', router);