import React from 'react';

export default ({
	input,
	type,
	label,
	placeholder,
	meta: { error },
}) => {
	const validClass = error ? 'is-invalid' : '';
	return (
		<div className="form-group my-4 position-relative">
			<label htmlFor={input.name} className="row py-2">
				<span className="col-md-3">{label}</span>
				<input
					{...input}
					id={input.name}
					type={type}
					placeholder={placeholder}
					className={`col-md-8 form-control ${validClass}`}
				/>
			</label>
			{error && <div className="tooltiptext py-2">{error}</div>}
		</div>
	);
};
