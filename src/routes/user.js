const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/', userController.fetchUser);
router.get('/fetch-books', userController.fetchBooks);
router.get('/fetch-books/:id', userController.fetchBookById);
router.post('/save-book', userController.saveBook);
router.delete('/delete-book/:id', userController.deleteBook);
router.post('/upload', userController.upload);

module.exports = router;
