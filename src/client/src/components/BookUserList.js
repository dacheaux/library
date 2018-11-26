import React from 'react';
import { Link } from 'react-router-dom';

export default ({ userList }) => (

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
								to={`/library/${id}/${title
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
							<button type="button" onClick={() => this.onDelete(id)}>
								<span>del</span>
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
);
