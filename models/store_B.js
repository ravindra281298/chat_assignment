const mongoose = require('mongoose');
const schema = mongoose.Schema;

const storeSchema = new schema({
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

module.exports = mongoose.model('store_bs', storeSchema );