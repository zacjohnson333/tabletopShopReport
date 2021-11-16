const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShopSchema = new Schema({
    name: String,
    location: String,
    hours: String,
    description: String,
    phone: String,
    link: String,
    features: String
});

module.exports = mongoose.model('Shop', ShopSchema);