const router = require('express').Router();
const authController = require('../controllers/authController.js');
const models = require('../models');
// load passport strategies
require('../config/passport/passport-local.js')(models.User);

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

router.get('/logout', (req, res) => {
	req.session.destroy(() => res.redirect('/'));
});

module.exports = router;
