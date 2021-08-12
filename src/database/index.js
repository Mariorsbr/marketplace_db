const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/noderest' ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, console.log("db connecting"));

mongoose.Promise = global.Promise;

module.exports = mongoose;