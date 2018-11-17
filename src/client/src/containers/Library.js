import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bookFields } from '../utilities';

class Library extends Component {
	state = {
		title: '',
		author: '',
		genre: '',
		description: '',
	};

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

		const {
			title, author, genre, description,
		} = this.state;
		const {
			user: { profile },
			action,
		} = this.props;
		action.addBook({
			title,
			author,
			genre,
			description,
			userId: profile.id,
		});
		this.setState({
			title: '',
			author: '',
			genre: '',
			description: '',
		});
	};

	onDelete = async (id) => {
		const { action } = this.props;
		action.deleteBook(id);
	};

	renderBookFields = () => bookFields.map(({ name, placeholder }) => {
		const { [name]: value } = this.state;
		return (
			<div key={name} className="container form-group my-4">
				<label htmlFor={name} className="row py-2 text-capitalize">
					<span className="col-md-3 pl-4">{name}</span>
					<input
						id={name}
						name={name}
						type="text"
						value={value}
						onChange={this.onChange}
						placeholder={placeholder}
						className="col-md-8 form-control"
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
				<div className="mb-5">
					<form className="row" onSubmit={this.onAddBook}>
						<div className="col-lg-6 px-0 mr-auto">
							<h3>
								<span>Add new book to library</span>
							</h3>
							{this.renderBookFields()}
						</div>
						<div className="col-lg-6 px-0 mr-auto">
							<div className="form-group my-4">
								<label htmlFor="description" className="row py-2 text-capitalize">
									<span className="pl-4">Description</span>
									<textarea
										id="description"
										name="description"
										value={this.state.description}
										rows={10}
										onChange={this.onChange}
										placeholder="Write about book here"
										className="mx-4 my-2 form-control"
									/>
								</label>
							</div>
						</div>
						<button className="col-3 btn btn-info btn-block" type="submit">
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
							{list.map(({
								title, author, genre, id,
							}) => (
								<tr key={id}>
									<td>
										<Link
											to={`${id}/${title.split(' ').join('-').toLowerCase()}`}
											href={title}
										>
											{title}
										</Link>
									</td>
									<td>{author}</td>
									<td>{genre}</td>
									<td>
										<button type="button" onClick={() => this.onDelete(id)}>
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
