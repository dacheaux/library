import React from 'react';

export default ({
	input,
	type,
	label,
	placeholder,
	meta: { error, touched },
}) => {
	const validClass = error ? 'is-invalid' : '';
	return (
		<div className="form-group row my-4 position-relative">
			<label htmlFor={input.name} className="col-md-4  py-2">
				{label}
			</label>
			<input
				{...input}
				id={input.name}
				type={type}
				placeholder={placeholder}
				className={`col-md-8 form-control ${validClass}`}
			/>
			{error && <div className="tooltiptext py-2">{error}</div>}
		</div>
	);
};
