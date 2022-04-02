//Imports
const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');

require('dotenv').config();


//MongoDB setup
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on('error', error=>{
    console.log(error)
});
db.once('open', ()=>{
    console.log('Connected to database')
})

//Express setup
const app = express();

//Settings
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');
app.set('views', __dirname + '/views');

//Middlewares
app.use(express.urlencoded({ limit: '10mb', extended: false}));
app.use(expressLayouts);
app.use(express.static('public'));

//Routers
app.use('/', indexRouter);
app.use('/authors', authorRouter);

//Start
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});