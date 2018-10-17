const passport = require('passport');
const models = require('../models');

exports.user = (req, res) => {
	passport.authenticate('jwt', async (err, user) => {
		console.log('\n\nUser controller\n\n', user, '\n\n', req.headers);
		const { User } = models;
		if (user) {
			const userInstance = await User.findById(user.id);
			try {
				res.send({ error: null, profile: userInstance });
			} catch (e) {
				res.send({
					error: 'Couldn"t fetch user from the database',
					profile: false,
				});
			}
		} else {
			res.send({ error: 'Couldn"t authenticate user', profile: false });
		}
	})(req, res);
};

exports.fetchBooks = (req, res) => {
	passport.authenticate('jwt', async (err, user) => {
		const { User, Book } = models;
		if (user) {
			const booksField = [
				{
					model: Book,
					attributes: { exclude: ['BookUsers'] },
					through: { attributes: [] },
				},
			];
			const userInstance = await User.findById(user.id, {
				include: booksField,
			});
			try {
				res.send({ error: null, list: userInstance.Books });
			} catch (e) {
				res.send({
					error: 'Couldn"t fetch books from the database',
					list: [],
				});
			}
		} else {
			res.send({ error: 'Couldn"t authenticate user', list: [] });
		}
	})(req, res);
};

exports.addBook = (req, res) => {
	passport.authenticate('jwt', async (err, user) => {
		const {
			title, author, genre, userId,
		} = req.body;
		const { User, Book } = models;
		if (user) {
			const userInstance = await User.findById(userId, {
				include: [Book],
			});
			const book = await Book.create({ title, author, genre });
			try {
				await userInstance.addBook(book);
				res.send({ book, error: null });
			} catch (e) {
				res.send({ book: null, error: 'Failed to add book' });
			}
		} else {
			res.send({ book: null, error: 'Couldn"t authenticate user' });
		}
	})(req, res);
};
