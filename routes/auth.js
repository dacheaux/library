const authController = require('../controllers/authController.js');

module.exports = (app, passport) => {
  app.get('/auth/signup', authController.signup);
  app.post(
    '/auth/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/user/dashboard',
      failureRedirect: '/auth/signup'
    })
  );
  app.get('/auth/signin', authController.signin);
  app.post(
    '/auth/signin',
    passport.authenticate('local-signin', {
      successRedirect: '/user/dashboard',
      failureRedirect: '/auth/signin'
    })
  );
  app.get('/user/dashboard', isLoggedIn, authController.dashboard);
  app.get('/auth/logout', authController.logout);

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/signin');
  }
};