import React from 'react';
import { Link } from 'react-router-dom';
import publicFolder from '../constants';

export default ({ books: { list } }) => {
	const listOfBooks = list.map((book) => {
		const { id, title, cover } = book;
		const bookUri = title.split(' ').join('-').toLowerCase();
		return (
			<div className="col-md-4">
				<div className="card">
					<img src={`${publicFolder}${cover}`} alt="" className="card-img-top" />
					<Link to={`/books/${id}/${bookUri}`} href={title} className="card-body no-underline">
						<h3 className="text-center">{title}</h3>
					</Link>
				</div>
			</div>
		);
	});
	return <div className="row">{listOfBooks}</div>;
};
