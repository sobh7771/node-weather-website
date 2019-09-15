const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../public')));

// Setup views directory and view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Ahmed Sobh',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Ahmed Sobh',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    msg: 'This is the help page',
    title: 'Help',
    name: 'Ahmed Sobh',
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    res.send({
      error: 'You must provide address',
    });

    return;
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) return res.send({ error });
    forecast(latitude, longitude, (error, forecastDate) => {
      if (error) return res.send({ error });

      res.send({
        forecast: forecastDate,
        location,
        address,
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('notFound', {
    title: '404',
    name: 'Ahmed Sobh',
    msg: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('notFound', {
    title: '404',
    name: 'Ahmed Sobh',
    msg: 'Page not found',
  });
});

app.listen(port, console.log(`Server is up on port ${port}`));
