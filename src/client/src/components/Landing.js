import React from 'react';
import { Link } from 'react-router-dom';
import publicFolder from '../constants';

export default ({ books: { list } }) => {
	const listOfBooks = list.map((book) => {
		const { id, title, cover, Users } = book;
		const bookUri = title.split(' ').join('-').toLowerCase();
		return (
			<div className="col-md-4" key={id}>
				<div className="card">
					<div className="container-cover">
						<img src={`${publicFolder}${cover}`} alt="" className="card-img-top" />
					</div>
					<Link to={`/books/${id}/${bookUri}`} href={title} className="card-body no-underline">
						<h5 className="text-center mb-4">{title}</h5>
						<div className="row">{Users[0].email}</div>
					</Link>
				</div>
			</div>
		);
	});
	return <div className="row">{listOfBooks}</div>;
};
