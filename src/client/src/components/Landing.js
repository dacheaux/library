import React from 'react';
import { Link } from 'react-router-dom';
import publicFolder from '../constants';

export default ({ books: { list }, searchTerm }) => {
	let filteredBooks;
	if (searchTerm) {
		filteredBooks = list.filter((book) => {
			const { title, author, genre } = book;
			const arr = [title, author, genre].map(el => el.toLowerCase());
			const term = searchTerm.toLowerCase();
			return arr.some(el => el.includes(term));
		});
	} else {
		filteredBooks = list;
	}
	const listOfBooks = filteredBooks.map((book) => {
		const {
			id,
			title,
			genre,
			cover,
			Users,
		} = book;
		const bookUri = title.split(' ').join('-').toLowerCase();
		return (
			<div className="col-md-4" key={id}>
				<div className="card">
					<div className="container-cover">
						<img src={`${publicFolder}${cover}`} alt="" className="card-img-top" />
					</div>
					<Link to={`/books/${id}/${bookUri}`} href={title} className="card-body no-underline">
						<h5 className="text-center mb-4">{title}</h5>
						<div className="row">
							<span>{Users[0].email}</span>
							<span className="ml-auto">{genre}</span>
						</div>
					</Link>
				</div>
			</div>
		);
	});
	return <div className="row">{listOfBooks}</div>;
};
