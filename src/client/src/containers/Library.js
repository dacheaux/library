import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { bookFields } from '../utilities';

class Library extends Component {
	state = { title: '', author: '', genre: '' };

	static propTypes = {
		action: PropTypes.shape({}).isRequired,
		books: PropTypes.shape({}).isRequired,
	};

	componentDidMount() {
		const { action } = this.props;
		action.fetchBooks();
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
			action,
		} = this.props;
		action.addBook({
			title,
			author,
			genre,
			userId: profile.id,
		});
		this.setState({ title: '', author: '', genre: '' });
	};

	onDelete = async (id) => {
		const { action } = this.props;
		action.deleteBook(id);
	};

	renderBookFields = () => bookFields.map(({ name, placeholder }) => {
		const { [name]: value } = this.state;
		return (
			<div
				key={name}
				className="container form-group my-4"
			>
				<label
					htmlFor={name}
					className="row w-50 py-2 text-capitalize"
				>
					<span className="col-md-3">{name}</span>
					<input
						id={name}
						name={name}
						type="text"
						value={value}
						onChange={this.onChange}
						placeholder={placeholder}
						className="col-md-9 form-control"
					/>
				</label>
			</div>
		);
	});

	render() {
		const { books } = this.props;
		const { list, error } = books;
		return (
			<div className="container">
				<div className="row mb-5">
					<form
						className="col-lg-8 px-0 mr-auto"
						onSubmit={this.onAddBook}
					>
						<h3>
							<span>Add new book to library</span>
						</h3>
						{this.renderBookFields()}
						<button
							className="col-6 btn btn-info btn-block"
							type="submit"
						>
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
										<button
											type="button"
											onClick={() => this.onDelete(book.id)
											}
										>
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

export default Library;
