const passport = require('passport');
const models = require('../models');
const AWS = require('aws-sdk');
const { s3AccessKeyId, s3SecretAccessKey, s3Bucket, s3Key } = require('../config/keys');

exports.user = (req, res) => {
	passport.authenticate('jwt', async (err, user) => {
		const { User } = models;
		if (user) {
			const userInstance = await User.findById(user.id);
			try {
				res.send({ error: null, profile: userInstance });
			} catch (e) {
				res.send({
					error: 'Unable to fetch user from the database',
					profile: false,
				});
			}
		} else {
			res.send({ error: 'Unable to authenticate user', profile: false });
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
					error: 'Unable to fetch books from the database',
					list: [],
				});
			}
		} else {
			res.send({ error: 'Unable to authenticate user', list: [] });
		}
	})(req, res);
};

exports.fetchAllBooks = async (req, res) => {
	const { User, Book } = models;
	const books = await Book.findAll({ include: [User] });
	try {
		res.send({ error: null, books });
	} catch (e) {
		res.send({
			error: 'Unable to fetch books from the database',
		});
	}
}

exports.addBook = (req, res) => {
	passport.authenticate('jwt', async (err, user) => {
		const {
			userId,
			...bookData
		} = req.body;
		const { User, Book } = models;
		if (user) {
			const userInstance = await User.findById(userId, {
				include: [Book],
			});
			const book = await Book.create({ ...bookData });
			try {
				await userInstance.addBook(book);
				res.send({ book, error: null });
			} catch (e) {
				res.send({ book: null, error: 'Unable to add book' });
			}
		} else {
			res.send({ book: null, error: 'Unable to authenticate user' });
		}
	})(req, res);
};

exports.deleteBook = (req, res) => {
	passport.authenticate('jwt', async (err, user) => {
		const { id } = req.params;
		const { Book } = models;
		if (user) {
			const bookInstance = await Book.findById(id);
			try {
				await bookInstance.destroy();
				res.send({ success: true });
			} catch (e) {
				res.send({ error: 'Unable to delete book' });
			}
		} else {
			res.send({ error: 'Unable to authenticate user' });
		}
	})(req, res);
};

exports.fetchBookById = (req, res) => {
	passport.authenticate('jwt', async (err, user) => {
		const { id } = req.params;
		const { Book } = models;
		if (user) {
			const book = await Book.findById(id);
			try {
				res.send({ success: true, book });
			} catch (e) {
				res.send({ error: 'Unable to find book' });
			}
		} else {
			res.send({ error: 'Unable to authenticate user' });
		}
	})(req, res);
};

exports.upload = (req, res) => {
	passport.authenticate('jwt', async (err, user) => {
		if (!user) return res.send({ error: 'Unable to authenticate user' });
		const uploadFile = req.files.file;
		const fileName = req.files.file.name;
		const s3 = new AWS.S3({
			accessKeyId: s3AccessKeyId,
			secretAccessKey: s3SecretAccessKey,
		});
		const params = {
			Bucket: s3Bucket,
			Key: `${s3Key}/${fileName}`,
			Body: uploadFile.data,
			ContentType: uploadFile.mimetype,
		};
		s3.upload(params, (s3Err, data) => {
			if (s3Err) throw s3Err;
			console.log(`File uploaded successfully at ${data.Location}`);
			res.send({ url: data.Location });
		});
	})(req, res);
};
