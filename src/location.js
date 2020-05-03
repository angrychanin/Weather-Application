const request = require("request");

const location = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoiYW5ncnljaGFuaW4iLCJhIjoiY2s5MTRtdWJ3MDhzaTNtbXU2NjVzMXhjMyJ9.1q2UJvfsq3IfP74HuRorSA&limit=1";

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longtitude: body.features[0].center[0],
        name: body.features[0].place_name,
      });
    }
  });
};

module.exports = location;
