import React from 'react';

export default ({
	input,
	type,
	label,
	placeholder,
	meta: { error, touched },
}) => (
	<div className="form-group row my-4 position-relative">
		<label htmlFor={input.name} className="col-md-4">
			{label}
		</label>
		<input
			{...input}
			style={{ marginBottom: '5px' }}
			id={input.name}
			type={type}
			placeholder={placeholder}
			className="col-md-8"
		/>
		{error && <div className="tooltiptext">{error}</div>}
	</div>
);
