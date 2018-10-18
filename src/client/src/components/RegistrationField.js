import React from 'react';

export default ({ input, label, meta: { error, touched } }) => (
	<div>
		<label htmlFor={input.name}>{label}</label>
		<input {...input} style={{ marginBottom: '5px' }} id={input.name} />
		<div className="red-text" style={{ marginBottom: '20px' }}>
			{touched && error}
		</div>
	</div>
);
