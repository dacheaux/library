const bCrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const secretOrKey = require('../settings').secret;

module.exports = (userModel) => {
	const User = userModel;
	// serialize
	passport.serializeUser((user, done) => {
		console.log('\nserializeUser', user, '\n');

		done(null, user.id);
	});

	// deserialize user
	passport.deserializeUser((id, done) => {
		console.log('\ndeserializeUser', id, '\n');
		User.findById(id).then((user) => {
			if (user) {
				done(null, user.get());
			} else {
				done(user.errors, null);
			}
		});
	});

	passport.use(
		new JWTStrategy(
			{
				jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
				secretOrKey,
			},
			(jwtPayload, done) => {
				console.log('JWTStrategy');

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
			(req, email, password, done) => {
				const generateHash = pass => bCrypt.hashSync(pass, bCrypt.genSaltSync());
				User.findOne({
					where: {
						email,
					},
				}).then((user) => {
					if (user) {
						return done(null, false, {
							message: 'That email is already taken',
						});
					}
					const hashedPassword = generateHash(password);
					const data = {
						email,
						password: hashedPassword,
						firstname: req.body.firstname || '',
						lastname: req.body.lastname || '',
					};

					User.create(data).then((newUser) => {
						if (!newUser) {
							return done(null, false);
						}
						if (newUser) {
							return done(null, newUser);
						}
						return done(null, null, null);
					});
					return done(null, null, null);
				});
			}
		)
	);
	// LOCAL SIGNIN
	passport.use(
		'local-signin',
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
				passReqToCallback: true,
			},
			(req, email, password, done) => {
				const isValidPassword = (pass, userpass) => bCrypt.compareSync(pass, userpass);
				User.findOne({
					where: {
						email,
					},
				})
					.then((user) => {
						if (!user) {
							return done(null, false, {
								message: 'Email does not exist',
							});
						}
						if (!isValidPassword(password, user.password)) {
							return done(null, false, {
								message: 'Incorrect password.',
							});
						}
						const userinfo = user.get();
						return done(null, userinfo);
					})
					.catch(err => done(err, false, {
						message: 'Something went wrong with your Signin',
					}));
			}
		)
	);
};
