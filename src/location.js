const request = require("request");

const location = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoiYW5ncnljaGFuaW4iLCJhIjoiY2s5MTRtdWJ3MDhzaTNtbXU2NjVzMXhjMyJ9.1q2UJvfsq3IfP74HuRorSA&limit=1";

  request({ url, json: true }, async (err, { body }) => {
    try {
      await callback(undefined, {
        latitude: body.features[0].center[1],
        longtitude: body.features[0].center[0],
        name: body.features[0].place_name,
      });
    } catch (err) {
      console.log("Please provide correct address!");
    }
  });
};

module.exports = location;
