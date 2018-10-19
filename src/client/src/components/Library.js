import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ToJS from './ToJS';
import bookFields from './bookFields';
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

	onAddBook = async (e) => {
		e.preventDefault();

		const { title, author, genre } = this.state;
		const {
			user: { profile },
			addBook,
		} = this.props;
		addBook({
			title,
			author,
			genre,
			userId: profile.id,
		});
		this.setState({ title: '', author: '', genre: '' });
	};

	onDelete = async (id) => {
		const { deleteBook } = this.props;
		deleteBook(id);
	};

	renderBookFields = () => bookFields.map(({ name, placeholder }) => (
		<div key={name} className="form-group d-flex my-4 position-relative">
			<label htmlFor={name} className="col-md-2 py-2 text-capitalize">
				{name}
			</label>
			<input id={name} name={name} type="text" value={this.state[name]} onChange={this.onChange} placeholder={placeholder} className="col-md-8 form-control" />
		</div>
	));

	render() {
		const { books } = this.props;
		const { list, error } = books;
		return (
			<div className="container">
				<div className="row mb-5">
					<form className="col-lg-8 mr-auto" onSubmit={this.onAddBook}>
						<h3 className="mx-5 px-5">
							<span>Add new book to library</span>
						</h3>
						{this.renderBookFields()}
						<button className="col-10 btn btn-info btn-block" type="submit">
							<span>Add book</span>
						</button>
						<p>
							<span>{error}</span>
						</p>
					</form>
				</div>
				<div className="row">
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
									<td>
										<button type="button" onClick={() => this.onDelete(book.id)}>
											<span>del</span>
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.get('user'),
	books: state.get('books'),
});

export default connect(
	mapStateToProps,
	actions
)(ToJS(Library));
