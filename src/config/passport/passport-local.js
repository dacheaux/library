const bCrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const secretOrKey = require('../settings').secret;

module.exports = (userModel) => {
	const User = userModel;

	passport.use(
		new JWTStrategy(
			{
				jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
				secretOrKey,
			},
			(jwtPayload, done) => {
				done(null, jwtPayload);
			}
		)
	);

	passport.use(
		'local-signup',
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
				passReqToCallback: true,
			},
			async (req, email, password, done) => {
				const generateHash = pass => bCrypt.hashSync(pass, bCrypt.genSaltSync());
				const user = await User.findOne({ where: { email } });
				try {
					if (user) {
						return done(null, false, {
							msg: 'That email is already taken',
						});
					}
					const hashedPassword = generateHash(password);
					const data = {
						email,
						password: hashedPassword,
						firstname: req.body.firstname || '',
						lastname: req.body.lastname || '',
					};
					const newUser = await User.create(data);
					if (!newUser) {
						return done(null, false);
					}
					return done(null, newUser);
				} catch (err) {
					return done(err, false, { msg: 'Something went wrong' });
				}
			}
		)
	);

	passport.use(
		'local-signin',
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
				passReqToCallback: true,
			},
			async (req, email, password, done) => {
				const isValidPassword = (pass, userpass) => bCrypt.compareSync(pass, userpass);
				const user = await User.findOne({ where: { email } });
				try {
					if (!user) {
						return done(null, false, { msg: 'Email does not exist' });
					}
					if (!isValidPassword(password, user.password)) {
						return done(null, false, { msg: 'Incorrect password.' });
					}
					const userinfo = user.get();
					return done(null, userinfo);
				} catch (err) {
					return done(err, false, { msg: 'Something went wrong' });
				}
			}
		)
	);
};
