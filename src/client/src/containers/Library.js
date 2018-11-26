import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import EditBook from './EditBook';
import BookUserList from '../components/BookUserList';

class Library extends Component {
	static propTypes = {
		user: PropTypes.shape({}).isRequired,
		books: PropTypes.shape({}).isRequired,
		action: PropTypes.shape({}).isRequired,
		match: PropTypes.shape({}).isRequired,
	};

	componentDidMount() {
		const { user: { profile }, history } = this.props;
		if (!profile) {
			history.push('/login');
		}

	}

	onDelete = async (id) => {
		const { action } = this.props;
		action.deleteBook(id);
	};

	render() {
		const {
			books,
			user,
			action,
			match: { url },
		} = this.props;
		const { list } = books;
		const userList = list.filter(book => book.Users.some(bookUser => bookUser.id === user.profile.id));
		const listWithEditBook = (
			<div className="container">
				<EditBook user={user} action={action} />
				<BookUserList userList={userList} onDelete={this.onDelete} />
			</div>
		);
		return (
			<div>
				<Route
					path={`${url}/edit-book/:id`}
					render={props => <EditBook {...props} user={user} books={books} action={action} />}
				/>
				<Route exact path={url} render={() => listWithEditBook} />
			</div>
		);
	}
}

export default Library;
