exports.signup = function(req, res) {
  console.log(req.body);
  res.send('signup');
};

exports.signin = function(req, res) {
  console.log(req.body);
  res.send('signin');
};

exports.dashboard = function(req, res) {
  console.log(req.body);
  res.send('dashboard');
};

exports.logout = function(req, res) {
  console.log(req.body);
  req.session.destroy(function(err) {
    res.redirect('/');
  });
};