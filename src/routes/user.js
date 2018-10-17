const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/', userController.user);
router.get('/fetch-books', userController.fetchBooks);
router.post('/add-book', userController.addBook);

module.exports = router;
