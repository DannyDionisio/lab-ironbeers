const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials');

//set routing logic
app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      console.log(beers[0]);
      res.render('beers', { beers });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/random-beers', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(beers => {
      res.render('randomBeer', { beer: beers[0] });
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000);
