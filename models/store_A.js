const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    rating:{
        type: Number,
    },
    price:{
        type: Number,
    },
    store: {
        type: String,
    }
});

module.exports = mongoose.model('store_as', storeSchema );
