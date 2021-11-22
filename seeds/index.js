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
            name: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/4959235/1600x900',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna nec tincidunt praesent semper feugiat. Vulputate ut pharetra sit amet aliquam id diam maecenas ultricies. Amet dictum sit amet justo donec enim diam. Gravida dictum fusce ut placerat orci nulla.',
            hours: '11AM - 7PM',
            phone: '(555)555-5555',
            features: 'New games, used games, trade-ins, Magic: The Gathering Tournaments, table space, painting classes'
        });
        await shop.save();
    }
}

seedDB().then(() => {
    console.log('Seeded');
    mongoose.connection.close();
    console.log('Database disconnected');
});