import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import publicFolder from '../constants';

// const importAll = (r) => {
// 	const images = {};
// 	r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
// 	return images;
// };
// const images = importAll(require.context('../files', false, /\.(png|jpe?g|svg)$/));

const Book = (props) => {
	const {
		user: { profile },
		books: { list },
		match: { params },
	} = props;
	const bookId = parseInt(params.id, 10);
	const currentBook = list.find(book => book.id === bookId);
	if (!currentBook) return <div>Loading...</div>;
	const { title, cover, description } = currentBook;
	const authorized = currentBook.Users.some(bookUser => bookUser.id === profile.id);
	return (
		<div>
			{authorized && (
				<Link
					to={`/library/edit-book/${params.id}`}
					href={`/library/edit-book/${params.id}`}
				>
					<span className="no-underline text-secondary font-weight-bold">Edit...</span>
				</Link>
			)}
			<h2 className="text-center mb-4">{title}</h2>
			<div className="text-center">
				{<img src={`${publicFolder}${cover}`} alt="book cover" className="w-50" />}
			</div>
			<p className="mt-4">{description}</p>
		</div>
	);
};

Book.propTypes = {
	user: PropTypes.shape({}).isRequired,
	books: PropTypes.shape({}).isRequired,
	match: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
	user: state.get('user').toJS(),
	books: state.get('books').toJS(),
});

const mapDispatchToProps = dispatch => ({
	action: bindActionCreators(actions, dispatch),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Book);
