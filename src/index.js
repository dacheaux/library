const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const path = require('path');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const secret = require('./config/keys').sessionSecret;
const authRoute = require('./routes/auth.js');
const userRoute = require('./routes/user.js');

const app = express();

app.use(cors());
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ secret, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Models
const models = require('./models');

// Routes
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);


// Sync Database
models.sequelize
	.sync()
	.then(() => console.log('Nice! Database up and running'))
	.catch(err => console.log(err, 'Something went wrong with the Database Update!'));

if (process.env.NODE_ENV === 'production') {
	const root = path.join(__dirname, 'client/build');
	app.use(express.static(root));
	app.get('*', (req, res) => {
		res.sendFile('index.html', { root });
	});
}

const port = process.env.PORT || 5010;
app.listen(port, (err) => {
	if (!err) {
		console.log(`Server running on port ${port}`);
	} else console.log(err);
});
