const passport = require('passport');
const jwt = require('jsonwebtoken');
const secretOrKey = require('../config/keys').jwtSecret;

exports.signup = (req, res) => {
	passport.authenticate('local-signup', { session: false }, (err, user, msg) => {
		if (err || msg) return res.send({ err, success: false, msg });
		return res.send({ success: true });
	})(req, res);
};

exports.signin = (req, res) => {
	passport.authenticate('local-signin', { session: false }, (err, user, msg) => {
		if (err || msg) {
			return res.send({ err, success: false, msg });
		}
		const token = jwt.sign(user, secretOrKey);
		return res.send({ success: true, token: `Bearer ${token}` });
	})(req, res);
};
