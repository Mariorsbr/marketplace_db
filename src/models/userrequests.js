const mongoose = require('../database');


const UserRequestSchema = new mongoose.Schema({
    user:{
        type: String,
        require: true,
    },
    products:{
        type: Array,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },


});


const UserRquest = mongoose.model('UserRquest', UserRequestSchema);

module.exports = UserRquest;