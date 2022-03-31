//Imports
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');
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

app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');
app.set('views', __dirname + '/views');

app.use(expressLayouts);
app.use(express.static('public'));
app.use('/', indexRouter);


app.listen(4000, ()=>{
    console.log('Listening on port 4000');
});