require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT;
const cluster = require("cluster");
const totalCPUs = require("os").cpus().length;


if (cluster.isMaster) {
    console.log(`Number of CPUs is ${totalCPUs}`);
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log("Let's fork another worker!");
        cluster.fork();
    });
} else {

    const app = express();
    const {
        engine
    } = require("express-handlebars");
    var compression = require('compression');

    app.use(compression());
    //Setup
    // app.use(compression());
    var options = {
        etag: true,
        maxAge: 3600000,
        redirect: true,
        setHeaders: function(res, path, stat) {
            res.set({
                'x-timestamp': Date.now()
            });
        }
    }


    app.use(express.static(__dirname + '/setup/1.resources', options));
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

    app.get('/register', (req, res) => {
        res.render('2.extrapages/register')
    });

    app.get('/privacy-policy', (req, res) => {
        res.render('2.extrapages/privacypolicy')
    });

    app.get('/terms-of-use', (req, res) => {
        res.render('2.extrapages/termsofuse')
    });

    //App Listen
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`)
    });

}