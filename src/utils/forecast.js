const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/d8f7787eddf544bddbf9e1002a4e4afe/${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) callback('Unable to connect to weather service');
    else if (body.error) callback('Unable to find forecast');
    else {
      const { currently } = body;
      callback(
        undefined,
        `It is currently ${currently.temperature} degree out. there is a ${currently.precipProbability}% chance of rain`
      );
    }
  });
};

module.exports = forecast;
