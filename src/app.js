const location = require("./location"),
  forecast = require("./forecast"),
  express = require("express"),
  path = require("path"),
  app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
//DEFINE
app.set("view engine", "ejs");
app.use(express.static(publicDirectoryPath));

//ROUTES

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/weather", (req, res) => {
  location(req.query.address, (err, { latitude, longtitude, name }) => {
    if (err) {
      return res.send({ error });
    }
    forecast(
      latitude,
      longtitude,
      (err, { forecast = "-", icon = "-" } = {}) => {
        if (err) {
          return res.send({ error });
        }
        res.send({
          forecast: forecast,
          location: name,
          icon: icon,
        });
      }
    );
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/*", (req, res) => {
  res.render("404");
});

//PORT
app.listen(process.env.PORT || 3000, () => {
  console.log("Connect to Weather Application Server");
});
