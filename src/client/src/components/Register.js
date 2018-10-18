import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import { connect } from 'react-redux';
import axios from 'axios';
import ToJS from './ToJS';
import RegistrationField from './RegistrationField';
import fields from './fields';

class Register extends Component {
	onChange = (e) => {
		const state = { ...this.state };
		state[e.target.name] = e.target.value;
		this.setState(state);
	};

	onRegister = async (e) => {
		e.preventDefault();
		const { form: { registerForm }, history } = this.props;
		const { values } = registerForm;
		console.log(values);
		const res = await axios.post('/api/auth/signup', values);
		if (res.data.success) {
			history.push('/signin');
		} else {
			console.log(res.data.info);
		}
	};

	renderFields = () => fields.map(({
		type, name, placeholder, label,
	}) => (
		<Field
			key={name}
			type={type}
			name={name}
			placeholder={placeholder}
			label={label}
			component={RegistrationField}
		/>
	));

	render() {
		return (
			<div className="container">
				<form className="form-signin" onSubmit={this.onRegister}>
					<h2 className="form-signin-heading">
						<span>Enter your credentials</span>
					</h2>
					{this.renderFields()}
					<button
						className="btn btn-lg btn-primary btn-block"
						type="submit"
					>
						<span>Register</span>
					</button>
				</form>
			</div>
		);
	}
}

const validate = (values) => {
	const errors = {};

	fields.forEach(({ name }) => {
		if (!values[name]) {
			errors[name] = 'You must provide a value';
		}
	});

	return errors;
};

const mapStateToProps = state => ({ form: state.get('form') });

const RegisterHOC = connect(mapStateToProps)(ToJS(Register));

export default reduxForm({
	validate,
	form: 'registerForm',
})(RegisterHOC);
