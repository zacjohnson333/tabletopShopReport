const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Shop = require('./models/shop');


mongoose.connect('mongodb://localhost:27017/tabletop-shop-report', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});


const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));    // Parses req.body (during POST method)


app.get('/', (req, res) => {
    res.render('home');
});

app.get('/shops', async (req, res) => {
    const shops = await Shop.find({});
    res.render('shops/index', { shops });
});

app.get('/shops/new', (req, res) => {
    res.render('shops/new');
});

app.post('/shops', async (req, res) => {
    const shop = new Shop(req.body.shop);
    await shop.save();
    res.redirect(`/shops/${shop._id}`);
});

app.get('/shops/:id', async (req, res) => {
    const shop = await Shop.findById(req.params.id);
    res.render('shops/show', { shop });
});


app.listen(3000, () => {
    console.log('Serving on port 3000');
});