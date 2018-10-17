import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ToJS from './ToJS';
import * as actions from '../actions';

class Library extends Component {
	state = { title: '', author: '', genre: '' };
	componentDidMount() {
		const { fetchBooks } = this.props;
		fetchBooks();
	}

	onChange = (e) => {
		const state = { ...this.state };
		state[e.target.name] = e.target.value;
		this.setState(state);
	};

	onSubmit = async (e) => {
		e.preventDefault();

		const { title, author, genre } = this.state;
		const { user: { profile }, addBook } = this.props;
		addBook({
			title, author, genre, userId: profile.id,
		});
		this.setState({ title: '', author: '', genre: '' });
	};

	render() {
		const { books } = this.props;
		const { list, error } = books;
		const { title, author, genre } = this.state;
		return (
			<div>
				<div className="panel-body">
					<table className="table table-stripe">
						<thead>
							<tr>
								<th>Title</th>
								<th>Author</th>
								<th>Genre</th>
							</tr>
						</thead>
						<tbody>
							{list.map(book => (
								<tr key={book.id}>
									<td>{book.title}</td>
									<td>{book.author}</td>
									<td>{book.genre}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div>
					<form className="form-signin" onSubmit={this.onSubmit}>
						<h3 className="form-signin-heading">
							<span>Add new book to library</span>
						</h3>
						<input
							type="text"
							name="title"
							className="form-control"
							placeholder="Book title"
							value={title}
							onChange={this.onChange}
							required
						/>
						<input
							type="text"
							name="author"
							className="form-control"
							placeholder="Book author"
							value={author}
							onChange={this.onChange}
							required
						/>
						<input
							type="text"
							name="genre"
							className="form-control"
							placeholder="Book genre"
							value={genre}
							onChange={this.onChange}
							required
						/>
						<button
							className="btn btn-lg btn-primary btn-block"
							type="submit"
						>
							<span>Add book</span>
						</button>
						<p><span>{error}</span></p>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({ user: state.get('user'), books: state.get('books') });

export default connect(mapStateToProps, actions)(ToJS(Library));
