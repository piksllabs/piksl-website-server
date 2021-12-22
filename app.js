const express = require('express');
const app = express();
const { engine } = require("express-handlebars");
require('dotenv').config();

//Setup
const PORT = process.env.PORT
app.use(express.static(__dirname + '/setup/1.resources'))
    //HBS setup
app.engine('.hbs', engine({
    extname: '.hbs',
    defaultLayout: __dirname + '/setup/3.views/0.layout/defaultlayout',
    partialsDir: __dirname + '/setup/2.partials'
}));
app.set('view engine', '.hbs');
app.set("views", "./setup/3.views");

//Website Render
//Main Render
app.get('/', (req, res) => {
    res.render('1.mainpages/index')
});

app.get('/marketplace', (req, res) => {
    res.render('1.mainpages/marketplace')
});

app.get('/dripclub/tokenid=*', (req, res) => {
    res.render('1.mainpages/tokens')
});

app.get('/dashboard', (req, res) => {
    res.render('2.extrapages/dashboard')
});

app.get('/mint', (req, res) => {
    res.render('2.extrapages/mint')
});

app.get('/address=*', (req, res) => {
    res.render('2.extrapages/dashboard')
});

app.get('/test', (req, res) => {
    res.render('2.extrapages/test')
});

app.get('/dripclub', (req, res) => {
    res.render('1.mainpages/dripclub')
});

app.get('/fashion', (req, res) => {
    res.render('1.mainpages/fashion')
});

app.get('/roadmap', (req, res) => {
    res.render('1.mainpages/roadmap')
});


//App Listen
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
});