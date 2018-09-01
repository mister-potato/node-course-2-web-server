const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

// handlebars partials
hbs.registerPartials(__dirname + '/views/partials');

// set handlebars template engine
app.set('view engine', 'hbs');



app.use((req, res, next) => {
    let now = new Date().toString();
    // console.log("###############");
    // console.log(req);
    // console.log("###############");
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(res);

    fs.appendFile('server.log', log + "\n", (err) => {
        if(err) {
            console.log('Unable to append to server log');
        }
    });

    next();
});

// maintenance mode
// app.use((req, res, next) => {
//     res.render('maintenance');   // if I don't use next(), middleware stops the response
// });

// public static folder (middleware)
app.use(express.static(__dirname + '/public'));

// handlebars helpers
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});



// routes

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        name: 'Ubik',
        pageTitle: 'About Page',
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page',
        projects: [
            { name: "project 1" },
            { name: "project 2" }
        ]
    });
});

app.get('/bad', (req, res) => {
   res.send({
       errorMessage: 'Unable to handle request'
   });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});