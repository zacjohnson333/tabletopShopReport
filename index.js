const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');    // an engine that makes sense/parse ejs
const methodOverride = require('method-override');
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


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));    // Parses req.body (during POST method)
app.use(methodOverride('_method'));


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

app.get('/shops/:id/edit', async (req, res) => {
    const shop = await Shop.findById(req.params.id);
    res.render('shops/edit', { shop });

});

app.put('/shops/:id', async (req, res) => {
    const { id } = req.params;
    const shop = await Shop.findByIdAndUpdate(id, { ...req.body.shop }) // first arg is for finding, second arg is for updating
    res.redirect(`/shops/${shop._id}`);             // ^ spread operator spreads out each element of shop to be updated 
    // ^ recall we use shop[name] & shop[location] so each of these are spread into the update
});

app.delete('/shops/:id', async (req, res) => {
    const { id } = req.params;
    await Shop.findByIdAndDelete(id);
    res.redirect('/shops');
})


app.listen(3000, () => {
    console.log('Serving on port 3000');
});