const passport = require('passport');
const jwt = require('jsonwebtoken');
const secretOrKey = require('../config/settings').secret;

exports.signup = (req, res) => {
	passport.authenticate('local-signup', { session: false }, (err, user, info) => {
		if (info) return res.json(info);
		return res.json({ user });
	})(req, res);
};

exports.signin = (req, res) => {
	passport.authenticate('local-signin', { session: false }, (err, user, info) => {
		console.log('\n\nauth controller\n', req.headers, '\n\nauthC', user);
		if (err || info) {
			return res.status(400).send({
				message: 'Something is not right',
				error: err,
				info,
			});
		}

		req.login(user, (error) => {
			if (error) {
				return res.send(error);
			}
			const token = jwt.sign(user, secretOrKey);
			return res.json({ success: true, token: `Bearer ${token}` });
		});
		return null;
	})(req, res);
};
