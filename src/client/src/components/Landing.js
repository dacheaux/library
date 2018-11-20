import React from 'react';
import { Link } from 'react-router-dom';

export default ({ books: { list } }) => {
	const listOfBooks = list.map((book) => {
		const { id, title } = book;
		const bookUri = title.split(' ').join('-').toLowerCase();
		return (
			<div>
				<Link to={`${id}/${bookUri}`} href={title}>
					{title}
				</Link>
			</div>
		);
	});
	return <div>{listOfBooks}</div>;
};
