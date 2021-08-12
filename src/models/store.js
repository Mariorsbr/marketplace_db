const mongoose = require('../database');
const bcrypt = require('bcryptjs');



const StoreSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    description:
    {
        type: String,
        require: true,
    },
    logo:{
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },


});

StoreSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})

const Store = mongoose.model('Store', StoreSchema);

module.exports = Store;