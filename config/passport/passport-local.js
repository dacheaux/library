const bCrypt = require('bcryptjs');

module.exports = (passport, user) => {
  const User = user;
  const LocalStrategy = require('passport-local').Strategy;
  //serialize
  passport.serializeUser((user, done) => {
    console.log('passport.serializeUser', user);
    done(null, user.id);
  });

  // deserialize user
  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });
  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      (req, email, password, done) => {
        console.log(req.body);
        const generateHash = password =>
          bCrypt.hashSync(password, bCrypt.genSaltSync());
        User.findOne({
          where: {
            email
          }
        }).then(user => {
          if (user) {
            return done(null, false, {
              message: 'That email is already taken'
            });
          } else {
            const userPassword = generateHash(password);
            const data = {
              email,
              password: userPassword,
              firstname: req.body.firstname,
              lastname: req.body.lastname
            };

            User.create(data).then((newUser, created) => {
              if (!newUser) {
                return done(null, false);
              }
              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        });
      }
    )
  );
  //LOCAL SIGNIN
  passport.use(
    'local-signin',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      (req, email, password, done) => {
        const User = user;
        const isValidPassword = (password, userpass) => {
          return bCrypt.compareSync(password, userpass);
        };
        User.findOne({
          where: {
            email
          }
        })
          .then(user => {
            if (!user) {
              return done(null, false, {
                message: 'Email does not exist'
              });
            }
            if (!isValidPassword(password, user.password)) {
              return done(null, false, {
                message: 'Incorrect password.'
              });
            }
            const userinfo = user.get();
            console.log('\nUser info: ', userinfo, '\n');
            return done(null, userinfo);
          })
          .catch(err => {
            console.log('Error:', err);
            return done(null, false, {
              message: 'Something went wrong with your Signin'
            });
          });
      }
    )
  );
};
