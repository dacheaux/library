import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import EditBook from './EditBook';
import Book from '../components/Book';
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
				<BookUserList userList={userList} />
			</div>
		);
		return (
			<Switch>
				<Route path={`${url}/edit-book/values`} render={props => <EditBook {...props} current={books.current} />} />
				<Route path={`${url}/edit-book`} component={EditBook} />
				<Route path={`${url}/:id/:book`} component={Book} />
				<Route path={url} render={() => listWithEditBook} />
			</Switch>
		);
	}
}

export default Library;
