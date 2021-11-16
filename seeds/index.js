const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Shop = require('../models/shop');


mongoose.connect('mongodb://localhost:27017/tabletop-shop-report', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});


const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Shop.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const shop = new Shop({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            name: `${sample(descriptors)} ${sample(places)}`
        });
        await shop.save();
    }
}

seedDB().then(() => {
    console.log('Seeded');
    mongoose.connection.close();
    console.log('Database disconnected');
});