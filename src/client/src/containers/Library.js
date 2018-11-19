import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Library extends Component {
	static propTypes = {
		action: PropTypes.shape({}).isRequired,
		books: PropTypes.shape({}).isRequired,
	};

	componentDidMount() {
		const { action } = this.props;
		action.fetchBooks();
	}

	onDelete = async (id) => {
		const { action } = this.props;
		action.deleteBook(id);
	};

	render() {
		const { books } = this.props;
		const { list, error } = books;
		return (
			<div className="container">
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
