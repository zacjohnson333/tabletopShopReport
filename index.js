const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');    // an engine that makes sense/parse ejs
const { shopSchema } = require('./schemas.js');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
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
app.use(express.static(path.join(__dirname, 'public')));       // required to access public dir

// JOI Validation Middleware
const validateShop = (req, res, next) => {
    const { error } = shopSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}


app.get('/', (req, res) => {
    res.render('home');
});

app.get('/shops', catchAsync(async (req, res) => {
    const shops = await Shop.find({});
    res.render('shops/index', { shops });
}));

app.get('/shops/new', (req, res) => {
    res.render('shops/new');
});

app.post('/shops', validateShop, catchAsync(async (req, res, next) => {
    // if (!req.body.shop) throw new ExpressError('Invaldid Shop Data', 400); PROBABLY WONT NEED THIS ONCE JOI IS IN PLACE
    const shop = new Shop(req.body.shop);
    await shop.save();
    res.redirect(`/shops/${shop._id}`);
}));

app.get('/shops/:id', catchAsync(async (req, res) => {
    const shop = await Shop.findById(req.params.id);
    res.render('shops/show', { shop });
}));

app.get('/shops/:id/edit', catchAsync(async (req, res) => {
    const shop = await Shop.findById(req.params.id);
    res.render('shops/edit', { shop });

}));

app.put('/shops/:id', validateShop, catchAsync(async (req, res) => {
    const { id } = req.params;
    const shop = await Shop.findByIdAndUpdate(id, { ...req.body.shop }) // first arg is for finding, second arg is for updating
    res.redirect(`/shops/${shop._id}`);             // ^ spread operator spreads out each element of shop to be updated 
    // ^ recall we use shop[name] & shop[location] so each of these are spread into the update
}));

app.delete('/shops/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Shop.findByIdAndDelete(id);
    res.redirect('/shops');
}));

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Uh oh! There's an error afoot!";
    res.status(statusCode).render('error', { err });
});

app.listen(3000, () => {
    console.log('Serving on port 3000');
});