const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const path = require('path');

const authRoute = require('./routes/auth.js');
const userRoute = require('./routes/user.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ secret: 'randomasdf', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Models
const models = require('./models');

// Routes
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// Sync Database
models.sequelize
	.sync()
	.then(() => console.log('Nice! Database up and running'))
	.catch(err => console.log(err, 'Something went wrong with the Database Update!'));

const port = process.env.PORT || 5010;
app.listen(port, (err) => {
	if (!err) {
		console.log(`Server running on port ${port}`);
	} else console.log(err);
});

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}
