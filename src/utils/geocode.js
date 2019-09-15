const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYWhtZWQtc29iaCIsImEiOiJjazBlbmp5OTUwamZwM2JwbTJxYTYya3VlIn0.A_ZjtwrgXwTOS2xorH0f9Q&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    // console.log(body);
    if (error) callback('Unable to connect to location service');
    if (!body.features.length) callback('Unable to find location');
    else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
