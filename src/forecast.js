const request = require("request");

const forecast = (latitude, longtitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=a8c0792b506874188a4925587ad3fe6c&query=" +
    latitude +
    "," +
    longtitude +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        forecast:
          body.current.weather_descriptions +
          " and it is currently " +
          body.current.temperature +
          " degress out (feels like " +
          body.current.feelslike +
          " degress). There is a " +
          body.current.precip +
          "% chance of rain.",
        icon: body.current.weather_icons,
      });
    }
  });
};

module.exports = forecast;
