const express = require('express');
const bodyParser = require('body-parser');
const passport = require("passport");


const apiRoute = require('./routes/api.route');

const app = express();
const port = 3001;

const auth = require('./auth/auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
app.use('/api', apiRoute);

const mongoose = require('mongoose');
const DB_URL = 'mongodb://ilixi:123456428241467qaz@ds253104.mlab.com:53104/huntor'
const mongoDB = process.env.MONGODB_URI || DB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/secret', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.status(200).json({
        token: req.user,
    })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))