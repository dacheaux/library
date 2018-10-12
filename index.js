const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({ secret: 'randomasdf', resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

//Models
const models = require('./models');

//Routes
const authRoute = require('./routes/auth.js')(app, passport);

//load passport strategies
require('./config/passport/passport-local.js')(passport, models.User);

//Sync Database
models.sequelize
  .sync()
  .then(() => console.log('Nice! Database up and running'))
  .catch(err =>
    console.log(err, 'Something went wrong with the Database Update!')
  );

app.get('/', (req, res) => {
  res.send('atelje');
});

const port = process.env.PORT || 5010;
app.listen(port, err => {
  if (!err) {
    console.log(`Server running on port ${port}`);
  } else console.log(err);
});

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//   const path = require("path");
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }
