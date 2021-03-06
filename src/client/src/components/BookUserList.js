import React from 'react';
import { Link } from 'react-router-dom';

export default ({ userList, onDelete }) => (

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
				{userList.map(({
					title, author, genre, id,
				}) => (
					<tr key={id}>
						<td>
							<Link
								to={`/books/${id}/${title
									.split(' ')
									.join('-')
									.toLowerCase()}`}
								href={title}
							>
								{title}
							</Link>
						</td>
						<td>{author}</td>
						<td>{genre}</td>
						<td>
							<button type="button" onClick={() => onDelete(id)}>
								<span>del</span>
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
);
